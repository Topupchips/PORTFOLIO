import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMission } from "@/store/mission";
import { HUD_WIDGETS, type HudSection } from "@/lib/content";
import { Activity, AlertTriangle, Target, ChevronUp } from "lucide-react";

function resolveSection(focus: ReturnType<typeof useMission.getState>["focus"]): HudSection {
  if (!focus) return "home";
  return focus;
}

export function JarvisWidgets() {
  const focus = useMission((s) => s.focus);
  const section = resolveSection(focus);
  const data = HUD_WIDGETS[section];
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop widgets */}
      <div className="pointer-events-none fixed inset-0 z-20 hidden lg:block">
        <DesktopWidgets section={section} data={data} />
      </div>

      {/* Mobile compact drawer */}
      <div className="pointer-events-none fixed inset-x-0 top-16 z-20 lg:hidden safe-x">
        <div className="pointer-events-auto mx-auto max-w-sm">
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="touch-target glass-holo flex w-full items-center justify-between rounded-xl px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-300/80"
            aria-expanded={mobileOpen}
            aria-label="Toggle J.A.R.V.I.S. diagnostics"
          >
            <span className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5" />
              J.A.R.V.I.S. · {data.mission.phase}
            </span>
            <ChevronUp
              className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="glass-holo mt-2 max-h-[40vh] space-y-3 overflow-y-auto rounded-xl p-3">
                  <MobileWidgetBlock icon={Activity} label="Diagnostics">
                    {data.diagnostics.map((d) => (
                      <div
                        key={d.label}
                        className="flex items-center justify-between font-mono text-[9px]"
                      >
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
                  </MobileWidgetBlock>

                  <MobileWidgetBlock icon={AlertTriangle} label="Alerts">
                    {data.alerts.map((a) => (
                      <div
                        key={a}
                        className="flex items-start gap-2 font-mono text-[9px] text-amber-200/80"
                      >
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 arc-reactor" />
                        {a}
                      </div>
                    ))}
                  </MobileWidgetBlock>

                  <MobileWidgetBlock icon={Target} label="Mission">
                    <div className="font-mono text-[9px] text-white/60 leading-relaxed">
                      {data.mission.objective}
                    </div>
                    <div className="mt-2 text-amber-300/70">{data.mission.eta}</div>
                  </MobileWidgetBlock>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function DesktopWidgets({
  section,
  data,
}: {
  section: HudSection;
  data: (typeof HUD_WIDGETS)[HudSection];
}) {
  return (
    <>
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
    </>
  );
}

function MobileWidgetBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.3em] text-cyan-300/70">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="space-y-1.5">{children}</div>
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
