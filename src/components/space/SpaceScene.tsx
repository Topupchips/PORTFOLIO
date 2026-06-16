import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { useMission, DESTINATIONS, type Destination } from "@/store/mission";

const PLANETS: {
  id: Destination;
  position: [number, number, number];
  size: number;
  color: string;
  emissive: string;
  ring?: boolean;
  label: string;
}[] = [
  { id: "about", position: [-8, 1.5, -2], size: 1.1, color: "#3b82f6", emissive: "#1e3a8a", label: "About / Earth" },
  { id: "projects", position: [7, -1, -3], size: 0.9, color: "#dc2626", emissive: "#7f1d1d", label: "Projects / Mars" },
  { id: "experience", position: [-6, -2.5, -10], size: 1.6, color: "#eab308", emissive: "#713f12", ring: true, label: "Experience / Saturn" },
  { id: "skills", position: [9, 3, -8], size: 0.55, color: "#cbd5e1", emissive: "#475569", label: "Skills / Moon" },
  { id: "contact", position: [0, 4.5, -12], size: 0.7, color: "#06b6d4", emissive: "#0e7490", label: "Contact / Comms" },
];

function Planet({ p }: { p: (typeof PLANETS)[number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const focus = useMission((s) => s.focus);
  const setFocus = useMission((s) => s.setFocus);
  const isFocused = focus === p.id;

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.2;
      const t = performance.now() * 0.0003;
      ref.current.position.x = p.position[0] + Math.sin(t + p.position[2]) * 0.3;
      ref.current.position.y = p.position[1] + Math.cos(t + p.position[0]) * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={p.position}>
        <mesh
          ref={ref}
          onClick={(e) => {
            e.stopPropagation();
            setFocus(p.id);
          }}
          onPointerOver={() => (document.body.style.cursor = "none")}
          scale={isFocused ? 1.4 : 1}
        >
          <sphereGeometry args={[p.size, 64, 64]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.emissive}
            emissiveIntensity={0.4}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        {p.ring && (
          <mesh rotation={[Math.PI / 2.3, 0, 0]}>
            <ringGeometry args={[p.size * 1.4, p.size * 2.1, 96]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.5} />
          </mesh>
        )}
        {/* Glow */}
        <mesh>
          <sphereGeometry args={[p.size * 1.3, 32, 32]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.06} />
        </mesh>
        <Html center distanceFactor={10} position={[0, p.size + 0.6, 0]} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap font-display text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
            {p.label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Station() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.1;
  });
  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Flat platform */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.15, 64]} />
        <meshStandardMaterial color="#0a1929" metalness={0.9} roughness={0.3} emissive="#06b6d4" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[2.0, 2.0, 0.02, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
      </mesh>
      {/* Spire */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.15, 2.4, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>
      <pointLight position={[0, 2.1, 0]} intensity={2} color="#22d3ee" distance={6} />
    </group>
  );
}

function Camera() {
  const { camera } = useThree();
  const focus = useMission((s) => s.focus);
  const target = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(0, 1.5, 8), []);
  const lookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state, dt) => {
    if (focus) {
      const p = PLANETS.find((x) => x.id === focus);
      if (p) {
        desired.set(p.position[0] * 0.4, p.position[1] + 1, p.position[2] + 4);
        lookAt.set(...p.position);
      } else if (focus === "home") {
        desired.set(0, 1.5, 8);
        lookAt.set(0, 0, 0);
      }
    } else {
      const t = state.clock.elapsedTime * 0.05;
      desired.set(Math.sin(t) * 2, 1.5 + Math.cos(t) * 0.3, 9 + Math.cos(t) * 1);
      lookAt.set(0, 0, 0);
    }
    camera.position.lerp(desired, Math.min(1, dt * 1.5));
    target.lerp(lookAt, Math.min(1, dt * 2));
    camera.lookAt(target);
  });
  return null;
}

export function SpaceScene() {
  return (
    <>
      <color attach="background" args={["#000003"]} />
      <fog attach="fog" args={["#000003", 12, 35]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#a78bfa" />
      <pointLight position={[-10, -5, -5]} intensity={0.6} color="#22d3ee" />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />

      <Stars radius={120} depth={60} count={14000} factor={4} saturation={0.4} fade speed={0.5} />
      <Stars radius={50} depth={30} count={3000} factor={2} saturation={0} fade speed={1} />

      {/* Nebula clouds */}
      <mesh position={[-15, 5, -25]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.04} />
      </mesh>
      <mesh position={[18, -8, -30]}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshBasicMaterial color="#0891b2" transparent opacity={0.05} />
      </mesh>

      <Station />
      {PLANETS.map((p) => (
        <Planet key={p.id} p={p} />
      ))}

      <Camera />
    </>
  );
}

export { PLANETS };
