
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
  {
    title: "Retail & E-commerce",
    pain: "Answering repeated customer questions and handling support requests.",
    products: [
      ["Respond", "respond"],
      ["Extract", "extract"],
    ],
  },
  {
    title: "Agencies & Service Providers",
    pain: "Preparing quotations, tracking opportunities and following up with clients.",
    products: [
      ["Quote", "quote"],
      ["Follow", "follow"],
      ["Collect", "collect"],
    ],
  },
  {
    title: "Finance & Accounting",
    pain: "Repeated document entry and inconsistent invoice follow-ups.",
    products: [
      ["Extract", "extract"],
      ["Collect", "collect"],
    ],
  },
  {
    title: "B2B Sales",
    pain: "Missed leads, scattered sales notes and delayed follow-up messages.",
    products: [
      ["Follow", "follow"],
      ["Quote", "quote"],
    ],
  },
  {
    title: "Human Resources",
    pain: "Repeated policy questions and inconsistent access to company rules.",
    products: [["HR Desk", "hr-desk"]],
  },
  {
    title: "Importers & Operations",
    pain: "Manual document processing and repeated quotation preparation.",
    products: [
      ["Extract", "extract"],
      ["Quote", "quote"],
    ],
  },
] as const;

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Industries"
        title="Different businesses. Practical solutions."
        description="Explore the kinds of everyday business problems SolveOi is designed to address."
      />

      <section className="bg-[#F6F8FB] py-24 text-[#101C30]">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {industries.map((industry) => (
              <article
                key={industry.title}
                className="rounded-3xl border border-slate-200 bg-white p-8"
              >
                <Building2 size={30} className="text-[#008F88]" />
                <h2 className="mt-7 text-2xl font-semibold">
                  {industry.title}
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  {industry.pain}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {industry.products.map(([label, slug]) => (
                    <Link
                      key={slug}
                      href={`/solutions/${slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-[#101C30] hover:border-teal-500"
                    >
                      {label}
                      <ArrowUpRight size={15} />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/demo"
              className="inline-flex rounded-full bg-[#101C30] px-7 py-3 font-semibold text-white"
            >
              Discuss your business workflow
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
