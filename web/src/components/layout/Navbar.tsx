"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Container from "./Container";

const links = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080B16]/85 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between gap-5 py-4 text-white">
        <Link href="/" aria-label="SolveOi home" className="text-2xl font-bold tracking-tight">
          Solve<span className="text-[#5de0d5]">Oi</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/70 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/contact" className="text-sm text-white/80 transition hover:text-white">Contact</Link>
          <Link href="/demo" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#101C30] transition hover:bg-[#bdf8f1]">
            Request a demo <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}
          aria-controls="mobile-navigation" className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-white/10 bg-[#080B16] px-5 pb-5 md:hidden">
          {[...links, { label: "Contact", href: "/contact" }, { label: "Request a demo", href: "/demo" }].map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-3 text-sm text-white/85">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
