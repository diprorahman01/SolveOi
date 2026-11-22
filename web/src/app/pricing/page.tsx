import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing | SolveOi" };

export default function PricingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-24">
      <p className="mb-4 text-sm tracking-[0.2em] uppercase text-teal-500">SolveOi</p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Pricing</h1>
      <p className="mt-6 max-w-2xl text-lg opacity-75">Compare SolveOi subscriptions and product usage allowances.</p>
      <p className="mt-10 text-sm opacity-60">Page design coming soon.</p>
    </main>
  );
}
