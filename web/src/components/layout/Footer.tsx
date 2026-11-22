
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Sparkles,
} from "lucide-react";
import Container from "./Container";

const footerGroups = [
  {
    title: "Solutions",
    links: [
      { label: "All Solutions", href: "/solutions" },
      { label: "SolveOi Quote", href: "/solutions/quote" },
      { label: "SolveOi Extract", href: "/solutions/extract" },
      { label: "SolveOi Collect", href: "/solutions/collect" },
      { label: "SolveOi Follow", href: "/solutions/follow" },
      { label: "SolveOi Respond", href: "/solutions/respond" },
      { label: "SolveOi HR Desk", href: "/solutions/hr-desk" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Request a Demo", href: "/demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "/resources" },
      { label: "Documentation", href: "/docs" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Acceptable Use", href: "/legal/acceptable-use" },
      { label: "AI Limitations", href: "/legal/ai-limitations" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#07060D] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 -left-40 h-96 w-96 rounded-full bg-violet-700/10 blur-[100px]"
      />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-3xl font-semibold tracking-[-0.07em]"
            >
              Solve<span className="text-[#C5A4FF]">Oi</span>
              <Sparkles
                size={13}
                className="ml-1 self-start text-violet-300"
                aria-hidden="true"
              />
            </Link>

            <p className="mt-5 text-sm font-medium text-violet-200">
              Intelligence That Solves.
            </p>

            <p className="mt-4 max-w-xs text-sm leading-7 text-white/45">
              Practical AI solutions for everyday business
              challenges. Built to help growing teams
              work smarter.
            </p>

            <a
              href="mailto:hello@solveoi.com"
              className="mt-7 inline-flex items-center gap-3 text-sm text-white/70 transition hover:text-white"
            >
              <Mail size={17} className="text-violet-300" />
              hello@solveoi.com
              <ArrowUpRight size={15} />
            </a>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-6 text-sm font-semibold text-white">
                {group.title}
              </h2>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 transition hover:text-violet-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SolveOi. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/legal/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
