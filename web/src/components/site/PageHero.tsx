import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import ChromeSculpture from "@/components/effects/ChromeSculpture";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  const titleParts = title.match(/^(.+?\.)\s+(.+)$/);

  return <section className="relative isolate overflow-hidden border-b border-[#ffdfbb]/20 bg-gradient-to-br from-[#513126] via-[#422a25] to-[#2e2423] text-[#62483c]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-[10%] -top-[20%] h-[600px] w-[650px] rounded-full bg-[#ffb477]/20 blur-[140px]" />
      <div className="absolute -bottom-[30%] -left-[20%] h-[480px] w-[480px] rounded-full bg-[#ffdeb3]/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,221,184,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,221,184,0.024)_1px,transparent_1px)] bg-[size:80px_80px] opacity-35" />
    </div>
    <Container className="relative">
      <div className="relative grid items-center gap-8 py-16 lg:min-h-[610px] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-8 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap text-[clamp(6rem,14vw,12rem)] font-bold tracking-[-.09em] text-[#62483c]/[.035] xl:block">INTELLIGENCE</div>
        <div className="relative z-10 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd0a2]/30 bg-gradient-to-r from-[#ffd6a7]/15 to-[#f7a16c]/10 px-4 py-2 text-xs font-semibold text-[#985334]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffd09a] shadow-[0_0_12px_#FFC68B]" />
            {eyebrow}
          </div>
          <h1 className="mt-7 max-w-[680px] text-[clamp(2.9rem,4.1vw,4.25rem)] font-semibold leading-[1.04] tracking-[-.065em] [overflow-wrap:break-word]">
            {titleParts ? <><span className="block text-[#62483c]">{titleParts[1]}</span><span className="solveoi-gradient-text mt-2 block">{titleParts[2]}</span></> : title}
          </h1>
          <p className="mt-6 max-w-[570px] text-base leading-8 text-[#62483c] sm:text-lg">{description}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#ffdab7]/20 pt-5 text-xs text-[#62483c]">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#ffd29a]" />Six focused AI solutions</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#f0a17c]" />One connected vision</span>
          </div>
        </div>
        <div className="relative flex min-w-0 items-center justify-center py-4 lg:py-0">
          <div aria-hidden="true" className="pointer-events-none absolute h-[75%] w-[85%] rounded-full bg-[#ffbd88]/20 blur-[90px]" />
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]"><ChromeSculpture /></div>
          <div className="absolute left-0 top-[13%] z-20 hidden max-w-[175px] rounded-xl border border-[#ffddb6]/30 bg-gradient-to-br from-[#7c4f40]/80 to-[#432e2b]/90 p-4 shadow-xl backdrop-blur-xl xl:block">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-[#985334]">SOLVEOI / AI</p>
            <p className="mt-2 text-xs leading-5 text-[#62483c]">Intelligence That Solves.</p>
          </div>
          <div className="absolute bottom-[10%] right-0 z-20 hidden rounded-xl border border-[#ffddb6]/30 bg-gradient-to-br from-[#7c4f40]/80 to-[#432e2b]/90 px-4 py-3 shadow-xl backdrop-blur-xl xl:block">
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#ffc88b] shadow-[0_0_12px_#FFC88B]" /><p className="text-xs text-[#62483c]">Future-ready AI</p></div>
          </div>
        </div>
      </div>
    </Container>
  </section>;
}
