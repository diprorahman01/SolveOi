
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/layout/Container";

const plans = [
  {
    name: "Basic",
    description: "For individuals trying a focused AI workflow.",
    features: ["Single-user access", "Entry-level usage", "Essential workflow"],
  },
  {
    name: "Growth",
    description: "For businesses performing more frequent tasks.",
    features: ["Higher usage allowance", "Saved history", "Selected conveniences"],
  },
  {
    name: "Premium",
    description: "For higher-volume self-service needs.",
    features: ["Higher product limits", "Additional convenience", "Metered usage"],
  },
];

export default function PricingPreview() {
  return (
    <section className="bg-[#080B16] py-24 text-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
            Flexible Pricing
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Start with what you need.
          </h2>
          <p className="mt-5 text-white/60">
            Each AI solution will have product-specific plans and usage limits.
            Final pricing is being prepared.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-3xl border border-white/15 bg-white/[0.045] p-7"
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-4 min-h-14 text-sm leading-7 text-white/55">
                {plan.description}
              </p>

              <div className="my-7 border-t border-white/10" />

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-white/70">
                    <Check size={18} className="shrink-0 text-teal-300" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/45">
          Business and enterprise requirements will be quoted separately.
          Plans and allowances are subject to confirmation.
        </p>

        <div className="mt-7 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-white"
          >
            Explore pricing information <ArrowRight size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
