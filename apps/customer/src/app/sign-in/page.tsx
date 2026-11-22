import { Suspense } from "react";
import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
export const metadata:Metadata={title:"Sign In"};
async function Content({searchParams}:{searchParams:Promise<{next?:string}>}){
 const {next}=await searchParams; return <AuthForm mode="sign-in" next={next}/>;
}
export default function Page({searchParams}:{searchParams:Promise<{next?:string}>}){
 return <Suspense fallback={<main className="p-12 text-center">Loading sign in…</main>}><Content searchParams={searchParams}/></Suspense>;
}
