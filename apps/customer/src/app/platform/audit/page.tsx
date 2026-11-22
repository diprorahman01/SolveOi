import DashboardShell from "@/components/DashboardShell";
import { requirePlatformAdmin } from "@/lib/access";
import { audits } from "@/lib/m5-data";
export const dynamic = "force-dynamic";
export default async function Page() {
  const identity = await requirePlatformAdmin();
  const events = await audits().find({}).sort({ createdAt: -1 }).limit(150).toArray();
  return <DashboardShell role="admin" name={identity.user.name} title="Platform audit trail" subtitle="Review recent permission-sensitive and workflow events; the underlying log is append-only to the application roles."><div className="rounded-3xl border border-violet-400/15 bg-[#171023] p-5 sm:p-7">{events.length ? <div className="space-y-3">{events.map(event => <div key={String(event._id)} className="rounded-xl border border-white/10 p-4"><div className="flex flex-wrap justify-between gap-2"><p className="text-sm font-semibold">{event.action}</p><p className="text-xs text-white/40">{new Date(event.createdAt).toLocaleString("en-GB")}</p></div><p className="mt-2 break-all text-xs text-white/45">Organization: {event.organizationId} · Actor: {event.actorId}</p></div>)}</div> : <p className="text-sm text-white/45">No events recorded yet.</p>}</div></DashboardShell>;
}
