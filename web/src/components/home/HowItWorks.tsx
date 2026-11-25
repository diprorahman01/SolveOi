import Container from "../layout/Container";
import ScrollReveal from "../effects/ScrollReveal";

const steps = [
  { num: "01", title: "Choose", desc: "Find the AI solution that matches a repetitive business task." },
  { num: "02", title: "Configure", desc: "Provide the business details, documents or settings it needs." },
  { num: "03", title: "Run", desc: "Let the tool prepare a result from your approved information." },
  { num: "04", title: "Review", desc: "Check, approve and export the outcome before taking action." },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fffaf3] via-[#ffeedc] to-[#ffe3c9] py-24 text-[#402922]">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-36 h-96 w-96 rounded-full bg-[#ffd5a5]/55 blur-[100px]" />
      <Container className="relative">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ae5737]">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#402922] sm:text-5xl">AI that fits your workflow.</h2>
          <p className="mt-5 max-w-xl leading-7 text-[#755545]">Simple steps, with your team in control of the final result.</p>
        </ScrollReveal>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((step) => (
            <ScrollReveal key={step.num}>
              <div className="h-full rounded-[24px] border border-[#edc2a2] bg-gradient-to-br from-[#fffefb] via-[#fff1df] to-[#ffe2c7] p-7 text-[#412b24] shadow-[0_16px_32px_rgba(132,75,45,.08)] transition hover:-translate-y-1 hover:border-[#e6a77b]">
                <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffdfb8] to-[#ffb77b] px-2 text-sm font-bold text-[#7c3b26]">{step.num}</span>
                <h3 className="mt-7 text-xl font-semibold text-[#3c2822]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#715143]">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
