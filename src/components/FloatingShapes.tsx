import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const Geometries = () => {
  const count = 5;

  const geometries = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      scale: 0.5 + Math.random(),
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [
        number,
        number,
        number,
      ],
      type: Math.floor(Math.random() * 3), // 0: Icosahedron, 1: Torus, 2: Dodecahedron
    }));
  }, []);

  return (
    <>
      {geometries.map((geo, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={2}
          floatIntensity={1}
        >
          <mesh
            position={geo.position}
            rotation={geo.rotation}
            scale={geo.scale}
          >
            {geo.type === 0 && <icosahedronGeometry args={[1, 0]} />}
            {geo.type === 1 && <torusGeometry args={[0.8, 0.25, 16, 32]} />}
            {geo.type === 2 && <dodecahedronGeometry args={[1, 0]} />}
            <meshPhysicalMaterial
              roughness={0.2}
              transmission={1} // Glass effect
              thickness={2}
              color="#818cf8"
              envMapIntensity={1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
        <ambientLight intensity={0.5} />
        <Geometries />
      </Canvas>
    </div>
  );
}
