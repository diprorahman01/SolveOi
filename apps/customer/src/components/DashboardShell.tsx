import Image from "next/image";
import Link from "next/link";
import { Activity, Boxes, Building2, ClipboardCheck, FileText, LayoutDashboard, Shield, Users, Settings, ListTodo } from "lucide-react";
import SignOutButton from "./SignOutButton";

type Props = {
  title: string;
  subtitle: string;
  name: string;
  role: "admin" | "owner" | "member";
  children: React.ReactNode;
};

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
  const links = isAdmin ? adminNav : role === "owner" ? [
    ...customerNav.slice(0, 3),
    { href: "/app/team", label: "Team management", icon: Users },
    ...customerNav.slice(3),
    { href: "/app/billing", label: "Plans & billing", icon: ClipboardCheck },
  ] : customerNav;
  const roleName = isAdmin ? "Platform Super Admin" : role === "owner" ? "Business Owner" : "Employee";

  const items = <nav aria-label="Workspace navigation" className="space-y-1.5">
    {links.map(({ href, label, icon: Icon }) => (
      <Link key={href} href={href}
        className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-[#62483c] transition hover:border-[#ffcf9f]/20 hover:bg-gradient-to-r hover:from-[#ffc48f]/15 hover:to-[#ef995f]/10 hover:text-[#62483c] focus-visible:outline-offset-2">
        <Icon size={18} className="shrink-0 text-[#985334] transition group-hover:text-[#985334]" aria-hidden="true" />
        {label}
      </Link>
    ))}
    {!isAdmin && <Link href="/choose-workspace" className="block rounded-xl border border-[#ffca9a]/20 bg-gradient-to-r from-[#ffd4a5]/10 to-transparent px-3 py-3 text-sm font-medium text-[#62483c] transition hover:border-[#ffd4aa]/40 hover:text-[#653a29]">Choose company</Link>}
  </nav>;

  return <main className="mx-auto w-full max-w-[1700px] px-4 py-6 sm:px-8 sm:py-9">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#ffd2a5]/30 bg-gradient-to-r from-[#fffaf4] via-[#ffebd9] to-[#ffe0c8] px-5 py-4 shadow-[0_12px_35px_rgba(53,29,27,.12)]">
      <div>
        <div className="flex items-center gap-3">
          <Image unoptimized src="/solveoi-logo-orange-v2.png" width={1491} height={531} alt="SolveOi" className="h-[34px] w-auto max-w-[114px] object-contain sm:h-[40px] sm:max-w-[135px]" />
          <div className="border-l border-[#e6ba97] pl-3">
            <p className="text-xs font-bold text-[#624131]">{isAdmin ? "Platform control" : "Business workspace"}</p>
            <p className="mt-0.5 text-[11px] text-[#8c6048]">Carry less. Grow more.</p>
          </div>
        </div>
      </div>
      <span className="rounded-full border border-[#ffd2a8]/35 bg-gradient-to-r from-[#ffcb96]/20 to-[#f1a273]/10 px-3 py-1.5 text-xs font-medium text-[#62483c]">{roleName}</span>
    </div>

    <div className="grid gap-5 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-8">
      <aside className="hidden self-start rounded-3xl border border-[#e7c09f]/75 bg-gradient-to-br from-[#fff9f2] via-[#ffeddf] to-[#ffe2cc] p-5 shadow-[0_20px_50px_rgba(42,24,23,.13)] lg:sticky lg:top-5 lg:block">
        <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[.18em] text-[#985334]">Navigation</p>
        {items}
        <div className="mt-8 border-t border-[#ffe0bc]/20 px-3 pt-5">
          <p className="truncate text-sm font-medium text-[#62483c]">{name}</p>
          <p className="mt-1 text-xs text-[#62483c]">{roleName}</p>
          <SignOutButton />
        </div>
      </aside>
      <div className="min-w-0">
        <details className="mb-6 rounded-2xl border border-[#e7c09f]/75 bg-gradient-to-br from-[#fff9f2] to-[#ffe1cb] lg:hidden">
          <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-[#62483c]">Open workspace navigation</summary>
          <div className="border-t border-[#ffe1bd]/20 p-3">
            {items}
            <div className="mt-3 border-t border-[#ffe1bd]/20 px-3 pt-3">
              <p className="text-sm text-[#62483c]">{name}</p>
              <SignOutButton />
            </div>
          </div>
        </details>
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#985334]">{isAdmin ? "Platform" : "Workspace"} / Overview</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-.05em] text-[#62483c] sm:text-4xl lg:text-[42px]">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#62483c]">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  </main>;
}
