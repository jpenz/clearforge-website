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
      if (!items.length) return;

      // Set initial state — all hidden except first
      items.forEach((item, i) => {
        if (i > 0) gsap.set(item, { opacity: 0, y: 30 });
      });

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
        }
        if (i < items.length - 1) {
          tl.to({}, { duration: 0.4 }); // pause between phases
        }
      });
    },
    { scope: containerRef, dependencies: [phases] }
  );

  return (
    <div ref={containerRef}>
      <div className="relative min-h-[40vh] flex items-center">
        <div className="w-full">
          {phases.map((phase) => (
            <div
              key={phase.num}
              className="phase-item absolute inset-0 flex items-center first:relative"
            >
              <div className="flex items-baseline gap-6 max-w-2xl">
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
      </div>
    </div>
  );
}
