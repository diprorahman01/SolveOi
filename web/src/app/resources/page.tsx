
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileCheck2, Workflow } from "lucide-react";
import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Resources",
  description: "Practical business AI guides, workflows and learning resources from SolveOi.",
};

const guides = [
  {
    icon: FileCheck2,
    title: "Preparing a reliable quotation workflow",
    summary: "Organize the information your business needs for accurate estimates.",
    steps: [
      "Keep one approved catalog containing product codes, units and prices.",
      "Record the customer's requirements and requested quantities.",
      "Review unknown items instead of guessing prices.",
      "Calculate totals using verified business rules.",
      "Approve the final quotation before sharing it.",
    ],
  },
  {
    icon: BookOpen,
    title: "Reviewing AI-extracted document data",
    summary: "A practical checklist for verifying information extracted from documents.",
    steps: [
      "Start with a readable source document.",
      "Check the supplier, date, invoice number and amounts.",
      "Inspect fields flagged as missing or uncertain.",
      "Correct values against the original document.",
      "Approve the record before exporting it.",
    ],
  },
  {
    icon: Workflow,
    title: "Creating a responsible reminder workflow",
    summary: "Keep payment follow-ups organized without losing human oversight.",
    steps: [
      "Maintain accurate paid, unpaid and disputed invoice statuses.",
      "Set reasonable reminder timing and quiet hours.",
      "Create drafts using only verified invoice information.",
      "Review recipients and message content before sending.",
      "Record delivery issues and updated payment status.",
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Resources"
        title="Ideas, guides and practical workflows."
        description="Explore useful starting points for improving everyday business processes with reliable information and careful automation."
      />

      <section className="bg-[#F6F8FB] py-24 text-[#101C30]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {guides.map(({ icon: Icon, title, summary, steps }) => (
              <article
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-8"
              >
                <Icon size={30} className="text-[#008F88]" />
                <h2 className="mt-6 text-2xl font-semibold">{title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{summary}</p>

                <details className="mt-7 border-t border-slate-200 pt-5">
                  <summary className="cursor-pointer text-sm font-semibold text-[#008F88]">
                    Read the guide
                  </summary>
                  <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-600">
                    {steps.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                </details>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-[#101C30] p-10 text-white">
            <h2 className="text-3xl font-semibold">Explore product documentation</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/60">
              See the planned setup requirements, workflows and limitations
              for all six SolveOi products.
            </p>
            <Link
              href="/docs"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-teal-300"
            >
              Browse documentation <ArrowRight size={17} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
