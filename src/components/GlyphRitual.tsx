"use client";

import { useEffect, useRef, useState } from "react";

const COOLDOWN_MS = 12000;
const RITUAL_MS = 2200;

export default function GlyphRitual() {
  const [active, setActive] = useState(false);
  const cooldownRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.shiftKey && event.altKey && event.code === "KeyR")) return;
      const now = Date.now();
      if (now < cooldownRef.current) return;
      cooldownRef.current = now + COOLDOWN_MS;
      setActive(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setActive(false), RITUAL_MS);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-[180] grid place-items-center transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}>
      <svg
        width="520"
        height="520"
        viewBox="0 0 200 200"
        className={`${active ? "glyph-ritual-active" : ""}`}
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="74" className="glyph-ring" />
        <circle cx="100" cy="100" r="58" className="glyph-ring glyph-ring-inner" />
        <polygon points="100,32 166,147 34,147" className="glyph-ring" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 100 + 84 * Math.cos(a);
          const y = 100 + 84 * Math.sin(a);
          return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="glyph-rune">ᛟ</text>;
        })}
      </svg>
    </div>
  );
}
