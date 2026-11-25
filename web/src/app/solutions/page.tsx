import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Workflow, Layers3 } from "lucide-react";
import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";
import SolutionDirectory from "@/components/site/SolutionDirectory";

export const metadata: Metadata = {
  title: "AI Solutions",
  description: "Explore SolveOi's AI product ecosystem and discover six focused solutions for real business workflows.",
};

const strengths = [
  { icon: Sparkles, title: "Focused AI products", text: "Each solution is designed around a clear business use case." },
  { icon: Workflow, title: "Workflow-first thinking", text: "The platform is planned to support real operational processes." },
  { icon: Layers3, title: "Connected ecosystem", text: "Multiple products, one coherent SolveOi experience." },
];

export default function SolutionsPage() {
  return (
    <main className="bg-gradient-to-br from-[#54352b] via-[#694031] to-[#392b2a] text-[#62483c]">
      <PageHero
        eyebrow="SolveOi / AI Solutions"
        title="Intelligent tools. Real business impact."
        description="One platform, six focused AI solutions. Discover smarter ways to manage repetitive tasks, business information, customers and everyday operations."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/demo" className="inline-flex items-center gap-2 rounded-xl border border-[#ffd1a4]/50 bg-gradient-to-r from-[#ffe0b8] to-[#ffb981] px-6 py-3.5 text-sm font-bold text-[#43291f] shadow-[0_10px_28px_rgba(65,34,26,.14)] transition hover:brightness-105">
            Discuss your workflow <ArrowUpRight size={16} aria-hidden />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-[#ffdaa9]/35 bg-[#ffe0be]/10 px-6 py-3.5 text-sm font-semibold text-[#62483c] transition hover:bg-[#ffe0be]/20">
            Contact Us <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </PageHero>

      <section className="relative overflow-hidden border-b border-[#ffd2a8]/20 bg-gradient-to-br from-[#5d3a2e] via-[#654031] to-[#392b29] py-16">
        <div aria-hidden className="pointer-events-none absolute left-[10%] top-[-45%] h-64 w-64 rounded-full bg-[#ffd5a7]/18 blur-[90px]" />
        <Container className="relative">
          <div className="grid gap-5 md:grid-cols-3">
            {strengths.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[26px] border border-[#ffdbb4]/27 bg-gradient-to-br from-[#9b644b]/54 via-[#76503d]/50 to-[#49342d]/80 p-7 shadow-[0_15px_34px_rgba(55,29,25,.10)] backdrop-blur-md transition hover:-translate-y-1 hover:border-[#ffd4a1]/45">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ffdbb8]/35 bg-gradient-to-br from-[#ffe0b3]/23 to-[#f3a36d]/16 text-[#985334]"><Icon size={20} aria-hidden /></div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight text-[#62483c]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#62483c]">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#52352b] via-[#664132] to-[#372b29] py-24 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute -left-56 top-28 h-[480px] w-[480px] rounded-full bg-[#ffbe83]/13 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -right-60 bottom-0 h-[500px] w-[500px] rounded-full bg-[#ffd8ae]/11 blur-[140px]" />
        <Container className="relative">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#985334]"><Sparkles size={15} aria-hidden /> Our Product Ecosystem</p>
            <h2 className="text-4xl font-semibold tracking-[-.05em] text-[#62483c] sm:text-6xl">Explore the ecosystem.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#62483c]">Explore the planned SolveOi product lineup and discover which solution best matches your business workflow.</p>
          </div>
          <SolutionDirectory />
          <p className="mt-10 text-center text-xs leading-6 text-[#62483c]">All six initial AI products are currently in development. The website shows their planned positioning and experience direction.</p>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-[#ffd5b0]/20 bg-gradient-to-br from-[#684233] via-[#5d3b32] to-[#382a29] py-24">
        <Container className="relative">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[34px] border border-[#ffdbb1]/30 bg-gradient-to-br from-[#996148]/75 via-[#704937]/85 to-[#47322d] px-8 py-16 text-center shadow-[0_24px_70px_rgba(49,28,25,.17)] backdrop-blur-md sm:px-12">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#985334]">Ready to explore further?</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-.05em] text-[#62483c] sm:text-6xl">Build the future<br /><span className="solveoi-gradient-text">with SolveOi.</span></h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#62483c]">If you want a sharper product story, a more tailored solution path, or a clearer understanding of the ecosystem, let’s continue the conversation.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/demo" className="inline-flex items-center gap-2 rounded-xl border border-[#ffd4a0]/55 bg-gradient-to-r from-[#ffe1b7] to-[#ffb984] px-6 py-3.5 text-sm font-bold text-[#42271e] transition hover:brightness-105">Request a Demo <ArrowUpRight size={17} aria-hidden /></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-[#ffdaa9]/40 bg-[#ffe3bd]/10 px-6 py-3.5 text-sm font-semibold text-[#62483c] transition hover:bg-[#ffe3bd]/20">Contact SolveOi <ArrowUpRight size={17} aria-hidden /></Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
