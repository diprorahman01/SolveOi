"use client";

type GlobalErrorProps = {error: Error & {digest?:string};reset:()=>void};

export default function GlobalError({error,reset}:GlobalErrorProps) {
 return (
  <html lang="en">
   <body style={{margin:0,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"Arial, Helvetica, sans-serif",color:"#3c2a22",background:"radial-gradient(ellipse at 70% 0%,rgba(255,196,137,.24),transparent 70%),linear-gradient(135deg,#fffdfa,#fff0e3 48%,#ffe4ce)"}}>
    <main style={{width:"100%",maxWidth:480,padding:40,textAlign:"center",border:"1px solid rgba(255,205,160,.35)",borderRadius:24,background:"linear-gradient(140deg,#fffefa,#ffeedf 50%,#ffdcc3)",boxShadow:"0 25px 65px rgba(139,80,44,.11)"}}>
     <div style={{fontSize:28,fontWeight:800,marginBottom:32}}>Solve<span style={{color:"#a65b39"}}>Oi</span></div>
     <h1 style={{fontSize:30,fontWeight:700,marginBottom:16,color:"#3c2a22"}}>Something went wrong</h1>
     <p style={{fontSize:15,color:"#705548",lineHeight:1.7,marginBottom:28}}>We encountered an unexpected problem. Please try again.</p>
     <button type="button" onClick={()=>reset()} style={{width:"100%",padding:"14px 20px",background:"linear-gradient(110deg,#ffe1b5,#ffc18d,#f6a36e)",color:"#3b261e",border:"1px solid rgba(255,214,176,.65)",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer"}}>Try Again</button>
     {error.digest && <p style={{marginTop:24,fontSize:11,color:"#896c5b"}}>Error reference: {error.digest}</p>}
    </main>
   </body>
  </html>
 );
}
