import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";
import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Industries",
  description: "Discover SolveOi AI use cases for retail, agencies, finance, sales, HR and other growing businesses.",
};
const industries = [
  { title: "Retail & E-commerce", pain: "Answering repeated customer questions and handling support requests.", products: [["Respond", "respond"], ["Extract", "extract"]] },
  { title: "Agencies & Service Providers", pain: "Preparing quotations, tracking opportunities and following up with clients.", products: [["Quote", "quote"], ["Follow", "follow"], ["Collect", "collect"]] },
  { title: "Finance & Accounting", pain: "Repeated document entry and inconsistent invoice follow-ups.", products: [["Extract", "extract"], ["Collect", "collect"]] },
  { title: "B2B Sales", pain: "Missed leads, scattered sales notes and delayed follow-up messages.", products: [["Follow", "follow"], ["Quote", "quote"]] },
  { title: "Human Resources", pain: "Repeated policy questions and inconsistent access to company rules.", products: [["HR Desk", "hr-desk"]] },
  { title: "Importers & Operations", pain: "Manual document processing and repeated quotation preparation.", products: [["Extract", "extract"], ["Quote", "quote"]] },
] as const;

export default function IndustriesPage() {
  return <main>
    <PageHero eyebrow="Industries" title="Different businesses. Practical solutions."
      description="Explore the kinds of everyday business problems SolveOi is designed to address." />
    <section className="relative overflow-hidden bg-[#F6F8FB] py-24 text-[#101C30]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[#ffd4ae]/45 blur-[110px]" />
      <Container className="relative">
        <div className="grid gap-5 md:grid-cols-2">
          {industries.map((industry, index) => <article key={industry.title}
            className="group relative overflow-hidden rounded-3xl border border-[#efc5a7] bg-gradient-to-br from-[#fffdf8] via-[#fff0df] to-[#ffddc5] p-8 text-[#3b2621] shadow-[0_15px_36px_rgba(139,80,52,.09)] transition duration-300 hover:-translate-y-1 hover:border-[#e8a576] hover:shadow-[0_20px_46px_rgba(139,80,52,.14)]">
            <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full bg-[#ffc58f]/25 blur-[60px]" />
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#ecba8e] bg-gradient-to-br from-[#ffedd3] to-[#ffbd8b] text-[#9c4c2d] shadow-sm"><Building2 size={27} /></div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[.17em] text-[#aa5b3e]">Industry 0{index + 1}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#3d2720]">{industry.title}</h2>
              <p className="mt-4 leading-7 text-[#6b4b3e]">{industry.pain}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {industry.products.map(([label, slug]) => <Link key={slug} href={`/solutions/${slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e9b996] bg-gradient-to-r from-[#fff7eb] to-[#ffe0c3] px-4 py-2 text-sm font-semibold text-[#75432f] transition hover:border-[#d98759] hover:from-[#ffe7ce] hover:to-[#ffc999]">
                  {label}<ArrowUpRight size={15} />
                </Link>)}
              </div>
            </div>
          </article>)}
        </div>
        <div className="mt-12 text-center"><Link href="/demo" className="inline-flex rounded-full border border-[#df9c71] bg-gradient-to-r from-[#f1a36b] to-[#f7c18a] px-7 py-3 font-semibold text-[#41271e] shadow-[0_10px_30px_rgba(157,84,51,.13)] transition hover:brightness-105">Discuss your business workflow</Link></div>
      </Container>
    </section>
  </main>;
}
