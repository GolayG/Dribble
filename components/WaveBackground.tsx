"use client";

import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { cn } from "@/lib/utils";

interface WaveBackgroundProps {
  className?: string;
  strokeColor?: string;
  backgroundColor?: string;
  opacity?: number;
}

type Point = {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
};

export function WaveBackground({
  className,
  strokeColor = "#e63946",
  backgroundColor = "transparent",
  opacity = 0.3,
}: WaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseRef = useRef({ x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false });
  const pathsRef = useRef<SVGPathElement[]>([]);
  const linesRef = useRef<Point[][]>([]);
  const noiseRef = useRef<ReturnType<typeof createNoise2D> | null>(null);
  const rafRef = useRef<number | null>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;
    noiseRef.current = createNoise2D();
    setSize();
    setLines();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const setSize = () => {
    if (!containerRef.current || !svgRef.current) return;
    boundingRef.current = containerRef.current.getBoundingClientRect();
    const { width, height } = boundingRef.current;
    svgRef.current.style.width = `${width}px`;
    svgRef.current.style.height = `${height}px`;
  };

  const setLines = () => {
    if (!svgRef.current || !boundingRef.current) return;
    const { width, height } = boundingRef.current;
    linesRef.current = [];
    pathsRef.current.forEach((p) => p.remove());
    pathsRef.current = [];
    const xGap = 10, yGap = 10;
    const oWidth = width + 200, oHeight = height + 30;
    const totalLines = Math.ceil(oWidth / xGap);
    const totalPoints = Math.ceil(oHeight / yGap);
    const xStart = (width - xGap * totalLines) / 2;
    const yStart = (height - yGap * totalPoints) / 2;
    for (let i = 0; i < totalLines; i++) {
      const points: Point[] = [];
      for (let j = 0; j < totalPoints; j++) {
        points.push({ x: xStart + xGap * i, y: yStart + yGap * j, wave: { x: 0, y: 0 }, cursor: { x: 0, y: 0, vx: 0, vy: 0 } });
      }
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", strokeColor);
      path.setAttribute("stroke-width", "1");
      svgRef.current.appendChild(path);
      pathsRef.current.push(path);
      linesRef.current.push(points);
    }
  };

  const onResize = () => { setSize(); setLines(); };
  const onMouseMove = (e: MouseEvent) => {
    if (!boundingRef.current) return;
    const mouse = mouseRef.current;
    mouse.x = e.pageX - boundingRef.current.left;
    mouse.y = e.pageY - boundingRef.current.top + window.scrollY;
    if (!mouse.set) { mouse.sx = mouse.x; mouse.sy = mouse.y; mouse.lx = mouse.x; mouse.ly = mouse.y; mouse.set = true; }
  };

  const moved = (p: Point, withCursor = true) => ({
    x: p.x + p.wave.x + (withCursor ? p.cursor.x : 0),
    y: p.y + p.wave.y + (withCursor ? p.cursor.y : 0),
  });

  const tick = (time: number) => {
    const mouse = mouseRef.current;
    mouse.sx += (mouse.x - mouse.sx) * 0.1;
    mouse.sy += (mouse.y - mouse.sy) * 0.1;
    const dx = mouse.x - mouse.lx, dy = mouse.y - mouse.ly;
    mouse.v = Math.hypot(dx, dy);
    mouse.vs += (mouse.v - mouse.vs) * 0.1;
    mouse.vs = Math.min(100, mouse.vs);
    mouse.lx = mouse.x; mouse.ly = mouse.y;
    mouse.a = Math.atan2(dy, dx);

    const noise = noiseRef.current;
    if (noise) {
      linesRef.current.forEach((points) => {
        points.forEach((p) => {
          const move = noise((p.x + time * 0.008) * 0.003, (p.y + time * 0.003) * 0.002) * 8;
          p.wave.x = Math.cos(move) * 12; p.wave.y = Math.sin(move) * 6;
          const d = Math.hypot(p.x - mouse.sx, p.y - mouse.sy);
          const l = Math.max(175, mouse.vs);
          if (d < l) { const s = 1 - d / l, f = Math.cos(d * 0.001) * s; p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00035; p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00035; }
          p.cursor.vx += (0 - p.cursor.x) * 0.01; p.cursor.vy += (0 - p.cursor.y) * 0.01;
          p.cursor.vx *= 0.95; p.cursor.vy *= 0.95;
          p.cursor.x += p.cursor.vx; p.cursor.y += p.cursor.vy;
          p.cursor.x = Math.min(50, Math.max(-50, p.cursor.x));
          p.cursor.y = Math.min(50, Math.max(-50, p.cursor.y));
        });
      });
    }

    linesRef.current.forEach((points, i) => {
      if (points.length < 2 || !pathsRef.current[i]) return;
      const fp = moved(points[0], false);
      let d = `M ${fp.x} ${fp.y}`;
      for (let j = 1; j < points.length; j++) { const c = moved(points[j]); d += `L ${c.x} ${c.y}`; }
      pathsRef.current[i].setAttribute("d", d);
    });

    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      style={{ backgroundColor, opacity }}
    >
      <svg ref={svgRef} className="block w-full h-full" xmlns="http://www.w3.org/2000/svg" />
    </div>
  );
}
