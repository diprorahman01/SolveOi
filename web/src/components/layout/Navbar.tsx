
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

const navigationLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Pricing", href: "/pricing" },
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

  function isActive(href: string) {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.045] bg-[#09060F]/95 backdrop-blur-2xl">
      <Container>
        <div className="relative flex h-[68px] w-full min-w-0 items-center justify-between gap-3 sm:h-[76px]">

          {/* Brand */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="SolveOi home"
            className="relative z-10 inline-flex shrink-0 items-center gap-2 sm:gap-2.5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-200 shadow-[0_0_20px_rgba(155,75,255,0.2)]">
              <Orbit
                size={21}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>

            <span className="whitespace-nowrap text-lg font-semibold tracking-[-0.07em] text-white sm:text-xl">
              Solve
              <span className="text-[#BE91FF]">
                Oi
              </span>
            </span>
          </Link>

          {/* Full desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-white/[0.085] bg-black/30 p-1.5 2xl:flex"
          >
            {navigationLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={
                    active ? "page" : undefined
                  }
                  className={`rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                    active
                      ? "bg-white/[0.09] text-white"
                      : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Full desktop account actions */}
          <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-3 2xl:flex">
            <Link
              href="/login"
              className="whitespace-nowrap px-2 py-2 text-xs font-medium text-white/60 transition hover:text-white"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-violet-400/40 bg-violet-500/20 px-4 py-2.5 text-xs font-semibold text-white transition hover:border-violet-300/60 hover:bg-violet-500/30"
            >
              Get Started
              <ArrowUpRight
                size={15}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/demo"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white/85 transition hover:border-violet-300/40 hover:bg-white/10"
            >
              Request a Demo
            </Link>
          </div>

          {/* Tablet and laptop actions */}
          <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-3 sm:flex 2xl:hidden">
            <Link
              href="/login"
              className="whitespace-nowrap text-xs font-medium text-white/60 transition hover:text-white"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-violet-400/40 bg-violet-500/20 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-500/30"
            >
              Get Started
              <ArrowUpRight
                size={14}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Responsive menu button */}
          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
            aria-controls="solveoi-mobile-nav"
            onClick={() => {
              setMenuOpen((previous) => !previous);
            }}
            className="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white transition hover:border-violet-400/30 hover:bg-violet-500/10 focus-visible:outline-2 focus-visible:outline-violet-300 sm:ml-0 2xl:hidden"
          >
            {menuOpen ? (
              <X size={21} aria-hidden="true" />
            ) : (
              <Menu size={21} aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile / tablet / smaller laptop menu */}
      {menuOpen && (
        <nav
          id="solveoi-mobile-nav"
          aria-label="Responsive navigation"
          className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-white/10 bg-[#0E0917] shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:max-h-[calc(100dvh-76px)] 2xl:hidden"
        >
          <Container>
            <div className="grid gap-1 py-4 sm:grid-cols-2 sm:gap-x-4">
              {mobileLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={
                      active ? "page" : undefined
                    }
                    className={`flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-violet-500/15 text-violet-200"
                        : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>

                    {link.href === "/signup" && (
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
