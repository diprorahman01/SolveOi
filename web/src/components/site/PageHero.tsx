
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import ChromeSculpture from "@/components/effects/ChromeSculpture";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  // Separate a two-part title for better visual hierarchy.
  const titleParts = title.match(/^(.+?\.)\s+(.+)$/);

  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.08] bg-[#090610] text-white">
      {/* Purple ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute right-[-10%] top-[-20%] h-[600px] w-[650px] rounded-full bg-violet-800/15 blur-[140px]" />

        <div className="absolute left-[-20%] bottom-[-30%] h-[480px] w-[480px] rounded-full bg-fuchsia-900/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
      </div>

      <Container className="relative">
        <div className="relative grid items-center gap-8 py-16 lg:min-h-[610px] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-8 lg:py-20">
          {/* Background decorative text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap text-[clamp(6rem,14vw,12rem)] font-bold tracking-[-0.09em] text-white/[0.025] xl:block"
          >
            INTELLIGENCE
          </div>

          {/* LEFT — Page introduction */}
          <div className="relative z-10 min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_#B58AFF]" />
              {eyebrow}
            </div>

            <h1 className="mt-7 max-w-[680px] text-[clamp(2.9rem,4.1vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.065em] [overflow-wrap:break-word]">
              {titleParts ? (
                <>
                  <span className="block text-white">
                    {titleParts[1]}
                  </span>

                  <span className="solveoi-gradient-text mt-2 block">
                    {titleParts[2]}
                  </span>
                </>
              ) : (
                title
              )}
            </h1>

            <p className="mt-6 max-w-[570px] text-base leading-8 text-white/55 sm:text-lg">
              {description}
            </p>

            {/* Preserve page-specific buttons */}
            {children && (
              <div className="mt-8 flex flex-wrap gap-3">
                {children}
              </div>
            )}

            {/* Lightweight brand identifiers */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-5 text-xs text-white/40">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Six focused AI solutions
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                One connected vision
              </span>
            </div>
          </div>

          {/* RIGHT — Fully visible 3D sculpture */}
          <div className="relative flex min-w-0 items-center justify-center py-4 lg:py-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-[75%] w-[85%] rounded-full bg-violet-700/20 blur-[90px]"
            />

            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]">
              <ChromeSculpture />
            </div>

            {/* Floating glass labels */}
            <div className="absolute left-0 top-[13%] z-20 hidden max-w-[175px] rounded-xl border border-violet-300/15 bg-[#151020]/80 p-4 shadow-xl backdrop-blur-xl xl:block">
              <p className="text-[9px] font-medium uppercase tracking-widest text-violet-300">
                SOLVEOI / AI
              </p>

              <p className="mt-2 text-xs leading-5 text-white/70">
                Intelligence That Solves.
              </p>
            </div>

            <div className="absolute bottom-[10%] right-0 z-20 hidden rounded-xl border border-violet-300/15 bg-[#151020]/80 px-4 py-3 shadow-xl backdrop-blur-xl xl:block">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_#B58AFF]" />

                <p className="text-xs text-white/75">
                  Future-ready AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
