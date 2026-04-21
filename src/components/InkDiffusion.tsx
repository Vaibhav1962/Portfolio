"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number; y: number;
  r: number; maxR: number;
  opacity: number; speed: number;
}

export default function InkDiffusion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const blobs: Blob[] = [];
    const spawnBlob = () => {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1,
        maxR: 40 + Math.random() * 80,
        opacity: 0.025 + Math.random() * 0.04,
        speed: 0.08 + Math.random() * 0.1,
      });
    };
    // Spawn blobs over 6 seconds
    for (let i = 0; i < 8; i++) setTimeout(spawnBlob, i * 800);
    const interval = setInterval(spawnBlob, 3000);

    let raf: number;
    const isDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDark();
      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i];
        b.r += b.speed;
        if (b.r > b.maxR) {
          b.opacity -= 0.0003;
          if (b.opacity <= 0) { blobs.splice(i, 1); continue; }
        }
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        if (dark) {
          // Warm gold mist for dark mode
          grad.addColorStop(0,   `rgba(212,168,83,${b.opacity * 0.6})`);
          grad.addColorStop(0.6, `rgba(180,140,60,${b.opacity * 0.25})`);
          grad.addColorStop(1,   `rgba(212,168,83,0)`);
        } else {
          // Dark ink blobs for light mode
          grad.addColorStop(0,   `rgba(44,36,22,${b.opacity})`);
          grad.addColorStop(0.6, `rgba(92,75,55,${b.opacity * 0.5})`);
          grad.addColorStop(1,   `rgba(44,36,22,0)`);
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);

    // Sync blend-mode with theme
    const applyBlend = () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      canvas.style.mixBlendMode = dark ? "screen" : "multiply";
    };
    applyBlend();
    const observer = new MutationObserver(applyBlend);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
