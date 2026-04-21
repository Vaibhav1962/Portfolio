"use client";

import { useEffect, useRef, useState } from "react";

interface QuillHeadingProps {
  text: string;
  tag?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number; // ms after entering viewport
}

export default function QuillHeading({ text, tag: Tag = "h2", className = "", delay = 0 }: QuillHeadingProps) {
  const ref        = useRef<HTMLElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);
  const [active, setActive]       = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setActive(true); obs.disconnect(); }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, 42);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [active, text, delay]);

  return (
    // @ts-ignore – dynamic tag
    <Tag ref={ref} className={className}>
      {displayed}
      {!done && <span className="inline-block w-[2px] h-[0.85em] bg-[var(--color-gold)] ml-[2px] align-middle animate-[quillBlink_0.7s_step-end_infinite]" />}
    </Tag>
  );
}
