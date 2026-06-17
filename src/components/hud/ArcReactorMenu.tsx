import { motion, AnimatePresence } from "framer-motion";
import { useMission, type Destination } from "@/store/mission";
import { User, Rocket, Briefcase, Sparkles } from "lucide-react";

const RADIAL_ITEMS: {
  id: Exclude<Destination, "home" | "contact">;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  angle: number;
}[] = [
  { id: "about", label: "About", icon: User, angle: -90 },
  { id: "projects", label: "Projects", icon: Rocket, angle: -18 },
  { id: "experience", label: "Experience", icon: Briefcase, angle: 54 },
  { id: "skills", label: "Skills", icon: Sparkles, angle: 126 },
];

const RADIUS = 72;

export function ArcReactorMenu() {
  const { radialOpen, toggleRadial, navigateTo, stage } = useMission();

  if (stage === "landing") return null;

  return (
    <div className="fixed left-3 top-3 z-50 safe-top safe-x sm:left-6 sm:top-5">
      <button
        onClick={toggleRadial}
        className="touch-target group relative flex h-11 w-11 items-center justify-center sm:h-10 sm:w-10"
        aria-label="Arc reactor navigation menu"
        aria-expanded={radialOpen}
      >
        <span
          className={`arc-reactor absolute inset-0 rounded-full bg-cyan-300 transition-transform ${
            radialOpen ? "scale-125" : "group-hover:scale-110"
          }`}
        />
        <span className="relative h-4 w-4 rounded-full bg-cyan-100/90 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        <span className="absolute inset-0 rounded-full border border-amber-300/40" />
      </button>

      <AnimatePresence>
        {radialOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => useMission.getState().setRadialOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="absolute left-0 top-0 z-50 h-40 w-40"
            >
              {/* Radial ring */}
              <div className="absolute left-5 top-5 h-[144px] w-[144px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30 opacity-60" />
              <div className="absolute left-5 top-5 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/20" />

              {RADIAL_ITEMS.map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const x = Math.cos(rad) * RADIUS;
                const y = Math.sin(rad) * RADIUS;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x, y }}
                    exit={{ opacity: 0, x: 0, y: 0 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => navigateTo(item.id)}
                    className="glass-holo border-holo touch-target absolute left-5 top-5 flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 font-mono text-[8px] uppercase tracking-[0.2em] text-cyan-200 transition-colors hover:bg-cyan-400/15"
                    style={{ marginLeft: x, marginTop: y }}
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4 text-cyan-300" />
                    <span className="hidden sm:block">{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
