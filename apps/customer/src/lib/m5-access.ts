import "server-only";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./auth";
import type { WorkspaceRole } from "./m5-models";

type ApiContext = { userId: string; userName: string; organizationId: string; role: WorkspaceRole };
type ApiResult = { ok: true; ctx: ApiContext } | { ok: false; response: NextResponse };

export async function workspaceApi(): Promise<ApiResult> {
  const incoming = await headers();
  const session = await auth.api.getSession({ headers: incoming });
  if (!session) return { ok: false, response: NextResponse.json({ error: "Sign in required" }, { status: 401 }) };
  if (session.user.role === "admin") return { ok: false, response: NextResponse.json({ error: "Use platform administration" }, { status: 403 }) };
  const [member, org] = await Promise.all([
    auth.api.getActiveMember({ headers: incoming }),
    auth.api.getFullOrganization({ headers: incoming }),
  ]);
  if (!member || !org || member.organizationId !== org.id) {
    return { ok: false, response: NextResponse.json({ error: "Select a company workspace" }, { status: 403 }) };
  }
  const role: WorkspaceRole = member.role.split(",").includes("owner") ? "owner" : "member";
  return { ok: true, ctx: { userId: session.user.id, userName: session.user.name, organizationId: org.id, role } };
}

export async function platformApi() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false as const, response: NextResponse.json({ error: "Sign in required" }, { status: 401 }) };
  if (session.user.role !== "admin") return { ok: false as const, response: NextResponse.json({ error: "Platform admin only" }, { status: 403 }) };
  return { ok: true as const, userId: session.user.id };
}

export function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function readJson(request: Request, maxBytes = 12000): Promise<unknown> {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > maxBytes) throw new Error("Request is too large");
  const raw = await request.text();
  if (raw.length > maxBytes) throw new Error("Request is too large");
  return JSON.parse(raw) as unknown;
}

export function stringField(data: Record<string, unknown>, key: string, max = 200) {
  const value = data[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function safeObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

/** Block browser cross-site mutations; API tokens alone are never placed in client code. */
export function mutationOriginAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  try { return new URL(origin).origin === new URL(allowed).origin; } catch { return false; }
}
