import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/layout/Container";

const plans = [
  { name: "Basic", description: "For individuals trying a focused AI workflow.", features: ["Single-user access", "Entry-level usage", "Essential workflow"] },
  { name: "Growth", description: "For businesses performing more frequent tasks.", features: ["Higher usage allowance", "Saved history", "Selected conveniences"] },
  { name: "Premium", description: "For higher-volume self-service needs.", features: ["Higher product limits", "Additional convenience", "Metered usage"] },
];

export default function PricingPreview() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5f382c] via-[#6e4334] to-[#3b2928] py-24 text-[#62483c]">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#ffc28e]/20 blur-[110px]" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#985334]">Flexible Pricing</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[#62483c] sm:text-5xl">Start with what you need.</h2>
          <p className="mt-5 leading-7 text-[#62483c]">Each AI solution will have product-specific plans and usage limits. Final pricing is being prepared.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-[26px] border border-[#ffcea0]/30 bg-gradient-to-br from-[#87513d] via-[#684438] to-[#47332f] p-7 text-[#62483c] shadow-[0_20px_46px_rgba(42,24,24,.13)] transition hover:-translate-y-1 hover:border-[#ffd8aa]/55">
              <h3 className="text-2xl font-semibold text-[#62483c]">{plan.name}</h3>
              <p className="mt-4 min-h-14 text-sm leading-7 text-[#62483c]">{plan.description}</p>
              <div className="my-7 border-t border-[#ffdfbd]/20" />
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6 text-[#62483c]">
                    <Check size={18} className="shrink-0 text-[#985334]" />{feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm leading-7 text-[#62483c]">Business and enterprise requirements will be quoted separately. Plans and allowances are subject to confirmation.</p>
        <div className="mt-7 text-center">
          <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-[#ffd3a8]/35 bg-[#ffba80]/10 px-5 py-3 text-sm font-semibold text-[#62483c] transition hover:bg-[#ffba80]/20 hover:text-white">
            Explore pricing information <ArrowRight size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
