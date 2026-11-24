import { NextResponse } from "next/server";
import { workspaceApi, badRequest, mutationOriginAllowed, readJson, safeObject } from "@/lib/m5-access";
import { db } from "@/lib/mongodb";
import { subscriptions, logAudit } from "@/lib/m5-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const requests = () => db.collection<{ organizationId: string; userId: string; plan: string; status: "pending_manual_review"; createdAt: Date }>("m12_plan_requests");
const plans = [{ code: "starter", title: "Starter (pricing not yet published)" }, { code: "growth", title: "Growth (pricing not yet published)" }, { code: "business", title: "Business (pricing not yet published)" }];
export async function GET() {
  const access = await workspaceApi(); if (!access.ok) return access.response;
  const ctx = access.ctx;
  if (ctx.role !== "owner") return badRequest("Owner only", 403);
  const [subscription, lastRequests] = await Promise.all([subscriptions().findOne({ organizationId: ctx.organizationId }), requests().find({ organizationId: ctx.organizationId }).sort({ createdAt: -1 }).limit(10).toArray()]);
  return NextResponse.json({ plans, subscription: subscription ? { status: subscription.status, planCode: subscription.planCode } : { status: "not_subscribed", planCode: "none" }, requests: lastRequests.map(x => ({ id: String(x._id), plan: x.plan, status: x.status, createdAt: x.createdAt })), checkoutAvailable: false, note: "No automatic billing, charges, or payment fulfillment is configured." }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: Request) {
  if (!mutationOriginAllowed(request)) return badRequest("Invalid origin", 403);
  const access = await workspaceApi(); if (!access.ok) return access.response;
  const ctx = access.ctx; if (ctx.role !== "owner") return badRequest("Owner only", 403);
  let body; try { body = safeObject(await readJson(request, 1500)); } catch { return badRequest("Invalid input"); }
  const plan = typeof body?.plan === "string" ? body.plan : "";
  if (!plans.some(x => x.code === plan)) return badRequest("Invalid plan");
  const recent = await requests().findOne({ organizationId: ctx.organizationId, userId: ctx.userId, createdAt: { $gte: new Date(Date.now() - 3600000) } });
  if (recent) return badRequest("A plan request is already pending. Try again later.", 429);
  const result = await requests().insertOne({ organizationId: ctx.organizationId, userId: ctx.userId, plan, status: "pending_manual_review", createdAt: new Date() });
  await logAudit({ organizationId: ctx.organizationId, actorId: ctx.userId, action: "billing.plan_request.created", targetType: "plan_request", targetId: String(result.insertedId), details: { plan } });
  return NextResponse.json({ status: "pending_manual_review", checkoutAvailable: false }, { status: 201 });
}
