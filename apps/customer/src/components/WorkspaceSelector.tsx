"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
type Org={id:string;name:string;slug:string};
export default function WorkspaceSelector(){const[items,setItems]=useState<Org[]>([]);const[busy,setBusy]=useState(false);const[loading,setLoading]=useState(true);const[error,setError]=useState("");
 useEffect(()=>{let live=true;authClient.organization.list().then(r=>{if(!live)return;if(r.error)setError(r.error.message||"Could not load companies");else setItems(r.data||[]);setLoading(false)});return()=>{live=false}},[]);
 async function choose(id:string){setBusy(true);setError("");const r=await authClient.organization.setActive({organizationId:id});if(r.error){setError(r.error.message||"Unable to select company");setBusy(false);return}window.location.assign("/app")}
 return <div className="glass mx-auto max-w-xl rounded-3xl p-8"><h1 className="text-3xl font-bold">Choose a company</h1><p className="muted mt-3 text-sm">Only organizations you belong to appear here.</p>
 {loading?<p className="mt-6 text-violet-300">Loading…</p>:items.length?<div className="mt-6 space-y-3">{items.map(o=><button disabled={busy} onClick={()=>choose(o.id)} key={o.id} className="block w-full rounded-xl border border-white/10 p-4 text-left hover:border-violet-400/50"><b>{o.name}</b><span className="muted mt-1 block text-xs">{o.slug}</span></button>)}</div>:<Link href="/onboarding" className="button mt-6">Create company</Link>}
 {error&&<p className="mt-5 text-sm text-red-300">{error}</p>}</div>;
}
