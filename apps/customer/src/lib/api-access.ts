import { auth } from "./auth";

export async function apiIdentity(headers: Headers) {
  return auth.api.getSession({headers});
}
export async function apiOwner(headers: Headers) {
  const session = await apiIdentity(headers);
  if (!session) return {status: 401 as const};
  const member = await auth.api.getActiveMember({headers});
  const organization = await auth.api.getFullOrganization({headers});
  if (!member || !organization || !member.role.split(",").includes("owner")) return {status:403 as const};
  return {status:200 as const,session,member,organization};
}
