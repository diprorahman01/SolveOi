import { notFound } from "next/navigation";

const products = {
  quote: { name: "SolveOi Quote", description: "Create accurate, branded quotations." },
  extract: { name: "SolveOi Extract", description: "Turn documents into reviewed data." },
  collect: { name: "SolveOi Collect", description: "Organize overdue invoice reminders." },
  follow: { name: "SolveOi Follow", description: "Manage sales follow-ups." },
  respond: { name: "SolveOi Respond", description: "Answer customer questions from approved knowledge." },
  "hr-desk": { name: "SolveOi HR Desk", description: "Find approved HR policy answers." },
} as const;

type ProductSlug = keyof typeof products;

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in products)) notFound();
  const product = products[slug as ProductSlug];
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-24">
      <p className="mb-4 text-sm tracking-[0.2em] uppercase text-teal-500">AI Solution</p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{product.name}</h1>
      <p className="mt-6 max-w-2xl text-lg opacity-75">{product.description}</p>
      <p className="mt-10 text-sm opacity-60">Product details and demo coming soon.</p>
    </main>
  );
}
