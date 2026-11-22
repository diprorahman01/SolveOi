"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function M5ReviewTask({ taskId }: { taskId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function review(decision: "approved" | "rejected") {
    setBusy(true); setError("");
    try {
      const response = await fetch(`/api/m5/tasks/${encodeURIComponent(taskId)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ decision }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to review task");
      router.refresh();
    } catch (error) { setError(error instanceof Error ? error.message : "Review failed"); setBusy(false); }
  }
  return <div className="flex flex-wrap items-center gap-2"><button className="rounded-lg bg-violet-200 px-3 py-2 text-xs font-semibold text-[#160922] disabled:opacity-40" disabled={busy} onClick={() => review("approved")}>Approve</button><button className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white disabled:opacity-40" disabled={busy} onClick={() => review("rejected")}>Reject</button>{error && <p role="alert" className="w-full text-xs text-red-300">{error}</p>}</div>;
}
