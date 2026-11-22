import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({ status: "ok", service: "solveoi-m5", checkedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
}
