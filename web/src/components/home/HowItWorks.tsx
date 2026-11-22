import Container from "../layout/Container";
import ScrollReveal from "../effects/ScrollReveal";

const steps = [
  { num: "01", title: "Choose", desc: "Find the AI solution that matches a repetitive business task." },
  { num: "02", title: "Configure", desc: "Provide the business details, documents or settings it needs." },
  { num: "03", title: "Run", desc: "Let the tool prepare a result from your approved information." },
  { num: "04", title: "Review", desc: "Check, approve and export the outcome before taking action." },
];

export default function HowItWorks() {
  return <section className="bg-[#F6F8FB] py-24 text-[#101C30]"><Container><ScrollReveal><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#008F88]">How it works</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">AI that fits your workflow.</h2></ScrollReveal><div className="mt-12 grid gap-4 md:grid-cols-4">{steps.map((step) => <ScrollReveal key={step.num}><div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><span className="text-sm font-bold text-[#008F88]">{step.num}</span><h3 className="mt-7 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{step.desc}</p></div></ScrollReveal>)}</div></Container></section>;
}
