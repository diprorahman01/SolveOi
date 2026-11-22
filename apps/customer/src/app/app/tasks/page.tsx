import DashboardShell from "@/components/DashboardShell";
import M5CreateTask from "@/components/M5CreateTask";
import M5ReviewTask from "@/components/M5ReviewTask";
import { requireWorkspace } from "@/lib/access";
import { tasks } from "@/lib/m5-data";
export const dynamic = "force-dynamic";
export default async function Page() {
  const { identity, organization, role } = await requireWorkspace();
  const scope = role === "owner" ? { organizationId: organization.id } : { organizationId: organization.id, createdBy: identity.user.id };
  const list = await tasks().find(scope).sort({ createdAt: -1 }).limit(100).toArray();
  const allowSandbox = process.env.M5_AI_ENABLED === "true" && process.env.M5_SANDBOX_ENABLED === "true";
  return <DashboardShell role={role} name={identity.user.name} title="Workflow tasks" subtitle="Create review tasks, track their status, and keep a recorded approval history."><M5CreateTask allowSandbox={allowSandbox}/><section className="mt-6 rounded-3xl border border-violet-400/15 bg-[#171023] p-5 sm:p-7"><h2 className="text-lg font-semibold">Task history</h2>{!list.length ? <p className="mt-5 text-sm text-white/45">No tasks have been created yet.</p> : <div className="mt-5 space-y-3">{list.map(task => <div key={String(task._id)} className="rounded-2xl border border-white/10 bg-[#100B18] p-4 sm:p-5"><div className="flex flex-wrap justify-between gap-3"><div className="min-w-0"><h3 className="font-semibold break-words">{task.title}</h3><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-white/55">{task.details}</p></div><span className="h-fit rounded-full border border-violet-400/20 px-3 py-1 text-xs text-violet-200">{task.status.replaceAll("_", " ")}</span></div>{task.result && <div className="mt-4 whitespace-pre-wrap break-words rounded-lg border border-violet-400/15 bg-violet-400/5 p-4 text-sm text-white/75"><p className="mb-2 text-xs uppercase tracking-wider text-violet-300">AI draft — requires human review</p>{task.result}</div>}<div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-white/35">{new Date(task.createdAt).toLocaleString("en-GB")} · {task.kind === "ai_sandbox" ? "AI sandbox" : "Manual"}</p>{role === "owner" && task.status === "awaiting_approval" && <M5ReviewTask taskId={String(task._id)}/>}</div></div>)}</div>}</section></DashboardShell>;
}
