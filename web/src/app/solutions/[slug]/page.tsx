
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Clock3,
  Layers3,
} from "lucide-react";

import Container from "@/components/layout/Container";
import WorkflowPreview from "@/components/site/WorkflowPreview";
import { getProduct, products } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};



// Generate all six product routes
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// SEO metadata for every product
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: "Solution Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/solutions/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      {/* ========================================
          SECTION 1 — PRODUCT HERO
      ======================================== */}

      <section className="relative overflow-hidden bg-[#080B16] py-20 text-white sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full opacity-20 blur-[100px]"
          style={{ backgroundColor: product.accent }}
        />

        <Container className="relative">
          <Link
            href="/solutions"
            className="text-sm text-white/50 transition hover:text-white"
          >
            ← All solutions
          </Link>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold"
                  style={{ color: product.accent }}
                >
                  {product.category}
                </span>

                <span className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/60">
                  In development
                </span>
              </div>

              <h1 className="mt-7 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                {product.headline}
              </h1>

              <p className="mt-6 text-base leading-8 text-white/60">
                {product.description}
              </p>

              <p className="mt-5 text-sm text-white/45">
                Designed for: {product.audience}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href={`/demo?product=${product.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#101C30] transition hover:bg-teal-100"
                >
                  Ask about this product
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>

                <a
                  href="#features"
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Explore features
                </a>
              </div>
            </div>

            {/* Product workflow preview panel */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                <Layers3 size={18} aria-hidden="true" />
                Product overview
              </div>

              <div className="mt-8 space-y-4">
                {product.steps.slice(0, 4).map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-[#101829] p-4"
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: product.accent }}
                    >
                      0{index + 1}
                    </span>

                    <p className="text-sm text-white/75">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-6 text-white/40">
                Proposed MVP workflow — not a live application preview.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 2 — PRODUCT FEATURES
      ======================================== */}

      <section
        id="features"
        className="bg-[#F6F8FB] py-24 text-[#101C30]"
      >
        <Container>
          <p className="text-xs font-bold uppercase tracking-widest text-[#008F88]">
            Product Features
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Focused on the work that matters.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <Check
                  size={24}
                  className="text-[#008F88]"
                  aria-hidden="true"
                />

                <h3 className="mt-6 text-lg font-semibold">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 3 — EXAMPLE WORKFLOW
      ======================================== */}

      <section className="bg-[#0D1423] py-24 text-white">
        <Container>
          <p className="text-xs font-bold uppercase tracking-widest text-teal-300">
            Example Workflow
          </p>

          <h2 className="mb-10 mt-4 text-4xl font-semibold tracking-tight">
            How {product.name} is designed to work.
          </h2>

          <WorkflowPreview product={product} />
        </Container>
      </section>

      {/* ========================================
          SECTION 4 — SUPPORTED INFORMATION
          AND IMPORTANT LIMITATIONS
      ======================================== */}

      <section className="bg-[#F6F8FB] py-24 text-[#101C30]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold">
                Supported MVP inputs and outputs
              </h2>

              <div className="mt-7 space-y-4">
                {product.supported.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <Check
                      size={20}
                      className="shrink-0 text-[#008F88]"
                      aria-hidden="true"
                    />

                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <CircleAlert
                  size={24}
                  className="text-amber-600"
                  aria-hidden="true"
                />

                <h2 className="text-3xl font-semibold">
                  Important limitations
                </h2>
              </div>

              <div className="mt-7 space-y-4">
                {product.limitations.map((item) => (
                  <p
                    key={item}
                    className="rounded-xl border border-slate-200 bg-white p-5 text-slate-700"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Future features */}

          <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-center gap-3">
              <Clock3
                size={24}
                className="text-[#008F88]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-semibold">
                Future enhancements
              </h2>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {product.later.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm text-slate-500">
              These features are roadmap ideas, not current functionality.
            </p>
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 5 — FAQ (STEP 35 UPDATE)
      ======================================== */}

      <section className="bg-[#F6F8FB] pb-24 text-[#101C30]">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[#008F88]">
              Frequently Asked Questions
            </p>

            <h2 className="mb-10 mt-4 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Questions about {product.name}
            </h2>

            <div className="space-y-4">
              <details className="group rounded-2xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer font-semibold">
                  What does {product.name} do?
                </summary>

                <p className="mt-4 leading-7 text-slate-600">
                  {product.description}
                </p>
              </details>

              <details className="group rounded-2xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer font-semibold">
                  What information can this product work with?
                </summary>

                <p className="mt-4 leading-7 text-slate-600">
                  Its planned MVP supports{" "}
                  {product.supported.join(", ")}.
                </p>
              </details>

              <details className="group rounded-2xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer font-semibold">
                  Is {product.name} available now?
                </summary>

                <p className="mt-4 leading-7 text-slate-600">
                  This product is currently in development.
                  Commercial access will be announced after
                  testing and release approval.
                </p>
              </details>

              <details className="group rounded-2xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer font-semibold">
                  Does the AI require human review?
                </summary>

                <p className="mt-4 leading-7 text-slate-600">
                  SolveOi plans human review for consequential
                  actions and appropriate validation of
                  AI-generated results before final use.
                </p>
              </details>

              <details className="group rounded-2xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer font-semibold">
                  How can I learn more about this product?
                </summary>

                <p className="mt-4 leading-7 text-slate-600">
                  You can contact the SolveOi team to discuss
                  your business requirements and ask about
                  product development or pilot opportunities.
                </p>

                <Link
                  href={`/demo?product=${product.slug}`}
                  className="mt-4 inline-block font-semibold text-[#008F88] hover:underline"
                >
                  Contact us about {product.name} →
                </Link>
              </details>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 6 — FINAL CALL TO ACTION
      ======================================== */}

      <section className="bg-[#080B16] py-24 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight">
              Interested in {product.name}?
            </h2>

            <p className="mt-6 leading-8 text-white/60">
              Tell us about your business workflow.
              Product access and demonstration availability
              will be confirmed by the SolveOi team.
            </p>

            <Link
              href={`/demo?product=${product.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-[#101C30] transition hover:bg-teal-100"
            >
              Contact us about this product
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
