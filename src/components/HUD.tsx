import { motion, AnimatePresence } from "framer-motion";
import { useMission, DESTINATIONS, type Destination } from "@/store/mission";
import {
  Home, User, Rocket, Briefcase, Sparkles, Radio, ArrowLeft, Plane,
} from "lucide-react";

const ICONS: Record<Destination, React.ComponentType<{ className?: string }>> = {
  home: Home,
  about: User,
  projects: Rocket,
  experience: Briefcase,
  skills: Sparkles,
  contact: Radio,
};

export function HUD() {
  const { focus, setFocus, stage, pilot, togglePilot } = useMission();

  if (stage === "landing") return null;

  return (
    <>
      {/* Top status bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pointer-events-none fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/70"
      >
        <div className="flex items-center gap-3">
          <span className="arc-reactor inline-block h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <span className="text-cyan-300/80">J.A.R.V.I.S.</span>
          <span className="text-amber-300/60">// MK-VII · ANSH.TULI</span>
        </div>
        <div className="hidden md:block">SECTOR / {(focus ?? "orbit").toUpperCase()}</div>
        <div className="text-amber-300/60">STARK INDUSTRIES · 45.96°N 66.64°W</div>
      </motion.div>

      {/* Scroll progress */}
      <ScrollBar />

      {/* Left nav dock */}
      <motion.nav
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed left-4 top-1/2 z-40 -translate-y-1/2"
        aria-label="Mission destinations"
      >
        <ul className="glass-holo flex flex-col gap-1 rounded-2xl p-2">
          {DESTINATIONS.map((d, i) => {
            const Icon = ICONS[d.id];
            const active = (focus ?? "home") === d.id;
            return (
              <li key={d.id}>
                <button
                  onClick={() => setFocus(d.id === "home" ? null : d.id)}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                    active ? "bg-cyan-400/15 text-cyan-300" : "text-white/50 hover:text-cyan-300"
                  }`}
                  aria-label={d.label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em]">
                    {d.label}
                  </span>
                  <span className="ml-auto hidden md:block font-mono text-[9px] text-white/30">
                    ⌥{i + 1}
                  </span>
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
        className={`glass-holo border-holo fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${
          pilot ? "bg-cyan-400/20 text-cyan-200" : "text-cyan-300 hover:bg-cyan-400/10"
        }`}
        aria-pressed={pilot}
      >
        <Plane className="h-3 w-3" />
        {pilot ? "Exit Cockpit" : "Pilot Ship"}
      </motion.button>

      {/* Pilot controls hint */}
      <AnimatePresence>
        {pilot && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="glass-holo fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full px-5 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-200/90"
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
            onClick={() => setFocus(null)}
            className="glass-holo border-holo fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300 hover:bg-cyan-400/10"
          >
            <ArrowLeft className="mr-2 inline h-3 w-3" />
            Return to Orbit
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
      <motion.div
        style={{ scaleX: 0, transformOrigin: "0% 50%" }}
        animate={{ scaleX: [0, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-500"
      />
    </div>
  );
}
