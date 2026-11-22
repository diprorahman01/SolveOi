import {Suspense} from "react";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {auth} from "@/lib/auth";
import AcceptInvitation from "@/components/AcceptInvitation";
async function Content({searchParams}:{searchParams:Promise<{id?:string}>}){
 const {id}=await searchParams;
 if(!id)return <main className="p-16 text-center">Missing invitation ID.</main>;
 const session=await auth.api.getSession({headers:await headers()});
 if(!session)redirect(`/sign-in?next=${encodeURIComponent(`/accept-invitation?id=${encodeURIComponent(id)}`)}`);
 return <main className="px-4 py-16"><AcceptInvitation id={id}/></main>;
}
export default function Page({searchParams}:{searchParams:Promise<{id?:string}>}){return <Suspense fallback={<main className="p-16 text-center">Checking invitation…</main>}><Content searchParams={searchParams}/></Suspense>}
