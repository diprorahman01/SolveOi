"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
export default function SignOutButton(){const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function logout(){setBusy(true);setError("");try{const r=await authClient.signOut();if(r.error)throw Error(r.error.message);window.location.assign("/sign-in");}catch(e){setError(e instanceof Error?e.message:"Sign out failed");setBusy(false)}}
 return <div><button className="outline-button mt-6 text-sm" disabled={busy} onClick={logout}>{busy?"Signing out…":"Sign out"}</button>{error&&<p className="mt-2 text-xs text-red-300">{error}</p>}</div>
}
