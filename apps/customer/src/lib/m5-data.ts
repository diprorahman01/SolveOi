import "server-only";
import { ObjectId } from "mongodb";
import { db } from "./mongodb";
import type { AuditRecord, FileRecord, ProductEntitlement, ProductGrant, SubscriptionRecord, UsageEvent, WorkTask } from "./m5-models";

export const tasks = () => db.collection<WorkTask>("m5_tasks");
export const audits = () => db.collection<AuditRecord>("m5_audit_logs");
export const files = () => db.collection<FileRecord>("m5_files");
export const entitlements = () => db.collection<ProductEntitlement>("m5_entitlements");
export const grants = () => db.collection<ProductGrant>("m5_product_grants");
export const subscriptions = () => db.collection<SubscriptionRecord>("m5_subscriptions");
export const usage = () => db.collection<UsageEvent>("m5_usage_events");

export function parseId(value: string): ObjectId | null {
  return /^[0-9a-fA-F]{24}$/.test(value) ? new ObjectId(value) : null;
}

export async function logAudit(event: Omit<AuditRecord, "createdAt">): Promise<void> {
  await audits().insertOne({ ...event, createdAt: new Date() });
}

export async function dashboardStats(organizationId: string, userId: string, owner: boolean) {
  const scope = owner ? { organizationId } : { organizationId, createdBy: userId };
  const fileScope = owner ? { organizationId } : { organizationId, uploadedBy: userId };
  const [taskCount, pending, recent, uploads, usageCount] = await Promise.all([
    tasks().countDocuments(scope),
    tasks().countDocuments({ ...scope, status: "awaiting_approval" }),
    tasks().find(scope).sort({ createdAt: -1 }).limit(5).toArray(),
    files().countDocuments(fileScope),
    usage().countDocuments(owner ? { organizationId } : { organizationId, userId }),
  ]);
  return { taskCount, pending, recent, uploads, usageCount };
}
