import { NextResponse } from "next/server";
import { workspaceApi, mutationOriginAllowed, badRequest, readJson, safeObject } from "@/lib/m5-access";
import { isWorkflowProduct, workflows, normalizeWorkflow, productAccess, draftFromApprovedSources } from "@/lib/product-workflows";
import { logAudit } from "@/lib/m5-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Params = { params: Promise<{ product: string }> };

async function gate(params: Params["params"]) {
  const { product } = await params;
  if (!isWorkflowProduct(product)) return { ok: false as const, response: badRequest("Unknown product", 404) };
  const auth = await workspaceApi();
  if (!auth.ok) return { ok: false as const, response: auth.response };
  const access = await productAccess(auth.ctx, product);
  if (!access.allowed) return { ok: false as const, response: badRequest("Product entitlement or employee permission required", 403) };
  return { ok: true as const, product, ctx: auth.ctx };
}

export async function GET(_request: Request, { params }: Params) {
  const access = await gate(params);
  if (!access.ok) return access.response;
  const { product, ctx } = access;
  const owner = ctx.role === "owner";
  const scope = owner ? { organizationId: ctx.organizationId, productId: product } : {
    organizationId: ctx.organizationId, productId: product,
    $or: [ { createdBy: ctx.userId }, { kind: { $in: ["article", "policy"] }, status: "approved" } ],
  };
  const records = await workflows().find(scope).sort({ createdAt: -1 }).limit(100).toArray();
  return NextResponse.json({ records: records.map(x => ({ ...x, _id: String(x._id) })), role: ctx.role }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request, { params }: Params) {
  if (!mutationOriginAllowed(request)) return badRequest("Invalid request origin", 403);
  const access = await gate(params);
  if (!access.ok) return access.response;
  const { ctx, product } = access;
  try {
    const body = safeObject(await readJson(request, 36000));
    if (!body) return badRequest("JSON object required");
    const now = new Date();
    const day = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    if (await workflows().countDocuments({ organizationId: ctx.organizationId, createdBy: ctx.userId, createdAt: { $gte: day } }) >= 60) return badRequest("Daily submission limit reached", 429);
    let kind = ""; let title = ""; let data: Record<string, unknown> = {};
    if ((product === "respond" || product === "hr-desk") && body.action === "draft") {
      const question = typeof body.question === "string" ? body.question.trim().slice(0, 1200) : "";
      if (question.length < 8) return badRequest("Enter a question (at least 8 characters)");
      const published = await workflows().find({ organizationId: ctx.organizationId, productId: product, kind: product === "respond" ? "article" : "policy", status: "approved" }).limit(100).toArray();
      kind = product === "respond" ? "support_draft" : "hr_answer_draft";
      title = `${product === "respond" ? "Support" : "HR"} question · ${question.slice(0, 75)}`;
      data = { question, ...draftFromApprovedSources(question, published) };
    } else {
      const normalized = normalizeWorkflow(product, body);
      kind = product === "quote" ? "quotation" : product === "extract" ? "dataset" : product === "collect" ? "invoice" : product === "follow" ? "lead" : product === "respond" ? "article" : "policy";
      title = normalized.title;
      data = normalized.data;
    }
    const result = await workflows().insertOne({ organizationId: ctx.organizationId, createdBy: ctx.userId, productId: product, kind, title, status: "awaiting_approval", data, createdAt: now, updatedAt: now });
    await logAudit({ organizationId: ctx.organizationId, actorId: ctx.userId, action: "product.record.created", targetType: kind, targetId: String(result.insertedId), details: { productId: product } });
    return NextResponse.json({ id: String(result.insertedId), status: "awaiting_approval" }, { status: 201 });
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : "Invalid submission");
  }
}
