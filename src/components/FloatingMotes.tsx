"use client";

import { useEffect, useRef } from "react";

const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";

interface RuneMote {
  x: number;
  y: number;
  rune: string;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  phase: number;
  rotation: number;
  rotSpeed: number;
}

export default function FloatingMotes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();

    const COUNT = 40;
    const motes: RuneMote[] = Array.from({ length: COUNT }, () => ({
      x:        Math.random() * window.innerWidth,
      y:        Math.random() * document.body.scrollHeight,
      rune:     RUNES[Math.floor(Math.random() * RUNES.length)],
      size:     10 + Math.random() * 14,
      speed:    0.18 + Math.random() * 0.32,
      opacity:  0.06 + Math.random() * 0.16,
      drift:    (Math.random() - 0.5) * 0.3,
      phase:    Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
    }));

    let t = 0;
    let raf: number;

    const isDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark";

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      motes.forEach((m) => {
        // Drift upward
        m.y -= m.speed;
        m.x += m.drift * Math.sin(t * 0.01 + m.phase);
        m.rotation += m.rotSpeed;

        // Recycle off-screen
        if (m.y < -30) {
          m.y    = canvas.height + 30;
          m.x    = Math.random() * canvas.width;
          m.rune = RUNES[Math.floor(Math.random() * RUNES.length)];
        }

        // Pulse opacity
        const alpha = m.opacity * (0.6 + 0.4 * Math.sin(t * 0.018 + m.phase));
        const dark = isDark();
        const glowColor = dark ? "rgba(212,168,83,0.7)" : "rgba(198,168,124,0.6)";
        const fillColor = dark ? "#D4A853" : "#C6A87C";
        const ringColor = dark ? "#D4A853" : "#C6A87C";

        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(m.rotation);

        // Glow behind rune
        ctx.shadowColor  = glowColor;
        ctx.shadowBlur   = m.size * 0.8;
        ctx.globalAlpha  = alpha;
        ctx.fillStyle    = fillColor;
        ctx.font         = `${m.size}px serif`;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(m.rune, 0, 0);

        // Subtle ring around larger runes
        if (m.size > 18) {
          ctx.shadowBlur  = 0;
          ctx.globalAlpha = alpha * 0.4;
          ctx.strokeStyle = ringColor;
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, m.size * 0.85, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      raf = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    // Keep canvas blend-mode in sync with theme toggles
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
      className="fixed inset-0 pointer-events-none z-[5]"
      data-theme-canvas
    />
  );
}
