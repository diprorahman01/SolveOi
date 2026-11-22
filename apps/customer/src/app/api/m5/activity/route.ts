import { NextResponse } from "next/server";
import { workspaceApi } from "@/lib/m5-access";
import { audits } from "@/lib/m5-data";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const { ctx } = access;
  const filter = ctx.role === "owner" ? { organizationId: ctx.organizationId } : { organizationId: ctx.organizationId, actorId: ctx.userId };
  const rows = await audits().find(filter).sort({ createdAt: -1 }).limit(100).toArray();
  return NextResponse.json({ events: rows.map(row => ({ ...row, _id: String(row._id) })) }, { headers: { "Cache-Control": "no-store" } });
}
