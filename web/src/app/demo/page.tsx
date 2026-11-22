import type { Metadata } from "next";

export const metadata: Metadata = { title: "Request a Demo | SolveOi" };

export default function DemoPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-24">
      <p className="mb-4 text-sm tracking-[0.2em] uppercase text-teal-500">SolveOi</p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Request a Demo</h1>
      <p className="mt-6 max-w-2xl text-lg opacity-75">Request a demonstration of a SolveOi product.</p>
      <p className="mt-10 text-sm opacity-60">Page design coming soon.</p>
    </main>
  );
}
