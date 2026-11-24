import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import { requireWorkspace } from "@/lib/access";
import { PRODUCTS } from "@/lib/m5-catalog";
import { productAccess } from "@/lib/product-workflows";
export const dynamic = "force-dynamic";
export default async function Page() {
  const { identity, organization, role } = await requireWorkspace();
  const status = await Promise.all(PRODUCTS.map(async product => ({ product, access: await productAccess({ organizationId: organization.id, userId: identity.user.id, role }, product.id) })));
  return <DashboardShell role={role} name={identity.user.name} title="SolveOi product workspaces" subtitle="Six internal beta workflows. Access is tenant-scoped and gated; public commercial activation has not been completed."><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{status.map(({ product, access }) => <article key={product.id} className="rounded-3xl border border-violet-400/15 bg-[#191124] p-6"><p className="text-xs font-semibold uppercase tracking-widest text-violet-300">{product.category}</p><h2 className="mt-4 text-xl font-semibold">{product.name}</h2><p className="mt-3 min-h-20 text-sm leading-7 text-white/50">{product.description}</p><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">Internal beta · human review</span><span className="rounded-full border border-violet-400/20 px-3 py-1 text-xs text-violet-200">{access.allowed ? "Access enabled" : "Requires entitlement/grant"}</span></div><Link className="mt-5 inline-block rounded-xl border border-violet-400/30 px-4 py-2 text-sm text-violet-200 hover:bg-violet-400/10" href={`/app/tools/${product.id}`}>Open workspace</Link></article>)}</div></DashboardShell>;
}
