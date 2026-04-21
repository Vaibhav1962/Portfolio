"use client";

import { ArrowUpRight } from "lucide-react";
import SpellSeal from "@/components/SpellSeal";
import SpellBurst from "@/components/SpellBurst";
import QuillHeading from "@/components/QuillHeading";

export default function Projects() {
  const projects = [
    {
      title: "Soul — Emotion Intelligence",
      description: "Real-Time Emotion Intelligence System",
      tech: ['Python', 'FastAPI', 'HuggingFace', 'Docker'],
      points: [
        "RoBERTa-based model (28-class, 93% accuracy)",
        "Real-time inference (<200ms latency)",
        "Event-driven alert system with SHA-256 security",
        "Logging + unit testing",
      ],
      link: null,
      variant: 1 as const,
    },
    {
      title: "StreetSense",
      description: "Intelligent Street Data Analysis",
      tech: ['ML Pipeline', 'Data Processing'],
      points: [
        "ML-based system for analyzing street-level data",
        "Extracts actionable insights from real-world inputs",
        "Designed structured processing pipeline",
      ],
      link: "https://streetsense-nine.vercel.app/",
      variant: 2 as const,
    },
    {
      title: "Plant Disease Detection",
      description: "Edge AI Classification",
      tech: ['TensorFlow', 'MobileNetV2', 'Edge AI'],
      points: [
        "93.5% accuracy across 38 classes",
        "Optimized for edge devices",
        "Transfer learning + augmentation pipeline",
      ],
      link: "https://vaibhav-23103370.streamlit.app/",
      variant: 3 as const,
    },
    {
      title: "Smart Retail",
      description: "Demand & Price Prediction",
      tech: ['Random Forest', 'Feature Engineering'],
      points: [
        "Random Forest ML model",
        "Demand MSE: 8.15%, Price MSE: 1.11%",
        "Feature engineering + external signals",
      ],
      link: null,
      variant: 1 as const,
    },
  ];

  return (
    <section id="projects" className="py-24 px-16 xl:px-32 relative z-10 border-t codex-border overflow-hidden min-h-screen">

      {/* Background seal */}
      <div className="absolute left-[-18%] top-[5%] pointer-events-none">
        <SpellSeal size={800} opacity={0.03} reverse variant={3} />
      </div>

      <SpellBurst variant={2} className="opacity-60" />

      <QuillHeading
        text="I. Selected Works"
        tag="h2"
        className="font-serif text-4xl mb-3 text-[var(--color-gold)] font-bold italic tracking-wide"
        delay={100}
      />
      <p className="font-sans text-xs tracking-[0.25em] uppercase text-foreground/40 mb-16">
        ✦ Forged with ink &amp; logic ✦
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl relative z-10">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`group relative codex-card backdrop-blur-sm border codex-border p-10 spell-card hat-corner overflow-hidden ${
              i % 2 !== 0 ? "lg:translate-y-12" : ""
            }`}
          >
            {/* Per-card spell seal */}
            <div className="absolute right-[-25%] bottom-[-25%] opacity-[0.07] group-hover:opacity-[0.13] transition-opacity duration-700">
              <SpellSeal size={380} opacity={1} variant={project.variant} reverse={i % 2 !== 0} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <span className="font-sans text-[var(--color-gold)] text-xs uppercase tracking-widest mb-3">
                {project.description}
              </span>
              <h3 className="text-3xl font-serif text-foreground mb-6 group-hover:text-[var(--color-brown)] transition-colors">
                {project.title}
              </h3>

              <ul className="text-foreground/70 mb-8 font-sans leading-relaxed tracking-wide text-sm space-y-2">
                {project.points.map((pt, idx) => (
                  <li key={idx} className="flex pl-4 relative">
                    <span className="absolute left-0 text-[var(--color-gold)]">—</span>
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mb-8 mt-auto">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 codex-card border codex-border text-xs uppercase tracking-widest text-foreground/80 shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 text-sm tracking-widest hover:text-[var(--color-gold)] transition-colors uppercase rune-underline w-fit"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>View Portal</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
