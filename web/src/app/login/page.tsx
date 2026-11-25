import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {title:"Log In",description:"Sign in to your SolveOi business workspace.",robots:{index:false,follow:false}};
export default function LoginPage() {
  const customerAppUrl = process.env.CUSTOMER_APP_URL || (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");
  if (customerAppUrl) redirect(new URL("/sign-in",customerAppUrl).toString());
  return <main className="relative flex min-h-[65vh] items-center overflow-hidden bg-gradient-to-br from-[#493028] via-[#6b4030] to-[#352927] py-24 text-[#62483c]">
    <Container><div className="mx-auto max-w-xl rounded-[30px] border border-[#ffd0a0]/35 bg-gradient-to-br from-[#86533e] via-[#634035] to-[#432f2d] p-10 text-center shadow-[0_24px_60px_rgba(45,24,20,.16)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ffd0a0]/35 bg-gradient-to-br from-[#ffd3a4]/30 to-[#f3a26c]/15 text-[#985334]"><LockKeyhole size={30}/></div>
      <h1 className="mt-7 text-4xl font-semibold text-[#62483c]">Customer workspace</h1>
      <p className="mt-5 leading-8 text-[#62483c]">Customer authentication is temporarily unavailable. Please contact SolveOi for assistance.</p>
      <Link href="/contact" className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-[#ffe1b9] to-[#ffb783] px-7 py-3 font-bold text-[#39251e] transition hover:brightness-105">Contact SolveOi</Link>
    </div></Container>
  </main>;
}
