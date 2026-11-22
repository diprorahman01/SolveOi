
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
} from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import type { Group } from "three";

type SculptureProps = {
  reduceMotion: boolean;
};

function Sculpture({ reduceMotion }: SculptureProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group || reduceMotion) return;

    group.rotation.y += Math.min(delta, 0.05) * 0.16;
    group.rotation.x =
      0.2 + Math.sin(state.clock.elapsedTime * 0.32) * 0.12;

    group.position.y =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.07;
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0.35, -0.12]}>
      {/* Main sculptural chrome form */}
      <mesh rotation={[0.32, -0.1, 0.3]}>
        <torusKnotGeometry
          args={[1.05, 0.27, 220, 32, 2, 3]}
        />
        <meshPhysicalMaterial
          color="#9264C7"
          metalness={0.82}
          roughness={0.17}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Subtle inner crystal */}
      <mesh scale={0.51} rotation={[0.25, 0.4, 0]}>
        <icosahedronGeometry args={[1, 3]} />
        <meshPhysicalMaterial
          color="#281242"
          metalness={0.65}
          roughness={0.14}
          clearcoat={1}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* First thin orbital ring */}
      <mesh rotation={[1.1, 0.2, 0.32]}>
        <torusGeometry args={[1.57, 0.018, 12, 160]} />
        <meshPhysicalMaterial
          color="#C59BFF"
          metalness={0.65}
          roughness={0.16}
          emissive="#7C35C1"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Second orbital ring */}
      <mesh rotation={[0.25, 1, -0.28]}>
        <torusGeometry args={[1.52, 0.012, 12, 160]} />
        <meshBasicMaterial
          color="#CFB0FF"
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Small floating chrome satellite */}
      <mesh position={[-1.83, 1.2, -0.55]} scale={0.17}>
        <icosahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial
          color="#BBA5E8"
          metalness={0.88}
          roughness={0.12}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

export default function ChromeSculpture({
  className = "",
}: {
  className?: string;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div
      role="img"
      aria-label="Floating metallic purple SolveOi intelligence sculpture"
      className={`relative aspect-square w-full ${className}`}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[17%] rounded-full bg-[#7A2CC7]/25 blur-[65px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[31%] rounded-full bg-[#C174FF]/20 blur-[55px]"
      />

      <Canvas
        camera={{
          position: [0, 0, 7.5],
          fov: 40,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        fallback={
          <div className="flex h-full items-center justify-center">
            <div className="h-52 w-52 rounded-full border-[16px] border-violet-400/70 shadow-[0_0_90px_rgba(152,75,255,0.4)]" />
          </div>
        }
      >
        <ambientLight intensity={1.4} />

        <directionalLight
          position={[5, 5, 6]}
          intensity={4}
          color="#FFFFFF"
        />

        <pointLight
          position={[-4, 2, 4]}
          intensity={35}
          color="#A56BFF"
        />

        <pointLight
          position={[3, -3, 4]}
          intensity={20}
          color="#91B7FF"
        />

        <Environment resolution={128}>
          <Lightformer
            form="rect"
            intensity={3.5}
            color="#FFFFFF"
            position={[0, 4, 5]}
            scale={[7, 1.5, 1]}
          />

          <Lightformer
            form="rect"
            intensity={3.5}
            color="#A77BFF"
            position={[-4, 0, 3]}
            scale={[1.5, 6, 1]}
          />

          <Lightformer
            form="rect"
            intensity={2.5}
            color="#95C6FF"
            position={[4, -1, 3]}
            scale={[1.5, 5, 1]}
          />

          <Lightformer
            form="ring"
            intensity={2}
            color="#EDD5FF"
            position={[0, 0, -4]}
            scale={7}
          />
        </Environment>

        <Sculpture reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
