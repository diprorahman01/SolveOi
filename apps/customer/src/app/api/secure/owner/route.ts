import { NextResponse } from "next/server";
import { apiOwner } from "@/lib/api-access";
export async function GET(request: Request) {
  try {
    const ctx = await apiOwner(request.headers);
    if (ctx.status !== 200) return NextResponse.json({authorized:false}, {status:ctx.status,headers:{"Cache-Control":"no-store"}});
    return NextResponse.json({authorized:true, role:"business_owner", organizationId:ctx.organization.id}, {headers:{"Cache-Control":"no-store"}});
  } catch (e) {
    console.error("Owner API error:", e);
    return NextResponse.json({message:"Authentication service unavailable"}, {status:503});
  }
}
