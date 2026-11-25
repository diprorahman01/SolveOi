import Link from "next/link";
import {ArrowLeft,Home} from "lucide-react";
export default function NotFound() {
 return <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-[#4e3029] via-[#674032] to-[#3a2a28] px-6 py-24 text-[#62483c]">
  <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffc085]/15 blur-[130px]"/>
  <div className="relative mx-auto max-w-2xl text-center">
   <div className="inline-flex items-center rounded-full border border-[#ffd2a5]/35 bg-[#ffc08a]/15 px-4 py-2 text-xs font-semibold text-[#985334]">ERROR 404</div>
   <h1 className="solveoi-gradient-text mt-8 text-8xl font-bold tracking-[-.09em] sm:text-9xl">404</h1>
   <h2 className="mt-7 text-3xl font-semibold tracking-tight text-[#62483c] sm:text-5xl">Lost in the digital universe?</h2>
   <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-[#62483c]">The page you are looking for could not be found. It may have moved or the address may be incorrect.</p>
   <div className="mt-9 flex flex-wrap justify-center gap-3">
    <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ffe3be] to-[#ffb781] px-6 py-3 font-bold text-[#3c271f] transition hover:brightness-105"><Home size={17} aria-hidden/>Back to Home</Link>
    <Link href="/solutions" className="inline-flex items-center gap-2 rounded-xl border border-[#ffd2a9]/35 bg-[#ffdab0]/10 px-6 py-3 font-semibold text-[#62483c] transition hover:bg-[#ffdab0]/20">Explore Solutions<ArrowLeft size={17} className="rotate-180" aria-hidden/></Link>
   </div>
  </div>
 </main>;
}
