
import { Orbit } from "lucide-react";

export default function Loading() {
  return (
    <main
      role="status"
      aria-live="polite"
      className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-[#08060E] px-6 py-20 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-violet-600/20 blur-[90px]"
      />

      <div className="relative flex flex-col items-center text-center">
        <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl border border-violet-400/30 bg-violet-500/10 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
          <Orbit
            size={38}
            className="text-violet-300"
            aria-hidden="true"
          />
        </div>

        <p className="mt-7 text-lg font-semibold tracking-tight">
          Loading SolveOi
        </p>

        <p className="mt-2 text-sm text-white/45">
          Preparing your experience...
        </p>

        <span className="sr-only">
          Please wait while this page loads.
        </span>
      </div>
    </main>
  );
}
