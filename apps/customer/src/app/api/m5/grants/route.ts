import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { workspaceApi, readJson, safeObject, stringField, badRequest, mutationOriginAllowed } from "@/lib/m5-access";
import { grants, logAudit } from "@/lib/m5-data";
import { isProductId } from "@/lib/m5-catalog";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!mutationOriginAllowed(request)) return badRequest("Cross-origin request denied", 403);
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const { ctx } = access;
  if (ctx.role !== "owner") return badRequest("Only Business Owners can grant employee access", 403);
  try {
    const input = safeObject(await readJson(request, 2000));
    if (!input) return badRequest("Invalid request");
    const userId = stringField(input, "userId", 150);
    const productId = stringField(input, "productId", 80);
    if (!userId || !isProductId(productId) || typeof input.enabled !== "boolean") return badRequest("Invalid employee, product or permission");
    const org = await auth.api.getFullOrganization({ headers: await headers() });
    if (!org || org.id !== ctx.organizationId) return badRequest("Company not selected", 403);
    const member = org.members.find(item => item.userId === userId);
    if (!member || member.role.split(",").includes("owner")) return badRequest("Employee is not part of your company", 403);
    await grants().updateOne({ organizationId: ctx.organizationId, userId, productId }, { $set: { enabled: input.enabled, updatedAt: new Date(), updatedBy: ctx.userId } }, { upsert: true });
    await logAudit({ organizationId: ctx.organizationId, actorId: ctx.userId, action: "employee.product_grant.updated", targetType: "user", targetId: userId, details: { productId, enabled: input.enabled } });
    return NextResponse.json({ ok: true });
  } catch { return badRequest("Unable to update employee permissions"); }
}
