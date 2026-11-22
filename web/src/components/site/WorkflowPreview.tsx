
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";

export default function WorkflowPreview({
  product,
}: {
  product: Product;
}) {
  const stages = [
    { label: "Input", text: product.example.input },
    { label: "Human review", text: product.example.review },
    { label: "Output", text: product.example.output },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#111A2C] p-4 shadow-2xl shadow-violet-950/20 sm:p-7">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={17} className="text-violet-300" />
          <span className="text-sm font-semibold">
            {product.name} Workflow
          </span>
        </div>
        <span className="text-[11px] text-white/40">
          Illustrative preview
        </span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {stages.map((stage, index) => (
          <div key={stage.label} className="contents">
            <div className="min-h-36 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-widest text-white/40">
                0{index + 1} / {stage.label}
              </p>
              <p className="mt-5 text-sm font-medium leading-6 text-white/90">
                {stage.text}
              </p>
              {index === 2 && (
                <CheckCircle2
                  size={17}
                  className="mt-4 text-teal-300"
                  aria-label="Review completed"
                />
              )}
            </div>
            {index < stages.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className="mx-auto rotate-90 text-teal-300 md:rotate-0"
                size={20}
              />
            )}
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-6 text-white/45">
        This is a conceptual workflow illustration, not an operational AI demo.
        Product functionality will be activated after development and testing.
      </p>
    </div>
  );
}
