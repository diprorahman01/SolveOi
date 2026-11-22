import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Workflow,
  Layers3,
} from "lucide-react";

import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";
import SolutionDirectory from "@/components/site/SolutionDirectory";

export const metadata: Metadata = {
  title: "AI Solutions",
  description:
    "Explore SolveOi's AI product ecosystem and discover six focused solutions for real business workflows.",
};

export default function SolutionsPage() {
  return (
    <main className="bg-[#07050D] text-white">
      <PageHero
        eyebrow="SolveOi / AI Solutions"
        title="Intelligent tools. Real business impact."
        description="One platform, six focused AI solutions. Discover smarter ways to manage repetitive tasks, business information, customers and everyday operations."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-xl border border-violet-400/35 bg-violet-500/15 px-6 py-3.5 text-sm font-medium text-violet-100 transition hover:border-violet-300 hover:bg-violet-500/25"
          >
            Discuss your workflow
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
          >
            Contact Us
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      {/* intro band */}
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#090611] py-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[-20%] h-[260px] w-[260px] rounded-full bg-violet-700/10 blur-[100px]" />
          <div className="absolute right-[12%] bottom-[-25%] h-[260px] w-[260px] rounded-full bg-fuchsia-700/10 blur-[100px]" />
        </div>

        <Container className="relative">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Focused AI products",
                text: "Each solution is designed around a clear business use case.",
              },
              {
                icon: Workflow,
                title: "Workflow-first thinking",
                text: "The platform is planned to support real operational processes.",
              },
              {
                icon: Layers3,
                title: "Connected ecosystem",
                text: "Multiple products, one coherent SolveOi experience.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[24px] border border-white/[0.09] bg-white/[0.035] p-6 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-200">
                  <Icon size={20} />
                </div>

                <h2 className="mt-5 text-xl font-semibold tracking-tight">
                  {title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/45">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* directory */}
      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="pointer-events-none absolute left-[-12rem] top-[15%] h-[500px] w-[500px] rounded-full bg-violet-800/10 blur-[140px]" />
        <div className="pointer-events-none absolute right-[-12rem] bottom-[10%] h-[520px] w-[520px] rounded-full bg-fuchsia-800/10 blur-[140px]" />

        <Container className="relative">
          <div className="mb-14 max-w-3xl">
            <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-violet-300">
              <Sparkles size={15} />
              Our Product Ecosystem
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Explore the ecosystem.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/48">
              Explore the planned SolveOi product lineup and discover
              which solution best matches your business workflow.
            </p>
          </div>

          <SolutionDirectory />

          <p className="mt-10 text-center text-xs leading-6 text-white/30">
            All six initial AI products are currently in development.
            The website shows their planned positioning and experience direction.
          </p>
        </Container>
      </section>

      {/* bottom cta */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#10091B] py-24">
        <div className="pointer-events-none absolute left-1/2 top-[-130px] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[130px]" />

        <Container className="relative">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-violet-400/15 bg-[#171022]/65 px-8 py-16 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300">
              Ready to explore further?
            </p>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Build the future
              <br />
              with SolveOi.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/48">
              If you want a sharper product story, a more tailored solution
              path, or a clearer understanding of the ecosystem,
              let’s continue the conversation.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#120B1B] transition hover:bg-violet-100"
              >
                Request a Demo
                <ArrowUpRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
              >
                Contact SolveOi
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}