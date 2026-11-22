import DashboardShell from "@/components/DashboardShell";
import InviteEmployee from "@/components/InviteEmployee";
import {requireOwner} from "@/lib/access";
export default async function Page(){const {identity,organization}=await requireOwner();
 return <DashboardShell role="owner" name={identity.user.name} title="Team management" subtitle={`Company access for ${organization.name}`}>
 <InviteEmployee organizationId={organization.id}/>
 <section className="glass mt-6 rounded-2xl p-6"><h2 className="text-xl font-bold">Team members</h2><div className="mt-6 space-y-3">{organization.members.map(m=><div key={m.id} className="flex flex-wrap justify-between gap-3 rounded-xl border border-white/10 p-4"><span className="text-sm">{m.user.name} <span className="muted">({m.user.email})</span></span><span className="text-sm text-violet-300">{m.role.split(",").includes("owner")?"Business Owner":"Employee"}</span></div>)}</div></section>
 </DashboardShell>;
}
