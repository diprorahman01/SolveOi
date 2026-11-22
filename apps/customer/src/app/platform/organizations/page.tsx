import DashboardShell from "@/components/DashboardShell";
import { requirePlatformAdmin } from "@/lib/access";
import { db } from "@/lib/mongodb";
export const dynamic = "force-dynamic";
export default async function Page() {
  const identity = await requirePlatformAdmin();
  const rows = await db.collection<{ name?: string; slug?: string; createdAt?: Date }>("organization").find({}).sort({ createdAt: -1 }).limit(100).toArray();
  return <DashboardShell role="admin" name={identity.user.name} title="Organizations" subtitle="Read-only directory of registered company accounts. Changes require separate server-authorized operations."><div className="rounded-3xl border border-violet-400/15 bg-[#171023] p-5 sm:p-7">{rows.length ? <div className="space-y-3">{rows.map(org => <div key={String(org._id)} className="flex flex-wrap justify-between gap-3 rounded-xl border border-white/10 p-4"><div><h2 className="font-semibold">{org.name || "Untitled organization"}</h2><p className="mt-2 text-xs text-white/45">{org.slug || "No slug"}</p></div><span className="text-xs text-white/35">{org.createdAt ? new Date(org.createdAt).toLocaleDateString("en-GB") : "Registered"}</span></div>)}</div> : <p className="text-sm text-white/50">No organizations have registered yet.</p>}</div></DashboardShell>;
}
