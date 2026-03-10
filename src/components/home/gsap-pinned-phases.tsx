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
          // Animate progress bar and dots
          if (progressFill) {
            tl.to(progressFill, {
              scaleY: (i + 1) / phases.length,
              duration: 0.3,
              ease: "power2.out",
            }, `phase${i}`);
          }
          if (progressDots[i]) {
            tl.to(progressDots[i], {
              backgroundColor: "#00E5C3",
              scale: 1.3,
              duration: 0.2,
            }, `phase${i}`);
          }
          // Swap phase icon
          if (phaseIcons[i - 1]) {
            tl.to(phaseIcons[i - 1], { opacity: 0, scale: 0.5, duration: 0.2 }, `phase${i}`);
          }
          if (phaseIcons[i]) {
            tl.to(phaseIcons[i], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, `phase${i}`);
          }
        }
        if (i < items.length - 1) {
          tl.to({}, { duration: 0.4 }); // pause between phases
        }
      });
    },
    { scope: containerRef, dependencies: [phases] }
  );

  // Phase icons (abstract representations)
  const phaseIconPaths = [
    // Prepare — compass/target
    <svg key="0" className="phase-icon absolute inset-0" viewBox="0 0 200 200" fill="none" aria-hidden>
      <circle cx="100" cy="100" r="70" stroke="rgba(0,229,195,0.15)" strokeWidth="1" />
      <circle cx="100" cy="100" r="45" stroke="rgba(0,229,195,0.2)" strokeWidth="1" strokeDasharray="6 4" />
      <circle cx="100" cy="100" r="20" stroke="rgba(0,229,195,0.3)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="4" fill="#00E5C3" />
      <line x1="100" y1="20" x2="100" y2="45" stroke="rgba(0,229,195,0.25)" strokeWidth="1" />
      <line x1="100" y1="155" x2="100" y2="180" stroke="rgba(0,229,195,0.25)" strokeWidth="1" />
      <line x1="20" y1="100" x2="45" y2="100" stroke="rgba(0,229,195,0.25)" strokeWidth="1" />
      <line x1="155" y1="100" x2="180" y2="100" stroke="rgba(0,229,195,0.25)" strokeWidth="1" />
    </svg>,
    // Modernize — refresh/cycle
    <svg key="1" className="phase-icon absolute inset-0" viewBox="0 0 200 200" fill="none" aria-hidden>
      <path d="M 140 60 A 55 55 0 1 1 60 75" stroke="rgba(0,229,195,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 60 140 A 55 55 0 1 1 140 125" stroke="rgba(0,229,195,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="140,50 140,70 155,60" fill="rgba(0,229,195,0.4)" />
      <polygon points="60,150 60,130 45,140" fill="rgba(0,229,195,0.3)" />
      <circle cx="100" cy="100" r="15" stroke="rgba(0,229,195,0.2)" strokeWidth="1" />
      <circle cx="100" cy="100" r="3" fill="#00E5C3" />
    </svg>,
    // Build — blocks/construct
    <svg key="2" className="phase-icon absolute inset-0" viewBox="0 0 200 200" fill="none" aria-hidden>
      <rect x="55" y="55" width="35" height="35" rx="3" stroke="rgba(0,229,195,0.3)" strokeWidth="1.5" fill="rgba(0,229,195,0.05)" />
      <rect x="110" y="55" width="35" height="35" rx="3" stroke="rgba(0,229,195,0.25)" strokeWidth="1.5" fill="rgba(0,229,195,0.03)" />
      <rect x="55" y="110" width="35" height="35" rx="3" stroke="rgba(0,229,195,0.25)" strokeWidth="1.5" fill="rgba(0,229,195,0.03)" />
      <rect x="110" y="110" width="35" height="35" rx="3" stroke="rgba(0,229,195,0.35)" strokeWidth="1.5" fill="rgba(0,229,195,0.08)" />
      <line x1="92" y1="72" x2="108" y2="72" stroke="rgba(0,229,195,0.3)" strokeWidth="1" />
      <line x1="72" y1="92" x2="72" y2="108" stroke="rgba(0,229,195,0.3)" strokeWidth="1" />
      <line x1="128" y1="92" x2="128" y2="108" stroke="rgba(0,229,195,0.3)" strokeWidth="1" />
      <line x1="92" y1="128" x2="108" y2="128" stroke="rgba(0,229,195,0.3)" strokeWidth="1" />
      <circle cx="100" cy="100" r="3" fill="#00E5C3" />
    </svg>,
    // Scale — expand/grow
    <svg key="3" className="phase-icon absolute inset-0" viewBox="0 0 200 200" fill="none" aria-hidden>
      <circle cx="100" cy="100" r="20" stroke="rgba(0,229,195,0.35)" strokeWidth="1.5" fill="rgba(0,229,195,0.05)" />
      <circle cx="100" cy="100" r="40" stroke="rgba(0,229,195,0.2)" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="100" cy="100" r="65" stroke="rgba(0,229,195,0.12)" strokeWidth="1" strokeDasharray="3 8" />
      <line x1="100" y1="78" x2="100" y2="55" stroke="rgba(0,229,195,0.3)" strokeWidth="1" />
      <line x1="100" y1="122" x2="100" y2="145" stroke="rgba(0,229,195,0.3)" strokeWidth="1" />
      <line x1="78" y1="100" x2="55" y2="100" stroke="rgba(0,229,195,0.3)" strokeWidth="1" />
      <line x1="122" y1="100" x2="145" y2="100" stroke="rgba(0,229,195,0.3)" strokeWidth="1" />
      <polygon points="96,55 100,45 104,55" fill="rgba(0,229,195,0.4)" />
      <polygon points="96,145 100,155 104,145" fill="rgba(0,229,195,0.4)" />
      <polygon points="55,96 45,100 55,104" fill="rgba(0,229,195,0.4)" />
      <polygon points="145,96 155,100 145,104" fill="rgba(0,229,195,0.4)" />
      <circle cx="100" cy="100" r="4" fill="#00E5C3" />
    </svg>,
  ];

  return (
    <div ref={containerRef}>
      <div className="relative min-h-[40vh] flex items-center">
        {/* Vertical progress track — left side */}
        <div className="hidden lg:flex flex-col items-center gap-0 absolute left-0 top-1/2 -translate-y-1/2 h-[60%]">
          <div className="relative w-0.5 h-full bg-border-light/30 rounded-full overflow-hidden">
            <div
              className="progress-fill absolute top-0 left-0 w-full bg-accent origin-top rounded-full"
              style={{ height: "100%", transform: "scaleY(0.25)" }}
            />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col justify-between h-full">
            {phases.map((_, i) => (
              <div
                key={i}
                className="progress-dot w-2.5 h-2.5 rounded-full border border-accent/30"
                style={{ backgroundColor: i === 0 ? "#00E5C3" : "transparent" }}
              />
            ))}
          </div>
        </div>

        {/* Phase content */}
        <div className="lg:pl-12 w-full lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="relative">
            {phases.map((phase) => (
              <div
                key={phase.num}
                className="phase-item absolute inset-0 flex items-center first:relative"
              >
                <div className="flex items-baseline gap-6 max-w-xl">
                  <span className="metric text-4xl lg:text-6xl text-accent/30 font-bold shrink-0">
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

          {/* Phase icon — right side */}
          <div className="hidden lg:block relative w-full aspect-square max-w-[280px] mx-auto">
            {phaseIconPaths}
          </div>
        </div>
      </div>
    </div>
  );
}
