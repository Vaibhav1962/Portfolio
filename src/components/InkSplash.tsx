"use client";

import { useEffect, useRef } from "react";

interface Splash {
  id: number;
  x: number;
  y: number;
}

/** Convert a #RRGGBB hex string to "R,G,B" for use in rgba() */
function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

export default function InkSplash() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't fire on buttons/links
      if (target.closest("a, button, input, textarea")) return;

      const id = counterRef.current++;
      const container = containerRef.current;
      if (!container) return;

      // Use current theme's gold colour
      const gold = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-gold").trim() || "#C6A87C";

      const el = document.createElement("div");
      el.className = "ink-splash-ring";
      el.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 0;
        height: 0;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      `;

      // Multiple rings
      for (let i = 0; i < 3; i++) {
        const ring = document.createElement("div");
        const size = 20 + i * 30;
        ring.style.cssText = `
          position: absolute;
          left: 50%;
          top: 50%;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: ${1 - i * 0.25}px solid rgba(${gold.startsWith('#') ? hexToRgb(gold) : gold},${0.7 - i * 0.2});
          transform: translate(-50%, -50%) scale(0);
          animation: inkRingExpand ${0.6 + i * 0.15}s cubic-bezier(0.17,0.67,0.35,1) ${i * 0.05}s forwards;
        `;
        el.appendChild(ring);
      }

      // Center dot
      const dot = document.createElement("div");
      dot.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${gold};
        transform: translate(-50%, -50%) scale(0);
        animation: inkDotPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
      `;
      el.appendChild(dot);

      // Small droplets
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const dist = 18 + Math.random() * 14;
        const droplet = document.createElement("div");
        droplet.style.cssText = `
          position: absolute;
          left: 50%;
          top: 50%;
          width: ${2 + Math.random() * 2}px;
          height: ${2 + Math.random() * 2}px;
          border-radius: 50%;
          background: rgba(${gold.startsWith('#') ? hexToRgb(gold) : gold},0.7);
          transform: translate(-50%, -50%);
          animation: inkDroplet 0.5s ease-out ${i * 0.03}s forwards;
          --dx: ${(Math.cos(angle) * dist).toFixed(1)}px;
          --dy: ${(Math.sin(angle) * dist).toFixed(1)}px;
        `;
        el.appendChild(droplet);
      }

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 900);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <style>{`
        @keyframes inkRingExpand {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
        }
        @keyframes inkDotPop {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          60%  { transform: translate(-50%,-50%) scale(1.4); opacity: 0.9; }
          100% { transform: translate(-50%,-50%) scale(0); opacity: 0; }
        }
        @keyframes inkDroplet {
          0%   { transform: translate(-50%,-50%); opacity: 0.8; }
          100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))); opacity: 0; }
        }
      `}</style>
      <div ref={containerRef} />
    </>
  );
}
