"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min((scrolled / max) * 100, 100) : 0;
      if (fillRef.current) fillRef.current.style.width = `${pct}%`;
      if (dotRef.current)  dotRef.current.style.left   = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[200] pointer-events-none">
      {/* Track */}
      <div className="absolute inset-0 bg-[#cfc5b5]/20" />
      {/* Gold fill */}
      <div
        ref={fillRef}
        className="h-full transition-none"
        style={{
          background: "linear-gradient(90deg, #b8944a 0%, #E8D5A3 50%, #C6A87C 100%)",
          boxShadow: "0 0 6px rgba(198,168,124,0.6)",
          width: "0%",
        }}
      />
      {/* Leading glow dot */}
      <div
        ref={dotRef}
        className="absolute top-[-3px] h-[8px] w-[8px] rounded-full"
        style={{
          background: "#E8D5A3",
          boxShadow: "0 0 10px 3px rgba(198,168,124,0.85)",
          transform: "translateX(-50%)",
          left: "0%",
        }}
      />
    </div>
  );
}
