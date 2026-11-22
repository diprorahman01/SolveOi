import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
async function Content({searchParams}:{searchParams:Promise<{token?:string}>}){
 const {token}=await searchParams; return <AuthForm mode="reset" token={token}/>;
}
export default function Page({searchParams}:{searchParams:Promise<{token?:string}>}){
 return <Suspense fallback={<main className="p-12 text-center">Loading reset form…</main>}><Content searchParams={searchParams}/></Suspense>;
}
