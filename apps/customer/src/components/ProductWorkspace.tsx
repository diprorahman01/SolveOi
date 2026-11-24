"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import type { ProductId } from "@/lib/m5-models";

type RecordRow = {
  _id: string; productId: string; kind: string; title: string; status: "awaiting_approval" | "approved" | "rejected";
  data: Record<string, unknown>; createdAt: string; createdBy: string;
};
type Props = { product: ProductId; role: "owner" | "member" };
const input = "w-full min-w-0 rounded-xl border border-violet-400/20 bg-[#100b19] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-300";
const label = "block text-sm font-medium text-violet-100";
const primary = "rounded-xl bg-[#e8d9ff] px-5 py-3 text-sm font-bold text-[#170c26] disabled:opacity-50";
const secondary = "rounded-xl border border-violet-400/25 px-4 py-2 text-sm text-violet-100 hover:bg-violet-400/10 disabled:opacity-40";
const productNames: Record<ProductId, string> = { quote: "Quotation", extract: "Text/CSV extraction", collect: "Invoice tracking", follow: "Lead follow-up", respond: "Support knowledge", "hr-desk": "HR policy knowledge" };

function text(value: unknown) { return typeof value === "string" ? value : value == null ? "" : String(value); }
function pretty(value: unknown) { return typeof value === "object" && value !== null ? JSON.stringify(value, null, 2) : text(value); }
function csvCell(value: string) { return `"${value.replaceAll('"', '""')}"`; }
function downloadRaw(content: string, filename: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const link = document.createElement("a"); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function downloadCsv(rows: string[][], filename: string) {
  const csv = "\uFEFF" + rows.map(row => row.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function GenericField({ name, labelText, value, change, type = "text", required = false, multiline = false }: {
  name: string; labelText: string; value: string; change: (name: string, value: string) => void; type?: string; required?: boolean; multiline?: boolean;
}) {
  return <label className={label}>{labelText}{multiline ? <textarea name={name} className={`${input} mt-2 min-h-28 resize-y`} required={required} value={value} onChange={e => change(name, e.target.value)}/> : <input name={name} className={`${input} mt-2`} type={type} required={required} value={value} onChange={e => change(name, e.target.value)}/>}</label>;
}
const defaults: Record<ProductId, Record<string, string>> = {
  quote: { customer: "", reference: "", itemsText: "Service description | 1 | 1500", taxPercent: "0", notes: "" },
  extract: { source: "", content: "", delimiter: "comma" },
  collect: { invoiceNo: "", customer: "", amount: "", dueDate: "", email: "", note: "" },
  follow: { name: "", company: "", stage: "new", nextDate: "", contact: "", note: "" },
  respond: { title: "", content: "", knowledgeSource: "", question: "" },
  "hr-desk": { title: "", content: "", knowledgeSource: "", question: "" },
};

export default function ProductWorkspace({ product, role }: Props) {
  const [form, setForm] = useState<Record<string, string>>({ ...defaults[product] });
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [mode, setMode] = useState<"knowledge" | "draft">("knowledge");
  const [openId, setOpenId] = useState<string | null>(null);
  const isKnowledge = product === "respond" || product === "hr-desk";
  const url = `/api/products/${product}`;
  const update = (name: string, value: string) => setForm(p => ({ ...p, [name]: value }));
  const fetchRecords = useCallback(async () => {
    const result = await fetch(url, { cache: "no-store" });
    const data = await result.json() as { records?: RecordRow[]; error?: string };
    if (!result.ok) throw new Error(data.error || `HTTP ${result.status}`);
    setRecords(data.records || []);
  }, [url]);
  useEffect(() => {
    let alive = true;
    (async () => { try { await fetchRecords(); } catch (e) { if (alive) setError(e instanceof Error ? e.message : "Unable to load records"); } finally { if (alive) setLoading(false); } })();
    return () => { alive = false; };
  }, [fetchRecords]);
  const stats = useMemo(() => ({ total: records.length, awaiting: records.filter(x => x.status === "awaiting_approval").length, approved: records.filter(x => x.status === "approved").length }), [records]);

  async function submit(e: FormEvent) {
    e.preventDefault(); if (busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      let body: Record<string, unknown> = { ...form };
      if (product === "quote") {
        const items = form.itemsText.split("\n").filter(x => x.trim()).map(line => {
          const parts = line.split("|").map(x => x.trim());
          if (parts.length !== 3) throw new Error("Each quote line must be: Description | Quantity | Unit price");
          return { description: parts[0], quantity: Number(parts[1]), unitPrice: Number(parts[2]) };
        });
        body = { ...form, items };
      }
      if (isKnowledge && mode === "draft") body = { action: "draft", question: form.question };
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || `Request failed (${response.status})`);
      setNotice("Saved for human review. No email, payment, or external action has been sent.");
      if (isKnowledge && mode === "draft") update("question", "");
      await fetchRecords();
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to submit"); }
    finally { setBusy(false); }
  }
  async function review(id: string, status: "approved" | "rejected") {
    if (busy || role !== "owner") return;
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(`${url}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || `Review failed (${response.status})`);
      setNotice(`Record ${status}. No external messages were sent.`);
      await fetchRecords();
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to review"); }
    finally { setBusy(false); }
  }
  async function importText(file?: File) {
    if (!file) return;
    if (file.size > 20000) { setError("Text/CSV file must be 20 KB or smaller for this internal preview."); return; }
    if (!/\.(txt|csv|tsv)$/i.test(file.name)) { setError("Only TXT, CSV, or TSV are supported; PDF OCR is not implemented."); return; }
    update("source", file.name);
    const contents = await file.text();
    setForm(p => ({ ...p, source: file.name, content: contents }));
    setError("");
  }
  function exportOne(record: RecordRow) {
    if (product === "quote") { setOpenId(record._id); window.setTimeout(() => window.print(), 200); return; }
    if (product === "extract") {
      // Preserve the exact reviewed source rather than corrupting quoted CSV cells.
      const original = text(record.data.content);
      const filename = text(record.data.source);
      if (/\.(csv|tsv)$/i.test(filename)) {
        const extension = filename.toLowerCase().endsWith(".tsv") ? "tsv" : "csv";
        downloadRaw(original, `solveoi-extract-${record._id}.${extension}`, "text/plain;charset=utf-8");
      } else {
        const rows = [["Source line"], ...original.split(/\r?\n/).map(x => [x])];
        downloadCsv(rows, `solveoi-extract-${record._id}.csv`);
      }
      return;
    }
    downloadCsv([["Field", "Value"], ...Object.entries(record.data).map(([k,v]) => [k, pretty(v)])], `solveoi-${product}-${record._id}.csv`);
  }
  const fields = () => {
    const f = (key: string, labelText: string, options: { type?: string; required?: boolean; multiline?: boolean } = {}) => <GenericField key={key} name={key} labelText={labelText} value={form[key] ?? ""} change={update} {...options}/>;
    if (product === "quote") return <>{f("customer", "Customer or business name", { required: true })}{f("reference", "Quotation reference")}{f("itemsText", "Items — one per line: description | quantity | unit price (BDT)", { required: true, multiline: true })}{f("taxPercent", "Tax percentage", { type: "number" })}{f("notes", "Terms and notes", { multiline: true })}</>;
    if (product === "extract") return <>{f("source", "Source document name", { required: true })}<label className={label}>Import plain text or CSV (max 20 KB)<input className={`${input} mt-2`} type="file" accept=".txt,.csv,.tsv,text/plain,text/csv" onChange={e => void importText(e.target.files?.[0])}/></label>{f("content", "Source text (review before saving)", { required: true, multiline: true })}<label className={label}>CSV separator<select className={`${input} mt-2`} value={form.delimiter} onChange={e => update("delimiter", e.target.value)}><option value="comma">Comma</option><option value="semicolon">Semicolon</option><option value="tab">Tab</option></select></label></>;
    if (product === "collect") return <>{f("invoiceNo", "Invoice number", { required: true })}{f("customer", "Customer", { required: true })}{f("amount", "Invoice amount (BDT)", { type: "number", required: true })}{f("dueDate", "Due date", { type: "date", required: true })}{f("email", "Customer email (drafts only)", { type: "email" })}{f("note", "Invoice notes", { multiline: true })}</>;
    if (product === "follow") return <>{f("name", "Contact name", { required: true })}{f("company", "Company")}{f("contact", "Email or phone") }<label className={label}>Pipeline stage<select className={`${input} mt-2`} value={form.stage} onChange={e => update("stage", e.target.value)}>{["new", "contacted", "qualified", "proposal", "won", "lost"].map(s => <option key={s} value={s}>{s}</option>)}</select></label>{f("nextDate", "Next follow-up date", { type: "date" })}{f("note", "Interaction notes", { multiline: true })}</>;
    return mode === "draft" ? f("question", product === "respond" ? "Customer support question" : "Employee HR question", { required: true, multiline: true }) : <>{f("title", product === "respond" ? "Support article title" : "Policy title", { required: true })}{f("content", "Authoritative knowledge text — requires owner approval", { required: true, multiline: true })}{f("knowledgeSource", "Source or policy reference")}</>;
  };
  const printQuote = product === "quote" ? records.find(r => r._id === openId) : undefined;
  const quoteItems = Array.isArray(printQuote?.data.items) ? printQuote.data.items as { description: string; quantity: number; unitPrice: number; lineTotal: number }[] : [];
  return <div className="space-y-6">
    {printQuote && <div id="solveoi-quote-print"><h1 style={{ fontSize: 30, fontWeight: 800 }}>SolveOi Quote</h1><p>Quotation reference: {text(printQuote.data.reference) || printQuote._id}</p><p>Customer: {text(printQuote.data.customer)}</p><p>Date: {new Date(printQuote.createdAt).toLocaleDateString()}</p><table style={{ marginTop: 26 }}><thead><tr><th>Description</th><th>Quantity</th><th>Unit price (BDT)</th><th>Line total (BDT)</th></tr></thead><tbody>{quoteItems.map((i,n) => <tr key={n}><td>{i.description}</td><td>{i.quantity}</td><td>{i.unitPrice.toFixed(2)}</td><td>{i.lineTotal.toFixed(2)}</td></tr>)}</tbody></table><div className="totals"><p>Subtotal: BDT {text(printQuote.data.subtotal)}</p><p>Tax ({text(printQuote.data.taxPercent)}%): BDT {text(printQuote.data.tax)}</p><p style={{ fontSize: 20, fontWeight: 800 }}>Total: BDT {text(printQuote.data.total)}</p></div><p style={{ marginTop: 25 }}>Notes: {text(printQuote.data.notes)}</p><p style={{ marginTop: 50, fontSize: 12 }}>Status: {printQuote.status}. Issued by the business after human review.</p></div>}
    <div className="grid gap-3 sm:grid-cols-3">{[["Saved records", stats.total], ["Awaiting review", stats.awaiting], ["Approved", stats.approved]].map(([name, count]) => <div key={name} className="rounded-2xl border border-violet-400/15 bg-[#1b1229] p-5"><p className="text-sm text-white/55">{name}</p><p className="mt-2 text-3xl font-semibold text-violet-200">{count}</p></div>)}</div>
    <div className="rounded-2xl border border-amber-300/20 bg-amber-400/5 p-4 text-sm leading-6 text-amber-100/85">Internal beta: records stay private to the company. Every submission requires owner approval. There is no autonomous email, payment, AI response, OCR, or external action.</div>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <section className="min-w-0 rounded-3xl border border-violet-400/15 bg-[#191124] p-5 sm:p-7">
        <h2 className="text-xl font-semibold">{productNames[product]}</h2>
        <p className="mt-2 text-xs text-white/50">Create a structured record for review. All calculations are verified on the server.</p>
        {isKnowledge && <div className="mt-5 flex gap-2"><button type="button" className={secondary} onClick={() => setMode("knowledge")} aria-pressed={mode === "knowledge"}>Add knowledge</button><button type="button" className={secondary} onClick={() => setMode("draft")} aria-pressed={mode === "draft"}>Draft answer</button></div>}
        <form className="mt-5 space-y-4" onSubmit={e => void submit(e)}>{fields()}<button type="submit" className={primary} disabled={busy}>{busy ? "Saving…" : "Submit for review"}</button></form>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
        {notice && <p role="status" className="mt-4 rounded-xl bg-violet-500/10 p-3 text-sm text-violet-100">{notice}</p>}
      </section>
      <section className="min-w-0 rounded-3xl border border-violet-400/15 bg-[#191124] p-5 sm:p-7">
        <h2 className="text-xl font-semibold">Saved records & history</h2>
        <p className="mt-2 text-xs text-white/50">{role === "owner" ? "Review company submissions" : "View your submissions and approved company knowledge"} · showing latest 100.</p>
        {loading ? <p className="mt-5 text-sm">Loading…</p> : !records.length ? <p className="mt-5 text-sm text-white/50">No records yet. Submit your first record.</p> : <div className="mt-5 space-y-3">{records.map(record => <article key={record._id} className="min-w-0 rounded-2xl border border-white/10 bg-[#110b1a] p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h3 className="break-words font-semibold">{record.title}</h3><span className="rounded-lg bg-white/5 px-2 py-1 text-[11px] text-violet-200">{record.status.replaceAll("_", " ")}</span></div><p className="mt-2 text-xs text-white/40">{new Date(record.createdAt).toLocaleString()} · {record.kind.replaceAll("_", " ")}</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" className={secondary} onClick={() => setOpenId(openId === record._id ? null : record._id)}>{openId === record._id ? "Hide details" : "View details"}</button><button type="button" className={secondary} onClick={() => exportOne(record)}>{product === "quote" ? "Print / Save PDF" : "Export CSV"}</button>{role === "owner" && record.status === "awaiting_approval" && <><button type="button" disabled={busy} className={secondary} onClick={() => void review(record._id, "approved")}>Approve</button><button type="button" disabled={busy} className={secondary} onClick={() => void review(record._id, "rejected")}>Reject</button></>}</div>{openId === record._id && <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-black/30 p-4 text-xs leading-6 text-violet-100">{JSON.stringify(record.data, null, 2)}</pre>}</article>)}</div>}
      </section>
    </div>
  </div>;
}
