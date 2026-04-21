"use client";

import { useEffect, useRef, useState } from "react";

interface SpellBurstProps {
  variant?: 1 | 2 | 3;
  className?: string;
}

export default function SpellBurst({ variant = 1, className = "" }: SpellBurstProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const [fired, setFired]   = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (fired) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); setFired(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [fired]);

  const poly =
    variant === 1 ? "50,10 90,90 10,90" :
    variant === 2 ? "50,10 90,50 50,90 10,50" :
    "50,10 83,30 83,70 50,90 17,70 17,30";

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden
    >
      {active && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ animation: "spellBurstFadeOut 2.5s ease forwards" }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="#C6A87C"
            strokeWidth="0.5"
            className="w-[80vmin] h-[80vmin] max-w-2xl"
          >
            {/* Outer ring */}
            <circle cx="50" cy="50" r="47"
              strokeDasharray="295" strokeDashoffset="295"
              style={{ animation: "drawPath 0.7s ease forwards 0s" }}
            />
            {/* Outer dashed ring */}
            <circle cx="50" cy="50" r="42" strokeWidth="0.25"
              strokeDasharray="2 3"
              style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards 0.5s" }}
            />
            {/* Star polygon */}
            <polygon points={poly}
              strokeDasharray="400" strokeDashoffset="400"
              style={{ animation: "drawPath 0.9s ease forwards 0.5s" }}
            />
            {/* Middle ring */}
            <circle cx="50" cy="50" r="28"
              strokeDasharray="176" strokeDashoffset="176"
              style={{ animation: "drawPath 0.6s ease forwards 0.9s" }}
            />
            {/* Inner cross */}
            <line x1="50" y1="22" x2="50" y2="78"
              strokeDasharray="56" strokeDashoffset="56"
              style={{ animation: "drawPath 0.3s ease forwards 1.1s" }}
            />
            <line x1="22" y1="50" x2="78" y2="50"
              strokeDasharray="56" strokeDashoffset="56"
              style={{ animation: "drawPath 0.3s ease forwards 1.2s" }}
            />
            {/* Core */}
            <circle cx="50" cy="50" r="8"
              strokeDasharray="50" strokeDashoffset="50"
              style={{ animation: "drawPath 0.3s ease forwards 1.35s" }}
            />
            <circle cx="50" cy="50" r="3" fill="#C6A87C" stroke="none"
              style={{ opacity: 0, animation: "fadeIn 0.3s ease forwards 1.5s" }}
            />
          </svg>
          {/* Glow burst */}
          <div
            className="absolute w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(198,168,124,0.25) 0%, transparent 70%)",
              animation: "spellGlowBurst 1.8s ease forwards 0.8s",
              opacity: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
