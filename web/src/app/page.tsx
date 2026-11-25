
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
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
    description:
      "Find an AI product designed for the business problem you want to simplify.",
  },
  {
    number: "02",
    title: "Configure your workflow",
    description:
      "Provide approved business information, preferences, and documents.",
  },
  {
    number: "03",
    title: "Prepare a result",
    description:
      "Let the tool help prepare useful work from the information you provide.",
  },
  {
    number: "04",
    title: "Review and proceed",
    description:
      "Check important details and approve actions before they happen.",
  },
];

const industries = [
  {
    number: "01",
    title: "Retail & E-commerce",
    description:
      "Customer support and repetitive information requests.",
    product: "Respond",
    href: "/solutions/respond",
  },
  {
    number: "02",
    title: "Agencies & Services",
    description:
      "Quotations, sales conversations, and client follow-ups.",
    product: "Quote + Follow",
    href: "/solutions/quote",
  },
  {
    number: "03",
    title: "Finance & Operations",
    description:
      "Document processing and invoice follow-ups.",
    product: "Extract + Collect",
    href: "/solutions/extract",
  },
  {
    number: "04",
    title: "Growing Teams",
    description:
      "Employee questions and approved HR policies.",
    product: "HR Desk",
    href: "/solutions/hr-desk",
  },
];

const pricing = [
  {
    name: "Basic",
    description:
      "For individuals getting started with focused AI assistance.",
    featured: false,
  },
  {
    name: "Growth",
    description:
      "For businesses that need more frequent workflow support.",
    featured: true,
  },
  {
    name: "Premium",
    description:
      "For higher-volume usage and additional conveniences.",
    featured: false,
  },
];

const faqs = [
  {
    question: "What exactly is SolveOi?",
    answer:
      "SolveOi is an AI SaaS platform being developed around six business tools: Quote, Extract, Collect, Follow, Respond, and HR Desk.",
  },
  {
    question: "Are the AI tools available now?",
    answer:
      "The initial products are undergoing development and testing. Public availability will be announced after release approval.",
  },
  {
    question: "Do I need to purchase every product?",
    answer:
      "The planned subscription model will allow customers to choose individual products based on their business needs.",
  },
  {
    question: "Will AI perform tasks automatically?",
    answer:
      "Some workflows will assist with preparation and processing. Important actions will require appropriate validation and human approval.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF8EE] text-[#332116]">
      {/* HERO */}
      <Hero />

      {/* PRODUCT ECOSYSTEM */}
      <ProductShowcase />

      {/* OUR PHILOSOPHY */}
      <section className="relative overflow-hidden border-t border-[#DFBD9B] bg-gradient-to-b from-[#F0D8BE] via-[#F8E8D5] to-[#FFF8EE] py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#E5A15A]/15 blur-[120px]"
        />

        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D8A477] bg-[#FFF7EC] px-4 py-2 text-xs font-semibold text-[#99431A]">
              <Sparkles size={14} />
              Our Philosophy
            </span>

            <h2 className="mt-8 text-4xl font-semibold leading-[1.1] tracking-[-0.06em] text-[#332116] sm:text-6xl lg:text-7xl">
              The future of work
              <br />
              <span className="solveoi-gradient-text">
                should feel effortless.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#765740] sm:text-lg">
              Growing businesses deserve intelligent tools
              without the complexity of large enterprise
              systems. SolveOi focuses on practical
              solutions that make everyday work simpler.
            </p>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Focused Solutions",
                  text: "Solve specific business challenges.",
                },
                {
                  number: "02",
                  title: "Connected Experience",
                  text: "One workspace for multiple products.",
                },
                {
                  number: "03",
                  title: "Human Control",
                  text: "Review important results and actions.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="rounded-2xl border border-[#DEB68F] bg-[#FFF9F1] p-7 text-left shadow-[0_14px_36px_rgba(105,56,20,.07)]"
                >
                  <p className="text-xs font-bold text-[#B2541E]">
                    {item.number}
                  </p>

                  <h3 className="mt-8 text-lg font-semibold text-[#332116]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#80614B]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* HOW SOLVEOI WORKS */}
      <section className="bg-[#FFF8EE] py-24 lg:py-32">
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A74B1D]">
                Simple by Design
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-0.055em] text-[#332116] sm:text-6xl">
                Less busywork.
                <br />
                <span className="solveoi-gradient-text">
                  More progress.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-base leading-8 text-[#75543E]">
              Give the tools the right context, prepare
              useful work, and keep people responsible
              for important decisions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group rounded-[24px] border border-[#E0BE9C] bg-gradient-to-br from-white to-[#F5E2CC] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(111,57,24,.12)]"
              >
                <span className="text-xs font-bold text-[#AD501E]">
                  {step.number} /
                </span>

                <div className="mt-12 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9B17B] text-[#873714]">
                  <Workflow size={22} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#332116]">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#795B45]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WORKFLOW PREVIEW */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0D9BF] via-[#F6E6D3] to-[#F8EFE3] py-24 lg:py-32">
        <Container>
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A64B1D]">
              Designed for Real Workflows
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-[#332116] sm:text-6xl">
              See intelligence
              <br />
              <span className="solveoi-gradient-text">
                take shape.
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-[#785842]">
              An illustrative example of how SolveOi Quote
              can help prepare a customer quotation for review.
            </p>
          </div>

          <div className="grid gap-5 rounded-[30px] border border-[#D6A77D] bg-[#F0D8BF] p-5 shadow-[0_24px_65px_rgba(108,56,23,.1)] lg:grid-cols-[1fr_64px_1fr] lg:items-center lg:p-8">
            {/* INPUT */}
            <div className="rounded-2xl border border-[#E4C3A2] bg-[#FFFAF3] p-6">
              <div className="flex items-center gap-3 border-b border-[#EAD2B8] pb-4">
                <FileText
                  size={19}
                  className="text-[#A64B1D]"
                />

                <h3 className="text-sm font-semibold text-[#332116]">
                  Customer Request
                </h3>
              </div>

              <p className="mt-6 text-sm leading-8 text-[#684B36]">
                &ldquo;We need a quotation for six office
                chairs and two work desks for our
                new office.&rdquo;
              </p>

              <span className="mt-8 inline-flex rounded-full bg-[#F4DEC4] px-3 py-1.5 text-xs font-medium text-[#9C4D20]">
                Unstructured request
              </span>
            </div>

            {/* DIRECTION */}
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#BF581F] to-[#EB9A42] text-white shadow-[0_10px_28px_rgba(157,75,25,.2)]">
                <ArrowRight size={23} />
              </div>
            </div>

            {/* OUTPUT */}
            <div className="rounded-2xl border border-[#E4C3A2] bg-[#FFFAF3] p-6">
              <div className="flex items-center gap-3 border-b border-[#EAD2B8] pb-4">
                <CheckCircle2
                  size={19}
                  className="text-[#A64B1D]"
                />

                <h3 className="text-sm font-semibold text-[#332116]">
                  Reviewed Quotation
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#765844]">
                    Office chairs
                  </span>
                  <span className="font-semibold text-[#332116]">
                    6 units
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#765844]">
                    Work desks
                  </span>
                  <span className="font-semibold text-[#332116]">
                    2 units
                  </span>
                </div>

                <p className="border-t border-[#E8D1B7] pt-4 text-xs leading-6 text-[#84664F]">
                  Prices require validation against an
                  approved business catalog.
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F8E2C9] px-3 py-1.5 text-xs font-semibold text-[#9E471A]">
                <CheckCircle2 size={14} />
                Human review before export
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-[#866A52]">
            Illustrative workflow preview.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/solutions/quote"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#A4491A] transition hover:text-[#D86F29]"
            >
              Explore SolveOi Quote
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[#FFF9F1] py-24 lg:py-32">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A94B1B]">
                Built for Growing Teams
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#332116] sm:text-6xl">
                Intelligence for
                <br />
                <span className="solveoi-gradient-text">
                  every kind of work.
                </span>
              </h2>
            </div>

            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#A84B1B]"
            >
              Explore industries
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {industries.map((industry) => (
              <Link
                key={industry.title}
                href={industry.href}
                className="group flex min-h-[220px] flex-col justify-between rounded-[24px] border border-[#E1BE9B] bg-gradient-to-br from-white to-[#F4E2CC] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(107,55,23,.12)]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-[#AE521E]">
                    {industry.number}
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="text-[#B26C3A] transition group-hover:text-[#9D4118]"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-[#332116]">
                    {industry.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#765640]">
                    {industry.description}
                  </p>

                  <p className="mt-5 text-xs font-bold text-[#A64B1D]">
                    {industry.product}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* PRICING */}
      <section className="border-y border-[#E0BE9D] bg-[#F0DDC6] py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A5491B]">
              Flexible Plans
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#332116] sm:text-6xl">
              Start where you are.
              <br />
              <span className="solveoi-gradient-text">
                Scale as you grow.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-[#75533E]">
              Our proposed subscription model lets
              businesses choose individual tools with
              suitable usage allowances.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[26px] border p-8 ${
                  plan.featured
                    ? "border-[#C67C43] bg-[#FFF2E1] shadow-[0_20px_55px_rgba(143,64,19,.13)]"
                    : "border-[#DFBE9D] bg-[#FFFAF3]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-[#332116]">
                    {plan.name}
                  </h3>

                  {plan.featured && (
                    <Sparkles
                      size={20}
                      className="text-[#B6531C]"
                    />
                  )}
                </div>

                <p className="mt-5 min-h-20 text-sm leading-7 text-[#765640]">
                  {plan.description}
                </p>

                <div className="my-8 border-t border-[#E4C7A9]" />

                <p className="text-xs font-semibold text-[#A04D20]">
                  Pricing to be confirmed
                </p>

                <Link
                  href="/pricing"
                  className="mt-8 flex items-center justify-between rounded-xl border border-[#D8AB85] bg-white px-5 py-3 text-sm font-semibold text-[#8F431B] transition hover:bg-[#F9E4CB]"
                >
                  Explore plan
                  <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFF8EE] py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A64B1D]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#332116] sm:text-5xl">
                A little more clarity.
              </h2>
            </div>

            <div className="mt-12 space-y-3">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-[#E0C09F] bg-[#FFFDF8] p-6 shadow-[0_8px_28px_rgba(100,50,22,.04)]"
                >
                  <summary className="cursor-pointer font-semibold text-[#3E291B]">
                    {item.question}
                  </summary>

                  <p className="mt-4 text-sm leading-8 text-[#765640]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="relative overflow-hidden border-t border-[#A96435] bg-gradient-to-br from-[#7D3B1E] via-[#A14D20] to-[#BC682C] py-24 text-[#FFF1DC] lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[#F5AD56]/15 blur-[140px]"
        />

        <Container className="relative text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFCE95]/35 bg-[#F7BA73]/15 px-4 py-2 text-xs font-semibold text-[#FFD5A2]">
            <Layers3 size={15} />
            Intelligence That Solves
          </span>

          <h2 className="mx-auto mt-8 max-w-5xl text-5xl font-semibold leading-[1.08] tracking-[-0.06em] text-[#FFF1DC] sm:text-7xl">
            Your next chapter
            <br />
            <span className="text-[#FFD29B]">
              starts with a solution.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#F4DDC4]">
            Explore the SolveOi product roadmap and
            discover how intelligent workflows could
            help your business.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FFF5E6] px-7 py-3.5 text-sm font-bold text-[#743417] transition hover:bg-white"
            >
              Explore Solutions
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[#F7C18A]/50 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Contact Us
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
