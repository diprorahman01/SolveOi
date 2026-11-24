"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
export default function M5EntitlementEditor({ organizations, products }: { organizations: Array<{ id: string; name: string }>; products: Array<{ id: string; name: string }> }) {
  const router = useRouter();
  const [organizationId, setOrganizationId] = useState(organizations[0]?.id || "");
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/m5/entitlements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ organizationId, productId, enabled }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to update access");
      setNotice("Entitlement updated. The product remains unavailable until its release."); router.refresh();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Update failed"); }
    finally { setBusy(false); }
  }
  if (!organizations.length) return <p className="text-sm text-white/50">Create a company workspace before setting entitlements.</p>;
  return <form onSubmit={submit} className="rounded-2xl border border-violet-400/15 bg-[#171023] p-6"><h2 className="text-lg font-semibold">Set organization product entitlement</h2><p className="mt-2 text-sm text-white/50">An entitlement is not a product release. An entitlement permits internal beta access only. Public launch and paid services are not yet activated.</p><label className="mt-5 block text-sm">Organization<select className="field mt-2" value={organizationId} onChange={event => setOrganizationId(event.target.value)}>{organizations.map(org => <option key={org.id} value={org.id}>{org.name}</option>)}</select></label><label className="mt-4 block text-sm">Product<select className="field mt-2" value={productId} onChange={event => setProductId(event.target.value)}>{products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label><label className="mt-4 flex items-center gap-3 text-sm"><input type="checkbox" checked={enabled} onChange={event => setEnabled(event.target.checked)}/> Entitlement granted</label><button className="button mt-5" disabled={busy}>{busy ? "Saving…" : "Save entitlement"}</button>{notice && <p className="mt-3 text-sm text-violet-200" role="status">{notice}</p>}</form>;
}
