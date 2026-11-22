
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  MessagesSquare,
  Receipt,
  ScanText,
  Sparkles,
  Users,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { products } from "@/lib/products";

const icons = {
  quote: FileText,
  extract: ScanText,
  collect: Receipt,
  follow: Users,
  respond: MessagesSquare,
  "hr-desk": BriefcaseBusiness,
};

export default function ProductShowcase() {
  return (
    <section
      id="products"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#090610] py-24 text-white lg:py-32"
    >
      <div className="pointer-events-none absolute -left-60 top-28 h-[500px] w-[500px] rounded-full bg-purple-800/10 blur-[140px]" />

      <Container className="relative">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.19em] text-violet-300">
              <Sparkles size={15} />
              The SolveOi Ecosystem
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-0.055em] sm:text-6xl">
              Different challenges.
              <br />
              <span className="text-white/35">
                One intelligent ecosystem.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/45">
              Six focused AI solutions designed around real business
              workflows—from preparing quotations to answering
              employee questions.
            </p>
          </div>

          <Link
            href="/solutions"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/75 transition hover:border-violet-400/40 hover:text-white"
          >
            View all solutions
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {products.map((product, index) => {
            const Icon = icons[product.slug as keyof typeof icons];
            const featured = index < 2;

            return (
              <Link
                key={product.slug}
                href={`/solutions/${product.slug}`}
                className={`group relative flex min-h-[310px] flex-col overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#15101F] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_25px_70px_rgba(83,30,145,0.22)] ${
                  featured
                    ? "lg:col-span-6 lg:min-h-[365px]"
                    : "lg:col-span-3"
                }`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-25 -top-25 h-72 w-72 rounded-full opacity-20 blur-[75px] transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: product.accent }}
                />

                <div
                  aria-hidden="true"
                  className="solveoi-mesh pointer-events-none absolute inset-0 opacity-20"
                />

                <div className="relative z-10 flex items-start justify-between">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055]"
                    style={{ color: product.accent }}
                  >
                    <Icon size={23} />
                  </span>

                  <span className="rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/40">
                    In development
                  </span>
                </div>

                {/* Abstract miniature product interface */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-[-60px] top-[88px] -rotate-[9deg] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#21182F]/90 p-4 opacity-75 shadow-2xl transition duration-500 group-hover:right-[-40px] group-hover:rotate-[-5deg] group-hover:opacity-100 ${
                    featured
                      ? "hidden h-[200px] w-[260px] sm:block"
                      : "hidden h-[160px] w-[175px] xl:block"
                  }`}
                >
                  <div className="flex gap-1 border-b border-white/10 pb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  </div>

                  <div className="mt-5 flex gap-3">
                    <div className="w-9 space-y-3">
                      <div
                        className="h-5 w-5 rounded-md"
                        style={{
                          background: product.accent,
                          opacity: 0.6,
                        }}
                      />
                      <div className="h-2 w-6 rounded bg-white/10" />
                      <div className="h-2 w-5 rounded bg-white/10" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="h-2 w-3/5 rounded bg-white/25" />
                      <div className="h-11 rounded-lg border border-white/10 bg-white/[0.055] p-2">
                        <div
                          className="h-1.5 w-3/4 rounded"
                          style={{
                            background: product.accent,
                            opacity: 0.65,
                          }}
                        />
                        <div className="mt-2 h-1.5 w-1/2 rounded bg-white/10" />
                      </div>
                      <div className="h-2 w-5/6 rounded bg-white/10" />
                      <div className="h-2 w-2/3 rounded bg-white/10" />
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-auto max-w-[330px] pt-16">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-violet-300/60">
                    0{index + 1} / {product.category}
                  </p>

                  <h3
                    className={`mt-3 font-semibold tracking-[-0.04em] ${
                      featured ? "text-3xl" : "text-2xl"
                    }`}
                  >
                    {product.name}
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-white/45">
                    {product.summary}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-violet-200 transition group-hover:text-white">
                    Explore solution
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          Product interfaces are conceptual previews. Availability will be announced after development and testing.
        </p>
      </Container>
    </section>
  );
}
