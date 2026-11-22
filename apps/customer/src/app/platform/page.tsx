import DashboardShell from "@/components/DashboardShell";
import {requirePlatformAdmin} from "@/lib/access";
import {db} from "@/lib/mongodb";
export default async function Page(){const identity=await requirePlatformAdmin();
 const [users,companies]=await Promise.all([db.collection("user").countDocuments(),db.collection("organization").countDocuments()]);
 return <DashboardShell role="admin" name={identity.user.name} title="Platform administration" subtitle="SolveOi internal dashboard — platform access verified on the server">
 <div className="grid gap-4 md:grid-cols-2"><div className="glass rounded-2xl p-7"><p className="muted text-sm">Users</p><p className="mt-3 text-4xl font-bold">{users}</p></div><div className="glass rounded-2xl p-7"><p className="muted text-sm">Organizations</p><p className="mt-3 text-4xl font-bold">{companies}</p></div></div>
 <p className="muted mt-6 text-sm">Platform actions that change account status require separate audit and authorization workflows and are not enabled here.</p>
 </DashboardShell>;
}
