import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../layout/Container";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-[#fffaf3] via-[#fff0e2] to-[#ffe2cb] py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-[#ffcd9e]/30 bg-gradient-to-br from-[#86513b] via-[#6f4436] to-[#49302e] px-8 py-16 text-center text-[#62483c] shadow-[0_20px_52px_rgba(105,54,32,.17)] sm:px-16">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#ffd1a0]/25 blur-[80px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#f6a16e]/25 blur-[80px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-[#62483c] sm:text-5xl">Simplify the work. Focus on growth.</h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-[#62483c]">Explore practical AI solutions for your business or request a guided demonstration.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/solutions" className="rounded-xl border border-[#ffc795]/55 bg-gradient-to-r from-[#ffe1ba] to-[#ffbb83] px-6 py-3 font-bold text-[#3f281f] shadow-sm transition hover:brightness-105">Explore solutions</Link>
              <Link href="/demo" className="inline-flex items-center gap-2 rounded-xl border border-[#ffdaa9]/40 bg-[#ffd4ab]/10 px-6 py-3 font-semibold text-[#62483c] transition hover:bg-[#ffd4ab]/20">Request a demo <ArrowUpRight size={17}/></Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
