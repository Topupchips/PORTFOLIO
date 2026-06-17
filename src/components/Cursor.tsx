import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "@/hooks/use-device";

/**
 * Iron Man-flavored "shooting star" cursor.
 * Canvas-based trail: gold-to-red sparks streaming behind a cyan arc-reactor core.
 * Disabled on touch devices.
 */
export function Cursor() {
  const isTouch = useIsTouchDevice();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -100, y: -100, px: -100, py: -100 });

  useEffect(() => {
    if (isTouch) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number };
    const particles: P[] = [];

    const onMove = (e: MouseEvent) => {
      mouse.current.px = mouse.current.x;
      mouse.current.py = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const dx = mouse.current.x - mouse.current.px;
      const dy = mouse.current.y - mouse.current.py;
      const speed = Math.min(40, Math.hypot(dx, dy));
      const count = 1 + Math.floor(speed / 6);
      for (let i = 0; i < count; i++) {
        const t = i / count;
        particles.push({
          x: mouse.current.px + dx * t + (Math.random() - 0.5) * 2,
          y: mouse.current.py + dy * t + (Math.random() - 0.5) * 2,
          vx: -dx * 0.04 + (Math.random() - 0.5) * 0.6,
          vy: -dy * 0.04 + (Math.random() - 0.5) * 0.6 + 0.3,
          life: 0,
          max: 28 + Math.random() * 22,
          size: 1.4 + Math.random() * 2.2,
          hue: Math.random() < 0.12 ? 190 : 35 + Math.random() * 20,
        });
      }
      if (particles.length > 400) particles.splice(0, particles.length - 400);
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        const t = 1 - p.life / p.max;
        if (t <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const r = p.size * t;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
        g.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${0.9 * t})`);
        g.addColorStop(0.4, `hsla(${p.hue - 10}, 100%, 50%, ${0.35 * t})`);
        g.addColorStop(1, `hsla(${p.hue}, 100%, 40%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      const { x, y } = mouse.current;
      const core = ctx.createRadialGradient(x, y, 0, x, y, 22);
      core.addColorStop(0, "rgba(220, 250, 255, 0.95)");
      core.addColorStop(0.35, "rgba(34, 211, 238, 0.55)");
      core.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[10000]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
