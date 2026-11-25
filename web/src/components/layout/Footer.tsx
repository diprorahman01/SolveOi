import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, Mail } from "lucide-react";
import Container from "./Container";

const footerGroups = [
  { title: "Solutions", links: [
    { label: "All Solutions", href: "/solutions" },
    { label: "SolveOi Quote", href: "/solutions/quote" },
    { label: "SolveOi Extract", href: "/solutions/extract" },
    { label: "SolveOi Collect", href: "/solutions/collect" },
    { label: "SolveOi Follow", href: "/solutions/follow" },
    { label: "SolveOi Respond", href: "/solutions/respond" },
    { label: "SolveOi HR Desk", href: "/solutions/hr-desk" },
  ] },
  { title: "Company", links: [
    { label: "About Us", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Request a Demo", href: "/demo" },
  ] },
  { title: "Explore", links: [
    { label: "Developers Hub · Coming Soon", href: "/developers" },
    { label: "Resources", href: "/resources" },
    { label: "Documentation", href: "/docs" },
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Acceptable Use", href: "/legal/acceptable-use" },
    { label: "AI Limitations", href: "/legal/ai-limitations" },
  ] },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#e9bd9e] bg-gradient-to-br from-[#fffaf5] via-[#fff0e4] to-[#ffdfc8] text-[#493226]">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#ffd2aa]/45 blur-[90px]" />
      <Container className="relative py-16 lg:py-20">
        <div className="mb-14 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-[#e9c09e] bg-gradient-to-r from-[#fff9f1] via-[#ffe7d3] to-[#ffdac1] p-6 shadow-[0_12px_30px_rgba(163,94,54,.07)] sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f8c496] text-[#88472a]"><Code2 size={24} aria-hidden="true" /></span>
            <div>
              <p className="text-lg font-bold text-[#422b23]">Build with SolveOi</p>
              <p className="mt-1 max-w-lg text-sm leading-6 text-[#795745]">A future place to share developer ideas, showcase APIs, and explore integrations.</p>
            </div>
          </div>
          <Link href="/developers" className="inline-flex items-center gap-2 rounded-xl border border-[#e4b18d] bg-[#fffaf4] px-5 py-3 text-sm font-semibold text-[#854329] transition hover:bg-[#ffe5d1]">
            Developers Hub <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href="/" aria-label="SolveOi home" className="inline-flex items-center rounded-xl">
              <Image unoptimized src="/solveoi-logo-orange-v2.png" width={1491} height={531} alt="SolveOi" className="h-[56px] w-auto max-w-[200px] object-contain" />
            </Link>
            <p className="mt-4 text-sm font-semibold text-[#ab5c38]">Carry less. Grow more.</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[#705243]">Practical AI solutions for everyday business challenges. Built to help growing teams simplify work.</p>
            <a href="mailto:hello@solveoi.com" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#85482f] transition hover:text-[#b5542f]"><Mail size={16} aria-hidden="true" />hello@solveoi.com</a>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-5 text-sm font-bold text-[#452d22]">{group.title}</h2>
              <ul className="space-y-3">
                {group.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-[#735343] transition hover:text-[#a95130]">{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-[#eac5a7] pt-7 text-xs text-[#765648] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SolveOi. All rights reserved.</p>
          <div className="flex gap-5"><Link href="/legal/privacy" className="hover:text-[#a65232]">Privacy</Link><Link href="/legal/terms" className="hover:text-[#a65232]">Terms</Link></div>
        </div>
      </Container>
    </footer>
  );
}
