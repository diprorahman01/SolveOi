import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SolveOi Workspace", template: "%s | SolveOi" },
  description: "Secure SolveOi business workspace",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-atmosphere min-h-screen">
        <header className="border-b border-[#e9c4a6] bg-[#fff9f2]/95 shadow-[0_5px_22px_rgba(158,99,56,.07)]">
          <div className="mx-auto flex min-h-[76px] max-w-[1500px] items-center justify-between gap-4 px-5 sm:px-8">
            <Link href="/" aria-label="SolveOi Workspace home" className="inline-flex shrink-0 items-center gap-2 rounded-lg">
              <Image unoptimized src="/solveoi-logo-orange-v2.png" width={1491} height={531} alt="SolveOi" priority className="h-[42px] w-auto max-w-[150px] object-contain sm:h-[47px] sm:max-w-[174px]" />
              <span className="hidden border-l border-[#dbac89] pl-3 text-xs font-medium text-[#745343] sm:inline">Workspace</span>
            </Link>
            <span className="rounded-full border border-[#eec8a5] bg-[#ffe8d1] px-3 py-1.5 text-xs font-semibold text-[#885137]">Secure access</span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
