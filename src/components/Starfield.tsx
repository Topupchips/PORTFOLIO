import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const stars: Star[] = [];
    const STAR_COUNT = 600;
    const SPEED = 0.6;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: Math.random() * width,
        pz: 0,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let raf = 0;
    const render = () => {
      ctx.fillStyle = "rgba(10, 8, 25, 0.35)";
      ctx.fillRect(0, 0, width, height);
      ctx.translate(width / 2, height / 2);

      for (const s of stars) {
        s.pz = s.z;
        s.z -= SPEED;
        if (s.z < 1) {
          s.x = (Math.random() - 0.5) * width;
          s.y = (Math.random() - 0.5) * height;
          s.z = width;
          s.pz = s.z;
        }
        const sx = (s.x / s.z) * width;
        const sy = (s.y / s.z) * width;
        const px = (s.x / s.pz) * width;
        const py = (s.y / s.pz) * width;
        const size = (1 - s.z / width) * 2.2;
        const hue = 260 + (s.x % 60);
        ctx.strokeStyle = `hsla(${hue}, 90%, 80%, ${0.4 + (1 - s.z / width) * 0.6})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
