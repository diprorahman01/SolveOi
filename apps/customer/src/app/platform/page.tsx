import Link from "next/link";
import { Activity, Building2, Boxes, Users } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import M5Metric from "@/components/M5Metric";
import { requirePlatformAdmin } from "@/lib/access";
import { db } from "@/lib/mongodb";
import { tasks, audits } from "@/lib/m5-data";
export const dynamic = "force-dynamic";
export default async function Page() {
  const identity = await requirePlatformAdmin();
  const [users, organizations, workflowTasks, logCount, recent] = await Promise.all([
    db.collection("user").countDocuments(), db.collection("organization").countDocuments(), tasks().countDocuments(), audits().countDocuments(), audits().find({}).sort({ createdAt: -1 }).limit(8).toArray(),
  ]);
  return <DashboardShell role="admin" name={identity.user.name} title="Platform control" subtitle="A secured operational overview of SolveOi organizations, users and shared infrastructure."><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><M5Metric title="Users" value={users} icon={Users}/><M5Metric title="Organizations" value={organizations} icon={Building2}/><M5Metric title="Workflow tasks" value={workflowTasks} icon={Boxes}/><M5Metric title="Audit events" value={logCount} icon={Activity}/></div><div className="mt-6 grid gap-4 md:grid-cols-3">{[{ href: "/platform/organizations", title: "Organizations", text: "Review registered company workspaces." }, { href: "/platform/products", title: "Product access", text: "Prepare entitlements without prematurely launching products." }, { href: "/platform/audit", title: "Security and activity", text: "Review platform workflow audit history." }].map(card => <Link key={card.href} href={card.href} className="rounded-2xl border border-violet-400/15 bg-[#191124] p-6 transition hover:border-violet-400/40"><h2 className="font-semibold">{card.title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{card.text}</p></Link>)}</div><section className="mt-6 rounded-2xl border border-white/10 bg-[#171023] p-6"><h2 className="text-lg font-semibold">Recent platform audit trail</h2>{!recent.length ? <p className="mt-4 text-sm text-white/45">No M5 activity recorded yet.</p> : <div className="mt-4 space-y-3">{recent.map(event => <div key={String(event._id)} className="flex flex-wrap justify-between gap-3 border-b border-white/5 pb-3 text-sm"><span>{event.action} <span className="text-white/35">({event.organizationId})</span></span><span className="text-xs text-white/40">{new Date(event.createdAt).toLocaleString("en-GB")}</span></div>)}</div>}</section><p className="mt-5 text-sm text-white/40">Administrator permissions remain enforced server-side. Do not use this dashboard to inspect customer file contents without an explicitly designed, audited support process.</p></DashboardShell>;
}
