import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, FileText, MessagesSquare, Receipt, ScanText, Users } from "lucide-react";
import type { Product } from "@/lib/products";

const icons = {
  quote: FileText,
  extract: ScanText,
  collect: Receipt,
  follow: Users,
  respond: MessagesSquare,
  "hr-desk": BriefcaseBusiness,
};

/* Every card uses the same soft-orange language, with subtle variations. */
const accents: Record<string, { a: string; b: string; c: string }> = {
  quote: { a: "#ffe1ae", b: "#f3a36b", c: "#f8c28a" },
  extract: { a: "#ffd4bc", b: "#eb966a", c: "#edba97" },
  collect: { a: "#ffe4ba", b: "#df9564", c: "#f6bd7e" },
  follow: { a: "#ffdabd", b: "#f5a87b", c: "#f9c298" },
  respond: { a: "#ffdfc5", b: "#e78d65", c: "#f3c098" },
  "hr-desk": { a: "#ffe1b3", b: "#e49c6c", c: "#f7be8b" },
};

export default function ProductCard({ product }: { product: Product }) {
  const Icon = icons[product.slug as keyof typeof icons] ?? FileText;
  const tone = accents[product.slug] ?? accents.quote;

  return (
    <Link
      href={`/solutions/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#f6c99f]/30 bg-gradient-to-br from-[#774738] via-[#4e322d] to-[#322526] text-[#62483c] shadow-[0_14px_38px_rgba(61,34,29,.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcd9e]/65 hover:shadow-[0_24px_60px_rgba(69,35,29,.20)] focus-visible:outline-offset-4"
    >
      <div className="relative h-48 overflow-hidden border-b border-[#ffd4a9]/20 bg-gradient-to-br from-[#664032] via-[#49312b] to-[#332527]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full blur-[60px]" style={{ backgroundColor: `${tone.b}55` }} />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[#ffe0ad]/15 blur-[70px]" />

        {/* Mini UI mock-up: warm gradient surfaces rather than white rectangles. */}
        <div className="absolute bottom-[-12px] left-[12%] right-[12%] top-10 overflow-hidden rounded-t-2xl border border-[#ffdfba]/25 bg-gradient-to-br from-[#755044] via-[#55372f] to-[#39292a] p-4 shadow-[0_15px_40px_rgba(37,23,23,.30)] transition-transform duration-500 group-hover:-translate-y-2">
          <div className="flex items-center gap-1.5 border-b border-[#ffe3c6]/15 pb-3">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tone.b }} />
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffdfb5]/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffdfb5]/30" />
            <span className="ml-auto text-[9px] font-medium tracking-wide text-[#62483c]/80">WORKFLOW PREVIEW</span>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex w-9 flex-col gap-3 border-r border-[#ffe0ba]/15 pr-3">
              <span className="h-4 w-4 rounded-md" style={{ backgroundColor: tone.b }} />
              <span className="h-3 w-3 rounded bg-[#ffe1b8]/24" />
              <span className="h-3 w-3 rounded bg-[#ffe1b8]/18" />
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-2 w-2/3 rounded-full bg-[#ffead0]/40" />
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg border border-[#ffe2bd]/20 bg-gradient-to-br from-[#ffcc98]/15 to-[#f29c70]/5 p-2">
                    <div className="mb-3 h-4 w-4 rounded-md" style={{ backgroundColor: tone.c, opacity: .4 + i * .15 }} />
                    <div className="h-1 w-full rounded bg-[#ffe1c5]/35" />
                    <div className="mt-2 h-1 w-3/4 rounded bg-[#ffe1c5]/20" />
                  </div>
                ))}
              </div>
              <div className="h-1.5 w-4/5 rounded-full" style={{ backgroundColor: tone.b, opacity: .65 }} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#ffe0be]/25 bg-gradient-to-br from-[#ffd7ac]/22 to-[#f59460]/12" style={{ color: tone.a }}>
            <Icon size={21} aria-hidden="true" />
          </div>
          <span className="rounded-full border border-[#ffd3ac]/25 bg-[#ffca9d]/10 px-3 py-1 text-[10px] font-medium text-[#62483c]">In development</span>
        </div>
        <p className="mt-7 text-[11px] font-semibold uppercase tracking-[.17em] text-[#985334]">{product.category}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-.04em] text-[#62483c]">{product.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-[#62483c]">{product.summary}</p>
        <div className="mt-7 flex items-center justify-between border-t border-[#ffe0ba]/20 pt-5">
          <span className="text-sm font-semibold text-[#62483c]">Explore solution</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ffd8b0]/30 bg-[#ffc188]/10 text-[#985334] transition group-hover:border-[#ffd6aa]/70 group-hover:bg-[#ffc188]/20">
            <ArrowUpRight size={17} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
