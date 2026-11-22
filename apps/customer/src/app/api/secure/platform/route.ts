import { NextResponse } from "next/server";
import { apiIdentity } from "@/lib/api-access";
export async function GET(request: Request) {
  try {
    const session = await apiIdentity(request.headers);
    if (!session) return NextResponse.json({authorized:false}, {status:401,headers:{"Cache-Control":"no-store"}});
    if (session.user.role !== "admin") return NextResponse.json({authorized:false}, {status:403,headers:{"Cache-Control":"no-store"}});
    return NextResponse.json({authorized:true,role:"super_admin"}, {headers:{"Cache-Control":"no-store"}});
  } catch (e) {
    console.error("Platform API error:",e);
    return NextResponse.json({message:"Authentication service unavailable"}, {status:503});
  }
}
