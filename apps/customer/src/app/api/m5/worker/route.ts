import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { tasks, usage, logAudit } from "@/lib/m5-data";
import { runApprovedSandbox } from "@/lib/m5-ai";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function validSecret(request: Request) {
  const expected = process.env.M5_WORKER_SECRET || "";
  const value = request.headers.get("authorization") || "";
  const actual = value.startsWith("Bearer ") ? value.slice(7) : "";
  if (expected.length < 32 || actual.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

export async function POST(request: Request) {
  if (!validSecret(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (process.env.M5_AI_ENABLED !== "true" || process.env.M5_SANDBOX_ENABLED !== "true") return NextResponse.json({ enabled: false, processed: 0 });
  const now = new Date();
  await tasks().updateMany({ kind: "ai_sandbox", status: "processing", leaseUntil: { $lt: now }, attempts: { $lt: 3 } }, { $set: { status: "queued", updatedAt: now } });
  await tasks().updateMany({ kind: "ai_sandbox", status: "processing", leaseUntil: { $lt: now }, attempts: { $gte: 3 } }, { $set: { status: "failed", lastError: "Worker timed out", updatedAt: now } });
  const task = await tasks().findOneAndUpdate(
    { kind: "ai_sandbox", status: "queued", attempts: { $lt: 3 } },
    { $set: { status: "processing", leaseUntil: new Date(now.getTime() + 60000), updatedAt: now }, $inc: { attempts: 1 } },
    { sort: { createdAt: 1 }, returnDocument: "after" },
  );
  if (!task || !task._id) return NextResponse.json({ processed: 0 });
  try {
    const result = await runApprovedSandbox(task.details);
    await tasks().updateOne({ _id: task._id, status: "processing" }, { $set: { status: "awaiting_approval", result: result.text, updatedAt: new Date() }, $unset: { leaseUntil: "" } });
    await usage().insertOne({ organizationId: task.organizationId, userId: task.createdBy, taskId: String(task._id), productId: "sandbox", provider: "openai", model: result.model, inputTokens: result.inputTokens, outputTokens: result.outputTokens, createdAt: new Date() });
    await logAudit({ organizationId: task.organizationId, actorId: task.createdBy, action: "ai_sandbox.completed", targetType: "task", targetId: String(task._id) });
    return NextResponse.json({ processed: 1, status: "awaiting_approval" });
  } catch (error) {
    const retry = task.attempts < 3;
    await tasks().updateOne({ _id: task._id, status: "processing" }, { $set: { status: retry ? "queued" : "failed", lastError: error instanceof Error ? error.message.slice(0, 250) : "AI processing error", updatedAt: new Date() }, $unset: { leaseUntil: "" } });
    return NextResponse.json({ processed: 1, status: retry ? "retry_queued" : "failed" });
  }
}
