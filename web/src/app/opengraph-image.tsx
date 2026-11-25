import { ImageResponse } from "next/og";
export const size = {width:1200,height:630};
export const contentType = "image/png";
export const alt = "SolveOi — Intelligence That Solves";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:85,background:"linear-gradient(130deg,#fffcf4 5%,#ffe7d2 50%,#ffc99f 100%)",color:"#3d2921"}}>
      <div style={{fontSize:42,fontWeight:700}}>Solve<span style={{color:"#ac5835"}}>Oi</span></div>
      <div style={{marginTop:65,maxWidth:900,fontSize:70,fontWeight:700,letterSpacing:-3,lineHeight:1.1}}>Real problems.<br/>Intelligent solutions.</div>
      <div style={{marginTop:35,fontSize:25,color:"#725143"}}>Practical AI tools for everyday business work.</div>
    </div>,size
  );
}
