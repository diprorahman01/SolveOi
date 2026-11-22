
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";
import InquiryForm from "@/components/site/InquiryForm";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Request a Demo",
  description: "Ask the SolveOi team about product demonstrations and pilot opportunities.",
};

type Props = {
  searchParams: Promise<{ product?: string | string[] }>;
};

export default async function DemoPage({ searchParams }: Props) {
  const search = await searchParams;
  const requested = Array.isArray(search.product)
    ? search.product[0]
    : search.product;

  const product = requested ? getProduct(requested) : undefined;

  return (
    <main>
      <PageHero
        eyebrow="Product Inquiry"
        title="Explore what's possible for your business."
        description="Tell us which AI product interests you and what you'd like to accomplish. Demonstration and pilot availability will be confirmed by our team."
      />

      <section className="bg-[#080B16] py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-7 rounded-2xl border border-violet-300/15 bg-violet-400/5 p-5 text-sm leading-7 text-white/65">
              {product
                ? `You're enquiring about ${product.name}.`
                : "Select the product you're interested in."}
              {" "}This form is a request for information, not an automatic booking confirmation.
            </div>

            <InquiryForm
              key={product?.slug || "general"}
              type="demo"
              initialProduct={product?.slug || ""}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
