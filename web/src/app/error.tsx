
"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("SolveOi page error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#08060E] px-6 py-24 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/15 blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-2xl rounded-3xl border border-violet-400/15 bg-[#15101F]/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 text-violet-300">
          <AlertTriangle size={30} aria-hidden="true" />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
          Application Error
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Something went wrong.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/55">
          We could not load this page. Please try again or
          return to the SolveOi homepage.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#110B1B] transition hover:bg-violet-100"
          >
            <RefreshCw size={17} aria-hidden="true" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
