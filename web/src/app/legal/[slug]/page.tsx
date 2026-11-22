
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";

const documents = {
  privacy: {
    title: "Privacy Information",
    sections: [
      {
        title: "Contact form information",
        text: "SolveOi's public inquiry forms request a name, email address, optional company name, interested product and message. This information is intended for responding to business inquiries.",
      },
      {
        title: "Form processing",
        text: "Inquiries are processed using the configured email service. Cloudflare Turnstile may be used to help protect forms against automated abuse.",
      },
      {
        title: "Further policy requirements",
        text: "A final notice must specify the operating legal entity, data retention, applicable rights, hosting locations, processors, security contact and relevant legal bases.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        title: "Current availability",
        text: "SolveOi's six AI products are under development. Public product descriptions are informational and do not create a subscription agreement.",
      },
      {
        title: "Future service terms",
        text: "Before paid services launch, the company must approve conditions for subscriptions, usage limits, renewals, cancellation, liability, customer data and support.",
      },
    ],
  },
  "acceptable-use": {
    title: "Acceptable Use",
    sections: [
      {
        title: "Responsible use",
        text: "SolveOi is designed for legitimate business workflows. Unauthorized access, abusive messaging, privacy violations and misuse of the platform will be restricted.",
      },
      {
        title: "Product-specific rules",
        text: "Future policies must specify permitted uploads, messaging consent, automated actions, user responsibilities and enforcement procedures.",
      },
    ],
  },
  "ai-limitations": {
    title: "AI Limitations",
    sections: [
      {
        title: "AI-assisted results",
        text: "AI-generated results may be incomplete or inaccurate and must be reviewed where appropriate. The current website shows planned features, not guaranteed operational capabilities.",
      },
      {
        title: "Human decisions",
        text: "Financial calculations, policy interpretations, sensitive employee decisions and consequential external actions require suitable application rules and human oversight.",
      },
      {
        title: "Future product limitations",
        text: "Each released AI tool must publish its supported inputs, operational limitations, usage rules and escalation procedures.",
      },
    ],
  },
} as const;

type Slug = keyof typeof documents;

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(documents).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const document = documents[slug as Slug];

  return {
    title: document ? document.title : "Legal Information",
    robots: { index: false, follow: false },
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;

  if (!(slug in documents)) notFound();

  const document = documents[slug as Slug];

  return (
    <main>
      <PageHero
        eyebrow="Legal & Trust"
        title={document.title}
        description="Pre-launch information. Final legal documents require business and legal review before commercial publication."
      />

      <section className="bg-[#F6F8FB] py-20 text-[#101C30]">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
              <strong>Draft — not approved legal terms.</strong>
              <p className="mt-2 text-sm leading-7">
                This page is an implementation placeholder for client review.
                Do not use it as a substitute for approved legal documentation.
              </p>
            </div>

            <div className="space-y-5">
              {document.sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-2xl border border-slate-200 bg-white p-8"
                >
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                  <p className="mt-4 leading-8 text-slate-600">{section.text}</p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
