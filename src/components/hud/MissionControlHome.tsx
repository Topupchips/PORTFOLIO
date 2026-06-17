import { motion, AnimatePresence } from "framer-motion";
import { useMission } from "@/store/mission";
import { BIO } from "@/lib/content";
import { useGame } from "@/store/game";
import { FLAVOR_UNLOCKS } from "@/lib/content";

export function MissionControlHome() {
  const stage = useMission((s) => s.stage);
  const focus = useMission((s) => s.focus);
  const pilot = useMission((s) => s.pilot);
  const gameActive = useGame((s) => s.active);
  const unlockTier = useGame((s) => s.unlockTier);
  const totalScore = useGame((s) => s.totalScore);

  const show = stage === "orbit" && !focus && !pilot && !gameActive;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="pointer-events-none fixed z-30 w-full p-3 safe-x safe-bottom max-md:bottom-[4.5rem] max-md:left-0 max-md:right-0 max-md:top-auto max-md:max-w-none max-md:translate-y-0 md:right-10 md:top-1/2 md:max-w-md md:-translate-y-1/2 md:p-4"
        >
          <div className="glass-holo border-holo pointer-events-auto max-h-[50vh] overflow-y-auto rounded-2xl p-4 sm:p-6 md:max-h-none md:p-8">
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-300/80">
              <span className="arc-reactor h-2 w-2 rounded-full bg-cyan-300" />
              Mission Control · Sol
            </div>

            <h2 className="font-display text-2xl font-bold text-holo sm:text-3xl md:text-4xl">
              Ansh Tuli
            </h2>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-amber-300/70">
              {BIO.tagline}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/70">{BIO.summary}</p>

            <ul className="mt-4 space-y-2">
              {BIO.extended.map((line) => (
                <li key={line} className="flex gap-2 text-xs text-white/55">
                  <span className="text-cyan-400">▸</span>
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {BIO.currentFocus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-400/25 px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-cyan-200/80"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-cyan-400/20 pt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
              <div>{BIO.location}</div>
              <div className="mt-2 text-cyan-300/60">
                Intel tier: {FLAVOR_UNLOCKS[unlockTier].label}
                {unlockTier < FLAVOR_UNLOCKS.length - 1 && (
                  <span className="text-white/30">
                    {" "}
                    · Play Defend Orbit to unlock ({totalScore} pts)
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
