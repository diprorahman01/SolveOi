import { NextResponse } from "next/server";
import { workspaceApi } from "@/lib/m5-access";
import { usage } from "@/lib/m5-data";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const { ctx } = access;
  const filter = ctx.role === "owner" ? { organizationId: ctx.organizationId } : { organizationId: ctx.organizationId, userId: ctx.userId };
  const events = await usage().find(filter).sort({ createdAt: -1 }).limit(100).toArray();
  return NextResponse.json({ usage: events.map(item => ({ id: String(item._id), model: item.model, provider: item.provider, productId: item.productId, inputTokens: item.inputTokens, outputTokens: item.outputTokens, createdAt: item.createdAt })) }, { headers: { "Cache-Control": "no-store" } });
}
