import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../layout/Container";

export default function FinalCTA() {
  return <section className="bg-[#F6F8FB] py-20"><Container><div className="relative overflow-hidden rounded-3xl bg-[#101C30] px-8 py-16 text-center text-white sm:px-16"><div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#6C4DFF]/25 blur-[80px]"/><div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#008F88]/30 blur-[80px]"/><div className="relative"><h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Simplify the work. Focus on growth.</h2><p className="mx-auto mt-5 max-w-xl text-white/65">Explore practical AI solutions for your business or request a guided demonstration.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/solutions" className="rounded-full bg-white px-6 py-3 font-semibold text-[#101C30] hover:bg-[#cdf7f2]">Explore solutions</Link><Link href="/demo" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold hover:bg-white/10">Request a demo <ArrowUpRight size={17}/></Link></div></div></div></Container></section>;
}
