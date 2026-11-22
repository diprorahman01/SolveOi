import { NextResponse } from "next/server";
import { workspaceApi } from "@/lib/m5-access";
import { entitlements, grants } from "@/lib/m5-data";
import { PRODUCTS } from "@/lib/m5-catalog";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const [existing, userGrants] = await Promise.all([
    entitlements().find({ organizationId: access.ctx.organizationId }).toArray(),
    grants().find({ organizationId: access.ctx.organizationId, userId: access.ctx.userId }).toArray(),
  ]);
  return NextResponse.json({ products: PRODUCTS.map(product => ({ ...product, entitled: Boolean(existing.find(item => item.productId === product.id)?.enabled), employeeGranted: access.ctx.role === "owner" || Boolean(userGrants.find(item => item.productId === product.id)?.enabled), usable: false })) }, { headers: { "Cache-Control": "no-store" } });
}
