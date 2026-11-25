import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, FileText, MessagesSquare, Receipt, ScanText, Sparkles, Users } from "lucide-react";
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
const shades = ["#ffc58d", "#ffceae", "#ffd595", "#ffba9b", "#ffd9b0", "#f6b88f"];

export default function ProductShowcase() {
  return (
    <section id="products" className="relative overflow-hidden border-t border-[#ffd5b1]/20 bg-[#3f2824] py-24 text-[#62483c] lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-52 top-20 h-[500px] w-[500px] rounded-full bg-[#ffad75]/20 blur-[135px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-60 bottom-0 h-[500px] w-[500px] rounded-full bg-[#ffd8b2]/10 blur-[135px]" />
      <Container className="relative">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.19em] text-[#985334]"><Sparkles size={15} />The SolveOi Ecosystem</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-.055em] sm:text-6xl">
              Different challenges.<br /><span className="solveoi-gradient-text">One intelligent ecosystem.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#62483c]">Six focused AI solutions designed around real business workflows—from preparing quotations to answering employee questions.</p>
          </div>
          <Link href="/solutions" className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#ffd1a2]/35 bg-gradient-to-r from-[#ffd4a8]/14 to-[#f9ad76]/10 px-5 py-3 text-sm font-semibold text-[#62483c] transition hover:border-[#ffd7ae]/70 hover:from-[#ffd4a8]/25 hover:to-[#f9ad76]/18">
            View all solutions <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {products.map((product, index) => {
            const Icon = icons[product.slug as keyof typeof icons] ?? FileText;
            const featured = index < 2;
            return (
              <Link key={product.slug} href={`/solutions/${product.slug}`}
                className={`group relative flex min-h-[310px] flex-col overflow-hidden rounded-[26px] border border-[#ffd4ab]/30 bg-gradient-to-br from-[#795044] via-[#563931] to-[#332a2a] p-7 text-[#62483c] shadow-[0_18px_45px_rgba(39,22,21,.15)] transition duration-300 hover:-translate-y-1 hover:border-[#ffca9e]/65 hover:shadow-[0_24px_70px_rgba(66,35,27,.22)] ${featured ? "lg:col-span-6 lg:min-h-[365px]" : "lg:col-span-3"}`}>
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-25 blur-[75px] transition-opacity group-hover:opacity-50" style={{ backgroundColor: shades[index % shades.length] }} />
                <div aria-hidden="true" className="solveoi-mesh pointer-events-none absolute inset-0 opacity-30" />
                <div className="relative z-10 flex items-start justify-between gap-2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ffe1bd]/30 bg-gradient-to-br from-[#ffdfb6]/22 to-[#f3a06c]/12" style={{ color: shades[index % shades.length] }}><Icon size={23} /></span>
                  <span className="rounded-full border border-[#ffe0b8]/25 bg-[#ffd2a1]/10 px-3 py-1.5 text-[10px] font-medium text-[#62483c]">In development</span>
                </div>

                {/* Warm-gradient UI preview: retains visual depth without flat white cards. */}
                <div aria-hidden="true" className={`pointer-events-none absolute right-[-60px] top-[90px] -rotate-[9deg] overflow-hidden rounded-2xl border border-[#ffe1bf]/25 bg-gradient-to-br from-[#896052]/95 via-[#633f36]/95 to-[#382b2c]/95 p-4 opacity-80 shadow-2xl transition duration-500 group-hover:right-[-40px] group-hover:rotate-[-5deg] group-hover:opacity-100 ${featured ? "hidden h-[200px] w-[260px] sm:block" : "hidden h-[160px] w-[175px] xl:block"}`}>
                  <div className="flex gap-1 border-b border-[#ffddb6]/20 pb-3"><span className="h-1.5 w-1.5 rounded-full bg-[#ffc58a]" /><span className="h-1.5 w-1.5 rounded-full bg-[#ffe0c1]/25" /><span className="h-1.5 w-1.5 rounded-full bg-[#ffe0c1]/25" /></div>
                  <div className="mt-5 flex gap-3">
                    <div className="w-9 space-y-3"><div className="h-5 w-5 rounded-md bg-gradient-to-br from-[#ffe3b5] to-[#f2a36b]" /><div className="h-2 w-6 rounded bg-[#ffdec0]/30" /><div className="h-2 w-5 rounded bg-[#ffdec0]/20" /></div>
                    <div className="flex-1 space-y-3"><div className="h-2 w-3/5 rounded bg-[#ffddbb]/40" /><div className="h-11 rounded-lg border border-[#ffe0ba]/20 bg-gradient-to-br from-[#ffd4a9]/20 to-[#f39a67]/10 p-2"><div className="h-1.5 w-3/4 rounded bg-[#ffc58a]/70" /><div className="mt-2 h-1.5 w-1/2 rounded bg-[#ffdec0]/25" /></div><div className="h-2 w-5/6 rounded bg-[#ffdec0]/20" /></div>
                  </div>
                </div>

                <div className="relative z-10 mt-auto max-w-[330px] pt-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#985334]">0{index + 1} / {product.category}</p>
                  <h3 className={`mt-3 font-semibold tracking-[-.04em] text-[#62483c] ${featured ? "text-3xl" : "text-2xl"}`}>{product.name}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-[#62483c]">{product.summary}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#985334] transition group-hover:text-white">Explore solution <ArrowUpRight size={15} /></div>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-[#62483c]">Product interfaces are conceptual previews. Availability will be announced after development and testing.</p>
      </Container>
    </section>
  );
}
