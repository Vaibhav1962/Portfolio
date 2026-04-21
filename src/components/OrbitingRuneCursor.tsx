"use client";

import { useEffect, useRef } from "react";

export default function OrbitingRuneCursor() {
  const runeRef  = useRef<SVGSVGElement>(null);
  const svgRef   = useRef<SVGSVGElement>(null);
  const dotRef   = useRef<SVGCircleElement>(null);
  const ringRef  = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let mouseX = -200, mouseY = -200;
    let lerpX  = -200, lerpY  = -200;
    let angle  = 0;
    let raf: number;
    const ORBIT_R = 26;
    const LERP    = 0.1;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      lerpX += (mouseX - lerpX) * LERP;
      lerpY += (mouseY - lerpY) * LERP;
      angle += 0.025;

      const ox = lerpX + ORBIT_R * Math.cos(angle);
      const oy = lerpY + ORBIT_R * Math.sin(angle);

      if (runeRef.current)  runeRef.current.style.transform  = `translate(${ox - 10}px, ${oy - 10}px)`;
      if (dotRef.current)  { dotRef.current.setAttribute("cx", String(mouseX));  dotRef.current.setAttribute("cy", String(mouseY)); }
      if (ringRef.current) { ringRef.current.setAttribute("cx", String(mouseX)); ringRef.current.setAttribute("cy", String(mouseY)); }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animate();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      {/* Dot + ring centered on cursor */}
      <svg ref={svgRef} className="fixed inset-0 pointer-events-none z-[102] w-full h-full overflow-visible" style={{ width: "100vw", height: "100vh" }}>
        <circle ref={ringRef} r="14" fill="none" stroke="#C6A87C" strokeWidth="0.6" opacity="0.35" />
        <circle ref={dotRef}  r="2.5" fill="#C6A87C" opacity="0.85" />
      </svg>
      {/* Orbiting rune triangle */}
      <svg
        ref={runeRef}
        width="20" height="20" viewBox="0 0 20 20"
        className="fixed top-0 left-0 pointer-events-none z-[102]"
        fill="none" stroke="#C6A87C" strokeWidth="0.8"
      >
        <circle cx="10" cy="10" r="8.5" opacity="0.45" strokeDasharray="1.5 2" />
        <polygon points="10,2.5 17,15.5 3,15.5" opacity="0.85" />
        <circle cx="10" cy="10" r="2" fill="#C6A87C" stroke="none" opacity="0.9" />
      </svg>
    </>
  );
}
