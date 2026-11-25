import {Orbit} from "lucide-react";
export default function Loading() {
 return <main role="status" aria-live="polite" className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-gradient-to-br from-[#50332a] via-[#694134] to-[#372a28] px-6 py-20 text-[#62483c]">
  <div aria-hidden className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#ffba85]/18 blur-[90px]"/>
  <div className="relative flex flex-col items-center text-center">
   <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl border border-[#ffd2a1]/40 bg-gradient-to-br from-[#ffdda8]/20 to-[#ed9668]/16 shadow-[0_0_50px_rgba(229,132,86,.18)]"><Orbit size={38} className="text-[#985334]" aria-hidden/></div>
   <p className="mt-7 text-lg font-semibold tracking-tight text-[#62483c]">Loading SolveOi</p>
   <p className="mt-2 text-sm text-[#62483c]">Preparing your experience...</p>
   <span className="sr-only">Please wait while this page loads.</span>
  </div>
 </main>;
}
