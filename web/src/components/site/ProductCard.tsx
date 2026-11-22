
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  MessagesSquare,
  Receipt,
  ScanText,
  Users,
} from "lucide-react";

import type { Product } from "@/lib/products";

const icons = {
  quote: FileText,
  extract: ScanText,
  collect: Receipt,
  follow: Users,
  respond: MessagesSquare,
  "hr-desk": BriefcaseBusiness,
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const Icon = icons[product.slug as keyof typeof icons];

  return (
    <Link
      href={`/solutions/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#13101E] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_24px_70px_rgba(70,30,124,0.18)]"
    >
      {/* Abstract product interface visual */}
      <div className="relative h-48 overflow-hidden border-b border-white/[0.07] bg-[#0D0A16]">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-20 h-64 w-64 rounded-full opacity-20 blur-[65px]"
          style={{ backgroundColor: product.accent }}
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-violet-700/10 blur-[70px]"
        />

        {/* Miniature application mockup */}
        <div className="absolute bottom-[-12px] left-[12%] right-[12%] top-10 overflow-hidden rounded-t-2xl border border-white/15 bg-[#161222] p-4 shadow-2xl shadow-black/60 transition-transform duration-500 group-hover:-translate-y-2">
          <div className="flex items-center gap-1.5 border-b border-white/10 pb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />

            <span className="ml-auto text-[9px] text-white/30">
              WORKFLOW PREVIEW
            </span>
          </div>

          <div className="mt-4 flex gap-4">
            <div className="flex w-9 flex-col gap-3 border-r border-white/10 pr-3">
              <span
                className="h-4 w-4 rounded-md"
                style={{
                  backgroundColor: product.accent,
                  opacity: 0.65,
                }}
              />
              <span className="h-3 w-3 rounded bg-white/10" />
              <span className="h-3 w-3 rounded bg-white/10" />
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-2 w-2/3 rounded-full bg-white/25" />

              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2"
                  >
                    <div
                      className="mb-3 h-4 w-4 rounded-md"
                      style={{
                        backgroundColor: product.accent,
                        opacity: 0.25 + item * 0.12,
                      }}
                    />
                    <div className="h-1 w-full rounded bg-white/15" />
                    <div className="mt-2 h-1 w-3/4 rounded bg-white/10" />
                  </div>
                ))}
              </div>

              <div
                className="h-1.5 w-4/5 rounded-full"
                style={{
                  backgroundColor: product.accent,
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product information */}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between gap-3">
          <div
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]"
            style={{ color: product.accent }}
          >
            <Icon size={21} aria-hidden="true" />
          </div>

          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] text-white/45">
            In development
          </span>
        </div>

        <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.17em] text-white/35">
          {product.category}
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
          {product.name}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-white/50">
          {product.summary}
        </p>

        <div className="mt-7 flex items-center justify-between border-t border-white/[0.08] pt-5">
          <span className="text-sm font-medium text-white/75">
            Explore solution
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-violet-200 transition group-hover:border-violet-400 group-hover:bg-violet-500/15">
            <ArrowUpRight size={17} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
