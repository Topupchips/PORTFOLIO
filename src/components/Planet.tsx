import { motion } from "framer-motion";

interface PlanetProps {
  size: number;
  className?: string;
  gradient?: string;
  ring?: boolean;
  delay?: number;
}

export function Planet({
  size,
  className = "",
  gradient = "radial-gradient(circle at 30% 30%, oklch(0.85 0.18 295), oklch(0.45 0.22 280) 45%, oklch(0.15 0.08 270) 100%)",
  ring = false,
  delay = 0,
}: PlanetProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -24, 0], rotate: [0, 360] }}
      transition={{
        y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 80, repeat: Infinity, ease: "linear" },
      }}
    >
      <div
        className="relative h-full w-full rounded-full"
        style={{
          background: gradient,
          boxShadow:
            "inset -20px -20px 60px rgba(0,0,0,0.6), 0 0 80px -10px oklch(0.78 0.18 295 / 0.6)",
        }}
      >
        {ring && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: size * 1.8,
              height: size * 0.3,
              border: "2px solid oklch(0.82 0.16 200 / 0.5)",
              transform: "translate(-50%, -50%) rotateX(75deg)",
              boxShadow: "0 0 20px oklch(0.82 0.16 200 / 0.4)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
