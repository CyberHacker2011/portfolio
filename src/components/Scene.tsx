import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import data from "../data.json";

const TechWord = ({
  word,
  position,
}: {
  word: string;
  position: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle floating rotation
      meshRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.1;
      meshRef.current.rotation.y =
        Math.cos(clock.getElapsedTime() * 0.3 + position[1]) * 0.1;
    }
  });

  // Modern Neon Palette
  const color = useMemo(() => {
    const colors = ["#818cf8", "#c084fc", "#4f46e5", "#6366f1", "#a855f7"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        ref={meshRef}
        position={position}
        fontSize={0.6}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        {word}
      </Text>
    </Float>
  );
};

const Cloud = () => {
  const words = data.technologies;

  const positions = useMemo(() => {
    return words.map(() => {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 6 + Math.random() * 2;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) * 0.5;

      return [x, y, z] as [number, number, number];
    });
  }, [words]);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {words.map((word, i) => (
        <TechWord key={`${word}-${i}`} word={word} position={positions[i]} />
      ))}
    </group>
  );
};

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        {/* Deep navy/black with indigo fog for neon vibe */}
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 8, 30]} />

        <ambientLight intensity={0.3} />
        {/* Stronger neon point lights as requested */}
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#4f46e5" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={2.5}
          color="#818cf8"
        />
        <pointLight position={[0, 5, -5]} intensity={1.5} color="#312e81" />

        <Stars
          radius={100}
          depth={50}
          count={6000}
          factor={4}
          saturation={1}
          fade
          speed={1.5}
        />
        <Cloud />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
      {/* Indigo glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-indigo-950/20 to-transparent pointer-events-none" />
    </div>
  );
}
