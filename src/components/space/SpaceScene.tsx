import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { useMission, type Destination } from "@/store/mission";
import { useLowPowerGraphics } from "@/hooks/use-device";

const PLANETS: {
  id: Destination;
  position: [number, number, number];
  size: number;
  color: string;
  emissive: string;
  ring?: boolean;
  label: string;
}[] = [
  {
    id: "about",
    position: [-8, 1.5, -2],
    size: 1.1,
    color: "#3b82f6",
    emissive: "#1e3a8a",
    label: "About / Earth",
  },
  {
    id: "projects",
    position: [7, -1, -3],
    size: 0.9,
    color: "#dc2626",
    emissive: "#7f1d1d",
    label: "Projects / Mars",
  },
  {
    id: "experience",
    position: [-6, -2.5, -10],
    size: 1.6,
    color: "#eab308",
    emissive: "#713f12",
    ring: true,
    label: "Experience / Saturn",
  },
  {
    id: "skills",
    position: [9, 3, -8],
    size: 0.55,
    color: "#cbd5e1",
    emissive: "#475569",
    label: "Skills / Moon",
  },
  {
    id: "contact",
    position: [0, 4.5, -12],
    size: 0.7,
    color: "#06b6d4",
    emissive: "#0e7490",
    label: "Contact / Comms",
  },
];

function Planet({ p, segments }: { p: (typeof PLANETS)[number]; segments: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const focus = useMission((s) => s.focus);
  const navigateTo = useMission((s) => s.navigateTo);
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
            navigateTo(p.id);
          }}
          scale={isFocused ? 1.4 : 1}
        >
          <sphereGeometry args={[p.size, segments, segments]} />
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
            <ringGeometry args={[p.size * 1.4, p.size * 2.1, Math.max(32, segments)]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.5} />
          </mesh>
        )}
        <mesh>
          <sphereGeometry args={[p.size * 1.3, Math.max(16, segments / 2), Math.max(16, segments / 2)]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.06} />
        </mesh>
        <Html
          center
          distanceFactor={10}
          position={[0, p.size + 0.6, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="whitespace-nowrap font-display text-[8px] uppercase tracking-[0.2em] text-cyan-300/80 sm:text-[10px] sm:tracking-[0.3em]">
            {p.label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Sun({ segments }: { segments: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const corona = useRef<THREE.Mesh>(null);
  const navigateTo = useMission((s) => s.navigateTo);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.05;
    if (corona.current) {
      const s = 1 + Math.sin(performance.now() * 0.001) * 0.04;
      corona.current.scale.setScalar(s);
    }
  });
  return (
    <group position={[0, 0, 0]}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          navigateTo(null);
        }}
      >
        <sphereGeometry args={[1.4, segments, segments]} />
        <meshStandardMaterial
          color="#fde047"
          emissive="#f59e0b"
          emissiveIntensity={1.6}
          roughness={0.4}
        />
      </mesh>
      <mesh ref={corona}>
        <sphereGeometry args={[1.7, Math.max(16, segments / 2), Math.max(16, segments / 2)]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.3, Math.max(16, segments / 2), Math.max(16, segments / 2)]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.08} />
      </mesh>
      <pointLight intensity={3} color="#fbbf24" distance={40} decay={1.4} />
      <Html center distanceFactor={10} position={[0, 2.1, 0]} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap font-display text-[8px] uppercase tracking-[0.2em] text-amber-200/80 sm:text-[10px] sm:tracking-[0.3em]">
          Sol / Mission Control
        </div>
      </Html>
    </group>
  );
}

type ShipControls = {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  boost: boolean;
};

function useKeyboard() {
  const keys = useRef<ShipControls>({
    forward: false,
    back: false,
    left: false,
    right: false,
    up: false,
    down: false,
    boost: false,
  });
  useEffect(() => {
    const map: Record<string, keyof ShipControls> = {
      KeyW: "forward",
      ArrowUp: "forward",
      KeyS: "back",
      ArrowDown: "back",
      KeyA: "left",
      ArrowLeft: "left",
      KeyD: "right",
      ArrowRight: "right",
      Space: "up",
      ShiftLeft: "down",
      ShiftRight: "down",
      ControlLeft: "boost",
      ControlRight: "boost",
    };
    const on = (v: boolean) => (e: KeyboardEvent) => {
      const k = map[e.code];
      if (k) {
        keys.current[k] = v;
        if (e.code === "Space") e.preventDefault();
      }
    };
    const d = on(true);
    const u = on(false);
    window.addEventListener("keydown", d);
    window.addEventListener("keyup", u);
    return () => {
      window.removeEventListener("keydown", d);
      window.removeEventListener("keyup", u);
    };
  }, []);
  return keys;
}

// (Ship implementation lives in ShipWithRef below)

function ChaseCamera({ shipRef }: { shipRef: React.MutableRefObject<THREE.Group | null> }) {
  const { camera } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    if (!shipRef.current) return;
    const back = new THREE.Vector3(0, 0.6, 2.6).applyEuler(shipRef.current.rotation);
    tmp.copy(shipRef.current.position).add(back);
    camera.position.lerp(tmp, Math.min(1, dt * 3));
    const fwd = new THREE.Vector3(0, 0, -3).applyEuler(shipRef.current.rotation);
    look.copy(shipRef.current.position).add(fwd);
    camera.lookAt(look);
  });
  return null;
}

function getCameraTargets(focus: Destination | null, elapsed: number) {
  const desired = new THREE.Vector3();
  const lookAt = new THREE.Vector3();

  if (focus) {
    const p = PLANETS.find((x) => x.id === focus);
    if (p) {
      desired.set(p.position[0] * 0.35, p.position[1] + 1.2, p.position[2] + 3.8);
      lookAt.set(...p.position);
      return { desired, lookAt };
    }
  }

  const t = elapsed * 0.05;
  desired.set(Math.sin(t) * 2, 1.5 + Math.cos(t) * 0.3, 9 + Math.cos(t) * 1);
  lookAt.set(0, 0, 0);
  return { desired, lookAt };
}

function OrbitCamera() {
  const { camera } = useThree();
  const focus = useMission((s) => s.focus);
  const cameraTransitioning = useMission((s) => s.cameraTransitioning);
  const target = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(0, 1.5, 8), []);
  const lookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const transitionRef = useRef({ t: 0, fromFocus: null as Destination | null });
  const overview = useMemo(() => new THREE.Vector3(0, 3.5, 14), []);

  useEffect(() => {
    transitionRef.current = { t: 0, fromFocus: focus };
  }, [focus]);

  useFrame((state, dt) => {
    const tr = transitionRef.current;
    if (cameraTransitioning) {
      tr.t = Math.min(1, tr.t + dt / 2.8);
    } else {
      tr.t = 0;
    }

    const { desired: endPos, lookAt: endLook } = getCameraTargets(focus, state.clock.elapsedTime);

    if (cameraTransitioning && tr.t < 1) {
      // Cinematic arc: pull back to overview at midpoint, then approach target
      const ease = 1 - Math.pow(1 - tr.t, 3);
      const mid = ease < 0.5 ? ease * 2 : 1;
      const late = ease < 0.5 ? 0 : (ease - 0.5) * 2;

      if (ease < 0.5) {
        desired.lerpVectors(camera.position, overview, mid * 0.08);
        lookAt.lerp(new THREE.Vector3(0, 0, 0), mid * 0.06);
      } else {
        desired.lerpVectors(overview, endPos, late * 0.1);
        lookAt.lerp(endLook, late * 0.12);
      }
    } else {
      desired.copy(endPos);
      lookAt.copy(endLook);
    }

    const speed = cameraTransitioning ? 2.2 : 1.5;
    camera.position.lerp(desired, Math.min(1, dt * speed));
    target.lerp(lookAt, Math.min(1, dt * (cameraTransitioning ? 2.5 : 2)));
    camera.lookAt(target);
  });
  return null;
}

function PilotControl() {
  const pilot = useMission((s) => s.pilot);
  const shipRef = useRef<THREE.Group>(null);
  // We need the same ref shared with the Ship; render Ship here and pass ref.
  return pilot ? (
    <>
      <ShipWithRef shipRef={shipRef} />
      <ChaseCamera shipRef={shipRef} />
    </>
  ) : (
    <OrbitCamera />
  );
}

// Wrapper so we can hoist the ref
function ShipWithRef({ shipRef }: { shipRef: React.MutableRefObject<THREE.Group | null> }) {
  // Re-implement to use the external ref
  const velocity = useRef(new THREE.Vector3());
  const keys = useKeyboard();
  const setFocus = useMission((s) => s.setFocus);
  const focus = useMission((s) => s.focus);
  const focusRef = useRef(focus);
  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useFrame((_, dt) => {
    const g = shipRef.current;
    if (!g) return;
    const k = keys.current;
    const yawSpeed = 1.3 * dt;
    if (k.left) g.rotation.y += yawSpeed;
    if (k.right) g.rotation.y -= yawSpeed;
    if (k.up) g.rotation.x -= yawSpeed * 0.6;
    if (k.down) g.rotation.x += yawSpeed * 0.6;
    g.rotation.x = THREE.MathUtils.clamp(g.rotation.x, -0.7, 0.7);

    const dir = new THREE.Vector3(0, 0, -1).applyEuler(g.rotation);
    const thrust = (k.forward ? 1 : 0) - (k.back ? 0.6 : 0);
    const accel = (k.boost ? 22 : 11) * thrust * dt;
    velocity.current.addScaledVector(dir, accel);
    velocity.current.multiplyScalar(0.95);
    g.position.addScaledVector(velocity.current, dt * 3);
    g.position.clampScalar(-30, 30);

    let nearest: Destination | null = null;
    let nearestDist = Infinity;
    for (const p of PLANETS) {
      const d = g.position.distanceTo(new THREE.Vector3(...p.position));
      if (d < p.size + 2.4 && d < nearestDist) {
        nearestDist = d;
        nearest = p.id;
      }
    }
    if (nearest && focusRef.current !== nearest) setFocus(nearest);
    else if (!nearest && focusRef.current) {
      const focused = PLANETS.find((p) => p.id === focusRef.current);
      if (focused) {
        const d = g.position.distanceTo(new THREE.Vector3(...focused.position));
        if (d > focused.size + 4) setFocus(null);
      }
    }
  });

  return (
    <group ref={shipRef} position={[0, 0, 6]}>
      {/* Hull — Iron Man hot-rod red */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.18, 0.7, 16]} />
        <meshStandardMaterial
          color="#b91c1c"
          metalness={0.95}
          roughness={0.2}
          emissive="#dc2626"
          emissiveIntensity={0.35}
        />
      </mesh>
      {/* Gold wing accents */}
      <mesh position={[0, -0.05, 0.1]}>
        <boxGeometry args={[0.7, 0.04, 0.2]} />
        <meshStandardMaterial
          color="#facc15"
          metalness={1}
          roughness={0.25}
          emissive="#f59e0b"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Arc-reactor cockpit */}
      <mesh position={[0, 0.06, -0.05]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial
          color="#a5f3fc"
          emissive="#22d3ee"
          emissiveIntensity={1.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Repulsor thrust */}
      <mesh position={[0, 0, 0.42]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#fde68a" transparent opacity={0.85} />
      </mesh>
      <pointLight position={[0, 0, 0.55]} intensity={1.6} color="#fbbf24" distance={5} />
      <pointLight position={[0, 0.06, -0.05]} intensity={0.8} color="#22d3ee" distance={2} />
    </group>
  );
}

export function SpaceScene() {
  const lowPower = useLowPowerGraphics();
  const segments = lowPower ? 32 : 64;
  const starCount = lowPower ? 4500 : 14000;
  const starCountNear = lowPower ? 900 : 3000;
  const nebulaSegments = lowPower ? 16 : 32;

  return (
    <>
      <color attach="background" args={["#000003"]} />
      <fog attach="fog" args={["#000003", 14, 45]} />
      <ambientLight intensity={0.18} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[-10, -5, -5]} intensity={0.5} color="#22d3ee" />

      <Stars radius={120} depth={60} count={starCount} factor={4} saturation={0.4} fade speed={0.5} />
      <Stars radius={50} depth={30} count={starCountNear} factor={2} saturation={0} fade speed={1} />

      <mesh position={[-15, 5, -25]}>
        <sphereGeometry args={[10, nebulaSegments, nebulaSegments]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.04} />
      </mesh>
      <mesh position={[18, -8, -30]}>
        <sphereGeometry args={[12, nebulaSegments, nebulaSegments]} />
        <meshBasicMaterial color="#0891b2" transparent opacity={0.05} />
      </mesh>

      <Sun segments={segments} />
      {PLANETS.map((p) => (
        <Planet key={p.id} p={p} segments={segments} />
      ))}

      <PilotControl />
    </>
  );
}

export { PLANETS };
