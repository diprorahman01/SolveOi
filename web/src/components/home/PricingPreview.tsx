import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../layout/Container";
import ScrollReveal from "../effects/ScrollReveal";

const tiers = [
  { title: "Basic", price: "$5", desc: "Low monthly allowance for an individual product." },
  { title: "Growth", price: "$7", desc: "More actions and useful saved history." },
  { title: "Premium", price: "$9", desc: "Higher self-service allowances, still metered." },
];

export default function PricingPreview() {
  return <section className="bg-[#080B16] py-24 text-white"><Container><ScrollReveal><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#77e8dd]">Flexible pricing</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Start with what you need.</h2><p className="mt-5 text-white/60">Illustrative subscription concepts per product. Final pricing and quotas are not yet confirmed.</p></div></ScrollReveal><div className="mt-12 grid gap-4 md:grid-cols-3">{tiers.map((tier) => <ScrollReveal key={tier.title}><div className="h-full rounded-2xl border border-white/15 bg-white/[0.05] p-7"><h3 className="font-semibold">{tier.title}</h3><div className="mt-5 text-4xl font-semibold">{tier.price}<span className="text-sm font-normal text-white/50"> / month*</span></div><p className="mt-5 text-sm leading-6 text-white/60">{tier.desc}</p></div></ScrollReveal>)}</div><div className="mt-9 text-center"><p className="mb-5 text-xs text-white/45">*Planning estimates only; do not treat as published offers.</p><Link href="/pricing" className="inline-flex items-center gap-2 text-[#8fe7e1] hover:text-white">View pricing information <ArrowRight size={17} /></Link></div></Container></section>;
}
