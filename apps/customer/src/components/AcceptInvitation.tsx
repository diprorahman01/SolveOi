"use client";
import {useState} from "react";
import {authClient} from "@/lib/auth-client";
export default function AcceptInvitation({id}:{id:string}){const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function accept(){setBusy(true);setError("");const r=await authClient.organization.acceptInvitation({invitationId:id});if(r.error){setError(r.error.message||"Invitation could not be accepted");setBusy(false);return}window.location.assign("/choose-workspace")}
 return <div className="glass mx-auto max-w-lg rounded-3xl p-9 text-center"><h1 className="text-3xl font-bold">Join your team</h1><p className="muted mt-4">Accept your invitation to join your company workspace.</p>
 <button className="button mt-7" onClick={accept} disabled={busy||!id}>{busy?"Joining…":"Accept invitation"}</button>{error&&<p className="mt-4 text-sm text-red-300">{error}</p>}</div>
}
