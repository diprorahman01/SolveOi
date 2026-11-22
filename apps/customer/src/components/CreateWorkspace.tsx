"use client";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
export default function CreateWorkspace(){const[name,setName]=useState("");const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function create(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");try{
  const base=name.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,35);
  const slug=`${base||"company"}-${crypto.randomUUID().slice(0,8)}`;
  const r=await authClient.organization.create({name:name.trim(),slug});if(r.error)throw Error(r.error.message||"Could not create company");
  if(r.data){const active=await authClient.organization.setActive({organizationId:r.data.id});if(active.error)throw Error(active.error.message||"Could not select company");}
  window.location.assign("/app");
 }catch(e){setError(e instanceof Error?e.message:"Unable to create company");setBusy(false)}}
 return <form className="glass mx-auto max-w-xl rounded-3xl p-8" onSubmit={create}>
 <p className="text-xs uppercase tracking-widest text-violet-300">Business onboarding</p><h1 className="mt-4 text-3xl font-bold">Create your company</h1>
 <p className="muted mt-4 text-sm">You will be the Business Owner. Your team can be invited afterward.</p>
 <label className="mt-7 block text-sm">Company name<input className="field mt-2" minLength={2} maxLength={100} required value={name} onChange={e=>setName(e.target.value)}/></label>
 {error&&<p className="mt-4 text-sm text-red-300">{error}</p>}
 <button className="button mt-6 w-full" disabled={busy}>{busy?"Creating…":"Create company"}</button></form>
}
