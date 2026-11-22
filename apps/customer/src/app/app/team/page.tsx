import DashboardShell from "@/components/DashboardShell";
import InviteEmployee from "@/components/InviteEmployee";
import M5EmployeeGrants from "@/components/M5EmployeeGrants";
import { requireOwner } from "@/lib/access";
import { PRODUCTS } from "@/lib/m5-catalog";
import { grants } from "@/lib/m5-data";
export const dynamic = "force-dynamic";
export default async function Page() {
  const { identity, organization } = await requireOwner();
  const employees = organization.members.filter(item => !item.role.split(",").includes("owner"));
  const existing = await grants().find({ organizationId: organization.id }).toArray();
  return <DashboardShell role="owner" name={identity.user.name} title="Team & permissions" subtitle={`Manage invitations and prepare employee permissions for ${organization.name}.`}><InviteEmployee organizationId={organization.id}/><section className="mt-6 rounded-2xl border border-violet-400/15 bg-[#171023] p-6"><h2 className="text-lg font-semibold">Team directory</h2><div className="mt-5 space-y-3">{organization.members.map(member => <div key={member.id} className="flex flex-wrap justify-between gap-3 rounded-xl border border-white/10 p-4"><span className="text-sm">{member.user.name} <span className="break-all text-white/40">({member.user.email})</span></span><span className="text-xs text-violet-200">{member.role.split(",").includes("owner") ? "Business Owner" : "Employee"}</span></div>)}</div></section><section className="mt-6 rounded-2xl border border-violet-400/15 bg-[#171023] p-6"><h2 className="text-lg font-semibold">Future product permissions</h2><p className="mt-2 text-sm leading-6 text-white/50">These permissions are stored securely, but the AI products remain unavailable until their separate releases.</p><M5EmployeeGrants members={employees.map(member => ({ userId: member.userId, name: member.user.name }))} products={PRODUCTS.map(product => ({ id: product.id, name: product.name }))}/>{existing.length > 0 && <div className="mt-6 border-t border-white/10 pt-4"><p className="text-sm font-semibold">Saved permissions</p><div className="mt-3 space-y-2">{existing.map(grant => <p key={`${grant.userId}-${grant.productId}`} className="break-all text-xs text-white/50">{grant.userId} · {grant.productId} · {grant.enabled ? "Allowed" : "Blocked"}</p>)}</div></div>}</section></DashboardShell>;
}
