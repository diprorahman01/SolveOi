"use client";
import { motion, useReducedMotion } from "motion/react";
export default function AnimatedBackground(){
 const reducedMotion=useReducedMotion();
 return <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
  <div className="absolute inset-0 bg-[#fff3e6]"/>
  <motion.div className="absolute -left-28 top-12 h-96 w-96 rounded-full bg-[#ffc39a]/25 blur-[100px]" animate={reducedMotion?undefined:{x:[0,90,0],y:[0,45,0]}} transition={{duration:18,ease:"easeInOut",repeat:Infinity}}/>
  <motion.div className="absolute -right-20 top-28 h-96 w-96 rounded-full bg-[#ffdebb]/20 blur-[100px]" animate={reducedMotion?undefined:{x:[0,-80,0],y:[0,60,0]}} transition={{duration:20,ease:"easeInOut",repeat:Infinity}}/>
  <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(145,92,62,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(145,92,62,.055)_1px,transparent_1px)] [background-size:60px_60px]"/>
 </div>;
}
