
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Explore SolveOi's product workflows, supported information and usage limitations.",
};

export default function DocumentationPage() {
  return (
    <main>
      <PageHero
        eyebrow="Documentation"
        title="Know how each product works."
        description="Find the proposed setup workflows, supported inputs and important limitations for SolveOi products."
      />

      <section className="bg-[#F6F8FB] py-20 text-[#101C30]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-5 font-semibold">Product guides</p>
              <nav aria-label="Documentation navigation" className="space-y-2">
                {products.map((product) => (
                  <a
                    key={product.slug}
                    href={`#${product.slug}`}
                    className="block rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-white hover:text-[#008F88]"
                  >
                    {product.name}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="space-y-7">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
                These are planned product guides based on the SolveOi development
                blueprint. The AI tools are not yet publicly available.
                Production instructions will be published after release testing.
              </div>

              {products.map((product) => (
                <article
                  id={product.slug}
                  key={product.slug}
                  className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 sm:p-10"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-[#008F88]">
                    {product.category}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold">
                    {product.name}
                  </h2>
                  <p className="mt-5 leading-7 text-slate-600">
                    {product.description}
                  </p>

                  <h3 className="mt-8 text-xl font-semibold">
                    Planned workflow
                  </h3>
                  <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-600">
                    {product.steps.map((step) => <li key={step}>{step}</li>)}
                  </ol>

                  <h3 className="mt-8 text-xl font-semibold">
                    Supported MVP information
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
                    {product.supported.map((item) => <li key={item}>{item}</li>)}
                  </ul>

                  <h3 className="mt-8 text-xl font-semibold">
                    Important limitations
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
                    {product.limitations.map((item) => <li key={item}>{item}</li>)}
                  </ul>

                  <Link
                    href={`/solutions/${product.slug}`}
                    className="mt-8 inline-block font-semibold text-[#008F88]"
                  >
                    View product overview →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
