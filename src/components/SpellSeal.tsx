"use client";

interface SpellSealProps {
  size?: number;
  opacity?: number;
  className?: string;
  reverse?: boolean;
  variant?: 1 | 2 | 3;
}

// Pre-computed coordinates to avoid SSR/client hydration mismatch
const outerTicks = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2;
  const r1 = 90, r2 = 94;
  return {
    x1: +(100 + r1 * Math.cos(angle)).toFixed(3),
    y1: +(100 + r1 * Math.sin(angle)).toFixed(3),
    x2: +(100 + r2 * Math.cos(angle)).toFixed(3),
    y2: +(100 + r2 * Math.sin(angle)).toFixed(3),
    thick: i % 4 === 0,
  };
});

const outerDots = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2;
  return {
    cx: +(100 + 86 * Math.cos(angle)).toFixed(3),
    cy: +(100 + 86 * Math.sin(angle)).toFixed(3),
  };
});

const hexPoints = (r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return `${+(100 + r * Math.cos(a)).toFixed(3)},${+(100 + r * Math.sin(a)).toFixed(3)}`;
  }).join(" ");

const middleTicks = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return {
    x1: +(100 + 64 * Math.cos(a)).toFixed(3),
    y1: +(100 + 64 * Math.sin(a)).toFixed(3),
    x2: +(100 + 70 * Math.cos(a)).toFixed(3),
    y2: +(100 + 70 * Math.sin(a)).toFixed(3),
  };
});

export default function SpellSeal({
  size = 600,
  opacity = 0.06,
  className = "",
  reverse = false,
  variant = 1,
}: SpellSealProps) {
  const dir = reverse ? "reverse" : "normal";
  const dur1 = variant === 1 ? "120s" : variant === 2 ? "90s" : "150s";
  const dur2 = variant === 1 ? "200s" : variant === 2 ? "160s" : "240s";
  const dur3 = variant === 1 ? "80s" : variant === 2 ? "60s" : "100s";

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="#5C4B37"
        strokeWidth="0.3"
        className="w-full h-full"
      >
        {/* Outer ring */}
        <g style={{ transformOrigin: "100px 100px", animation: `spin ${dur1} linear ${dir} infinite` }}>
          <circle cx="100" cy="100" r="96" strokeDasharray="3 4" strokeWidth="0.2" />
          <circle cx="100" cy="100" r="90" strokeWidth="0.4" />
          {outerTicks.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.thick ? "0.8" : "0.3"} />
          ))}
          {outerDots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="1.5" fill="#5C4B37" stroke="none" />
          ))}
        </g>

        {/* Middle ring */}
        <g style={{ transformOrigin: "100px 100px", animation: `spin ${dur2} linear ${reverse ? "normal" : "reverse"} infinite` }}>
          <circle cx="100" cy="100" r="72" />
          <circle cx="100" cy="100" r="66" strokeDasharray="1 3" strokeWidth="0.2" />
          <polygon points={hexPoints(72)} strokeWidth="0.35" fill="none" />
          {middleTicks.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth="0.4" />
          ))}
        </g>

        {/* Inner ring */}
        <g style={{ transformOrigin: "100px 100px", animation: `spin ${dur3} linear ${dir} infinite` }}>
          <circle cx="100" cy="100" r="46" />
          <circle cx="100" cy="100" r="40" strokeDasharray="0.5 2" strokeWidth="0.2" />
          <rect x="67" y="67" width="66" height="66" transform="rotate(45 100 100)" strokeWidth="0.35" />
          <line x1="100" y1="54" x2="100" y2="146" strokeWidth="0.25" />
          <line x1="54" y1="100" x2="146" y2="100" strokeWidth="0.25" />
          <line x1="67" y1="67" x2="133" y2="133" strokeWidth="0.15" strokeDasharray="1 3" />
          <line x1="133" y1="67" x2="67" y2="133" strokeWidth="0.15" strokeDasharray="1 3" />
        </g>

        {/* Core */}
        <circle cx="100" cy="100" r="22" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="16" strokeWidth="0.8" />
        {variant === 1 && <path d="M100 84 L112 108 L88 108 Z" strokeWidth="0.6" fill="none" />}
        {variant === 2 && (
          <>
            <circle cx="100" cy="100" r="8" strokeWidth="0.6" />
            <line x1="100" y1="92" x2="100" y2="108" strokeWidth="0.5" />
            <line x1="92" y1="100" x2="108" y2="100" strokeWidth="0.5" />
          </>
        )}
        {variant === 3 && <polygon points="100,84 108,108 92,108" strokeWidth="0.6" fill="none" />}
        <circle cx="100" cy="100" r="4" fill="#C6A87C" stroke="none" opacity="0.7" />
      </svg>
    </div>
  );
}
