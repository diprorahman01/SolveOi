"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import type { Group } from "three";

function Sculpture({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<Group>(null);
  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group || reduceMotion) return;
    group.rotation.y += Math.min(delta, .05) * .16;
    group.rotation.x = .2 + Math.sin(state.clock.elapsedTime * .32) * .12;
    group.position.y = Math.sin(state.clock.elapsedTime * .6) * .07;
  });
  return <group ref={groupRef} rotation={[.2,.35,-.12]}>
    <mesh rotation={[.32,-.1,.3]}><torusKnotGeometry args={[1.05,.27,220,32,2,3]}/><meshPhysicalMaterial color="#F3B17F" metalness={.82} roughness={.17} clearcoat={1} clearcoatRoughness={.08} envMapIntensity={1.8}/></mesh>
    <mesh scale={.51} rotation={[.25,.4,0]}><icosahedronGeometry args={[1,3]}/><meshPhysicalMaterial color="#9C634A" metalness={.65} roughness={.14} clearcoat={1} envMapIntensity={1.4}/></mesh>
    <mesh rotation={[1.1,.2,.32]}><torusGeometry args={[1.57,.018,12,160]}/><meshPhysicalMaterial color="#FFD4A6" metalness={.65} roughness={.16} emissive="#C87949" emissiveIntensity={.12}/></mesh>
    <mesh rotation={[.25,1,-.28]}><torusGeometry args={[1.52,.012,12,160]}/><meshBasicMaterial color="#FFE2BE" transparent opacity={.45}/></mesh>
    <mesh position={[-1.83,1.2,-.55]} scale={.17}><icosahedronGeometry args={[1,2]}/><meshPhysicalMaterial color="#FFCF9A" metalness={.88} roughness={.12} clearcoat={1}/></mesh>
  </group>;
}
export default function ChromeSculpture({className=""}:{className?:string}) {
 const reduceMotion=Boolean(useReducedMotion());
 return <div role="img" aria-label="Floating pearl-orange metallic SolveOi intelligence sculpture" className={`relative aspect-square w-full ${className}`}>
  <div aria-hidden="true" className="pointer-events-none absolute inset-[17%] rounded-full bg-orange-300/25 blur-[65px]"/>
  <div aria-hidden="true" className="pointer-events-none absolute inset-[31%] rounded-full bg-orange-200/15 blur-[55px]"/>
  <Canvas camera={{position:[0,0,7.5],fov:40,near:.1,far:100}} dpr={[1,1.5]} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}} fallback={<div className="flex h-full items-center justify-center"><div className="h-52 w-52 rounded-full border-[16px] border-orange-400/70 shadow-[0_0_90px_rgba(225,116,36,.4)]"/></div>}>
   <ambientLight intensity={1.4}/><directionalLight position={[5,5,6]} intensity={4} color="#FFFFFF"/>
   <pointLight position={[-4,2,4]} intensity={35} color="#FFC08C"/><pointLight position={[3,-3,4]} intensity={20} color="#FFE0B4"/>
   <Environment resolution={128}><Lightformer form="rect" intensity={3.5} color="#FFFFFF" position={[0,4,5]} scale={[7,1.5,1]}/><Lightformer form="rect" intensity={3.5} color="#F4B189" position={[-4,0,3]} scale={[1.5,6,1]}/><Lightformer form="rect" intensity={2.5} color="#FFE0B7" position={[4,-1,3]} scale={[1.5,5,1]}/><Lightformer form="ring" intensity={2} color="#FFF0D5" position={[0,0,-4]} scale={7}/></Environment>
   <Sculpture reduceMotion={reduceMotion}/>
  </Canvas>
 </div>;
}
