import "server-only";
import type { ObjectId } from "mongodb";
import { db } from "./mongodb";
import { entitlements, grants } from "./m5-data";
import type { ProductId } from "./m5-models";

export type WorkflowStatus = "awaiting_approval" | "approved" | "rejected";
export type WorkflowPayload = Record<string, unknown>;
export type WorkflowRecord = {
  _id?: ObjectId;
  organizationId: string;
  createdBy: string;
  productId: ProductId;
  kind: string;
  title: string;
  status: WorkflowStatus;
  data: WorkflowPayload;
  createdAt: Date;
  updatedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
};

export const workflows = () => db.collection<WorkflowRecord>("m6_m11_workflows");
const PRODUCTS = ["quote", "extract", "collect", "follow", "respond", "hr-desk"] as const;
export const isWorkflowProduct = (x: string): x is ProductId => (PRODUCTS as readonly string[]).includes(x);
export const kindForProduct: Record<ProductId, string> = {
  quote: "quotation", extract: "dataset", collect: "invoice", follow: "lead", respond: "article", "hr-desk": "policy",
};

// Product preview is deliberately opt-in; it does not activate public paid access.
export async function productAccess(ctx: { organizationId: string; userId: string; role: "owner" | "member" }, productId: ProductId) {
  const [entitlement, grant] = await Promise.all([
    entitlements().findOne({ organizationId: ctx.organizationId, productId, enabled: true }),
    ctx.role === "owner" ? Promise.resolve(true) : grants().findOne({ organizationId: ctx.organizationId, userId: ctx.userId, productId, enabled: true }),
  ]);
  const preview = process.env.SOLVEOI_INTERNAL_PRODUCT_PREVIEW === "true" && process.env.NODE_ENV !== "production";
  const allowed = (Boolean(entitlement) || preview) && (ctx.role === "owner" || Boolean(grant));
  return { allowed, preview, entitled: Boolean(entitlement) };
}

const str = (x: unknown, max = 200) => typeof x === "string" ? x.trim().slice(0, max) : "";
const num = (x: unknown, max = 100000000) => {
  const n = typeof x === "number" ? x : Number(x);
  if (!Number.isFinite(n) || n < 0 || n > max) throw new Error("Invalid numeric value");
  return n;
};
const money = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const date = (x: unknown) => {
  const s = str(x, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || !Number.isFinite(Date.parse(`${s}T00:00:00Z`)) || new Date(`${s}T00:00:00Z`).toISOString().slice(0, 10) !== s) throw new Error("Use a valid YYYY-MM-DD date");
  return s;
};
const textRequired = (x: unknown, field: string, min = 2, max = 500) => {
  const s = str(x, max);
  if (s.length < min) throw new Error(`${field} is required`);
  return s;
};

export function normalizeWorkflow(product: ProductId, input: WorkflowPayload): { title: string; data: WorkflowPayload } {
  switch (product) {
    case "quote": {
      const customer = textRequired(input.customer, "Customer");
      if (!Array.isArray(input.items) || input.items.length === 0 || input.items.length > 30) throw new Error("Enter 1–30 quotation items");
      const items = input.items.map((v: unknown) => {
        if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("Invalid quotation item");
        const row = v as WorkflowPayload;
        const description = textRequired(row.description, "Item description", 2, 200);
        const quantity = num(row.quantity, 10000);
        const unitPrice = num(row.unitPrice, 10000000);
        if (quantity <= 0) throw new Error("Quantity must be greater than zero");
        return { description, quantity, unitPrice: money(unitPrice), lineTotal: money(quantity * unitPrice) };
      });
      const taxPercent = num(input.taxPercent ?? 0, 100);
      const subtotal = money(items.reduce((n, x) => n + x.lineTotal, 0));
      const tax = money(subtotal * taxPercent / 100);
      return { title: `Quote · ${customer}`, data: { customer, reference: str(input.reference, 60), currency: "BDT", items, taxPercent, subtotal, tax, total: money(subtotal + tax), notes: str(input.notes, 1600) } };
    }
    case "extract": {
      const source = textRequired(input.source, "Source name");
      const content = textRequired(input.content, "Source content", 5, 20000);
      const delimiter = input.delimiter === "tab" ? "tab" : input.delimiter === "semicolon" ? "semicolon" : "comma";
      return { title: `Extract · ${source}`, data: { source, content, delimiter, note: "Text/CSV review record; no PDF OCR or AI extraction is claimed." } };
    }
    case "collect": {
      const invoiceNo = textRequired(input.invoiceNo, "Invoice number", 1, 70);
      const customer = textRequired(input.customer, "Customer");
      const amount = money(num(input.amount));
      if (amount <= 0) throw new Error("Invoice amount must be positive");
      const dueDate = date(input.dueDate);
      const email = str(input.email, 200);
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid customer email");
      return { title: `Invoice · ${invoiceNo}`, data: { invoiceNo, customer, amount, dueDate, email, note: str(input.note, 1200), reminderDraft: `Dear ${customer}, this is a reminder regarding invoice ${invoiceNo} for BDT ${amount.toFixed(2)}, due on ${dueDate}. Please contact us if you have any questions.`, sent: false } };
    }
    case "follow": {
      const name = textRequired(input.name, "Lead name");
      const stage = ["new", "contacted", "qualified", "proposal", "won", "lost"].includes(String(input.stage)) ? String(input.stage) : "new";
      const nextDate = input.nextDate ? date(input.nextDate) : "";
      return { title: `Lead · ${name}`, data: { name, company: str(input.company, 200), stage, nextDate, contact: str(input.contact, 200), note: str(input.note, 1500), followUpDraft: `Hello ${name}, following up on our previous conversation. Please let us know a convenient time to talk.` } };
    }
    case "respond": {
      const title = textRequired(input.title, "Knowledge article title");
      const content = textRequired(input.content, "Approved support knowledge", 15, 8000);
      return { title: `Support KB · ${title}`, data: { title, content, knowledgeSource: str(input.knowledgeSource, 250) } };
    }
    case "hr-desk": {
      const title = textRequired(input.title, "Policy title");
      const content = textRequired(input.content, "HR policy text", 15, 8000);
      return { title: `HR policy · ${title}`, data: { title, content, knowledgeSource: str(input.knowledgeSource, 250) } };
    }
  }
}

export function draftFromApprovedSources(question: string, sources: WorkflowRecord[]) {
  const tokens = new Set(question.toLowerCase().match(/[a-z0-9]{4,}/g) || []);
  const ranked = sources.map(x => {
    const text = `${x.data.title || ""} ${x.data.content || ""}`.toLowerCase();
    const score = [...tokens].reduce((n, t) => n + (text.includes(t) ? 1 : 0), 0);
    return { sourceId: String(x._id), title: String(x.data.title || x.title), score, excerpt: String(x.data.content || "").slice(0, 650) };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  return { answer: ranked.length ? `Reference excerpts for human review:\n\n${ranked.map(x => `${x.title}: ${x.excerpt}`).join("\n\n")}` : "No matching approved knowledge was found. Escalate to a human reviewer.", sources: ranked, generatedBy: "deterministic matching (not AI)", requiresHumanApproval: true };
}
