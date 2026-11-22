
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SolveOi — Intelligence That Solves",
    template: "%s | SolveOi",
  },

  description:
    "SolveOi develops practical AI solutions for everyday business work. Discover our tools for quotations, documents, payments, sales, support and HR.",

  applicationName: "SolveOi",

  keywords: [
    "SolveOi",
    "AI business tools",
    "Business automation",
    "AI SaaS",
    "Business productivity",
  ],

  openGraph: {
    type: "website",
    siteName: "SolveOi",
    title: "SolveOi — Intelligence That Solves",
    description:
      "Real problems. Intelligent solutions.",
    url: siteUrl,
  },

  twitter: {
    card: "summary_large_image",
    title: "SolveOi — Intelligence That Solves",
    description:
      "Practical AI solutions for growing businesses.",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={geist.variable}
      suppressHydrationWarning
    >
      <body
        className={`${geist.className} flex min-h-screen flex-col bg-[#090710] text-white antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-black"
        >
          Skip to main content
        </a>

        <Navbar />

        <div id="main-content" className="flex-1">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
