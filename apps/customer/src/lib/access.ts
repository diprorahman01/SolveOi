
import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireIdentity() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return session;
}

export async function requirePlatformAdmin() {
  const identity = await requireIdentity();

  if (identity.user.role !== "admin") {
    redirect("/app");
  }

  return identity;
}

export async function requireWorkspace() {
  const identity = await requireIdentity();

  // Platform Super Admins use a separate dashboard.
  if (identity.user.role === "admin") {
    redirect("/platform");
  }

  const requestHeaders = await headers();

  // Better Auth allows sessions without an active company.
  // Check this BEFORE requesting the active member.
  const activeOrganizationId = (
    identity.session as {
      activeOrganizationId?: string | null;
    }
  ).activeOrganizationId;

  if (!activeOrganizationId) {
    const organizations = await auth.api.listOrganizations({
      headers: requestHeaders,
    });

    // First-time customer: create a company.
    if (!organizations || organizations.length === 0) {
      redirect("/onboarding");
    }

    // Existing customer: choose a company.
    redirect("/choose-workspace");
  }

  const activeMember = await auth.api.getActiveMember({
    headers: requestHeaders,
  });

  if (
    !activeMember ||
    activeMember.organizationId !== activeOrganizationId
  ) {
    redirect("/choose-workspace");
  }

  const activeOrganization =
    await auth.api.getFullOrganization({
      headers: requestHeaders,
    });

  if (
    !activeOrganization ||
    activeOrganization.id !== activeOrganizationId
  ) {
    redirect("/choose-workspace");
  }

  const role: "owner" | "member" =
    activeMember.role.split(",").includes("owner")
      ? "owner"
      : "member";

  return {
    identity,
    member: activeMember,
    organization: activeOrganization,
    role,
  };
}

export async function requireOwner() {
  const context = await requireWorkspace();

  if (context.role !== "owner") {
    redirect("/app");
  }

  return context;
}
