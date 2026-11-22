import { GridFSBucket } from "mongodb";
import { workspaceApi, badRequest } from "@/lib/m5-access";
import { files, parseId } from "@/lib/m5-data";
import { db } from "@/lib/mongodb";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const id = parseId((await params).id);
  if (!id) return badRequest("Invalid file ID");
  const { ctx } = access;
  const scope = ctx.role === "owner" ? { _id: id, organizationId: ctx.organizationId } : { _id: id, organizationId: ctx.organizationId, uploadedBy: ctx.userId };
  const record = await files().findOne(scope);
  if (!record) return badRequest("File not found", 404);
  const bucket = new GridFSBucket(db, { bucketName: "m5_private_assets" });
  try {
    const chunks: Buffer[] = [];
    const stream = bucket.openDownloadStream(record.storageId);
    for await (const chunk of stream) chunks.push(Buffer.from(chunk as Buffer));
    const data = Buffer.concat(chunks);
    if (data.length > 5 * 1024 * 1024) return badRequest("Stored file exceeds permitted size", 413);
    return new Response(new Uint8Array(data), { headers: {
      "Content-Type": record.mimeType,
      "Content-Disposition": `attachment; filename="${record.name.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_")}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    } });
  } catch { return badRequest("Unable to retrieve file", 404); }
}
