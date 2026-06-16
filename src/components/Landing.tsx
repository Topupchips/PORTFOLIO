import { motion } from "framer-motion";
import { useMission } from "@/store/mission";
import { Rocket } from "lucide-react";

export function Landing() {
  const setStage = useMission((s) => s.setStage);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      className="pointer-events-none fixed inset-0 z-30 flex flex-col items-center justify-center"
    >
      {/* Shooting stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="shooting-star absolute h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              top: `${Math.random() * 50}%`,
              left: `-10%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="pointer-events-auto relative flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-300/70"
        >
          <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Initializing Mission
          <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </motion.div>

        <h1 className="font-display text-6xl font-black uppercase tracking-tight text-holo sm:text-8xl md:text-9xl">
          Ansh Tuli
        </h1>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ delay: 1, duration: 1.5 }}
          className="mt-4 font-mono text-xs uppercase text-white/60 sm:text-sm"
        >
          AI Founder · Software Engineer · Builder
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setStage("orbit")}
          className="glass-holo border-holo group mt-12 flex items-center gap-3 rounded-full px-8 py-4 font-mono text-xs uppercase tracking-[0.4em] text-cyan-200 transition-all hover:bg-cyan-400/10"
        >
          <Rocket className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          Enter Mission
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-16 font-mono text-[9px] uppercase tracking-[0.3em] text-white/30"
        >
          Coordinates 45.96°N · 66.64°W · Fredericton, NB
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
