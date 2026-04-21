"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  pulse: number;
}

interface Edge {
  a: number;
  b: number;
}

const STAR_COUNT = 55;
const CONNECTION_DIST = 180;

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Generate stars
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.5 + Math.random() * 1.2,
      opacity: 0.1 + Math.random() * 0.25,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Pre-compute edges (connections between close stars)
    const edges: Edge[] = [];
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DIST) {
          edges.push({ a: i, b: j });
        }
      }
    }

    let t = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      // Draw connections
      edges.forEach(({ a, b }) => {
        const sa = stars[a], sb = stars[b];
        const dx = sa.x - sb.x;
        const dy = sa.y - sb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const fade = 1 - dist / CONNECTION_DIST;
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.strokeStyle = `rgba(198,168,124,${fade * 0.08})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      });

      // Draw stars
      stars.forEach((s) => {
        const glow = 0.5 + 0.5 * Math.sin(t * 0.012 + s.pulse);
        const alpha = s.opacity * (0.7 + 0.3 * glow);

        // Outer glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,168,124,${alpha * 0.12})`;
        ctx.fill();

        // Star body
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,168,124,${alpha})`;
        ctx.fill();

        // Cross sparkle for larger stars
        if (s.r > 1.2) {
          ctx.strokeStyle = `rgba(198,168,124,${alpha * 0.5})`;
          ctx.lineWidth = 0.4;
          const len = s.r * 4;
          ctx.beginPath();
          ctx.moveTo(s.x - len, s.y);
          ctx.lineTo(s.x + len, s.y);
          ctx.moveTo(s.x, s.y - len);
          ctx.lineTo(s.x, s.y + len);
          ctx.stroke();
        }
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    // Sync canvas blend-mode with theme
    const applyBlend = () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      canvas.style.mixBlendMode = dark ? "screen" : "multiply";
    };
    applyBlend();
    const observer = new MutationObserver(applyBlend);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[3]"
    />
  );
}
