"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { Shape, type Group } from "three";
function StarObject({reducedMotion}:{reducedMotion:boolean}){
 const groupRef=useRef<Group>(null);
 const starShape=useMemo(()=>{const shape=new Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2;const r=i%2===0?1.25:.58;const x=Math.cos(a)*r;const y=Math.sin(a)*r;if(i===0)shape.moveTo(x,y);else shape.lineTo(x,y);}shape.closePath();return shape;},[]);
 useFrame((state,delta)=>{const group=groupRef.current;if(!group||reducedMotion)return;group.rotation.y+=Math.min(delta,.05)*.26;group.rotation.z+=Math.min(delta,.05)*.07;group.rotation.x=.22+Math.sin(state.clock.elapsedTime*.4)*.15;group.position.y=Math.sin(state.clock.elapsedTime*.75)*.12;});
 return <group ref={groupRef} rotation={[.22,-.35,-.2]} scale={.94}>
  <mesh><extrudeGeometry args={[starShape,{depth:.36,steps:1,bevelEnabled:true,bevelThickness:.14,bevelSize:.12,bevelSegments:5,curveSegments:12}]}/><meshPhysicalMaterial color="#F6BE8E" metalness={.88} roughness={.12} clearcoat={1} clearcoatRoughness={.06} envMapIntensity={2} side={2}/></mesh>
  <mesh rotation={[.8,.6,.2]}><torusGeometry args={[1.65,.018,12,128]}/><meshBasicMaterial color="#FFE0B3" transparent opacity={.6}/></mesh>
  <mesh rotation={[1.5,.2,-.3]}><torusGeometry args={[1.52,.009,12,128]}/><meshBasicMaterial color="#EBA174" transparent opacity={.35}/></mesh>
  <mesh position={[1.55,1.05,-.7]} scale={.18}><icosahedronGeometry args={[1,2]}/><meshPhysicalMaterial color="#FFF0D3" metalness={.85} roughness={.13}/></mesh>
 </group>;
}
export default function FloatingStar({className=""}:{className?:string}){
 const reducedMotion=Boolean(useReducedMotion());
 return <div aria-hidden="true" className={`pointer-events-none relative aspect-square w-full ${className}`}><div className="absolute inset-[17%] rounded-full bg-orange-300/25 blur-[65px]"/>
 <Canvas dpr={[1,1.25]} camera={{position:[0,0,5.7],fov:42}} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}}>
 <ambientLight intensity={1.4}/><directionalLight position={[3,4,5]} color="#FFFFFF" intensity={4}/><pointLight position={[-3,2,4]} color="#FFCC96" intensity={24}/><pointLight position={[3,-3,3]} color="#FFE4BC" intensity={15}/>
 <Environment resolution={64}><Lightformer form="rect" intensity={4} color="#FFFFFF" position={[0,4,5]} scale={[5,1.5,1]}/><Lightformer form="rect" intensity={4} color="#F4B68D" position={[-4,0,3]} scale={[1.5,5,1]}/><Lightformer form="rect" intensity={2} color="#FFE4C5" position={[4,-1,3]} scale={[1.5,4,1]}/></Environment>
 <StarObject reducedMotion={reducedMotion}/></Canvas></div>;
}
