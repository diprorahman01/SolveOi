import { NextResponse } from "next/server";
import { platformApi, readJson, safeObject, stringField, badRequest, mutationOriginAllowed } from "@/lib/m5-access";
import { entitlements, logAudit } from "@/lib/m5-data";
import { isProductId } from "@/lib/m5-catalog";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!mutationOriginAllowed(request)) return badRequest("Cross-origin request denied", 403);
  const access = await platformApi();
  if (!access.ok) return access.response;
  try {
    const input = safeObject(await readJson(request, 2000));
    if (!input) return badRequest("Invalid request");
    const organizationId = stringField(input, "organizationId", 150);
    const productId = stringField(input, "productId", 80);
    if (!organizationId || !isProductId(productId) || typeof input.enabled !== "boolean") return badRequest("Invalid organization, product or status");
    const { db } = await import("@/lib/mongodb");
    const org = await db.collection("organization").findOne({ id: organizationId });
    // Better Auth uses string ids as Mongo document _id or id, depending on adapter configuration.
    // Validate against the organization's canonical key without relying on untrusted caller data.
    if (!org) {
      const byObjectId = /^[a-f0-9]{24}$/i.test(organizationId)
        ? await db.collection("organization").findOne({ _id: new (await import("mongodb")).ObjectId(organizationId) })
        : null;
      if (!byObjectId) return badRequest("Organization not found", 404);
    }
    await entitlements().updateOne(
      { organizationId, productId },
      { $set: { enabled: input.enabled, updatedAt: new Date(), updatedBy: access.userId } },
      { upsert: true },
    );
    await logAudit({ organizationId, actorId: access.userId, action: "product.entitlement.updated", targetType: "product", targetId: productId, details: { enabled: input.enabled } });
    return NextResponse.json({ ok: true });
  } catch {
    return badRequest("Invalid entitlement request");
  }
}
