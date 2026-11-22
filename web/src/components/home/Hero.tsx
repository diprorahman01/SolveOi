import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import Container from "../layout/Container";
import AnimatedBackground from "../effects/AnimatedBackground";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080B16] py-24 text-white sm:py-32">
      <AnimatedBackground />
      <Container className="relative text-center">
        <p className="mb-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8fe7e1]">Intelligence That Solves</p>
        <h1 className="mx-auto max-w-5xl text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
          Real problems.<br /><span className="bg-gradient-to-r from-[#b9a8ff] via-white to-[#77e8dd] bg-clip-text text-transparent">Intelligent solutions.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">Practical AI tools for the work your business does every day. Choose the solution you need, review the results, and move forward.</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/solutions" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#101C30] transition hover:bg-[#cdf7f2]">Explore solutions <ArrowRight size={18} aria-hidden="true" /></Link>
          <Link href="/demo" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"><Play size={17} aria-hidden="true" /> Request a demo</Link>
        </div>
        <div className="relative mx-auto mt-16 max-w-4xl rounded-2xl border border-white/15 bg-white/[0.06] p-3 text-left shadow-2xl shadow-[#6C4DFF]/15 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-3 pb-3"><span className="h-2.5 w-2.5 rounded-full bg-[#6C4DFF]"/><span className="h-2.5 w-2.5 rounded-full bg-[#008F88]"/><span className="h-2.5 w-2.5 rounded-full bg-white/30"/><span className="ml-3 text-xs text-white/45">SolveOi Workspace · Concept Preview</span></div>
          <div className="grid gap-3 p-3 sm:grid-cols-3">
            {["Quote", "Extract", "Respond"].map((name) => <div key={name} className="rounded-xl border border-white/10 bg-[#121A2B] p-5"><div className="mb-5 h-8 w-8 rounded-lg bg-gradient-to-br from-[#6C4DFF] to-[#008F88]"/><h3 className="font-semibold">{name}</h3><p className="mt-2 text-xs text-white/45">AI workspace preview</p><div className="mt-5 h-1.5 w-4/5 rounded bg-[#008F88]/70"/><div className="mt-2 h-1.5 w-3/5 rounded bg-white/15"/></div>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
