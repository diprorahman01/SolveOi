"use client";
import { useEffect, useState } from "react";
type Billing = { plans: { code: string; title: string }[]; subscription: { status: string; planCode: string }; requests: { id: string; plan: string; status: string; createdAt: string }[]; checkoutAvailable: boolean; note: string };
export default function CommercialPanel() {
  const [data, setData] = useState<Billing | null>(null);
  const [selected, setSelected] = useState("starter");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  async function load() {
    const response = await fetch("/api/commercial", { cache: "no-store" });
    const json = await response.json();
    if (!response.ok) throw new Error(json.error || "Failed to load billing");
    setData(json);
  }
  useEffect(() => {
    let active = true;

    fetch("/api/commercial", { cache: "no-store" })
      .then(async (response) => {
        const json = (await response.json()) as Billing & { error?: string };
        if (!response.ok) {
          throw new Error(json.error || "Failed to load billing");
        }
        return json;
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load");
        }
      });

    return () => {
      active = false;
    };
  }, []);
  async function submit() {
    setLoading(true); setError(""); setInfo("");
    try {
      const response = await fetch("/api/commercial", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: selected }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Request failed");
      setInfo("Your plan interest was saved for manual review. No payment was collected and no subscription was activated.");
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Request failed"); } finally { setLoading(false); }
  }
  return <section className="space-y-5 rounded-3xl border border-violet-400/20 bg-[#191124] p-6 sm:p-8"><h2 className="text-xl font-bold">Commercial launch preparation</h2><p className="text-sm leading-7 text-white/60">This is a plan-request workflow, NOT a live payment system. Pricing, invoices, gateway checkout and verified subscription activation remain disabled until configured and tested.</p>{data && <><div className="rounded-2xl border border-white/10 p-4"><p className="text-sm text-white/55">Current subscription status</p><p className="mt-1 text-xl font-semibold">{data.subscription.status.replaceAll("_", " ")}</p><p className="mt-1 text-xs text-violet-200">Plan: {data.subscription.planCode}</p></div><label className="block text-sm">Plan of interest<select value={selected} onChange={e => setSelected(e.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-[#100b19] p-3">{data.plans.map(x => <option key={x.code} value={x.code}>{x.title}</option>)}</select></label><button type="button" disabled={loading} onClick={() => void submit()} className="rounded-xl bg-violet-200 px-5 py-3 text-sm font-bold text-[#170c26] disabled:opacity-50">{loading ? "Saving…" : "Request plan review"}</button><h3 className="pt-4 font-semibold">Recent requests</h3>{data.requests.length ? <div className="space-y-2">{data.requests.map(x => <div className="rounded-xl border border-white/10 p-3 text-sm" key={x.id}>{x.plan} · {x.status.replaceAll("_", " ")} · {new Date(x.createdAt).toLocaleDateString()}</div>)}</div> : <p className="text-sm text-white/50">No plan requests yet.</p>}</>}{info && <p role="status" className="text-sm text-violet-200">{info}</p>}{error && <p role="alert" className="text-sm text-red-300">{error}</p>}</section>;
}
