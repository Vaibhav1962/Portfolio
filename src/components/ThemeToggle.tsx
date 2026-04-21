"use client";

import { useEffect, useState } from "react";
import { THEME_LABELS, THEME_ORDER, type ThemeName } from "@/lib/themes";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("codex-theme") as ThemeName | null;
    const resolved: ThemeName =
      saved && THEME_ORDER.includes(saved)
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.setAttribute("data-theme", resolved);
    setTheme(resolved);
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const idx = THEME_ORDER.indexOf(theme);
    const nextTheme = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("codex-theme", nextTheme);
  };

  if (!mounted) return null;

  const icon =
    theme === "dark"
      ? "☽"
      : theme === "dawn"
        ? "✶"
        : theme === "midnight"
          ? "✦"
          : "☀";

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Theme: ${THEME_LABELS[theme]}. Click to cycle theme.`}
      title={`Theme: ${THEME_LABELS[theme]}`}
      className="fixed bottom-8 right-8 z-[300] w-12 h-12 flex items-center justify-center
                 rounded-full border border-[var(--color-gold)] bg-[var(--background)]
                 shadow-[0_0_20px_rgba(198,168,124,0.25)] hover:shadow-[0_0_30px_rgba(198,168,124,0.45)]
                 transition-all duration-400 cursor-pointer group"
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Runic outer ring — spins slowly on hover */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="absolute inset-0 w-full h-full group-hover:rotate-[30deg] transition-transform duration-700 pointer-events-none"
      >
        <circle
          cx="24" cy="24" r="22"
          stroke="var(--color-gold)"
          strokeWidth="0.5"
          strokeDasharray="2 3"
          opacity="0.5"
        />
        {/* 8 tick marks */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x1 = +(24 + 19 * Math.cos(a)).toFixed(2);
          const y1 = +(24 + 19 * Math.sin(a)).toFixed(2);
          const x2 = +(24 + 22 * Math.cos(a)).toFixed(2);
          const y2 = +(24 + 22 * Math.sin(a)).toFixed(2);
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="var(--color-gold)"
              strokeWidth={i % 2 === 0 ? "1" : "0.4"}
              opacity="0.6"
            />
          );
        })}
      </svg>

      {/* Icon */}
      <span
        key={theme}
        className={`text-[var(--color-gold)] text-lg select-none relative z-10 ${
          theme === "dark" || theme === "midnight" ? "theme-toggle-moon" : "theme-toggle-sun"
        }`}
      >
        {icon}
      </span>
    </button>
  );
}
