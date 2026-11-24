import { NextResponse } from "next/server";
import { workspaceApi, badRequest, mutationOriginAllowed, readJson, safeObject } from "@/lib/m5-access";
import { parseId, logAudit } from "@/lib/m5-data";
import { isWorkflowProduct, workflows, productAccess } from "@/lib/product-workflows";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Params = { params: Promise<{ product: string; id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!mutationOriginAllowed(request)) return badRequest("Invalid request origin", 403);
  const { product, id } = await params;
  if (!isWorkflowProduct(product)) return badRequest("Unknown product", 404);
  const _id = parseId(id);
  if (!_id) return badRequest("Invalid record ID");
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const ctx = access.ctx;
  if (ctx.role !== "owner") return badRequest("Owner approval required", 403);
  if (!(await productAccess(ctx, product)).allowed) return badRequest("Product entitlement required", 403);
  let body;
  try { body = safeObject(await readJson(request, 1500)); } catch { return badRequest("Invalid request"); }
  if (!body || (body.status !== "approved" && body.status !== "rejected")) return badRequest("Status must be approved or rejected");
  const now = new Date();
  const updated = await workflows().findOneAndUpdate(
    { _id, organizationId: ctx.organizationId, productId: product, status: "awaiting_approval" },
    { $set: { status: body.status, reviewedBy: ctx.userId, reviewedAt: now, updatedAt: now } },
    { returnDocument: "after" },
  );
  if (!updated) return badRequest("Record not found or already reviewed", 409);
  await logAudit({ organizationId: ctx.organizationId, actorId: ctx.userId, action: `product.record.${body.status}`, targetType: updated.kind, targetId: id, details: { productId: product } });
  return NextResponse.json({ status: updated.status, id }, { headers: { "Cache-Control": "no-store" } });
}
