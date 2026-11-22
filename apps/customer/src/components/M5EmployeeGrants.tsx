"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
export default function M5EmployeeGrants({ members, products }: { members: Array<{ userId: string; name: string }>; products: Array<{ id: string; name: string }> }) {
  const router = useRouter();
  const [userId, setUserId] = useState(members[0]?.userId || "");
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [enabled, setEnabled] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/m5/grants", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, productId, enabled }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to update permission");
      setNotice("Employee permission saved. Product remains Coming Soon."); router.refresh();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Permission update failed"); }
    finally { setBusy(false); }
  }
  if (!members.length) return <p className="mt-3 text-sm text-white/50">Invite an employee first to configure their future product permissions.</p>;
  return <form className="mt-5 space-y-4" onSubmit={submit}><label className="block text-sm">Employee<select className="field mt-2" value={userId} onChange={event => setUserId(event.target.value)}>{members.map(member => <option value={member.userId} key={member.userId}>{member.name}</option>)}</select></label><label className="block text-sm">AI product<select className="field mt-2" value={productId} onChange={event => setProductId(event.target.value)}>{products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={enabled} onChange={event => setEnabled(event.target.checked)}/> Allow employee when product launches</label><button className="button" disabled={busy}>{busy ? "Saving…" : "Save permission"}</button>{notice && <p className="text-sm text-violet-200" role="status">{notice}</p>}</form>;
}
