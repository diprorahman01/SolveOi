import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import M5UploadFile from "@/components/M5UploadFile";
import { requireWorkspace } from "@/lib/access";
import { files } from "@/lib/m5-data";
export const dynamic = "force-dynamic";
export default async function Page() {
  const { identity, organization, role } = await requireWorkspace();
  const scope = role === "owner" ? { organizationId: organization.id } : { organizationId: organization.id, uploadedBy: identity.user.id };
  const list = await files().find(scope).sort({ createdAt: -1 }).limit(100).toArray();
  return <DashboardShell role={role} name={identity.user.name} title="Private documents" subtitle="Files remain inside your company workspace. Employees see only their own uploads; owners can view the company uploads."><M5UploadFile/><section className="mt-6 rounded-3xl border border-white/10 bg-[#171023] p-5 sm:p-7"><h2 className="text-lg font-semibold">Uploaded files</h2>{!list.length ? <p className="mt-5 text-sm text-white/45">No files have been uploaded yet.</p> : <div className="mt-5 space-y-3">{list.map(file => <div key={String(file._id)} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 p-4"><div className="min-w-0"><p className="break-all text-sm font-semibold">{file.name}</p><p className="mt-1 text-xs text-white/40">{Math.ceil(file.size / 1024)} KB · {new Date(file.createdAt).toLocaleDateString("en-GB")}</p></div><Link className="rounded-lg border border-violet-400/30 px-3 py-2 text-xs text-violet-200" href={`/api/m5/files/${String(file._id)}`}>Download</Link></div>)}</div>}</section><p className="mt-5 text-xs leading-6 text-white/40">M5 uses private MongoDB GridFS storage for this initial implementation. Move to object storage before high-volume production use.</p></DashboardShell>;
}
