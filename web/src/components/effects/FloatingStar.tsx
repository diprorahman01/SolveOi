
"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { Shape, type Group } from "three";

function StarObject({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);

  const starShape = useMemo(() => {
    const shape = new Shape();
    const points = 5;
    const outerRadius = 1.25;
    const innerRadius = 0.58;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    shape.closePath();
    return shape;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    const group = groupRef.current;

    group.rotation.y += Math.min(delta, 0.05) * 0.26;
    group.rotation.z += Math.min(delta, 0.05) * 0.07;

    group.rotation.x =
      0.22 + Math.sin(state.clock.elapsedTime * 0.4) * 0.15;

    group.position.y =
      Math.sin(state.clock.elapsedTime * 0.75) * 0.12;
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.22, -0.35, -0.2]}
      scale={0.94}
    >
      {/* Extruded metallic five-point star */}
      <mesh>
        <extrudeGeometry
          args={[
            starShape,
            {
              depth: 0.36,
              steps: 1,
              bevelEnabled: true,
              bevelThickness: 0.14,
              bevelSize: 0.12,
              bevelSegments: 5,
              curveSegments: 12,
            },
          ]}
        />

        <meshPhysicalMaterial
          color="#B593F5"
          metalness={0.88}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={2}
          side={2}
        />
      </mesh>

      {/* Thin rotating orbit */}
      <mesh rotation={[0.8, 0.6, 0.2]}>
        <torusGeometry args={[1.65, 0.018, 12, 128]} />
        <meshBasicMaterial
          color="#C99AFF"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Small secondary orbit */}
      <mesh rotation={[1.5, 0.2, -0.3]}>
        <torusGeometry args={[1.52, 0.009, 12, 128]} />
        <meshBasicMaterial
          color="#8679FF"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Floating satellite */}
      <mesh position={[1.55, 1.05, -0.7]} scale={0.18}>
        <icosahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial
          color="#E5CFFF"
          metalness={0.85}
          roughness={0.13}
        />
      </mesh>
    </group>
  );
}

export default function FloatingStar({
  className = "",
}: {
  className?: string;
}) {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative aspect-square w-full ${className}`}
    >
      <div className="absolute inset-[17%] rounded-full bg-[#8A35D8]/25 blur-[65px]" />

      <Canvas
        dpr={[1, 1.25]}
        camera={{
          position: [0, 0, 5.7],
          fov: 42,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.4} />

        <directionalLight
          position={[3, 4, 5]}
          color="#FFFFFF"
          intensity={4}
        />

        <pointLight
          position={[-3, 2, 4]}
          color="#AB61FF"
          intensity={24}
        />

        <pointLight
          position={[3, -3, 3]}
          color="#7BA8FF"
          intensity={15}
        />

        <Environment resolution={64}>
          <Lightformer
            form="rect"
            intensity={4}
            color="#FFFFFF"
            position={[0, 4, 5]}
            scale={[5, 1.5, 1]}
          />

          <Lightformer
            form="rect"
            intensity={4}
            color="#A66BFF"
            position={[-4, 0, 3]}
            scale={[1.5, 5, 1]}
          />

          <Lightformer
            form="rect"
            intensity={2}
            color="#80BCFF"
            position={[4, -1, 3]}
            scale={[1.5, 4, 1]}
          />
        </Environment>

        <StarObject reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
