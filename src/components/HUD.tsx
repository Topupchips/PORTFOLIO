import { motion, AnimatePresence } from "framer-motion";
import { useMission, DESTINATIONS, type Destination } from "@/store/mission";
import { Home, User, Rocket, Briefcase, Sparkles, Radio, ArrowLeft, Plane } from "lucide-react";
import { ArcReactorMenu } from "@/components/hud/ArcReactorMenu";
import { JarvisWidgets } from "@/components/hud/JarvisWidgets";
import { MissionControlHome } from "@/components/hud/MissionControlHome";
import { NightSkyEngravings } from "@/components/hud/NightSkyEngravings";
import { TransitionNarration } from "@/components/hud/TransitionNarration";

const ICONS: Record<Destination, React.ComponentType<{ className?: string }>> = {
  home: Home,
  about: User,
  projects: Rocket,
  experience: Briefcase,
  skills: Sparkles,
  contact: Radio,
};

export function HUD() {
  const { focus, navigateTo, stage, pilot, togglePilot } = useMission();

  if (stage === "landing") return null;

  return (
    <>
      <ArcReactorMenu />
      <JarvisWidgets />
      <MissionControlHome />
      <NightSkyEngravings />
      <TransitionNarration />

      {/* Top status bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pointer-events-none fixed top-0 left-0 right-0 z-40 flex items-center justify-between safe-top safe-x px-4 py-3 pl-16 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/70 sm:px-6 sm:py-4 sm:pl-20 sm:text-[10px] sm:tracking-[0.3em]"
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="shrink-0 text-cyan-300/80">J.A.R.V.I.S.</span>
          <span className="hidden truncate text-amber-300/60 sm:inline">// MK-VII · ANSH.TULI</span>
        </div>
        <div className="hidden md:block">SECTOR / {(focus ?? "orbit").toUpperCase()}</div>
        <div className="hidden shrink-0 text-amber-300/60 sm:block">
          STARK INDUSTRIES · 45.96°N 66.64°W
        </div>
      </motion.div>

      {/* Scroll progress */}
      <ScrollBar />

      {/* Left nav dock — desktop/tablet only; mobile uses arc reactor + bottom bar */}
      <motion.nav
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 md:block"
        aria-label="Mission destinations"
      >
        <ul className="glass-holo flex flex-col gap-1 rounded-2xl p-2">
          {DESTINATIONS.map((d, i) => {
            const Icon = ICONS[d.id];
            const active = (focus ?? "home") === d.id;
            return (
              <li key={d.id}>
                <button
                  onClick={() => navigateTo(d.id === "home" ? null : d.id)}
                  className={`touch-target group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                    active ? "bg-cyan-400/15 text-cyan-300" : "text-white/50 hover:text-cyan-300"
                  }`}
                  aria-label={d.label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{d.label}</span>
                  <span className="ml-auto font-mono text-[9px] text-white/30">⌥{i + 1}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.nav>

      {/* Mobile bottom nav strip */}
      <motion.nav
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        aria-label="Quick navigation"
      >
        <ul className="glass-holo safe-bottom safe-x flex items-center justify-around gap-1 border-t border-cyan-400/20 px-2 py-2">
          {DESTINATIONS.map((d) => {
            const Icon = ICONS[d.id];
            const active = (focus ?? "home") === d.id;
            return (
              <li key={d.id}>
                <button
                  onClick={() => navigateTo(d.id === "home" ? null : d.id)}
                  className={`touch-target flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 transition-colors ${
                    active ? "text-cyan-300" : "text-white/45"
                  }`}
                  aria-label={d.label}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-mono text-[7px] uppercase tracking-wider">{d.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.nav>

      {/* Pilot ship toggle */}
      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={togglePilot}
        className={`glass-holo border-holo touch-target fixed z-40 flex items-center gap-2 rounded-full font-mono text-[10px] uppercase tracking-[0.3em] transition-colors safe-bottom safe-x bottom-[4.5rem] right-4 px-4 py-2.5 md:bottom-6 md:right-6 ${
          pilot ? "bg-cyan-400/20 text-cyan-200" : "text-cyan-300 hover:bg-cyan-400/10"
        }`}
        aria-pressed={pilot}
      >
        <Plane className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">{pilot ? "Exit Suit" : "Suit Up · Pilot"}</span>
        <span className="sm:hidden">{pilot ? "Exit" : "Pilot"}</span>
      </motion.button>

      {/* Pilot controls hint — keyboard only */}
      <AnimatePresence>
        {pilot && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="glass-holo pointer-events-none fixed bottom-24 left-1/2 z-40 hidden max-w-lg -translate-x-1/2 rounded-full px-5 py-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-200/90 md:block"
          >
            W/S thrust · A/D yaw · ↑/↓ pitch · Ctrl boost · fly near a planet to dock
          </motion.div>
        )}
      </AnimatePresence>

      {/* Return to orbit */}
      <AnimatePresence>
        {focus && !pilot && (
          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={() => navigateTo(null)}
            className="glass-holo border-holo touch-target fixed left-1/2 z-40 -translate-x-1/2 rounded-full px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300 hover:bg-cyan-400/10 safe-bottom bottom-[4.5rem] md:bottom-6"
          >
            <ArrowLeft className="mr-2 inline h-4 w-4" />
            Return to Orbit
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent safe-top">
      <motion.div
        style={{ scaleX: 0, transformOrigin: "0% 50%" }}
        animate={{ scaleX: [0, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-500"
      />
    </div>
  );
}
