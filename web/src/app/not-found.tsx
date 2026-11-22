
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#08060E] px-6 py-24 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/20 blur-[130px]"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-200">
          ERROR 404
        </div>

        <h1 className="solveoi-gradient-text mt-8 text-8xl font-bold tracking-[-0.09em] sm:text-9xl">
          404
        </h1>

        <h2 className="mt-7 text-3xl font-semibold tracking-tight sm:text-5xl">
          Lost in the digital universe?
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-white/55">
          The page you are looking for could not be found.
          It may have moved or the address may be incorrect.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#110B1B] transition hover:bg-violet-100"
          >
            <Home size={17} aria-hidden="true" />
            Back to Home
          </Link>

          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Explore Solutions
            <ArrowLeft
              size={17}
              className="rotate-180"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
