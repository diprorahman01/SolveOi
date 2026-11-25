"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Loader2,
  ShieldCheck,
} from "lucide-react";

type Billing = {
  plans: { code: string; title: string }[];
  subscription: { status: string; planCode: string };
  requests: {
    id: string;
    plan: string;
    status: string;
    createdAt: string;
  }[];
  checkoutAvailable: boolean;
  note: string;
};

export default function CommercialPanel() {
  const [data, setData] = useState<Billing | null>(null);
  const [selected, setSelected] = useState("starter");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function load() {
    const response = await fetch("/api/commercial", { cache: "no-store" });
    const json = (await response.json()) as Billing & { error?: string };
    if (!response.ok) throw new Error(json.error || "Failed to load billing");
    setData(json);
  }

  useEffect(() => {
    let active = true;

    fetch("/api/commercial", { cache: "no-store" })
      .then(async (response) => {
        const json = (await response.json()) as Billing & { error?: string };
        if (!response.ok) throw new Error(json.error || "Failed to load billing");
        return json;
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load billing");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const chosenPlan = data?.plans.some((plan) => plan.code === selected)
    ? selected
    : (data?.plans[0]?.code ?? "starter");

  async function submit() {
    if (loading || !data?.plans.length) return;

    setLoading(true);
    setError("");
    setInfo("");

    try {
      const response = await fetch("/api/commercial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: chosenPlan }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Request failed");

      setInfo(
        "Your plan interest was saved for manual review. No payment was collected and no subscription was activated."
      );
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative isolate overflow-hidden rounded-[28px] border border-[#E8BB9B] bg-gradient-to-br from-[#FFFCF8] via-[#FFF0E3] to-[#FFDCC7] p-5 text-[#54372E] shadow-[0_20px_60px_rgba(157,88,44,0.09)] sm:p-8 lg:p-9">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-32 -z-10 h-80 w-80 rounded-full bg-[#FFC89E]/45 blur-[85px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -left-28 -z-10 h-80 w-80 rounded-full bg-[#FFE8D0]/80 blur-[85px]" />

      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#A75B36]">
            <CreditCard size={15} aria-hidden="true" />
            Plans &amp; billing
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#4B3028] sm:text-[28px]">
            Commercial launch preparation
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#765344]">
            Review your current plan and submit an interest request for manual review.
            Pricing, invoices, gateway checkout and subscription activation are not yet live.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E9B992] bg-[#FFF7EB] px-4 py-2 text-xs font-semibold text-[#8C4A2E] shadow-sm">
          <ShieldCheck size={15} aria-hidden="true" />
          Manual review
        </div>
      </div>

      {!data && !error && (
        <div role="status" className="flex items-center gap-2 rounded-2xl border border-[#EBC3A9] bg-[#FFF9F3] p-5 text-sm text-[#7B523F]">
          <Loader2 size={17} className="animate-spin" aria-hidden="true" />
          Loading your billing information...
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="rounded-[22px] border border-[#F0CCB3] bg-gradient-to-r from-[#FFFDF9] via-[#FFF7EF] to-[#FFE8D6] p-5 shadow-[0_9px_25px_rgba(133,78,45,0.06)] sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#F1CFB9] bg-[#FFE7D1] text-[#A65C37]">
                <CreditCard size={21} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#95654E]">
                  Current subscription status
                </p>
                <p className="mt-2 text-xl font-bold capitalize tracking-tight text-[#4B3028]">
                  {data.subscription.status.replaceAll("_", " ")}
                </p>
                <p className="mt-1 text-sm text-[#85533A]">
                  Plan: <span className="font-semibold">{data.subscription.planCode}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#EDC4A6] bg-gradient-to-br from-[#FFF9F3] to-[#FFE9D7] p-5 sm:p-6">
            <label htmlFor="solveoi-plan-interest" className="block text-sm font-bold text-[#58382C]">
              Plan of interest
            </label>
            <p className="mt-1 text-xs leading-6 text-[#82604E]">
              Choose the plan you want the SolveOi team to review.
            </p>
            <div className="relative mt-3">
              <select
                id="solveoi-plan-interest"
                value={chosenPlan}
                onChange={(event) => setSelected(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-[#E6B594] bg-[#FFFEFC] px-4 pr-10 text-sm font-medium text-[#54372E] shadow-sm outline-none transition focus:border-[#CE8051] focus:ring-2 focus:ring-[#E5A274]/30 disabled:opacity-50"
                disabled={!data.plans.length || loading}
              >
                {data.plans.map((plan) => (
                  <option key={plan.code} value={plan.code} className="bg-[#FFFCF8] text-[#54372E]">
                    {plan.title}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#995B40]" />
            </div>

            <button
              type="button"
              disabled={loading || data.plans.length === 0}
              onClick={() => void submit()}
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D98A59] bg-gradient-to-r from-[#EFA46D] to-[#E88B59] px-5 py-3 text-sm font-bold text-[#422A22] shadow-[0_6px_18px_rgba(189,104,55,0.14)] transition hover:from-[#F7B37F] hover:to-[#EE9966] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A95D35] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}
              {loading ? "Saving…" : "Request plan review"}
            </button>
          </div>

          <div className="rounded-[22px] border border-[#EDC7AC] bg-gradient-to-br from-[#FFFDF9] to-[#FFF0E1] p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <ClipboardList size={19} className="text-[#AA6540]" aria-hidden="true" />
              <h3 className="text-lg font-bold text-[#4B3028]">Recent requests</h3>
            </div>
            {data.requests.length ? (
              <div className="mt-4 space-y-3">
                {data.requests.map((request) => (
                  <div key={request.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#F0D1BC] bg-[#FFFAF6] px-4 py-3 text-sm text-[#6A4536]">
                    <div>
                      <p className="font-semibold capitalize text-[#54372E]">{request.plan}</p>
                      <p className="mt-1 text-xs text-[#8B634F]">{new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="rounded-full border border-[#EFC4A4] bg-[#FFEAD7] px-3 py-1 text-xs font-semibold capitalize text-[#895035]">
                      {request.status.replaceAll("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-[#E9C9B4] bg-[#FFF8F0]/75 px-4 py-5 text-sm text-[#815E4D]">
                No plan requests yet.
              </p>
            )}
          </div>
        </div>
      )}

      {info && (
        <p role="status" className="mt-5 flex items-start gap-2 rounded-xl border border-[#B7D9B1] bg-[#F1FAEF] p-4 text-sm leading-6 text-[#386143]">
          <CheckCircle2 size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
          {info}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-[#EFB3A6] bg-[#FFF0EA] p-4 text-sm leading-6 text-[#973C2A]">
          <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </section>
  );
}
