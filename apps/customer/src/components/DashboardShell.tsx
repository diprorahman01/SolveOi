import Link from "next/link";
import SignOutButton from "./SignOutButton";
export default function DashboardShell({title,subtitle,name,role,children}:{title:string;subtitle:string;name:string;role:"admin"|"owner"|"member";children:React.ReactNode}){
 const admin=role==="admin";
 return <main className="mx-auto grid max-w-[1650px] gap-7 px-4 py-9 sm:px-8 lg:grid-cols-[235px_minmax(0,1fr)]">
 <aside className="glass rounded-3xl p-6 self-start">
  <p className="text-xs uppercase tracking-[.16em] text-violet-300">Navigation</p>
  <nav className="mt-5 space-y-3 text-sm">
   {admin?<Link href="/platform" className="block rounded-xl p-3 hover:bg-white/5">Platform dashboard</Link>:<>
    <Link href="/app" className="block rounded-xl p-3 hover:bg-white/5">Overview</Link>
    <Link href="/choose-workspace" className="block rounded-xl p-3 hover:bg-white/5">Choose company</Link>
    {role==="owner"&&<Link href="/app/team" className="block rounded-xl p-3 hover:bg-white/5">Team & invitations</Link>}
   </>}
  </nav>
  <div className="mt-10 border-t border-white/10 pt-5"><p className="muted truncate text-xs">{name}</p><p className="mt-2 text-sm text-violet-300">{role==="admin"?"Super Admin":role==="owner"?"Business Owner":"Employee"}</p><SignOutButton/></div>
 </aside>
 <div className="min-w-0"><p className="text-xs uppercase tracking-[.18em] text-violet-300">SolveOi Workspace</p><h1 className="mt-4 text-4xl font-bold tracking-tight">{title}</h1><p className="muted mt-3 text-sm">{subtitle}</p><div className="mt-8">{children}</div></div>
 </main>
}
