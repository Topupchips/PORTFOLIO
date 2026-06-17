import { motion, AnimatePresence } from "framer-motion";
import { useMission } from "@/store/mission";
import { ENGRAVINGS } from "@/lib/content";
import { useGame } from "@/store/game";

export function NightSkyEngravings() {
  const stage = useMission((s) => s.stage);
  const focus = useMission((s) => s.focus);
  const pilot = useMission((s) => s.pilot);
  const gameActive = useGame((s) => s.active);

  const show = stage === "orbit" && !focus && !pilot && !gameActive;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
          aria-hidden
        >
          {/* Constellation lines */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.08]">
            <line x1="8%" y1="12%" x2="12%" y2="78%" stroke="#22d3ee" strokeWidth="0.5" />
            <line x1="78%" y1="18%" x2="85%" y2="42%" stroke="#22d3ee" strokeWidth="0.5" />
            <line x1="5%" y1="38%" x2="42%" y2="88%" stroke="#a78bfa" strokeWidth="0.5" />
            <line x1="55%" y1="8%" x2="72%" y2="72%" stroke="#fbbf24" strokeWidth="0.5" />
          </svg>

          {ENGRAVINGS.map((e, i) => (
            <motion.div
              key={e.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
              className="engraving absolute font-mono text-[9px] uppercase tracking-[0.45em] text-cyan-200/40 md:text-[10px]"
              style={{
                left: e.x,
                top: e.y,
                transform: `rotate(${e.rotate ?? 0}deg)`,
              }}
            >
              {e.text}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1 }}
            className="absolute left-1/2 top-[22%] -translate-x-1/2 text-center font-display text-xs uppercase tracking-[0.6em] text-cyan-300/30 md:text-sm"
          >
            Ansh Tuli · Navigator
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
