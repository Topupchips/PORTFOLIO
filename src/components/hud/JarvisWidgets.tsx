import { motion } from "framer-motion";
import { useMission } from "@/store/mission";
import { HUD_WIDGETS, type HudSection } from "@/lib/content";
import { Activity, AlertTriangle, Target } from "lucide-react";

function resolveSection(focus: ReturnType<typeof useMission.getState>["focus"]): HudSection {
  if (!focus) return "home";
  return focus;
}

export function JarvisWidgets() {
  const focus = useMission((s) => s.focus);
  const section = resolveSection(focus);
  const data = HUD_WIDGETS[section];

  return (
    <div className="pointer-events-none fixed inset-0 z-20 hidden lg:block">
      {/* Diagnostics — top left */}
      <motion.div
        key={`diag-${section}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-24 top-20 w-52"
      >
        <WidgetHeader icon={Activity} label="Diagnostics" />
        <div className="glass-holo mt-2 space-y-1.5 rounded-xl p-3">
          {data.diagnostics.map((d) => (
            <div key={d.label} className="flex items-center justify-between font-mono text-[9px]">
              <span className="text-white/50">{d.label}</span>
              <span
                className={
                  d.status === "active"
                    ? "text-cyan-300"
                    : d.status === "warn"
                      ? "text-amber-300"
                      : "text-green-400/80"
                }
              >
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Alerts — top right */}
      <motion.div
        key={`alert-${section}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute right-6 top-20 w-56"
      >
        <WidgetHeader icon={AlertTriangle} label="System Alerts" />
        <div className="glass-holo mt-2 space-y-2 rounded-xl p-3">
          {data.alerts.map((a, i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex items-start gap-2 font-mono text-[9px] text-amber-200/80"
            >
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 arc-reactor" />
              {a}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mission status — bottom left */}
      <motion.div
        key={`mission-${section}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-24 left-24 w-64"
      >
        <WidgetHeader icon={Target} label="Mission Status" />
        <div className="glass-holo mt-2 rounded-xl p-3 font-mono text-[9px]">
          <div className="mb-2 text-cyan-300 uppercase tracking-[0.2em]">{data.mission.phase}</div>
          <div className="text-white/60 leading-relaxed">{data.mission.objective}</div>
          <div className="mt-3 border-t border-cyan-400/20 pt-2 text-amber-300/70">
            {data.mission.eta}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function WidgetHeader({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-cyan-300/70">
      <Icon className="h-3 w-3" />
      {label}
    </div>
  );
}
