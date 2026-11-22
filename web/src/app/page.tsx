
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Layers3,
  Sparkles,
  Workflow,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Hero from "@/components/home/Hero";
import ProductShowcase from "@/components/home/ProductShowcase";


const steps = [
  {
    number: "01",
    title: "Choose a solution",
    text: "Find an AI product designed for the exact business problem you want to simplify.",
  },
  {
    number: "02",
    title: "Configure your workflow",
    text: "Provide approved business information, preferences and documents.",
  },
  {
    number: "03",
    title: "Generate a result",
    text: "Let the AI help prepare a useful output from the information you've supplied.",
  },
  {
    number: "04",
    title: "Review and proceed",
    text: "Check important details and approve consequential actions before they happen.",
  },
];

const industries = [
  {
    title: "Retail & E-commerce",
    text: "Customer support and repetitive information requests.",
    product: "Respond",
    href: "/solutions/respond",
  },
  {
    title: "Agencies & Services",
    text: "Quotations, sales conversations and client follow-ups.",
    product: "Quote + Follow",
    href: "/solutions/quote",
  },
  {
    title: "Finance & Operations",
    text: "Document processing and invoice follow-ups.",
    product: "Extract + Collect",
    href: "/solutions/extract",
  },
  {
    title: "Growing Teams",
    text: "Employee questions and approved HR policies.",
    product: "HR Desk",
    href: "/solutions/hr-desk",
  },
];

const pricing = [
  {
    name: "Basic",
    text: "For individuals getting started with focused AI assistance.",
  },
  {
    name: "Growth",
    text: "For businesses needing more frequent workflow support.",
  },
  {
    name: "Premium",
    text: "For higher-volume AI usage and additional conveniences.",
  },
];

const faqs = [
  {
    question: "What exactly is SolveOi?",
    answer:
      "SolveOi is a planned AI SaaS platform offering six focused tools for everyday business tasks: Quote, Extract, Collect, Follow, Respond and HR Desk.",
  },
  {
    question: "Are the AI tools available now?",
    answer:
      "The six initial products are currently in development. Availability will be announced when each tool has completed testing and release approval.",
  },
  {
    question: "Will I have to purchase every product?",
    answer:
      "No. SolveOi's proposed subscription model allows customers to choose individual products based on their needs.",
  },
  {
    question: "Will the AI perform tasks automatically?",
    answer:
      "Some workflows will assist with preparation and processing, while consequential actions will require appropriate validation and human approval.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#08060E] text-white">
      {/* 1 — Cinematic landing hero */}
      <Hero />

      {/* 2 — Six AI products */}
      <ProductShowcase />

      {/* 3 — Giant brand statement */}
      <section className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#0C0715] py-28 sm:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-18 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(6rem,17vw,17rem)] font-bold tracking-[-0.09em] text-violet-200/[0.045]"
        >
          INTELLIGENCE
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[150px]"
        />

        <Container className="relative">
          <div className="mx-auto max-w-4xl pt-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/10 px-4 py-2 text-xs text-violet-200">
              <Sparkles size={14} />
              Our philosophy
            </span>

            <h2 className="mt-8 text-5xl leading-[1.08] font-semibold tracking-[-0.06em] sm:text-7xl">
              The future of work
              <br />
              <span className="solveoi-gradient-text">
                should feel effortless.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
              Growing businesses deserve useful, intelligent tools
              without the complexity of large enterprise systems.
              SolveOi focuses on making practical workflows simpler.
            </p>

            <div className="relative mx-auto mt-16 grid max-w-4xl gap-4 md:grid-cols-3">
              {[
                ["01", "Focused solutions", "Solve a specific business problem."],
                ["02", "Connected experience", "One planned workspace for multiple products."],
                ["03", "Human control", "Review important results and actions."],
              ].map(([number, title, text]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-violet-300/[0.12] bg-[#1B122A]/60 p-7 text-left backdrop-blur-md"
                >
                  <p className="text-xs font-medium text-violet-300">
                    {number}
                  </p>

                  <h3 className="mt-8 text-lg font-semibold">{title}</h3>

                  <p className="mt-3 text-sm leading-7 text-white/40">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4 — How it works */}
      <section className="relative overflow-hidden bg-[#09060F] py-24 lg:py-32">
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
                Simple by design
              </p>

              <h2 className="mt-5 text-4xl leading-[1.1] font-semibold tracking-[-0.055em] sm:text-6xl">
                Less busywork.
                <br />
                <span className="text-white/35">
                  More progress.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-base leading-8 text-white/45">
              Our planned products share a clear philosophy:
              give the AI the right context, prepare useful work,
              and let people review the important decisions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative overflow-hidden rounded-[24px] border border-white/[0.09] bg-[#15101F] p-7"
              >
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-28 w-28 rounded-full bg-violet-500/10 blur-[50px]"
                />

                <span className="text-xs font-medium text-violet-300">
                  {step.number} /
                </span>

                <div className="mt-12 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-200">
                  <Workflow size={21} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/45">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5 — Workflow showcase */}
      <section className="solveoi-ambient relative overflow-hidden py-24 lg:py-32">
        <Container>
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
              Designed for real workflows
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              See intelligence
              <br />
              <span className="text-white/40">
                take shape.
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-white/50">
              A conceptual example of how SolveOi Quote could turn
              a customer request into a reviewed quotation.
            </p>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-violet-400/[0.16] bg-[#120C1C]/85 p-4 shadow-[0_35px_100px_rgba(70,20,120,0.2)] lg:grid-cols-[1fr_80px_1fr] lg:items-center lg:p-8">
            {/* Input panel */}
            <div className="rounded-2xl border border-white/10 bg-[#181221] p-6">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <FileText size={18} className="text-violet-300" />
                <span className="text-sm font-semibold">
                  Customer Request
                </span>
              </div>

              <p className="mt-6 text-sm leading-8 text-white/70">
                &ldquo;We need a quotation for six office chairs
                and two work desks for our new office.&rdquo;
              </p>

              <div className="mt-10 flex gap-2">
                <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-200">
                  Unstructured request
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/25 bg-violet-500/15 text-violet-200 shadow-[0_0_40px_rgba(158,80,255,0.18)]">
                <ArrowRight size={23} />
              </div>
            </div>

            {/* Output panel */}
            <div className="rounded-2xl border border-white/10 bg-[#181221] p-6">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <CheckCircle2 size={18} className="text-violet-300" />
                <span className="text-sm font-semibold">
                  Reviewed Quotation
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-white/55">Office chairs</span>
                  <span className="text-white">6 units</span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-white/55">Work desks</span>
                  <span className="text-white">2 units</span>
                </div>

                <div className="my-4 border-t border-white/10" />

                <p className="text-xs text-white/40">
                  Prices verified against the approved catalog
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-400/10 px-3 py-1.5 text-xs text-violet-200">
                <Check size={13} />
                Human review before export
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-white/30">
            Illustrative design preview — not a functioning quotation generator yet.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/solutions/quote"
              className="inline-flex items-center gap-2 text-sm font-medium text-violet-200 hover:text-white"
            >
              Explore SolveOi Quote
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </Container>
      </section>

      {/* 6 — Industries */}
      <section className="bg-[#09060F] py-24 lg:py-32">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
                Built for growing teams
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Intelligence for
                <br />
                every kind of work.
              </h2>
            </div>

            <Link
              href="/industries"
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-violet-200"
            >
              Explore industries <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {industries.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-[220px] flex-col justify-between rounded-[24px] border border-white/[0.085] bg-[#15101E] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold text-violet-300/70">
                    0{index + 1}
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="text-white/30 transition group-hover:text-violet-200"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/45">
                    {item.text}
                  </p>

                  <p className="mt-5 text-xs font-medium text-violet-300">
                    {item.product}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 7 — Pricing preview */}
      <section className="solveoi-ambient border-y border-white/[0.06] py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
              Flexible plans
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Start where you are.
              <br />
              <span className="text-white/40">Scale as you grow.</span>
            </h2>

            <p className="mt-6 leading-8 text-white/50">
              Our proposed subscription model lets businesses choose
              individual AI tools with appropriate usage allowances.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {pricing.map((plan, index) => (
              <div
                key={plan.name}
                className={`rounded-[26px] border p-8 ${
                  index === 1
                    ? "border-violet-400/35 bg-violet-500/[0.09] shadow-[0_0_65px_rgba(126,55,209,0.12)]"
                    : "border-white/[0.09] bg-[#15101F]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>

                  {index === 1 && (
                    <Sparkles size={20} className="text-violet-300" />
                  )}
                </div>

                <p className="mt-5 min-h-20 text-sm leading-7 text-white/45">
                  {plan.text}
                </p>

                <div className="my-8 border-t border-white/10" />

                <p className="text-xs text-violet-200">
                  Pricing to be confirmed
                </p>

                <Link
                  href="/pricing"
                  className="mt-8 flex items-center justify-between rounded-xl border border-white/15 px-5 py-3 text-sm font-medium transition hover:bg-white/[0.06]"
                >
                  Explore plan
                  <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8 — FAQ */}
      <section className="bg-[#09060F] py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
                FAQs
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                A little more clarity.
              </h2>
            </div>

            <div className="mt-12 space-y-3">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-white/[0.09] bg-[#15101F] p-6"
                >
                  <summary className="cursor-pointer font-medium text-white/85">
                    {item.question}
                  </summary>

                  <p className="mt-4 text-sm leading-8 text-white/45">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 9 — Final cinematic call to action */}
      <section className="relative overflow-hidden border-t border-white/[0.07] bg-[#10091C] py-24 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-[-300px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[140px]" />

        <Container className="relative text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs text-violet-200">
            <Layers3 size={15} />
            Intelligence That Solves
          </span>

          <h2 className="mx-auto mt-8 max-w-5xl text-5xl leading-[1.06] font-semibold tracking-[-0.06em] sm:text-7xl">
            Your next chapter
            <br />
            <span className="solveoi-gradient-text">
              starts with a solution.
            </span>
          </h2>

          
<p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/50">
  Explore the SolveOi AI product roadmap and discover
  how intelligent workflows could help your business.
</p>


          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#130B1E] hover:bg-violet-100"
            >
              Explore Solutions <ArrowRight size={17} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-7 py-3.5 text-sm font-medium text-white/85 hover:bg-white/10"
            >
              Contact Us <ArrowUpRight size={17} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
