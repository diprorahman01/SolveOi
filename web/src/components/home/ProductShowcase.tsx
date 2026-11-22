import Link from "next/link";
import { ArrowUpRight, FileText, ScanText, Receipt, Users, MessagesSquare, BriefcaseBusiness } from "lucide-react";
import Container from "../layout/Container";
import ScrollReveal from "../effects/ScrollReveal";

const products = [
  { title: "Quote", slug: "quote", icon: FileText, desc: "Turn customer requests into reviewed, branded quotations." },
  { title: "Extract", slug: "extract", icon: ScanText, desc: "Convert invoices and receipts into data you can verify." },
  { title: "Collect", slug: "collect", icon: Receipt, desc: "Manage overdue invoices and approved payment reminders." },
  { title: "Follow", slug: "follow", icon: Users, desc: "Track leads and prepare timely sales follow-ups." },
  { title: "Respond", slug: "respond", icon: MessagesSquare, desc: "Answer website questions using approved business knowledge." },
  { title: "HR Desk", slug: "hr-desk", icon: BriefcaseBusiness, desc: "Help employees find answers in company HR policies." },
];

export default function ProductShowcase() {
  return (
    <section className="bg-[#0D1423] py-24 text-white" id="products">
      <Container>
        <ScrollReveal><div className="mb-12 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#77e8dd]">Explore solutions</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">One platform. Six smart solutions.</h2><p className="mt-5 text-white/60">Focused AI products designed for everyday business workflows.</p></div></ScrollReveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const Icon = product.icon;
            return <ScrollReveal key={product.slug} delay={index * 0.05}><Link href={`/solutions/${product.slug}`} className="group flex min-h-64 flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 transition hover:-translate-y-1 hover:border-[#77e8dd]/40 hover:shadow-xl hover:shadow-[#008F88]/10"><div><div className="mb-7 inline-flex rounded-xl border border-white/10 bg-white/10 p-3 text-[#8fe7e1]"><Icon size={24} aria-hidden="true"/></div><h3 className="text-2xl font-semibold">SolveOi {product.title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{product.desc}</p></div><span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8fe7e1]">Explore solution <ArrowUpRight size={16} aria-hidden="true" /></span></Link></ScrollReveal>;
          })}
        </div>
      </Container>
    </section>
  );
}
