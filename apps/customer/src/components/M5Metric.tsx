import type { LucideIcon } from "lucide-react";
export default function M5Metric({ title, value, icon: Icon, note }: { title: string; value: string | number; icon: LucideIcon; note?: string }) {
  return <div className="rounded-2xl border border-violet-400/15 bg-[#191124]/80 p-5 sm:p-6">
    <div className="flex items-center justify-between gap-3"><p className="text-xs font-medium text-white/55">{title}</p><Icon size={18} className="text-violet-300"/></div>
    <p className="mt-5 text-3xl font-bold tracking-tight text-white">{value}</p>
    {note && <p className="mt-2 text-xs text-white/40">{note}</p>}
  </div>;
}
