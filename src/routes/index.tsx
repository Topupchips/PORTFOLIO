import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useMission, DESTINATIONS } from "@/store/mission";
import { useGame } from "@/store/game";
import { useIsMobile, useIsTouchDevice } from "@/hooks/use-device";
import { Landing } from "@/components/Landing";
import { HUD } from "@/components/HUD";
import { PanelLayer } from "@/components/PanelLayer";
import { Cursor } from "@/components/Cursor";
import { ShootingGame, ShootingGameLauncher } from "@/components/shooting/ShootingGame";
import { MobilePortfolio } from "@/components/MobilePortfolio";

const Canvas = lazy(() => import("@react-three/fiber").then((m) => ({ default: m.Canvas })));
const SpaceScene = lazy(() =>
  import("@/components/space/SpaceScene").then((m) => ({ default: m.SpaceScene })),
);
const Effects = lazy(() =>
  import("@/components/space/Effects").then((m) => ({ default: m.Effects })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ansh Tuli — AI Founder · Software Engineer · Builder" },
      {
        name: "description",
        content:
          "Step inside Mission 001 — an interactive deep-space portfolio for Ansh Tuli, founder of Pyra AI and co-founder of Hack Atlantic.",
      },
      { property: "og:title", content: "Ansh Tuli · Mission 001" },
      {
        property: "og:description",
        content:
          "An interactive solar system portfolio. Explore projects, experience, and skills in deep space.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Mission,
});

function Mission() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <main className="h-[100dvh] w-screen bg-black" aria-busy="true" />;
  }

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return <DesktopExperience />;
}

function DesktopExperience() {
  const { stage, focus, navigateTo } = useMission();
  const hydrate = useGame((s) => s.hydrate);
  const isTouch = useIsTouchDevice();

  useEffect(() => hydrate(), [hydrate]);

  const pilot = useMission((s) => s.pilot);
  const gameActive = useGame((s) => s.active);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (gameActive) return;
        navigateTo(null);
        return;
      }
      if (e.altKey && /^[1-6]$/.test(e.key)) {
        e.preventDefault();
        const idx = parseInt(e.key, 10) - 1;
        const d = DESTINATIONS[idx];
        if (d) navigateTo(d.id === "home" ? null : d.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigateTo, gameActive]);

  useEffect(() => {
    if (stage !== "orbit" || pilot || isTouch) return;
    let acc = 0;
    let cooldown = false;
    const order = DESTINATIONS.map((d) => d.id);
    const onWheel = (e: WheelEvent) => {
      if (cooldown) return;
      acc += e.deltaY;
      if (Math.abs(acc) > 120) {
        const current = focus ?? "home";
        const i = order.indexOf(current);
        const next = order[Math.max(0, Math.min(order.length - 1, i + (acc > 0 ? 1 : -1)))];
        navigateTo(next === "home" ? null : next);
        acc = 0;
        cooldown = true;
        setTimeout(() => (cooldown = false), 600);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [stage, focus, navigateTo, pilot, isTouch]);

  return (
    <main className="grain vignette relative h-[100dvh] w-screen overflow-hidden bg-black">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-cyan-400 focus:px-3 focus:py-1 focus:text-black"
      >
        Skip to content
      </a>

      <div id="main" className="absolute inset-0">
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 1.5, 9], fov: 55 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          >
            <SpaceScene />
            <Effects />
          </Canvas>
        </Suspense>
      </div>

      <AnimatePresence>{stage === "landing" && <Landing key="landing" />}</AnimatePresence>

      <HUD />
      <PanelLayer />
      <ShootingGameLauncher />
      <ShootingGame />
      {!isTouch && <Cursor />}
    </main>
  );
}
