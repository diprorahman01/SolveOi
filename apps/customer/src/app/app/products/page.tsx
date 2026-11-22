import DashboardShell from "@/components/DashboardShell";
import { requireWorkspace } from "@/lib/access";
import { PRODUCTS } from "@/lib/m5-catalog";
import { entitlements, grants } from "@/lib/m5-data";
export const dynamic = "force-dynamic";
export default async function Page() {
  const { identity, organization, role } = await requireWorkspace();
  const [granted, userGrants] = await Promise.all([
    entitlements().find({ organizationId: organization.id }).toArray(),
    grants().find({ organizationId: organization.id, userId: identity.user.id }).toArray(),
  ]);
  return <DashboardShell role={role} name={identity.user.name} title="AI product catalog" subtitle="Explore six focused tools. Product access is enforced on the server; unavailable tools cannot be executed."><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{PRODUCTS.map(product => <article key={product.id} className="rounded-3xl border border-violet-400/15 bg-[#191124] p-6"><p className="text-xs font-semibold uppercase tracking-widest text-violet-300">{product.category}</p><h2 className="mt-4 text-xl font-semibold">{product.name}</h2><p className="mt-3 min-h-20 text-sm leading-7 text-white/50">{product.description}</p><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">Coming Soon</span><span className="rounded-full border border-violet-400/20 px-3 py-1 text-xs text-violet-200">{!granted.some(item => item.productId === product.id && item.enabled) ? "Not entitled" : role !== "owner" && !userGrants.some(item => item.productId === product.id && item.enabled) ? "Permission required" : "Access prepared — unreleased"}</span></div></article>)}</div></DashboardShell>;
}
