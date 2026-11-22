
import type { Metadata } from "next";
import { Mail, MessagesSquare } from "lucide-react";
import Container from "@/components/layout/Container";
import PageHero from "@/components/site/PageHero";
import InquiryForm from "@/components/site/InquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact SolveOi about business AI solutions, partnerships and general inquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your next solution."
        description="Tell us about your business and the problem you want to solve."
      />

      <section className="bg-[#080B16] py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-3xl font-semibold">Get in touch.</h2>
              
<p className="mt-5 max-w-md leading-8 text-white/60">
  Whether you have a product question, a business inquiry
  or a potential collaboration, we would like to hear from you.
</p>


              <div className="mt-10 space-y-7">
                <div className="flex items-start gap-4">
                  <Mail className="text-teal-300" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a
                      href="mailto:hello@solveoi.com"
                      className="mt-1 inline-block text-white/60 hover:text-white"
                    >
                      hello@solveoi.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessagesSquare className="text-teal-300" />
                  <div>
                    <p className="font-semibold">Product demonstrations</p>
                    <p className="mt-1 text-sm leading-7 text-white/60">
                      Ask us about a specific AI product or early pilot opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <InquiryForm type="contact" />
          </div>
        </Container>
      </section>
    </main>
  );
}
