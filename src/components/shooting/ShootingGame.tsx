import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMission } from "@/store/mission";
import { useGame } from "@/store/game";
import { FLAVOR_UNLOCKS } from "@/lib/content";
import { useIsTouchDevice } from "@/hooks/use-device";
import { Crosshair, X } from "lucide-react";

type TouchInput = {
  dx: number;
  dy: number;
  firing: boolean;
};

function GameTouchControls({
  inputRef,
}: {
  inputRef: React.MutableRefObject<TouchInput>;
}) {
  const joystickRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const activeTouchRef = useRef<number | null>(null);
  const centerRef = useRef({ x: 0, y: 0 });
  const maxRadius = 48;

  const resetKnob = () => {
    if (knobRef.current) {
      knobRef.current.style.transform = "translate(-50%, -50%)";
    }
    inputRef.current.dx = 0;
    inputRef.current.dy = 0;
  };

  const handleJoystickStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (activeTouchRef.current !== null) return;
    const touch = e.changedTouches[0];
    activeTouchRef.current = touch.identifier;
    const rect = joystickRef.current?.getBoundingClientRect();
    if (!rect) return;
    centerRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = Array.from(e.touches).find((t) => t.identifier === activeTouchRef.current);
    if (!touch) return;

    const dx = touch.clientX - centerRef.current.x;
    const dy = touch.clientY - centerRef.current.y;
    const dist = Math.hypot(dx, dy);
    const clamped = Math.min(dist, maxRadius);
    const angle = Math.atan2(dy, dx);
    const nx = (Math.cos(angle) * clamped) / maxRadius;
    const ny = (Math.sin(angle) * clamped) / maxRadius;

    inputRef.current.dx = nx;
    inputRef.current.dy = ny;

    if (knobRef.current) {
      const px = Math.cos(angle) * clamped;
      const py = Math.sin(angle) * clamped;
      knobRef.current.style.transform = `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`;
    }
  };

  const handleJoystickEnd = (e: React.TouchEvent) => {
    const touch = [...e.changedTouches].find((t) => t.identifier === activeTouchRef.current);
    if (!touch) return;
    activeTouchRef.current = null;
    resetKnob();
  };

  const setFiring = (v: boolean) => {
    inputRef.current.firing = v;
  };

  return (
    <>
      <div
        ref={joystickRef}
        className="touch-control-zone pointer-events-auto absolute bottom-24 left-4 z-20 h-28 w-28 rounded-full border border-cyan-400/30 bg-cyan-400/5 safe-bottom sm:bottom-20 sm:left-6 sm:h-32 sm:w-32"
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
        onTouchCancel={handleJoystickEnd}
        aria-label="Movement joystick"
      >
        <div
          ref={knobRef}
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50 bg-cyan-400/25 shadow-[0_0_16px_rgba(34,211,238,0.4)]"
        />
      </div>

      <button
        type="button"
        className="touch-control-zone touch-target pointer-events-auto absolute bottom-24 right-4 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/15 font-mono text-[9px] uppercase tracking-wider text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.25)] safe-bottom active:bg-amber-400/30 sm:bottom-20 sm:right-6 sm:h-[4.5rem] sm:w-[4.5rem]"
        onTouchStart={(e) => {
          e.preventDefault();
          setFiring(true);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          setFiring(false);
        }}
        onTouchCancel={() => setFiring(false)}
        aria-label="Fire weapons"
      >
        Fire
      </button>
    </>
  );
}

type Meteor = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
};

type Projectile = {
  id: number;
  x: number;
  y: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
};

type Ship = {
  x: number;
  y: number;
};

const GAME_DURATION = 45;
const SPAWN_INTERVAL = 800;
const SHIP_WIDTH = 36;
const SHIP_HEIGHT = 28;
const SHIP_SPEED = 5.5;
const PROJECTILE_SPEED = 14;
const FIRE_RATE_MS = 140;
const MAX_METEORS = 30;
const MAX_PROJECTILES = 40;

function circleHit(
  ax: number,
  ay: number,
  ar: number,
  bx: number,
  by: number,
  br: number,
): boolean {
  const dx = ax - bx;
  const dy = ay - by;
  const r = ar + br;
  return dx * dx + dy * dy <= r * r;
}

function drawMeteor(
  ctx: CanvasRenderingContext2D,
  m: Meteor,
) {
  ctx.save();
  ctx.translate(m.x + m.size / 2, m.y + m.size / 2);
  ctx.rotate((m.rotation * Math.PI) / 180);
  const r = m.size / 2;
  const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
  grad.addColorStop(0, "#fbbf24");
  grad.addColorStop(0.5, "#dc2626");
  grad.addColorStop(1, "#451a03");
  ctx.fillStyle = grad;
  ctx.shadowColor = "rgba(251,191,36,0.6)";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawShip(ctx: CanvasRenderingContext2D, ship: Ship) {
  const cx = ship.x;
  const cy = ship.y;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.shadowColor = "rgba(34,211,238,0.8)";
  ctx.shadowBlur = 16;

  const hull = ctx.createLinearGradient(0, -SHIP_HEIGHT / 2, 0, SHIP_HEIGHT / 2);
  hull.addColorStop(0, "#67e8f9");
  hull.addColorStop(0.5, "#22d3ee");
  hull.addColorStop(1, "#0891b2");
  ctx.fillStyle = hull;
  ctx.beginPath();
  ctx.moveTo(0, -SHIP_HEIGHT / 2);
  ctx.lineTo(SHIP_WIDTH / 2, SHIP_HEIGHT / 2);
  ctx.lineTo(0, SHIP_HEIGHT / 2 - 6);
  ctx.lineTo(-SHIP_WIDTH / 2, SHIP_HEIGHT / 2);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const engineGrad = ctx.createLinearGradient(0, SHIP_HEIGHT / 2 - 4, 0, SHIP_HEIGHT / 2 + 10);
  engineGrad.addColorStop(0, "rgba(251,191,36,0.9)");
  engineGrad.addColorStop(1, "rgba(251,191,36,0)");
  ctx.fillStyle = engineGrad;
  ctx.beginPath();
  ctx.moveTo(-6, SHIP_HEIGHT / 2 - 4);
  ctx.lineTo(6, SHIP_HEIGHT / 2 - 4);
  ctx.lineTo(0, SHIP_HEIGHT / 2 + 8 + Math.random() * 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawProjectile(ctx: CanvasRenderingContext2D, p: Projectile) {
  ctx.save();
  ctx.shadowColor = "rgba(103,232,249,0.9)";
  ctx.shadowBlur = 10;
  const grad = ctx.createLinearGradient(p.x, p.y - 10, p.x, p.y + 4);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.4, "#67e8f9");
  grad.addColorStop(1, "rgba(34,211,238,0)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(p.x, p.y + 4);
  ctx.lineTo(p.x, p.y - 12);
  ctx.stroke();
  ctx.restore();
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.globalAlpha = p.life;
  ctx.fillStyle = `hsl(${p.hue}, 90%, 65%)`;
  ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, ${p.life})`;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function ShootingGame() {
  const {
    active,
    sessionScore,
    highScore,
    totalScore,
    unlockTier,
    endGame,
    addScore,
    hydrate,
  } = useGame();
  const isTouch = useIsTouchDevice();
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [combo, setCombo] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchInputRef = useRef<TouchInput>({ dx: 0, dy: 0, firing: false });

  const comboRef = useRef(0);
  const addScoreRef = useRef(addScore);
  const endGameRef = useRef(endGame);

  useEffect(() => {
    addScoreRef.current = addScore;
    endGameRef.current = endGame;
  }, [addScore, endGame]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const resetCombo = useCallback(() => {
    comboRef.current = 0;
    setCombo(0);
  }, []);

  useEffect(() => {
    if (!active) return;

    setTimeLeft(GAME_DURATION);
    setCombo(0);
    comboRef.current = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let lastSpawn = 0;
    let lastFire = 0;
    let lastFrame = 0;
    let entityId = 0;
    let running = true;

    const keys = new Set<string>();
    let shooting = false;
    const maxMeteors = isTouch ? 18 : MAX_METEORS;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const ship: Ship = {
      x: window.innerWidth / 2,
      y: window.innerHeight - 80,
    };
    const meteors: Meteor[] = [];
    const projectiles: Projectile[] = [];
    const particles: Particle[] = [];

    const spawnMeteor = () => {
      const w = canvas.width;
      const h = canvas.height;
      entityId += 1;
      const size = 24 + Math.random() * 32;
      const fromSide = Math.random() < 0.25;
      let x: number;
      let y: number;
      let vx: number;
      let vy: number;

      if (fromSide) {
        const fromLeft = Math.random() < 0.5;
        x = fromLeft ? -size : w + size;
        y = Math.random() * h * 0.6;
        const targetX = ship.x + (Math.random() - 0.5) * 120;
        const targetY = ship.y;
        const angle = Math.atan2(targetY - y, targetX - x);
        const speed = 1.8 + Math.random() * 2;
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      } else {
        x = Math.random() * w;
        y = -size;
        vx = (Math.random() - 0.5) * 1.5;
        vy = 1.5 + Math.random() * 2.5;
        const driftToPlayer = Math.random() < 0.35;
        if (driftToPlayer) {
          const angle = Math.atan2(ship.y - y, ship.x - x);
          const speed = Math.hypot(vx, vy);
          vx = Math.cos(angle) * speed * 0.6 + vx * 0.4;
          vy = Math.sin(angle) * speed * 0.6 + vy * 0.4;
        }
      }

      meteors.push({
        id: entityId,
        x,
        y,
        vx,
        vy,
        size,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
      });
    };

    const spawnExplosion = (x: number, y: number, size: number) => {
      const count = 6 + Math.floor(size / 8);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const speed = 1.5 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.7 + Math.random() * 0.3,
          size: 2 + Math.random() * 3,
          hue: 30 + Math.random() * 20,
        });
      }
    };

    const fireProjectile = (now: number) => {
      if (now - lastFire < FIRE_RATE_MS) return;
      if (projectiles.length >= MAX_PROJECTILES) return;
      lastFire = now;
      entityId += 1;
      projectiles.push({
        id: entityId,
        x: ship.x,
        y: ship.y - SHIP_HEIGHT / 2,
      });
    };

    const destroyMeteor = (index: number) => {
      const m = meteors[index];
      spawnExplosion(m.x + m.size / 2, m.y + m.size / 2, m.size);
      meteors.splice(index, 1);
      const bonus = Math.min(comboRef.current, 5) * 2;
      addScoreRef.current(10 + bonus);
      comboRef.current += 1;
      setCombo(comboRef.current);
    };

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - lastFrame) / 16.67, 2);
      lastFrame = now;

      const w = canvas.width;
      const h = canvas.height;
      const margin = 40;

      if (keys.has("ArrowLeft") || keys.has("a") || keys.has("A")) ship.x -= SHIP_SPEED * dt;
      if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) ship.x += SHIP_SPEED * dt;
      if (keys.has("ArrowUp") || keys.has("w") || keys.has("W")) ship.y -= SHIP_SPEED * dt;
      if (keys.has("ArrowDown") || keys.has("s") || keys.has("S")) ship.y += SHIP_SPEED * dt;

      const touch = touchInputRef.current;
      if (touch.dx !== 0 || touch.dy !== 0) {
        ship.x += touch.dx * SHIP_SPEED * dt;
        ship.y += touch.dy * SHIP_SPEED * dt;
      }

      ship.x = Math.max(SHIP_WIDTH / 2 + 8, Math.min(w - SHIP_WIDTH / 2 - 8, ship.x));
      ship.y = Math.max(h * 0.35, Math.min(h - 60, ship.y));

      if (shooting || keys.has(" ") || touch.firing) fireProjectile(now);

      if (now - lastSpawn >= SPAWN_INTERVAL) {
        lastSpawn = now;
        if (meteors.length < maxMeteors) spawnMeteor();
      }

      for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].y -= PROJECTILE_SPEED * dt;
        if (projectiles[i].y < -20) projectiles.splice(i, 1);
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.rotation += m.rotationSpeed * dt;

        if (m.y > h + margin || m.x < -margin || m.x > w + margin) {
          meteors.splice(i, 1);
          resetCombo();
          continue;
        }

        const mx = m.x + m.size / 2;
        const my = m.y + m.size / 2;
        const mr = m.size / 2;

        if (circleHit(ship.x, ship.y, SHIP_WIDTH / 3, mx, my, mr * 0.85)) {
          meteors.splice(i, 1);
          resetCombo();
          spawnExplosion(mx, my, m.size);
          continue;
        }

        for (let j = projectiles.length - 1; j >= 0; j--) {
          const p = projectiles[j];
          if (circleHit(p.x, p.y, 4, mx, my, mr)) {
            projectiles.splice(j, 1);
            destroyMeteor(i);
            break;
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= 0.03 * dt;
        if (p.life <= 0) particles.splice(i, 1);
      }

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(34,211,238,0.06)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 80) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += 80) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      for (const m of meteors) drawMeteor(ctx, m);
      for (const p of projectiles) drawProjectile(ctx, p);
      for (const p of particles) drawParticle(ctx, p);
      drawShip(ctx, ship);

      animId = requestAnimationFrame(tick);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        endGameRef.current();
        return;
      }
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      keys.add(e.key);
    };
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.key);

    const onMouseDown = () => {
      shooting = true;
    };
    const onMouseUp = () => {
      shooting = false;
    };

    const onResize = () => {
      resize();
      ship.x = Math.min(ship.x, canvas.width - SHIP_WIDTH / 2 - 8);
      ship.y = Math.min(ship.y, canvas.height - 60);
    };

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          endGameRef.current();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);

    lastFrame = performance.now();
    lastSpawn = lastFrame;
    animId = requestAnimationFrame(tick);

    touchInputRef.current = { dx: 0, dy: 0, firing: false };

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      clearInterval(timer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
    };
  }, [active, resetCombo, isTouch]);

  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] touch-control-zone"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
          aria-label="Defend Orbit space shooter"
        />

        {isTouch && <GameTouchControls inputRef={touchInputRef} />}

        {/* HUD */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 safe-top safe-x p-3 font-mono text-[9px] uppercase tracking-[0.2em] sm:p-6 sm:text-[10px] sm:tracking-[0.3em]">
          <div className="glass-holo min-w-0 rounded-xl px-3 py-2 text-cyan-300 sm:px-4 sm:py-3">
            <div className="text-white/50">Score</div>
            <div className="text-xl font-display text-holo sm:text-2xl">{sessionScore}</div>
            {combo > 1 && <div className="text-amber-300">Combo ×{combo}</div>}
          </div>
          <div className="glass-holo rounded-xl px-3 py-2 text-center text-cyan-300 sm:px-4 sm:py-3">
            <div className="text-white/50">Time</div>
            <div className="text-xl font-display sm:text-2xl">{timeLeft}s</div>
          </div>
          <div className="glass-holo hidden min-w-0 rounded-xl px-3 py-2 text-right text-cyan-300 min-[380px]:block sm:px-4 sm:py-3">
            <div className="text-white/50">High / Total</div>
            <div className="text-sm">
              {highScore} / {totalScore}
            </div>
            <div className="mt-1 text-amber-300/80">{FLAVOR_UNLOCKS[unlockTier].label}</div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            endGame();
          }}
          className="glass-holo border-holo touch-target absolute right-3 top-20 z-20 flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300 hover:bg-cyan-400/10 safe-top safe-x sm:right-6 sm:top-24"
        >
          <X className="h-4 w-4" /> Abort
        </button>

        {!isTouch && (
          <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden max-w-xl -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200/70 md:block">
            <Crosshair className="mr-2 inline h-3 w-3" />
            WASD / Arrows move · Space or hold click to fire · Esc to exit · Score unlocks planet
            intel
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function ShootingGameLauncher() {
  const { active, startGame, unlockTier, hydrated } = useGame();
  const stage = useMission((s) => s.stage);

  if (!hydrated || stage !== "orbit" || active) return null;

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={startGame}
      className="glass-holo border-holo touch-target fixed z-40 flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-amber-200 hover:bg-amber-400/10 safe-bottom safe-x bottom-[8.5rem] right-4 md:bottom-6 md:right-36"
    >
      <Crosshair className="h-3 w-3" />
      Defend Orbit
      {unlockTier > 0 && (
        <span className="rounded-full bg-cyan-400/20 px-1.5 py-0.5 text-[8px] text-cyan-300">
          T{unlockTier}
        </span>
      )}
    </motion.button>
  );
}
