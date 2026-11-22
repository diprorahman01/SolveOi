import type { ObjectId } from "mongodb";

export type WorkspaceRole = "owner" | "member";
export type TaskStatus = "queued" | "processing" | "awaiting_approval" | "approved" | "rejected" | "failed";
export type TaskKind = "manual" | "ai_sandbox";
export type ProductId = "quote" | "extract" | "collect" | "follow" | "respond" | "hr-desk";

export interface WorkTask {
  _id?: ObjectId;
  organizationId: string;
  createdBy: string;
  title: string;
  details: string;
  kind: TaskKind;
  status: TaskStatus;
  productId?: ProductId;
  result?: string;
  assignedTo?: string;
  approvedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  attempts: number;
  leaseUntil?: Date;
  lastError?: string;
}

export interface AuditRecord {
  organizationId: string;
  actorId: string;
  action: string;
  targetType: string;
  targetId?: string;
  createdAt: Date;
  details?: Record<string, string | number | boolean>;
}

export interface ProductEntitlement {
  organizationId: string;
  productId: ProductId;
  enabled: boolean;
  updatedAt: Date;
  updatedBy: string;
}

export interface FileRecord {
  organizationId: string;
  uploadedBy: string;
  name: string;
  mimeType: string;
  size: number;
  storageId: ObjectId;
  createdAt: Date;
}

export interface UsageEvent {
  organizationId: string;
  userId: string;
  taskId: string;
  productId: string;
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  createdAt: Date;
}

export interface ProductGrant {
  organizationId: string;
  userId: string;
  productId: ProductId;
  enabled: boolean;
  updatedAt: Date;
  updatedBy: string;
}

export interface SubscriptionRecord {
  organizationId: string;
  status: "not_subscribed" | "trial" | "active" | "past_due" | "cancelled";
  planCode: string;
  createdAt: Date;
  updatedAt: Date;
  providerReference?: string;
}
