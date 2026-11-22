"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
export default function M5CreateTask({ allowSandbox = false }: { allowSandbox?: boolean }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [kind, setKind] = useState<"manual" | "ai_sandbox">("manual");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/m5/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, details, kind }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to submit task");
      setTitle(""); setDetails(""); setMessage("Task submitted successfully."); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Submission failed"); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="rounded-3xl border border-violet-400/15 bg-[#171023] p-5 sm:p-7">
    <h2 className="text-lg font-semibold">Create a workflow task</h2>
    <p className="mt-2 text-sm leading-6 text-white/50">Manual tasks enter a human approval queue. The AI sandbox is optional and must be enabled by an administrator.</p>
    <label className="mt-5 block text-sm">Task title<input className="field mt-2" minLength={3} maxLength={120} required value={title} onChange={event => setTitle(event.target.value)} placeholder="Review a customer quotation"/></label>
    <label className="mt-4 block text-sm">Details<textarea className="field mt-2 !h-28 resize-y" minLength={5} maxLength={3000} required value={details} onChange={event => setDetails(event.target.value)} placeholder="Describe what needs to be reviewed or prepared"/></label>
    {allowSandbox && <label className="mt-4 block text-sm">Processing mode<select className="field mt-2" value={kind} onChange={event => setKind(event.target.value as "manual" | "ai_sandbox")}><option value="manual">Manual approval</option><option value="ai_sandbox">M5 AI sandbox test</option></select></label>}
    <button type="submit" className="button mt-5" disabled={busy}>{busy ? "Submitting…" : "Create task"}</button>
    {message && <p role="status" className="mt-3 text-sm text-violet-200">{message}</p>}
  </form>;
}
