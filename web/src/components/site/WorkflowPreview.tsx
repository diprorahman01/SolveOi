import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";

export default function WorkflowPreview({ product }: { product: Product }) {
  const stages = [
    { label: "Input", text: product.example.input },
    { label: "Human review", text: product.example.review },
    { label: "Output", text: product.example.output },
  ];
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#ffcb9c]/35 bg-gradient-to-br from-[#81503e] via-[#604035] to-[#422f2d] p-4 text-[#62483c] shadow-[0_20px_50px_rgba(39,24,24,.2)] sm:p-7">
      <div className="flex items-center justify-between gap-3 border-b border-[#ffdfb7]/20 pb-4">
        <div className="flex items-center gap-2"><Sparkles size={17} className="text-[#985334]"/><span className="text-sm font-semibold text-[#62483c]">{product.name} Workflow</span></div>
        <span className="text-[11px] text-[#62483c]">Illustrative preview</span>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {stages.map((stage, index) => (
          <div key={stage.label} className="contents">
            <div className="min-h-36 rounded-2xl border border-[#ffe0b9]/25 bg-gradient-to-br from-[#a06b50]/50 to-[#5a3c34]/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#985334]">0{index+1} / {stage.label}</p>
              <p className="mt-5 text-sm font-medium leading-6 text-[#62483c]">{stage.text}</p>
              {index === 2 && <CheckCircle2 size={17} className="mt-4 text-emerald-200" aria-label="Review completed" />}
            </div>
            {index < stages.length-1 && <ArrowRight aria-hidden className="mx-auto rotate-90 text-[#985334] md:rotate-0" size={20} />}
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs leading-6 text-[#62483c]">This is a conceptual workflow illustration, not an operational AI demo. Product functionality will be activated after development and testing.</p>
    </div>
  );
}
