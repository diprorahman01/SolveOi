import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireIdentity() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  return session;
}

export async function requirePlatformAdmin() {
  const identity = await requireIdentity();
  if (identity.user.role !== "admin") redirect("/app");
  return identity;
}

export async function requireWorkspace() {
  const identity = await requireIdentity();
  if (identity.user.role === "admin") redirect("/platform");
  const requestHeaders = await headers();
  const activeMember = await auth.api.getActiveMember({ headers: requestHeaders });
  if (!activeMember) redirect("/choose-workspace");
  const activeOrganization = await auth.api.getFullOrganization({headers: requestHeaders});
  if (!activeOrganization) redirect("/choose-workspace");
  const role: "owner" | "member" =
  activeMember.role.split(",").includes("owner")
    ? "owner"
    : "member";
  return {identity, member:activeMember, organization:activeOrganization, role};
}

export async function requireOwner() {
  const ctx = await requireWorkspace();
  if (ctx.role !== "owner") redirect("/app");
  return ctx;
}
