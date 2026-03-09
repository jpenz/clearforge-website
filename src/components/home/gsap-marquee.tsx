"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPMarqueeProps {
  text: string;
  className?: string;
}

export function GSAPMarquee({ text, className = "" }: GSAPMarqueeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const section = sectionRef.current;
      const textEl = textRef.current;
      if (!section || !textEl) return;

      gsap.fromTo(
        textEl,
        { xPercent: 5 },
        {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className={`overflow-hidden py-6 lg:py-10 ${className}`}>
      <p
        ref={textRef}
        className="whitespace-nowrap text-[10vw] lg:text-[8vw] font-bold uppercase tracking-tight leading-none text-border-subtle select-none"
        aria-hidden
      >
        {text}
        <span className="text-accent/20 mx-8">/</span>
        {text}
        <span className="text-accent/20 mx-8">/</span>
        {text}
      </p>
    </div>
  );
}
