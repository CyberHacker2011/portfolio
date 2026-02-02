import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useSphere, usePlane } from "@react-three/cannon";
import {
  OrbitControls,
  Environment,
  Decal,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import data from "../data.json";

const HOLES = [
  [-4.5, 0, -2.5],
  [4.5, 0, -2.5],
  [-4.5, 0, 0],
  [4.5, 0, 0],
  [-4.5, 0, 2.5],
  [4.5, 0, 2.5],
];

const BALL_RADIUS = 0.4;

const TechBall = ({
  position,
  logoUrl,
}: {
  position: [number, number, number];
  logoUrl: string;
}) => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [BALL_RADIUS],
    linearDamping: 0.15,
    angularDamping: 0.15,
    restitution: 0.9,
    friction: 0.05,
  }));

  const texture = useTexture(logoUrl);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    const ballPos = new THREE.Vector3();
    ref.current?.getWorldPosition(ballPos);

    const pushDir = new THREE.Vector3()
      .subVectors(ballPos, e.point)
      .normalize();
    pushDir.y = 0.2;
    api.applyImpulse(
      [pushDir.x * 20, pushDir.y * 6, pushDir.z * 20],
      [0, 0, 0],
    );
  };

  useFrame(() => {
    const pos = new THREE.Vector3();
    ref.current?.getWorldPosition(pos);

    for (const hole of HOLES) {
      const dist = pos.distanceTo(
        new THREE.Vector3(hole[0], -BALL_RADIUS, hole[2]),
      );
      if (dist < 0.6) {
        api.position.set(Math.random() - 0.5, 10, Math.random() - 0.5);
        api.velocity.set(0, -12, 0);
        api.angularVelocity.set(Math.random(), Math.random(), Math.random());
        break;
      }
    }

    if (pos.y < -10) {
      api.position.set(0, 5, 0);
      api.velocity.set(0, 0, 0);
    }
  });

  return (
    <mesh ref={ref as any} castShadow onPointerDown={handlePointerDown}>
      <sphereGeometry args={[BALL_RADIUS, 32, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.02}
        metalness={0.4}
        emissive="#ffffff"
        emissiveIntensity={0.3}
      />
      <Decal
        position={[0, 0, BALL_RADIUS - 0.01]}
        rotation={[0, 0, 0]}
        scale={[0.6, 0.6, 0.6]}
      >
        <meshBasicMaterial
          map={texture}
          transparent
          polygonOffset
          polygonOffsetUnits={-1}
        />
      </Decal>
    </mesh>
  );
};

const Table = () => {
  usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -BALL_RADIUS, 0],
    restitution: 0.8,
    friction: 0.1,
  }));

  usePlane(() => ({
    position: [0, 0, 3.1],
    rotation: [Math.PI, 0, 0],
    restitution: 0.9,
  }));
  usePlane(() => ({
    position: [0, 0, -3.1],
    rotation: [0, 0, 0],
    restitution: 0.9,
  }));
  usePlane(() => ({
    position: [5.1, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    restitution: 0.9,
  }));
  usePlane(() => ({
    position: [-5.1, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    restitution: 0.9,
  }));

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -BALL_RADIUS, 0]}
        receiveShadow
      >
        <planeGeometry args={[10.2, 6.2]} />
        <meshStandardMaterial color="#020617" roughness={0.5} metalness={0.8} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -BALL_RADIUS + 0.005, 0]}
      >
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#4f46e5" transparent opacity={0.15} />
      </mesh>

      {HOLES.map((pos, i) => (
        <group key={i} position={[pos[0], -BALL_RADIUS + 0.012, pos[2]]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.58, 32]} />
            <meshBasicMaterial color="#1e1b4b" />
          </mesh>
          <pointLight
            position={[0, 1.5, 0]}
            intensity={4}
            color="#6366f1"
            distance={6}
          />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <circleGeometry args={[0.5, 32]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>
      ))}

      <mesh position={[0, -BALL_RADIUS + 0.25, 3.1]}>
        <boxGeometry args={[10.6, 0.5, 0.1]} />
        <meshStandardMaterial
          color="#312e81"
          emissive="#4f46e5"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[0, -BALL_RADIUS + 0.25, -3.1]}>
        <boxGeometry args={[10.6, 0.5, 0.1]} />
        <meshStandardMaterial
          color="#312e81"
          emissive="#4f46e5"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh
        position={[5.1, -BALL_RADIUS + 0.25, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[6.6, 0.5, 0.1]} />
        <meshStandardMaterial
          color="#312e81"
          emissive="#4f46e5"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh
        position={[-5.1, -BALL_RADIUS + 0.25, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[6.6, 0.5, 0.1]} />
        <meshStandardMaterial
          color="#312e81"
          emissive="#4f46e5"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
};

export default function TechBilliards() {
  const allTech = data.technologies;

  const slugMap: Record<string, string> = {
    React: "react",
    TypeScript: "typescript",
    "Next.js": "nextdotjs",
    "Node.js": "nodedotjs",
    Python: "python",
    Supabase: "supabase",
    Tailwind: "tailwindcss",
    "React Native": "react",
    Electron: "electron",
    Expo: "expo",
    "Express.js": "express",
    "Telegram Bot": "telegram",
  };

  const technologies = allTech.map((name) => ({
    name,
    logo: `https://cdn.simpleicons.org/${
      slugMap[name] ||
      name
        .toLowerCase()
        .replace(/\.(?=[a-z])/g, "")
        .replace(/ /g, "")
    }`,
  }));

  return (
    <div className="w-full h-[700px] rounded-[3rem] overflow-hidden border border-white/10 bg-black relative shadow-[0_0_80px_-20px_rgba(79,70,229,0.4)] mb-24 flex flex-col">
      <div className="absolute inset-0 bg-[#020617] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="pt-12 px-10 z-10 pointer-events-none flex flex-col items-center text-center">
        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight glow-text mb-4">
          Tech Stack Playground
        </h3>
        <p className="text-indigo-200/60 max-w-lg text-lg font-medium leading-relaxed">
          Interaction with physics-powered technologies. White emissive balls
          with improved force transfer.
        </p>
      </div>

      <div className="flex-1 min-h-0 relative">
        <Canvas shadows camera={{ position: [0, 11, 7], fov: 38 }}>
          <color attach="background" args={["#020617"]} />
          <fog attach="fog" args={["#020617", 5, 25]} />

          <ambientLight intensity={0.2} />
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
            penumbra={1}
            intensity={4}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-8, 4, -8]} intensity={3} color="#4f46e5" />
          <pointLight position={[8, 4, 8]} intensity={3} color="#818cf8" />
          <pointLight position={[0, 8, 0]} intensity={1.5} color="#ffffff" />

          <Physics gravity={[0, -20, 0]}>
            <Table />
            {technologies.map((tech, i) => (
              <TechBall
                key={`${tech.name}-${i}`}
                logoUrl={tech.logo}
                position={[
                  (Math.random() - 0.5) * 8,
                  6 + i * 0.5,
                  (Math.random() - 0.5) * 4,
                ]}
              />
            ))}
          </Physics>

          <Environment preset="night" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2.3}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>
      </div>
    </div>
  );
}
