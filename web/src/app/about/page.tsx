
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Lightbulb, Target } from "lucide-react";
import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about SolveOi's mission, brand identity and approach to practical business AI.",
};

const principles = [
  {
    icon: Target,
    name: "Solve",
    text: "Solve practical problems that waste time, create errors or slow business growth.",
  },
  {
    icon: Lightbulb,
    name: "Opportunities",
    text: "Discover opportunities within repetitive and overlooked business workflows.",
  },
  {
    icon: Eye,
    name: "Intelligence",
    text: "Use intelligent technology, observation and human judgment to make better solutions.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About SolveOi"
        title="Intelligence That Solves."
        description="We discover opportunities inside everyday business problems and turn them into useful intelligent solutions."
      />

      <section className="bg-[#F6F8FB] py-24 text-[#101C30]">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, name, text }) => (
              <article
                key={name}
                className="rounded-3xl border border-slate-200 bg-white p-8"
              >
                <Icon size={30} className="text-[#008F88]" />
                <h2 className="mt-6 text-3xl font-semibold">{name}</h2>
                <p className="mt-4 leading-8 text-slate-600">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#008F88]">
                Our Mission
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                Make useful intelligence accessible.
              </h2>
              <p className="mt-6 leading-8 text-slate-600">
                Make useful intelligent automation accessible to businesses by
                reducing repetitive work, improving information flow and
                helping people make better decisions.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#008F88]">
                Our Vision
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                Practical AI that businesses can trust.
              </h2>
              <p className="mt-6 leading-8 text-slate-600">
                Become a trusted provider of practical AI solutions that teams
                can deploy quickly, understand clearly and expand as their
                needs grow.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#080B16] py-24 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-widest text-teal-300">
              OUR APPROACH
            </p>
            <h2 className="mt-5 text-4xl font-semibold">
              Useful AI, not complicated AI.
            </h2>
            <p className="mt-6 leading-8 text-white/60">
              SolveOi is designed for founders, startups, small businesses
              and growing teams. Our focus is straightforward workflows,
              predictable access and visible human control.
            </p>

            <Link
              href="/solutions"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-[#101C30]"
            >
              Explore solutions <ArrowRight size={17} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
