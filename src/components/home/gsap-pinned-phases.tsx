"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Phase {
  num: string;
  title: string;
  description: string;
}

interface GSAPPinnedPhasesProps {
  phases: Phase[];
}

export function GSAPPinnedPhases({ phases }: GSAPPinnedPhasesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const el = containerRef.current;
      if (!el) return;

      const items = el.querySelectorAll<HTMLElement>(".phase-item");
      const progressFill = el.querySelector<HTMLElement>(".progress-fill");
      const progressDots = el.querySelectorAll<HTMLElement>(".progress-dot");
      const phaseIcons = el.querySelectorAll<SVGElement>(".phase-icon");
      if (!items.length) return;

      // Set initial state — all hidden except first
      items.forEach((item, i) => {
        if (i > 0) gsap.set(item, { opacity: 0, y: 30 });
      });
      gsap.set(phaseIcons, { opacity: 0, scale: 0.5 });
      if (phaseIcons[0]) gsap.set(phaseIcons[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 15%",
          end: `+=${phases.length * 60}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
        },
      });

      // Animate each phase in/out
      items.forEach((item, i) => {
        if (i > 0) {
          tl.to(items[i - 1], { opacity: 0, y: -20, duration: 0.3 }, `phase${i}`);
          tl.fromTo(
            item,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.3 },
            `phase${i}`
          );
          if (progressFill) {
            tl.to(progressFill, {
              scaleY: (i + 1) / phases.length,
              duration: 0.3,
              ease: "power2.out",
            }, `phase${i}`);
          }
          if (progressDots[i]) {
            tl.to(progressDots[i], {
              backgroundColor: "#059E87",
              scale: 1.3,
              duration: 0.2,
            }, `phase${i}`);
          }
          if (phaseIcons[i - 1]) {
            tl.to(phaseIcons[i - 1], { opacity: 0, scale: 0.5, duration: 0.2 }, `phase${i}`);
          }
          if (phaseIcons[i]) {
            tl.to(phaseIcons[i], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, `phase${i}`);
          }
        }
        if (i < items.length - 1) {
          tl.to({}, { duration: 0.4 });
        }
      });
    },
    { scope: containerRef, dependencies: [phases] }
  );

  /* ── Phase Icons — Lighthouse-to-Engine transformation arc ── */
  const phaseIcons = [
    /* 01 Prepare — The Lighthouse scanning the horizon */
    <svg key="p0" className="phase-icon absolute inset-0" viewBox="0 0 220 220" fill="none" aria-hidden>
      {/* Lighthouse tower */}
      <rect x="30" y="60" width="14" height="80" rx="1" stroke="rgba(5,158,135,0.35)" strokeWidth="1.5" fill="rgba(5,158,135,0.05)" />
      <rect x="26" y="140" width="22" height="6" rx="1" fill="rgba(5,158,135,0.15)" />
      {/* Lantern room */}
      <rect x="28" y="48" width="18" height="14" rx="2" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" fill="rgba(5,158,135,0.1)" />
      <circle cx="37" cy="55" r="4" fill="#059E87" opacity="0.8" />
      {/* Lighthouse beam — scanning */}
      <polygon points="45,52 200,20 200,90 45,58" fill="url(#lhBeam1)" />
      {/* Beam rays */}
      <line x1="45" y1="55" x2="200" y2="35" stroke="rgba(5,158,135,0.12)" strokeWidth="0.5" />
      <line x1="45" y1="55" x2="200" y2="55" stroke="rgba(5,158,135,0.15)" strokeWidth="0.5" />
      <line x1="45" y1="55" x2="200" y2="75" stroke="rgba(5,158,135,0.12)" strokeWidth="0.5" />
      {/* Horizon line */}
      <line x1="0" y1="150" x2="220" y2="150" stroke="rgba(5,158,135,0.1)" strokeWidth="0.5" />
      {/* Data points in beam path */}
      <circle cx="90" cy="48" r="2.5" fill="rgba(5,158,135,0.15)" />
      <circle cx="130" cy="42" r="2.5" fill="rgba(5,158,135,0.25)" />
      <circle cx="155" cy="55" r="3" fill="#059E87" opacity="0.5" />
      <circle cx="180" cy="38" r="2" fill="rgba(5,158,135,0.2)" />
      <circle cx="170" cy="68" r="2" fill="rgba(5,158,135,0.15)" />
      {/* Ground texture */}
      <line x1="60" y1="160" x2="90" y2="158" stroke="rgba(5,158,135,0.08)" strokeWidth="0.5" />
      <line x1="100" y1="162" x2="140" y2="160" stroke="rgba(5,158,135,0.06)" strokeWidth="0.5" />
      <line x1="150" y1="165" x2="200" y2="162" stroke="rgba(5,158,135,0.04)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="lhBeam1" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#059E87" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#059E87" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>,

    /* 02 Modernize — Infrastructure exposed and reorganized */
    <svg key="p1" className="phase-icon absolute inset-0" viewBox="0 0 220 220" fill="none" aria-hidden>
      {/* Lighthouse silhouette — faded in background */}
      <rect x="20" y="50" width="10" height="60" rx="1" stroke="rgba(5,158,135,0.08)" strokeWidth="1" fill="none" />
      <rect x="18" y="44" width="14" height="8" rx="1" stroke="rgba(5,158,135,0.08)" strokeWidth="1" fill="none" />
      {/* Cross-section frame */}
      <rect x="55" y="30" width="140" height="160" rx="4" stroke="rgba(5,158,135,0.2)" strokeWidth="1.5" fill="rgba(5,158,135,0.03)" />
      <line x1="125" y1="30" x2="125" y2="190" stroke="rgba(5,158,135,0.15)" strokeWidth="1" strokeDasharray="4 4" />
      <text x="82" y="25" fill="rgba(5,158,135,0.3)" fontSize="6" fontFamily="monospace">BEFORE</text>
      <text x="148" y="25" fill="#059E87" fontSize="6" fontFamily="monospace" opacity="0.6">AFTER</text>
      {/* Left side — tangled */}
      <path d="M 70,55 Q 85,70 75,90 Q 65,110 90,120 Q 100,115 80,135 Q 70,155 95,165" stroke="rgba(5,158,135,0.25)" strokeWidth="1" fill="none" />
      <path d="M 85,50 Q 100,80 80,100 Q 70,120 100,130 Q 110,125 95,145 Q 85,160 110,170" stroke="rgba(5,158,135,0.2)" strokeWidth="1" fill="none" />
      <path d="M 95,60 Q 80,75 95,95 Q 110,115 85,125 Q 75,140 105,155" stroke="rgba(5,158,135,0.18)" strokeWidth="1" fill="none" />
      {/* Right side — clean parallel channels */}
      <line x1="140" y1="50" x2="140" y2="180" stroke="rgba(5,158,135,0.35)" strokeWidth="1" />
      <line x1="155" y1="50" x2="155" y2="180" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      <line x1="170" y1="50" x2="170" y2="180" stroke="rgba(5,158,135,0.35)" strokeWidth="1" />
      <line x1="185" y1="50" x2="185" y2="180" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      {/* Flow dots on clean channels */}
      <circle cx="140" cy="80" r="2" fill="#059E87" opacity="0.6" />
      <circle cx="155" cy="100" r="2" fill="#059E87" opacity="0.5" />
      <circle cx="170" cy="70" r="2" fill="#059E87" opacity="0.6" />
      <circle cx="185" cy="120" r="2" fill="#059E87" opacity="0.5" />
      {/* Connection nodes */}
      <circle cx="140" cy="50" r="3" fill="rgba(5,158,135,0.3)" />
      <circle cx="155" cy="50" r="3" fill="rgba(5,158,135,0.3)" />
      <circle cx="170" cy="50" r="3" fill="rgba(5,158,135,0.3)" />
      <circle cx="185" cy="50" r="3" fill="rgba(5,158,135,0.3)" />
      {/* Arrow indicating direction */}
      <polygon points="118,105 125,100 118,95" fill="rgba(5,158,135,0.3)" />
    </svg>,

    /* 03 Build — Engine assembly with lighthouse lens core */
    <svg key="p2" className="phase-icon absolute inset-0" viewBox="0 0 220 220" fill="none" aria-hidden>
      {/* Machine frame */}
      <rect x="40" y="40" width="140" height="140" rx="5" stroke="rgba(5,158,135,0.25)" strokeWidth="1.5" fill="rgba(5,158,135,0.03)" />
      {/* Component blocks assembling */}
      <rect x="50" y="50" width="35" height="22" rx="2" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.25)" strokeWidth="1" />
      <rect x="135" y="50" width="35" height="22" rx="2" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.25)" strokeWidth="1" />
      <rect x="50" y="148" width="35" height="22" rx="2" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.25)" strokeWidth="1" />
      <rect x="135" y="148" width="35" height="22" rx="2" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.25)" strokeWidth="1" />
      {/* Connection paths to center */}
      <line x1="85" y1="61" x2="95" y2="95" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      <line x1="135" y1="61" x2="125" y2="95" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      <line x1="85" y1="159" x2="95" y2="125" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      <line x1="135" y1="159" x2="125" y2="125" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      {/* The Fresnel lens — THE lighthouse core, installed in the machine */}
      <circle cx="110" cy="110" r="25" fill="none" stroke="#059E87" strokeWidth="2" />
      <circle cx="110" cy="110" r="17" fill="none" stroke="rgba(5,158,135,0.4)" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="110" cy="110" r="9" fill="none" stroke="rgba(5,158,135,0.5)" strokeWidth="1" />
      <circle cx="110" cy="110" r="3.5" fill="#059E87" />
      {/* Flow dots on connections */}
      <circle cx="90" cy="78" r="2" fill="#059E87" opacity="0.5" />
      <circle cx="130" cy="78" r="2" fill="#059E87" opacity="0.5" />
      {/* Control panel — bottom */}
      <rect x="55" y="185" width="110" height="12" rx="2" fill="rgba(5,158,135,0.06)" stroke="rgba(5,158,135,0.15)" strokeWidth="0.75" />
      <rect x="60" y="188" width="8" height="6" rx="1" fill="rgba(5,158,135,0.2)" />
      <rect x="72" y="188" width="8" height="6" rx="1" fill="rgba(5,158,135,0.15)" />
      <rect x="84" y="188" width="8" height="6" rx="1" fill="#059E87" opacity="0.4" />
      <rect x="96" y="188" width="8" height="6" rx="1" fill="rgba(5,158,135,0.2)" />
      <rect x="108" y="188" width="8" height="6" rx="1" fill="rgba(5,158,135,0.15)" />
      <rect x="120" y="188" width="8" height="6" rx="1" fill="rgba(5,158,135,0.2)" />
      <rect x="132" y="188" width="8" height="6" rx="1" fill="rgba(5,158,135,0.15)" />
      <rect x="144" y="188" width="8" height="6" rx="1" fill="#059E87" opacity="0.3" />
    </svg>,

    /* 04 Scale — Network radiating from the central machine */
    <svg key="p3" className="phase-icon absolute inset-0" viewBox="0 0 220 220" fill="none" aria-hidden>
      {/* Expansion rings */}
      <circle cx="110" cy="110" r="90" stroke="rgba(5,158,135,0.06)" strokeWidth="1" />
      <circle cx="110" cy="110" r="65" stroke="rgba(5,158,135,0.1)" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="110" cy="110" r="40" stroke="rgba(5,158,135,0.15)" strokeWidth="1" />
      {/* Central machine — small version with lens */}
      <rect x="95" y="95" width="30" height="30" rx="3" fill="rgba(5,158,135,0.08)" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      <circle cx="110" cy="110" r="8" fill="none" stroke="#059E87" strokeWidth="1.5" />
      <circle cx="110" cy="110" r="3" fill="#059E87" />
      {/* Connection lines to outer nodes */}
      <line x1="125" y1="100" x2="168" y2="55" stroke="rgba(5,158,135,0.2)" strokeWidth="1" />
      <line x1="125" y1="120" x2="175" y2="145" stroke="rgba(5,158,135,0.2)" strokeWidth="1" />
      <line x1="95" y1="100" x2="52" y2="60" stroke="rgba(5,158,135,0.2)" strokeWidth="1" />
      <line x1="95" y1="120" x2="50" y2="155" stroke="rgba(5,158,135,0.2)" strokeWidth="1" />
      <line x1="110" y1="95" x2="110" y2="30" stroke="rgba(5,158,135,0.2)" strokeWidth="1" />
      <line x1="110" y1="125" x2="110" y2="190" stroke="rgba(5,158,135,0.2)" strokeWidth="1" />
      {/* Outer nodes — replicated machines */}
      <rect x="160" y="42" width="20" height="20" rx="2" fill="rgba(5,158,135,0.08)" stroke="rgba(5,158,135,0.25)" strokeWidth="0.75" />
      <circle cx="170" cy="52" r="4" fill="none" stroke="#059E87" strokeWidth="0.75" />
      <rect x="165" y="135" width="20" height="20" rx="2" fill="rgba(5,158,135,0.08)" stroke="rgba(5,158,135,0.25)" strokeWidth="0.75" />
      <circle cx="175" cy="145" r="4" fill="none" stroke="#059E87" strokeWidth="0.75" />
      <rect x="40" y="47" width="20" height="20" rx="2" fill="rgba(5,158,135,0.08)" stroke="rgba(5,158,135,0.25)" strokeWidth="0.75" />
      <circle cx="50" cy="57" r="4" fill="none" stroke="#059E87" strokeWidth="0.75" />
      <rect x="38" y="143" width="20" height="20" rx="2" fill="rgba(5,158,135,0.08)" stroke="rgba(5,158,135,0.25)" strokeWidth="0.75" />
      <circle cx="48" cy="153" r="4" fill="none" stroke="#059E87" strokeWidth="0.75" />
      <rect x="100" y="18" width="20" height="20" rx="2" fill="rgba(5,158,135,0.08)" stroke="rgba(5,158,135,0.25)" strokeWidth="0.75" />
      <circle cx="110" cy="28" r="4" fill="none" stroke="#059E87" strokeWidth="0.75" />
      <rect x="100" y="180" width="20" height="20" rx="2" fill="rgba(5,158,135,0.08)" stroke="rgba(5,158,135,0.25)" strokeWidth="0.75" />
      <circle cx="110" cy="190" r="4" fill="none" stroke="#059E87" strokeWidth="0.75" />
      {/* People figures — simple circles near nodes */}
      <circle cx="185" cy="48" r="2.5" fill="rgba(5,158,135,0.35)" />
      <line x1="185" y1="51" x2="185" y2="58" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      <circle cx="30" cy="62" r="2.5" fill="rgba(5,158,135,0.35)" />
      <line x1="30" y1="65" x2="30" y2="72" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      <circle cx="190" cy="140" r="2.5" fill="rgba(5,158,135,0.35)" />
      <line x1="190" y1="143" x2="190" y2="150" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      <circle cx="30" cy="158" r="2.5" fill="rgba(5,158,135,0.35)" />
      <line x1="30" y1="161" x2="30" y2="168" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
    </svg>,
  ];

  return (
    <div ref={containerRef}>
      <div className="relative min-h-[40vh] flex items-center">
        {/* Vertical progress track */}
        <div className="hidden lg:flex flex-col items-center gap-0 absolute left-0 top-1/2 -translate-y-1/2 h-[60%]">
          <div className="relative w-0.5 h-full bg-border-light/30 rounded-full overflow-hidden">
            <div
              className="progress-fill absolute top-0 left-0 w-full bg-accent-dark origin-top rounded-full"
              style={{ height: "100%", transform: "scaleY(0.25)" }}
            />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col justify-between h-full">
            {phases.map((_, i) => (
              <div
                key={i}
                className="progress-dot w-2.5 h-2.5 rounded-full border border-accent-dark/30"
                style={{ backgroundColor: i === 0 ? "#059E87" : "transparent" }}
              />
            ))}
          </div>
        </div>

        {/* Phase content + icon */}
        <div className="lg:pl-12 w-full lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="relative">
            {phases.map((phase) => (
              <div
                key={phase.num}
                className="phase-item absolute inset-0 flex items-center first:relative"
              >
                <div className="flex items-baseline gap-6 max-w-xl">
                  <span className="metric text-4xl lg:text-6xl text-accent-dark/30 font-bold shrink-0">
                    {phase.num}
                  </span>
                  <div>
                    <h3
                      className="text-3xl lg:text-5xl text-text-on-light tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {phase.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-text-on-light-sub font-medium">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phase icon — animated, swaps with each phase */}
          <div className="hidden lg:block relative w-full aspect-square max-w-[280px] mx-auto">
            {phaseIcons}
          </div>
        </div>
      </div>
    </div>
  );
}
