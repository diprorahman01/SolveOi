import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import {requireWorkspace} from "@/lib/access";
export default async function Page(){const {identity,organization,role}=await requireWorkspace();
 return <DashboardShell role={role} name={identity.user.name} title={`Welcome, ${identity.user.name.split(" ")[0]}.`} subtitle={`Your ${organization.name} workspace`}>
 <div className="grid gap-4 md:grid-cols-3">
  {[{label:"Organization",value:organization.name},{label:"Members",value:String(organization.members.length)},{label:"Your access",value:role==="owner"?"Business Owner":"Employee"}].map(x=><div key={x.label} className="glass rounded-2xl p-6"><p className="muted text-xs">{x.label}</p><p className="mt-3 text-xl font-semibold">{x.value}</p></div>)}
 </div><div className="glass mt-6 rounded-3xl p-8"><h2 className="text-2xl font-bold">Your AI workspace</h2><p className="muted mt-4 text-sm leading-7">The M3 identity and team system is ready for your six upcoming AI products. Product processing and subscriptions will be connected in later milestones.</p>
 {role==="owner"&&<Link href="/app/team" className="button mt-6">Manage your team</Link>}</div>
 </DashboardShell>;
}
