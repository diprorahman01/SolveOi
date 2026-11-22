import { NextResponse } from "next/server";
import { workspaceApi, readJson, safeObject, badRequest, mutationOriginAllowed } from "@/lib/m5-access";
import { tasks, logAudit, parseId } from "@/lib/m5-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!mutationOriginAllowed(request)) return badRequest("Cross-origin request denied", 403);
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const { ctx } = access;
  if (ctx.role !== "owner") return badRequest("Only Business Owners can review tasks", 403);
  const id = parseId((await params).id);
  if (!id) return badRequest("Invalid task ID");
  try {
    const input = safeObject(await readJson(request, 1000));
    if (!input || (input.decision !== "approved" && input.decision !== "rejected")) return badRequest("Decision must be approved or rejected");
    const now = new Date();
    const result = await tasks().findOneAndUpdate(
      { _id: id, organizationId: ctx.organizationId, status: "awaiting_approval" },
      { $set: { status: input.decision, approvedBy: ctx.userId, reviewedAt: now, updatedAt: now } },
      { returnDocument: "after" },
    );
    if (!result) return badRequest("Task not found or already reviewed", 409);
    await logAudit({ organizationId: ctx.organizationId, actorId: ctx.userId, action: `task.${input.decision}`, targetType: "task", targetId: String(id) });
    return NextResponse.json({ id: String(id), status: result.status });
  } catch {
    return badRequest("Invalid review request");
  }
}
