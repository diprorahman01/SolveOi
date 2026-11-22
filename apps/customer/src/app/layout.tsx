import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {title: {default:"SolveOi Workspace", template:"%s | SolveOi"},description:"Secure SolveOi workspace",robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body className="bg-atmosphere min-h-screen">
    <header className="border-b border-white/10 bg-black/15"><div className="mx-auto flex h-18 max-w-[1500px] items-center justify-between px-5 sm:px-8">
      <Link href="/" className="text-2xl font-bold tracking-[-.06em]">Solve<span className="text-violet-300">Oi</span> <span className="text-xs tracking-normal font-normal muted">Workspace</span></Link>
      <span className="rounded-full border border-violet-400/25 px-3 py-1.5 text-xs text-violet-200">Secure access</span>
    </div></header>{children}</body></html>;
}
