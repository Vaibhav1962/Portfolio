"use client";

import { useEffect, useState } from "react";

export default function CursorTrail() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] rounded-full border border-[var(--color-gold)] transition-transform duration-150 ease-out opacity-40 mix-blend-multiply"
        style={{ transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1})` }}
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[100] rounded-full bg-[var(--color-gold)] transition-transform duration-75 ease-out opacity-80"
        style={{ transform: `translate(${position.x - 4}px, ${position.y - 4}px)` }}
      />
    </>
  );
}
