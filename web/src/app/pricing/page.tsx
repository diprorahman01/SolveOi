
import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, CircleHelp } from "lucide-react";

import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore the planned SolveOi subscription structure, product-specific usage allowances and business packages.",
};

// Subscription plans
const plans = [
  {
    name: "Basic",
    description:
      "For one person getting started with a focused AI workflow.",
    features: [
      "Single-user access",
      "Low monthly usage allowance",
      "Essential product workflow",
    ],
  },
  {
    name: "Growth",
    description:
      "For businesses that need more frequent AI assistance.",
    features: [
      "Increased usage allowances",
      "Saved task history",
      "Selected productivity features",
    ],
  },
  {
    name: "Premium",
    description:
      "For higher-volume self-service business needs.",
    features: [
      "Higher monthly product limits",
      "Additional convenience features",
      "Metered AI usage",
    ],
  },
  {
    name: "Business",
    description:
      "For teams with additional operational requirements.",
    features: [
      "Team roles and permissions",
      "Potential external integrations",
      "Custom support arrangements",
      "Custom usage limits",
    ],
  },
];

// Pricing FAQs
const pricingFAQs = [
  {
    question: "Do I need to purchase every AI product?",
    answer:
      "No. SolveOi's proposed subscription model allows businesses to choose individual AI products based on their requirements. You will not need to purchase the entire product collection.",
  },
  {
    question: "Are the subscription prices finalized?",
    answer:
      "Not yet. The initial pricing ideas are being evaluated. Final prices, payment options and usage allowances will be confirmed before commercial launch.",
  },
  {
    question: "Will unlimited AI processing be included?",
    answer:
      "No. Each product will have defined usage allowances because document processing, customer conversations and other AI operations have different operating costs.",
  },
  {
    question: "Can businesses request a custom package?",
    answer:
      "Yes. Businesses with team requirements, integration needs or higher usage expectations can contact SolveOi to discuss a suitable package.",
  },
  {
    question: "Can I subscribe to more than one product?",
    answer:
      "The planned platform will support multiple products under one business workspace. Each product will have its own subscription access and usage allowances.",
  },
  {
    question: "Can I upgrade or cancel my subscription?",
    answer:
      "Plan changes and cancellation are part of the planned billing system. The exact rules, billing periods and renewal options will be published before subscriptions become available.",
  },
];

export default function PricingPage() {
  return (
    <main>
      {/* ========================================
          SECTION 1 — PRICING HERO
      ======================================== */}

      <PageHero
        eyebrow="Plans & Pricing"
        title="Focused solutions. Flexible plans."
        description="Choose the AI products that match your business needs. Pricing, allowances and purchasing options will be finalized after product testing."
      />

      {/* ========================================
          SECTION 2 — SUBSCRIPTION PLANS
      ======================================== */}

      <section className="bg-[#F6F8FB] py-24 text-[#101C30]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#008F88]">
              Choose Your Plan
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Start small. Grow with confidence.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              SolveOi is designed to provide flexible subscription
              options based on your workflow, team size and usage needs.
            </p>
          </div>

          {/* Subscription cards */}

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#008F88]/40 hover:shadow-xl"
              >
                <h3 className="text-2xl font-semibold">
                  {plan.name}
                </h3>

                <p className="mt-4 min-h-20 text-sm leading-7 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#008F88]">
                    Pricing to be confirmed
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Product-specific subscription
                  </p>
                </div>

                <div className="my-7 border-t border-slate-200" />

                <h4 className="mb-5 text-sm font-semibold">
                  Planned features
                </h4>

                <ul className="flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                    >
                      <Check
                        size={18}
                        className="mt-1 shrink-0 text-[#008F88]"
                        aria-hidden="true"
                      />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/demo"
                  className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#101C30] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008F88]"
                >
                  Ask about plans
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm leading-7 text-slate-500">
            Final prices and allowances are not yet published.
            Business and enterprise packages will be quoted separately.
          </p>

          {/* ========================================
              SECTION 3 — PRICING FAQs
              STEP 36 UPDATE
          ======================================== */}

          <div className="mx-auto mt-24 max-w-3xl">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#008F88]/10">
                <CircleHelp
                  size={27}
                  className="text-[#008F88]"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#008F88]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Pricing questions
              </h2>

              
<p className="mt-5 text-slate-600">
  Learn more about the proposed SolveOi subscription model.
</p>

            </div>

            <div className="mt-10 space-y-4">
              {pricingFAQs.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#008F88]/30"
                >
                  <summary className="cursor-pointer text-base font-semibold text-[#101C30]">
                    {item.question}
                  </summary>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* ========================================
              SECTION 4 — HOW BILLING WORKS
          ======================================== */}

          <div className="mt-20 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#008F88]">
                Subscription Model
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                How billing is planned
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                SolveOi is being designed around a flexible
                subscription system that allows businesses to
                access individual AI products.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-[#F6F8FB] p-6">
                <span className="text-sm font-bold text-[#008F88]">
                  01
                </span>

                <h3 className="mt-5 text-lg font-semibold">
                  Per-product plans
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Customers can choose the individual SolveOi
                  products that suit their business needs.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F6F8FB] p-6">
                <span className="text-sm font-bold text-[#008F88]">
                  02
                </span>

                <h3 className="mt-5 text-lg font-semibold">
                  Defined usage limits
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Every AI product will have its own monthly
                  usage allowances and restrictions.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F6F8FB] p-6">
                <span className="text-sm font-bold text-[#008F88]">
                  03
                </span>

                <h3 className="mt-5 text-lg font-semibold">
                  Business packages
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Growing teams can discuss custom requirements,
                  integrations and additional usage needs.
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs leading-6 text-slate-500">
              Subscription checkout is not active during the
              public website milestone. Billing, verified payments
              and subscription management will be developed
              and tested in later milestones.
            </p>
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 5 — FINAL PRICING CTA
      ======================================== */}

      <section className="relative overflow-hidden bg-[#080B16] py-24 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]"
        />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Find the right solution for your business.
            </h2>

            
<p className="mt-5 text-slate-600">
  Learn more about the proposed SolveOi subscription model.
</p>


            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-[#101C30] transition hover:bg-teal-100"
              >
                Explore Solutions
                <ArrowRight size={17} aria-hidden="true" />
              </Link>

              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Contact SolveOi
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
