"use client";
import {useEffect} from "react";
import Link from "next/link";
import {AlertTriangle,ArrowLeft,RefreshCw} from "lucide-react";
type ErrorPageProps={error:Error & {digest?:string};reset:()=>void};
export default function ErrorPage({error,reset}:ErrorPageProps) {
 useEffect(()=>{console.error("SolveOi page error:",error);},[error]);
 return <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-[#4e3029] via-[#674032] to-[#3a2a28] px-6 py-24 text-[#62483c]">
  <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffc085]/15 blur-[130px]"/>
  <div className="relative mx-auto w-full max-w-2xl rounded-3xl border border-[#ffd4a8]/35 bg-gradient-to-br from-[#885340] via-[#674336] to-[#47312e] p-8 text-center shadow-[0_24px_65px_rgba(44,24,24,.17)] sm:p-12">
   <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ffdbb7]/35 bg-[#ffd0a0]/14 text-[#985334]"><AlertTriangle size={30} aria-hidden/></div>
   <p className="mt-7 text-xs font-semibold uppercase tracking-[.18em] text-[#985334]">Application Error</p>
   <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#62483c] sm:text-4xl">Something went wrong.</h1>
   <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#62483c]">We could not load this page. Please try again or return to the SolveOi homepage.</p>
   <div className="mt-9 flex flex-wrap justify-center gap-3">
    <button type="button" onClick={()=>reset()} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ffe3be] to-[#ffb781] px-6 py-3 text-sm font-bold text-[#3c271f] transition hover:brightness-105"><RefreshCw size={17} aria-hidden/>Try Again</button>
    <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-[#ffd2a9]/35 bg-[#ffdab0]/10 px-6 py-3 text-sm font-semibold text-[#62483c] transition hover:bg-[#ffdab0]/20"><ArrowLeft size={17} aria-hidden/>Back to Home</Link>
   </div>
  </div>
 </main>;
}
