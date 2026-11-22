import { NextResponse } from "next/server";
import { workspaceApi, readJson, safeObject, stringField, badRequest, mutationOriginAllowed } from "@/lib/m5-access";
import { tasks, logAudit } from "@/lib/m5-data";
import type { WorkTask } from "@/lib/m5-models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const { ctx } = access;
  const scope = ctx.role === "owner" ? { organizationId: ctx.organizationId } : { organizationId: ctx.organizationId, createdBy: ctx.userId };
  const rows = await tasks().find(scope).sort({ createdAt: -1 }).limit(100).toArray();
  return NextResponse.json({ tasks: rows.map(row => ({ ...row, _id: String(row._id) })) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!mutationOriginAllowed(request)) return badRequest("Cross-origin request denied", 403);
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const { ctx } = access;
  try {
    const value = safeObject(await readJson(request));
    if (!value) return badRequest("Invalid JSON object");
    const title = stringField(value, "title", 120);
    const details = stringField(value, "details", 3000);
    const kind = value.kind === "ai_sandbox" ? "ai_sandbox" : "manual";
    if (title.length < 3 || details.length < 5) return badRequest("Title and details are required");
    if (kind === "ai_sandbox" && (process.env.M5_AI_ENABLED !== "true" || process.env.M5_SANDBOX_ENABLED !== "true")) return badRequest("AI sandbox is not enabled", 403);
    if (kind === "ai_sandbox" && (await tasks().countDocuments({ organizationId: ctx.organizationId, kind, status: { $in: ["queued", "processing"] } })) >= 3) return badRequest("Too many queued AI sandbox tasks", 429);
    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    if (await tasks().countDocuments({ organizationId: ctx.organizationId, createdBy: ctx.userId, createdAt: { $gte: todayUTC } }) >= 50) return badRequest("Daily workflow task limit reached", 429);
    const row: WorkTask = {
      organizationId: ctx.organizationId,
      createdBy: ctx.userId,
      title, details, kind,
      status: kind === "manual" ? "awaiting_approval" : "queued",
      attempts: 0, createdAt: now, updatedAt: now,
    };
    const inserted = await tasks().insertOne(row);
    await logAudit({ organizationId: ctx.organizationId, actorId: ctx.userId, action: "task.created", targetType: "task", targetId: String(inserted.insertedId), details: { kind } });
    return NextResponse.json({ id: String(inserted.insertedId), status: row.status }, { status: 201 });
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : "Invalid request");
  }
}
