import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const m = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return (
    <>
      <div className="cursor-dot" style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }} />
      <div className="cursor-ring" style={{ transform: `translate(${pos.x - 20}px, ${pos.y - 20}px)` }} />
    </>
  );
}
