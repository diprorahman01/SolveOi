import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Braces, Code2, GitPullRequestArrow, Lightbulb, LockKeyhole, Puzzle, Rocket, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Developers Hub — Coming Soon",
  description: "The SolveOi Developers Hub is coming soon. A future space for sharing ideas, showcasing APIs and building useful integrations.",
};

const opportunities = [
  {
    icon: Lightbulb,
    number: "01 / IDEAS",
    title: "Suggest a new idea",
    text: "Share practical problems, automation concepts, and opportunities that can help businesses work smarter.",
  },
  {
    icon: Braces,
    number: "02 / API SHOWCASE",
    title: "Showcase your APIs",
    text: "Introduce APIs and tools you have built, describe what they do, and explore how they could fit into new workflows.",
  },
  {
    icon: Puzzle,
    number: "03 / INTEGRATIONS",
    title: "Explore integrations",
    text: "Connect useful developer tools with everyday operations, with clear permission, review, and security requirements.",
  },
  {
    icon: GitPullRequestArrow,
    number: "04 / COLLABORATION",
    title: "Build together",
    text: "A future place for independent developers and growing teams to discuss potential collaboration.",
  },
];

export default function DevelopersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fffaf5] via-[#fff1e5] to-[#ffe4d2] text-[#3e2a21]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-[#ffca9b]/30 blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-[600px] h-[460px] w-[460px] rounded-full bg-[#f4ae7c]/20 blur-[120px]" />
      <Container className="relative">
        <section className="grid items-center gap-12 border-b border-[#ebc5aa] py-20 sm:py-24 lg:grid-cols-[1.25fr_.75fr] lg:gap-20 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5b490] bg-[#fff4e9] px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-[#935338]">
              <Sparkles size={15} aria-hidden="true" /> Developers Hub <span className="mx-1 text-[#cea587]">/</span> Coming Soon
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.07] tracking-[-.055em] text-[#402920] sm:text-6xl lg:text-[70px]">
              A space for the people <span className="bg-gradient-to-r from-[#a9532f] via-[#d77d48] to-[#ea9b62] bg-clip-text text-transparent">building what’s next.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#765546] sm:text-lg">
              We’re creating a place where developers can propose ideas, share APIs they’ve built, and explore practical AI integrations with SolveOi.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-[#edb78d] bg-gradient-to-r from-[#ffe1c2] to-[#ffcfa5] px-5 py-3 text-sm font-bold text-[#643b28]">
                <Rocket size={18} aria-hidden="true" /> Platform coming soon
              </span>
              <Link href="/solutions" className="inline-flex items-center gap-2 rounded-xl border border-[#e7c09f] bg-[#fffaf5] px-5 py-3 text-sm font-semibold text-[#75442d] transition hover:bg-[#ffe9d6]">
                Explore our solutions <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[470px] rounded-[30px] border border-[#e9bc9a] bg-gradient-to-br from-[#fffefa] via-[#ffe9d6] to-[#ffd2af] p-6 shadow-[0_28px_75px_rgba(155,87,47,.12)] sm:p-9">
            <div className="mb-8 flex items-center justify-between border-b border-[#e8bfa0] pb-5">
              <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7bf94] text-[#7e3d28]"><Code2 size={25} /></span><span className="text-sm font-bold tracking-tight text-[#4e3124]">SolveOi / Developers</span></div>
              <span className="rounded-full border border-[#dda97e] bg-[#fff2e2] px-3 py-1 text-[10px] font-bold text-[#9d5434]">PREVIEW</span>
            </div>
            <div className="space-y-3">
              {[
                ["01", "Submit an idea", "Ideas and problem statements"],
                ["02", "Share an API", "Tools, endpoints, and documentation"],
                ["03", "Build an integration", "Proposals and collaboration"],
              ].map(([num, name, hint]) => (
                <div key={num} className="flex items-start gap-3 rounded-2xl border border-[#e9c0a2] bg-gradient-to-r from-[#fffaf4] to-[#ffe7d3] p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ffdfbf] text-xs font-bold text-[#9e562f]">{num}</span>
                  <div className="min-w-0"><p className="text-sm font-bold text-[#4d3025]">{name}</p><p className="mt-1 text-xs leading-5 text-[#866550]">{hint}</p></div>
                  <LockKeyhole size={15} className="ml-auto mt-1 shrink-0 text-[#a16c4b]" aria-label="Not open yet" />
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs leading-6 text-[#87624d]">Preview only · Submissions are not yet available</p>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mb-11 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.17em] text-[#a25736]">What we’re planning</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.045em] text-[#422c22] sm:text-5xl">Ideas deserve a place to grow.</h2>
            <p className="mt-4 text-base leading-8 text-[#765746]">The hub will bring community ideas, API discoveries and meaningful partnerships together in one place.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {opportunities.map(({ icon: Icon, number, title, text }) => (
              <article key={title} className="flex min-h-[280px] flex-col rounded-[26px] border border-[#eac6a7] bg-gradient-to-br from-[#fffdfa] via-[#fff0e2] to-[#ffdec7] p-7 shadow-[0_14px_34px_rgba(165,103,65,.08)]">
                <div className="flex items-start justify-between gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffe0bd] to-[#f7b783] text-[#915038]"><Icon size={24} aria-hidden="true" /></span><span className="rounded-full border border-[#edc6a8] bg-[#fffaf3] px-2.5 py-1 text-[10px] font-semibold text-[#9a694d]">Soon</span></div>
                <p className="mt-7 text-[11px] font-bold uppercase tracking-[.16em] text-[#ab653f]">{number}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#4d3225]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#78584a]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="flex flex-col items-start justify-between gap-5 rounded-[30px] border border-[#e8bd9c] bg-gradient-to-r from-[#fff9f2] via-[#ffe8d4] to-[#ffd9b9] p-8 sm:flex-row sm:items-center sm:p-10">
            <div><p className="text-xs font-bold uppercase tracking-[.17em] text-[#a45938]">Early stage</p><h2 className="mt-3 text-2xl font-semibold text-[#4c3125] sm:text-3xl">The hub isn’t open yet.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-[#765748]">There are no idea submissions, API uploads, or developer accounts available on this page at the moment. We’ll announce availability when the experience is ready.</p></div>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#dfae87] bg-[#fff9f3] px-5 py-3 text-sm font-semibold text-[#8a4a30] transition hover:bg-[#ffe5d1]">Contact SolveOi <ArrowRight size={16} /></Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
