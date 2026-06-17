import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMission, type Destination } from "@/store/mission";
import { getTransitionLines } from "@/lib/content";

export function TransitionNarration() {
  const cameraTransitioning = useMission((s) => s.cameraTransitioning);
  const transitionKey = useMission((s) => s.transitionKey);
  const focus = useMission((s) => s.focus);
  const setCameraTransitioning = useMission((s) => s.setCameraTransitioning);
  const prevFocusRef = useRef<Destination | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!cameraTransitioning) return;

    const from = prevFocusRef.current;
    const to = focus;
    const narration = getTransitionLines(from, to);
    setLines(narration);
    setLineIndex(0);
    prevFocusRef.current = focus;

    const lineTimer = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, narration.length - 1));
    }, 900);

    const endTimer = setTimeout(() => {
      setCameraTransitioning(false);
    }, 2800);

    return () => {
      clearInterval(lineTimer);
      clearTimeout(endTimer);
    };
  }, [cameraTransitioning, transitionKey, focus, setCameraTransitioning]);

  return (
    <AnimatePresence>
      {cameraTransitioning && lines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="pointer-events-none fixed bottom-40 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 px-3 text-center safe-bottom md:bottom-32"
        >
          <div className="glass-holo border-holo rounded-full px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-200 sm:px-8 sm:py-3 sm:text-[11px] sm:tracking-[0.35em]">
            <span className="mr-3 text-cyan-400/60">J.A.R.V.I.S.</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={lineIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {lines[lineIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
