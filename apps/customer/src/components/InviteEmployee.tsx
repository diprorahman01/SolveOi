"use client";
import {useState,type FormEvent} from "react";
import {authClient} from "@/lib/auth-client";
export default function InviteEmployee({organizationId}:{organizationId:string}){
 const[email,setEmail]=useState("");const[busy,setBusy]=useState(false);const[error,setError]=useState("");const[info,setInfo]=useState("");
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");setInfo("");
 try{const r=await authClient.organization.inviteMember({organizationId,email:email.trim().toLowerCase(),role:"member"});if(r.error)throw Error(r.error.message||"Invitation failed");setEmail("");setInfo("Invitation sent. Check the development server terminal for the link when using console email.")}
 catch(e){setError(e instanceof Error?e.message:"Could not invite employee")}finally{setBusy(false)}}
 return <form className="glass rounded-2xl p-6" onSubmit={submit}>
 <h2 className="text-xl font-bold">Invite an employee</h2><p className="muted mt-3 text-sm">Invited members can view their own company workspace, not owner controls.</p>
 <label className="mt-5 block text-sm">Email address<input className="field mt-2" type="email" required maxLength={200} value={email} onChange={e=>setEmail(e.target.value)}/></label>
 <button className="button mt-5" disabled={busy}>{busy?"Inviting…":"Send invitation"}</button>
 {error&&<p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}{info&&<p role="status" className="mt-4 text-sm text-violet-300">{info}</p>}
 </form>
}
