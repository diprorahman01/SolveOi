
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Menu,
  Orbit,
  X,
} from "lucide-react";

import Container from "./Container";

const links = [
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.045] bg-[#09060F]/90 backdrop-blur-2xl">
      <Container>
        <div className="relative flex h-[76px] items-center justify-between gap-5">
          <Link
            href="/"
            aria-label="SolveOi home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-200 shadow-[0_0_20px_rgba(155,75,255,0.2)]">
              <Orbit size={21} strokeWidth={1.8} />
            </span>

            <span className="text-xl font-semibold tracking-[-0.07em] text-white">
              Solve<span className="text-[#BE91FF]">Oi</span>
            </span>
          </Link>

          {/* Center navigation capsule */}
          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/[0.085] bg-black/30 p-1.5 lg:flex"
          >
            {links.map((link) => {
              const active =
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium transition ${
                    active
                      ? "bg-white/[0.09] text-white"
                      : "text-white/45 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <Link
              href="/login"
              className="text-xs font-medium text-white/55 transition hover:text-white"
            >
              Log in
            </Link>

            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-400/40 bg-violet-500/15 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_24px_rgba(134,54,231,0.12)] transition hover:border-violet-300/60 hover:bg-violet-500/25"
            >
              Request a Demo
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="solveoi-mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white lg:hidden"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="solveoi-mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#0E0917] px-6 pb-6 lg:hidden"
        >
          {[
            ...links,
            { name: "Contact", href: "/contact" },
            { name: "Documentation", href: "/docs" },
            { name: "Log in", href: "/login" },
            { name: "Request a Demo", href: "/demo" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/[0.07] py-4 text-sm text-white/70 transition hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
