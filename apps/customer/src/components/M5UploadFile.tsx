"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
export default function M5UploadFile() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/m5/files", { method: "POST", body: new FormData(form) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Upload failed");
      form.reset(); setMessage("File uploaded privately."); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed"); }
    finally { setBusy(false); }
  }
  return <form onSubmit={upload} className="rounded-2xl border border-violet-400/15 bg-[#191124] p-5 sm:p-6"><h2 className="text-lg font-semibold">Upload a private file</h2><p className="mt-2 text-sm text-white/50">PDF, PNG, JPEG, or plain text. Maximum 5 MB. Only authorized workspace members can access permitted files.</p><input name="file" type="file" accept=".pdf,.png,.jpg,.jpeg,.txt" required className="mt-5 block w-full text-sm text-white/70 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-200 file:px-4 file:py-2 file:font-semibold file:text-[#170c26]"/><button className="button mt-5" type="submit" disabled={busy}>{busy ? "Uploading…" : "Upload file"}</button>{message && <p role="status" className="mt-3 text-sm text-violet-200">{message}</p>}</form>;
}
