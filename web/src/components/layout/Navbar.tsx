"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Container from "./Container";

const navigationLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Pricing", href: "/pricing" },
  { name: "Developers", href: "/developers" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
];

const mobileLinks = [
  ...navigationLinks,
  { name: "Log in", href: "/login" },
  { name: "Get Started", href: "/signup" },
  { name: "Request a Demo", href: "/demo" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#edc9ae] bg-[#fff9f2]/95 shadow-[0_6px_24px_rgba(133,79,47,.07)] backdrop-blur-2xl">
      <Container>
        <div className="relative flex h-[70px] w-full items-center justify-between gap-3 sm:h-[80px]">
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="SolveOi home" className="relative z-10 inline-flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b96338]">
            <Image unoptimized src="/solveoi-logo-orange-v2.png" width={1491} height={531} alt="SolveOi" priority className="h-[43px] w-auto max-w-[145px] object-contain sm:h-[49px] sm:max-w-[173px]" />
          </Link>

          <nav aria-label="Main navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 whitespace-nowrap rounded-full border border-[#efceb3] bg-gradient-to-r from-[#fffefa] via-[#fff4e9] to-[#ffeadd] p-1.5 shadow-sm 2xl:flex">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition-colors ${isActive(link.href)
                  ? "bg-gradient-to-r from-[#ffe2c4] to-[#ffcfa7] text-[#653923]"
                  : "text-[#715244] hover:bg-[#ffead9] hover:text-[#703a22]"}`}>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-2.5 2xl:flex">
            <Link href="/login" className="px-2 py-2 text-xs font-semibold text-[#664434] transition hover:text-[#a44d2c]">Log in</Link>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-xl border border-[#eaa775] bg-gradient-to-r from-[#ffe0b2] via-[#ffc48b] to-[#f5a16c] px-4 py-2.5 text-xs font-bold text-[#43271d] shadow-sm transition hover:brightness-[1.03]">
              Get Started <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/demo" className="rounded-xl border border-[#e9c4a7] bg-[#fff2e5] px-4 py-2.5 text-xs font-semibold text-[#664333] transition hover:bg-[#ffe3c8]">Request a Demo</Link>
          </div>

          <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-3 sm:flex 2xl:hidden">
            <Link href="/login" className="text-xs font-semibold text-[#654638] hover:text-[#a4502f]">Log in</Link>
            <Link href="/signup" className="inline-flex items-center gap-1.5 rounded-xl border border-[#edb98c] bg-gradient-to-r from-[#ffe0b5] to-[#f8ae77] px-3.5 py-2.5 text-xs font-bold text-[#44271b]">
              Get Started <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <button type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen} aria-controls="solveoi-mobile-nav" onClick={() => setMenuOpen((old) => !old)}
            className="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e6c4a7] bg-[#fff0e3] text-[#69412f] transition hover:bg-[#ffe0c7] sm:ml-0 2xl:hidden">
            {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav id="solveoi-mobile-nav" aria-label="Responsive navigation" className="max-h-[calc(100dvh-70px)] overflow-y-auto border-t border-[#eecab0] bg-[#fff6ed] shadow-lg sm:max-h-[calc(100dvh-80px)] 2xl:hidden">
          <Container>
            <div className="grid gap-1 py-4 sm:grid-cols-2 sm:gap-x-4">
              {mobileLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ${isActive(link.href)
                    ? "bg-gradient-to-r from-[#ffe0c3] to-[#ffcfae] text-[#5d3526]"
                    : "text-[#6f4a37] hover:bg-[#ffe9d6]"}`}>
                  <span className="inline-flex items-center gap-2">{link.name}{link.href === "/developers" && <span className="rounded-full bg-[#ffe0bd] px-2 py-0.5 text-[10px] text-[#87452a]">Soon</span>}</span>
                  {link.href === "/signup" && <ArrowUpRight size={16} aria-hidden="true" />}
                </Link>
              ))}
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
