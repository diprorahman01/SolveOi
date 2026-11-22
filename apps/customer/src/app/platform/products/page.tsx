import DashboardShell from "@/components/DashboardShell";
import M5EntitlementEditor from "@/components/M5EntitlementEditor";
import { requirePlatformAdmin } from "@/lib/access";
import { PRODUCTS } from "@/lib/m5-catalog";
import { db } from "@/lib/mongodb";
import { entitlements } from "@/lib/m5-data";
export const dynamic = "force-dynamic";
export default async function Page() {
  const identity = await requirePlatformAdmin();
  const [orgs, existing] = await Promise.all([db.collection<{ name?: string }>("organization").find({}).limit(200).toArray(), entitlements().find({}).sort({ updatedAt: -1 }).limit(100).toArray()]);
  const choices = orgs.map(org => ({ id: String(org._id), name: org.name || String(org._id) }));
  return <DashboardShell role="admin" name={identity.user.name} title="Product entitlements" subtitle="Configure future access per organization. Product availability stays off until each product is released and tested."><M5EntitlementEditor organizations={choices} products={PRODUCTS.map(item => ({ id: item.id, name: item.name }))}/><section className="mt-6 rounded-2xl border border-white/10 bg-[#171023] p-6"><h2 className="text-lg font-semibold">Recent entitlement changes</h2>{!existing.length ? <p className="mt-4 text-sm text-white/45">No entitlements set yet.</p> : <div className="mt-4 space-y-3">{existing.map((item, index) => <div key={`${item.organizationId}-${item.productId}-${index}`} className="flex flex-wrap justify-between gap-3 border-b border-white/5 pb-3 text-sm"><span className="break-all">{item.organizationId} · {item.productId}</span><span className="text-violet-200">{item.enabled ? "Granted — product unreleased" : "Not granted"}</span></div>)}</div>}</section></DashboardShell>;
}
