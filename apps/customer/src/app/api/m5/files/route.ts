import { GridFSBucket } from "mongodb";
import { NextResponse } from "next/server";
import { workspaceApi, badRequest, mutationOriginAllowed } from "@/lib/m5-access";
import { db } from "@/lib/mongodb";
import { files, logAudit } from "@/lib/m5-data";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_BYTES = 5 * 1024 * 1024;
const MIME = new Set(["application/pdf", "image/png", "image/jpeg", "text/plain"]);
function signatureValid(buffer: Buffer, mime: string) {
  if (mime === "application/pdf") return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
  if (mime === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (mime === "image/jpeg") return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (mime === "text/plain") return !buffer.includes(0) && buffer.toString("utf8").length > 0;
  return false;
}

export async function GET() {
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const { ctx } = access;
  const scope = ctx.role === "owner" ? { organizationId: ctx.organizationId } : { organizationId: ctx.organizationId, uploadedBy: ctx.userId };
  const rows = await files().find(scope).sort({ createdAt: -1 }).limit(100).toArray();
  return NextResponse.json({ files: rows.map(row => ({ id: String(row._id), name: row.name, mimeType: row.mimeType, size: row.size, uploadedBy: row.uploadedBy, createdAt: row.createdAt })) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!mutationOriginAllowed(request)) return badRequest("Cross-origin request denied", 403);
  const access = await workspaceApi();
  if (!access.ok) return access.response;
  const { ctx } = access;
  const length = Number(request.headers.get("content-length") || "0");
  if (length > MAX_BYTES + 30000) return badRequest("File exceeds 5 MB", 413);
  try {
    if (await files().countDocuments({ organizationId: ctx.organizationId, uploadedBy: ctx.userId }) >= 50) return badRequest("Initial private file quota reached (50 files per user)", 429);
    const form = await request.formData();
    const input = form.get("file");
    if (!(input instanceof File)) return badRequest("Choose a file to upload");
    if (input.size < 1 || input.size > MAX_BYTES || !MIME.has(input.type)) return badRequest("Only PDF, PNG, JPEG or text files up to 5 MB are allowed");
    const buffer = Buffer.from(await input.arrayBuffer());
    if (!signatureValid(buffer, input.type)) return badRequest("File content does not match its declared type");
    const cleanName = input.name.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 120) || "document";
    const bucket = new GridFSBucket(db, { bucketName: "m5_private_assets" });
    const upload = bucket.openUploadStream(cleanName, { contentType: input.type, metadata: { organizationId: ctx.organizationId, uploadedBy: ctx.userId } });
    const storageId = await new Promise<typeof upload.id>((resolve, reject) => {
      upload.once("finish", () => resolve(upload.id));
      upload.once("error", reject);
      upload.end(buffer);
    });
    const row = await files().insertOne({ organizationId: ctx.organizationId, uploadedBy: ctx.userId, name: cleanName, mimeType: input.type, size: input.size, storageId, createdAt: new Date() });
    await logAudit({ organizationId: ctx.organizationId, actorId: ctx.userId, action: "file.uploaded", targetType: "file", targetId: String(row.insertedId) });
    return NextResponse.json({ id: String(row.insertedId), name: cleanName }, { status: 201 });
  } catch {
    return badRequest("Upload failed. Verify the file and try again");
  }
}
