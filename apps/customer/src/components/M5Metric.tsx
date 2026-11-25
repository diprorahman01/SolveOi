import type { LucideIcon } from "lucide-react";

export default function M5Metric({ title, value, icon: Icon, note }: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  note?: string;
}) {
  return <div className="group rounded-2xl border border-[#ffd2a8]/30 bg-gradient-to-br from-[#7a4c3e]/80 via-[#573b33]/90 to-[#3b2b2b] p-5 shadow-[0_12px_35px_rgba(41,23,22,.10)] transition duration-300 hover:-translate-y-0.5 hover:border-[#ffcd9b]/60 sm:p-6">
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs font-medium text-[#62483c]">{title}</p>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ffdab4]/25 bg-gradient-to-br from-[#ffcc9d]/20 to-[#f39b6d]/10">
        <Icon size={18} className="text-[#985334]" />
      </span>
    </div>
    <p className="mt-5 text-3xl font-bold tracking-tight text-[#62483c]">{value}</p>
    {note && <p className="mt-2 text-xs text-[#62483c]">{note}</p>}
  </div>;
}
