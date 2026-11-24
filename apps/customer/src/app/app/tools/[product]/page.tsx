import { notFound } from "next/navigation";
import "./print.css";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import ProductWorkspace from "@/components/ProductWorkspace";
import { requireWorkspace } from "@/lib/access";
import { isWorkflowProduct, productAccess } from "@/lib/product-workflows";
import { PRODUCTS } from "@/lib/m5-catalog";

export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  if (!isWorkflowProduct(product)) notFound();
  const { identity, organization, role } = await requireWorkspace();
  const access = await productAccess({ organizationId: organization.id, userId: identity.user.id, role }, product);
  const definition = PRODUCTS.find(p => p.id === product)!;
  return <DashboardShell title={definition.name} subtitle={`${definition.description} Internal review workflow; human approval required.`} role={role} name={identity.user.name}>
    {!access.allowed ? <div className="rounded-2xl border border-amber-400/20 bg-[#1b1423] p-6"><h2 className="font-semibold">Access not enabled</h2><p className="mt-3 text-sm text-white/60">Your company needs a product entitlement; employees also need an explicit product grant. For local evaluation, you can enable SOLVEOI_INTERNAL_PRODUCT_PREVIEW=true in .env.local and restart the server.</p><Link className="mt-4 inline-block text-violet-300 underline" href="/app/products">Back to products</Link></div> : <ProductWorkspace product={product} role={role}/>}
  </DashboardShell>;
}
