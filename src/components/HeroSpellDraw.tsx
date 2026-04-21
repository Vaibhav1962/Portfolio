"use client";

import { useEffect, useRef } from "react";

// Pre-computed for SSR safety
const OUTER_TICKS = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2;
  return { x1: +(100 + 88 * Math.cos(a)).toFixed(2), y1: +(100 + 88 * Math.sin(a)).toFixed(2), x2: +(100 + 93 * Math.cos(a)).toFixed(2), y2: +(100 + 93 * Math.sin(a)).toFixed(2), thick: i % 4 === 0 };
});
const HEX = Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2; return `${+(100 + 70 * Math.cos(a)).toFixed(2)},${+(100 + 70 * Math.sin(a)).toFixed(2)}`; }).join(" ");
const MID_TICKS = Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return { x1: +(100 + 62 * Math.cos(a)).toFixed(2), y1: +(100 + 62 * Math.sin(a)).toFixed(2), x2: +(100 + 67 * Math.cos(a)).toFixed(2), y2: +(100 + 67 * Math.sin(a)).toFixed(2) }; });
const OUTER_DOTS = Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return { cx: +(100 + 85 * Math.cos(a)).toFixed(2), cy: +(100 + 85 * Math.sin(a)).toFixed(2) }; });

const drawStyle = (delay: number, dur: number, len: number = 1000) => ({
  strokeDasharray: len,
  strokeDashoffset: len,
  animation: `drawPath ${dur}s ease forwards ${delay}s`,
} as React.CSSProperties);

export default function HeroSpellDraw() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // After full draw (~5s), slowly fade to background opacity
    const t = setTimeout(() => {
      if (wrapRef.current) {
        wrapRef.current.style.transition = "opacity 2s ease";
        wrapRef.current.style.opacity    = "0.045";
      }
    }, 5200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
      style={{ opacity: 0.35 }}
    >
      <svg viewBox="0 0 200 200" fill="none" stroke="#5C4B37" strokeWidth="0.35" className="w-[900px] h-[900px] max-w-none">

        {/* 0: Outermost dashed ring */}
        <circle cx="100" cy="100" r="96" strokeDasharray="2 4" strokeWidth="0.2" style={drawStyle(0, 1.2, 700)} />

        {/* 1: Main outer ring */}
        <circle cx="100" cy="100" r="90" strokeWidth="0.5" style={drawStyle(0.3, 1.0, 600)} />

        {/* 2: Outer tick marks */}
        {OUTER_TICKS.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            strokeWidth={t.thick ? "0.9" : "0.3"}
            style={{ ...drawStyle(0.6 + i * 0.04, 0.25, 10), animationFillMode: "forwards" }}
          />
        ))}

        {/* 3: Outer dots */}
        {OUTER_DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="1.8" fill="#5C4B37" stroke="none"
            style={{ opacity: 0, animation: `fadeIn 0.3s ease forwards ${1.8 + i * 0.08}s` }}
          />
        ))}

        {/* 4: Hex polygon */}
        <polygon points={HEX} strokeWidth="0.4" style={drawStyle(2.2, 0.9, 500)} />

        {/* 5: Middle ring */}
        <circle cx="100" cy="100" r="68" style={drawStyle(2.6, 0.8, 500)} />
        <circle cx="100" cy="100" r="62" strokeDasharray="1 3" strokeWidth="0.2" style={drawStyle(2.8, 0.7, 400)} />

        {/* 6: Middle ticks */}
        {MID_TICKS.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth="0.4"
            style={drawStyle(3.0 + i * 0.04, 0.2, 8)}
          />
        ))}

        {/* 7: Square rotated */}
        <rect x="63" y="63" width="74" height="74" transform="rotate(45 100 100)" strokeWidth="0.4" style={drawStyle(3.5, 0.7, 400)} />

        {/* 8: Inner ring */}
        <circle cx="100" cy="100" r="42" style={drawStyle(3.8, 0.6, 300)} />
        <circle cx="100" cy="100" r="36" strokeDasharray="0.5 2" strokeWidth="0.2" style={drawStyle(4.0, 0.5, 240)} />

        {/* 9: Elemental cross */}
        <line x1="100" y1="58" x2="100" y2="142" strokeWidth="0.3" style={drawStyle(4.2, 0.4, 90)} />
        <line x1="58"  y1="100" x2="142" y2="100" strokeWidth="0.3" style={drawStyle(4.3, 0.4, 90)} />
        <line x1="72"  y1="72"  x2="128" y2="128" strokeWidth="0.15" strokeDasharray="1 3" style={drawStyle(4.4, 0.35, 85)} />
        <line x1="128" y1="72"  x2="72"  y2="128" strokeWidth="0.15" strokeDasharray="1 3" style={drawStyle(4.45, 0.35, 85)} />

        {/* 10: Core rings */}
        <circle cx="100" cy="100" r="20" strokeWidth="0.6" style={drawStyle(4.6, 0.4, 130)} />
        <circle cx="100" cy="100" r="14" strokeWidth="0.9" style={drawStyle(4.75, 0.3, 100)} />

        {/* 11: Core sigil triangle */}
        <path d="M100 86 L113 110 L87 110 Z" strokeWidth="0.7" style={drawStyle(4.9, 0.35, 100)} />

        {/* 12: Gold core dot */}
        <circle cx="100" cy="100" r="4" fill="#C6A87C" stroke="#b8944a" strokeWidth="0.5"
          style={{ opacity: 0, animation: "fadeIn 0.5s ease forwards 5s" }}
        />
        {/* Glow ring */}
        <circle cx="100" cy="100" r="8" stroke="#C6A87C" strokeWidth="0.3" strokeDasharray="2 3"
          style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards 5.1s" }}
        />
      </svg>
    </div>
  );
}
