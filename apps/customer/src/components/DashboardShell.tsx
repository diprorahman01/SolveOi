import Link from "next/link";
import { Activity, Boxes, Building2, ClipboardCheck, FileText, LayoutDashboard, Shield, Users, Settings, ListTodo } from "lucide-react";
import SignOutButton from "./SignOutButton";

type Props = { title: string; subtitle: string; name: string; role: "admin" | "owner" | "member"; children: React.ReactNode };
const customerNav = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/products", label: "AI Products", icon: Boxes },
  { href: "/app/tasks", label: "Tasks & approvals", icon: ListTodo },
  { href: "/app/files", label: "Private files", icon: FileText },
  { href: "/app/activity", label: "Activity", icon: Activity },
  { href: "/app/settings", label: "Workspace settings", icon: Settings },
];
const adminNav = [
  { href: "/platform", label: "Overview", icon: LayoutDashboard },
  { href: "/platform/organizations", label: "Organizations", icon: Building2 },
  { href: "/platform/products", label: "Product access", icon: ClipboardCheck },
  { href: "/platform/audit", label: "Audit events", icon: Shield },
];

export default function DashboardShell({ title, subtitle, name, role, children }: Props) {
  const isAdmin = role === "admin";
  const links = isAdmin ? adminNav : role === "owner"
    ? [...customerNav.slice(0, 3), { href: "/app/team", label: "Team management", icon: Users }, ...customerNav.slice(3), { href: "/app/billing", label: "Plans & billing", icon: ClipboardCheck }]
    : customerNav;
  const items = <nav aria-label="Workspace navigation" className="space-y-1.5">
    {links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/70 transition hover:bg-violet-400/10 hover:text-white"><Icon size={18} className="shrink-0 text-violet-300" aria-hidden="true"/>{label}</Link>)}
    {!isAdmin && <Link href="/choose-workspace" className="block rounded-xl px-3 py-3 text-sm text-violet-300 hover:bg-violet-400/10">Choose company</Link>}
  </nav>;
  const roleName = isAdmin ? "Platform Super Admin" : role === "owner" ? "Business Owner" : "Employee";
  return <main className="mx-auto w-full max-w-[1700px] px-4 py-6 sm:px-8 sm:py-9">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-violet-400/15 bg-[#171023]/80 px-5 py-4">
      <div><p className="text-sm font-semibold text-white">Solve<span className="text-violet-300">Oi</span> / {isAdmin ? "Platform control" : "Business workspace"}</p><p className="mt-1 text-xs text-white/45">Intelligence That Solves.</p></div>
      <span className="rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-200">{roleName}</span>
    </div>
    <div className="grid gap-5 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-8">
      <aside className="hidden self-start rounded-3xl border border-violet-400/15 bg-[#150E20]/90 p-5 lg:sticky lg:top-5 lg:block">
        <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[.18em] text-violet-300">Navigation</p>{items}
        <div className="mt-8 border-t border-white/10 px-3 pt-5"><p className="truncate text-sm text-white">{name}</p><p className="mt-1 text-xs text-white/45">{roleName}</p><SignOutButton/></div>
      </aside>
      <div className="min-w-0">
        <details className="mb-6 rounded-2xl border border-violet-400/15 bg-[#150E20]/90 lg:hidden"><summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-violet-200">Open workspace navigation</summary><div className="border-t border-white/10 p-3">{items}<div className="mt-3 border-t border-white/10 px-3 pt-3"><p className="text-sm">{name}</p><SignOutButton/></div></div></details>
        <div className="mb-7"><p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-300">{isAdmin ? "Platform" : "Workspace"} / Overview</p><h1 className="mt-3 text-3xl font-bold tracking-[-.05em] sm:text-4xl lg:text-[42px]">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">{subtitle}</p></div>
        {children}
      </div>
    </div>
  </main>;
}
