"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Types ── */

interface Phase {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

interface TransformationAssemblyProps {
  phases: Phase[];
}

/* ── Constants ── */

const TEAL = "#00E5C3";
const BG = "#060B14";

const PHASE_IMAGES = [
  "/images/phase-understand.png",
  "/images/phase-build.png",
  "/images/phase-operate.png",
];

/* ══════════════════════════════════════════════
   SVG Data Overlay — renders on top of photos
   Provides the "technical intelligence" layer
   ══════════════════════════════════════════════ */

const ORGANIZED_NODES = [
  { x: 120, y: 110 },
  { x: 480, y: 110 },
  { x: 120, y: 340 },
  { x: 480, y: 340 },
  { x: 300, y: 225 },
  { x: 200, y: 225 },
  { x: 400, y: 225 },
];

const CONNECTIONS: [number, number][] = [
  [0, 4], [1, 4], [2, 4], [3, 4],
  [0, 5], [5, 4], [1, 6], [6, 4],
  [2, 5], [3, 6],
];

function SVGOverlay({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      const svg = svgRef.current;
      if (!svg || !progressRef.current) { raf = requestAnimationFrame(animate); return; }

      const progress = progressRef.current.value;
      const phase = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
      const localT = phase === 0
        ? progress / 0.33
        : phase === 1
          ? (progress - 0.33) / 0.33
          : (progress - 0.66) / 0.34;

      const connLines = svg.querySelectorAll<SVGElement>(".ov-conn");
      const hubRings = svg.querySelectorAll<SVGElement>(".ov-hub");
      const flowDots = svg.querySelectorAll<SVGElement>(".ov-flow");
      const scaleRings = svg.querySelectorAll<SVGElement>(".ov-scale");
      const nodes = svg.querySelectorAll<SVGElement>(".ov-node");
      const aiLabels = svg.querySelectorAll<SVGElement>(".ov-ai");

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

      /* Nodes: fade in during Understand, stay through Build/Operate */
      nodes.forEach((node, i) => {
        if (phase === 0) {
          const threshold = (i / nodes.length) * 0.6;
          node.style.opacity = String(localT > threshold ? clamp01((localT - threshold) / 0.25) * 0.5 : 0);
        } else {
          node.style.opacity = "0.5";
        }
      });

      /* Connection lines: draw during Build */
      connLines.forEach((line, i) => {
        if (phase === 0) {
          line.style.opacity = "0";
          line.style.strokeDashoffset = "1";
        } else if (phase === 1) {
          const threshold = (i / connLines.length) * 0.5;
          const drawT = clamp01((localT - threshold) / 0.35);
          line.style.opacity = String(drawT * 0.35);
          line.style.strokeDashoffset = String(1 - easeOut(drawT));
        } else {
          line.style.opacity = "0.4";
          line.style.strokeDashoffset = "0";
        }
      });

      /* Hub rings: Build → Operate */
      hubRings.forEach((ring, i) => {
        if (phase < 1) {
          ring.style.opacity = "0";
        } else if (phase === 1) {
          ring.style.opacity = String(easeOut(clamp01((localT - 0.3) / 0.5)) * (0.2 - i * 0.05));
        } else {
          ring.style.opacity = String(0.2 - i * 0.05);
        }
      });

      /* AI labels: late Build → Operate */
      aiLabels.forEach((label, i) => {
        if (phase < 1) {
          label.style.opacity = "0";
        } else if (phase === 1) {
          label.style.opacity = String(easeOut(clamp01((localT - 0.6 - i * 0.1) / 0.3)) * 0.6);
        } else {
          label.style.opacity = "0.7";
        }
      });

      /* Flow dots: Operate */
      flowDots.forEach((dot) => {
        dot.style.opacity = phase === 2 ? String(easeOut(clamp01(localT * 2)) * 0.6) : "0";
      });

      /* Scale rings: Operate */
      scaleRings.forEach((ring, i) => {
        if (phase < 2) {
          ring.style.opacity = "0";
        } else {
          ring.style.opacity = String(easeOut(clamp01((localT - 0.2 - i * 0.1) / 0.4)) * (0.08 - i * 0.02));
        }
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 450"
      fill="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    >
      <defs>
        <filter id="ovGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Scale rings (Operate) */}
      {[140, 180, 220].map((r, i) => (
        <circle
          key={`sr-${i}`}
          className="ov-scale"
          cx="300" cy="225" r={r}
          stroke={TEAL} strokeWidth="0.6" strokeDasharray="4 8" fill="none"
          style={{ opacity: 0 }}
        />
      ))}

      {/* Hub rings */}
      {[50, 35, 22].map((r, i) => (
        <circle
          key={`hr-${i}`}
          className="ov-hub"
          cx="300" cy="225" r={r}
          stroke={TEAL} strokeWidth={i === 2 ? 1.5 : 0.8}
          strokeDasharray={i === 1 ? "3 3" : "none"}
          fill="none" style={{ opacity: 0 }}
        />
      ))}

      {/* Connection lines */}
      {CONNECTIONS.map(([a, b], i) => (
        <line
          key={`cl-${i}`}
          className="ov-conn"
          x1={ORGANIZED_NODES[a].x} y1={ORGANIZED_NODES[a].y}
          x2={ORGANIZED_NODES[b].x} y2={ORGANIZED_NODES[b].y}
          stroke={TEAL} strokeWidth="1" pathLength={1}
          strokeDasharray="1" strokeDashoffset="1"
          style={{ opacity: 0 }}
        />
      ))}

      {/* Flow dots (Operate) */}
      {CONNECTIONS.slice(0, 5).map(([a, b], i) => (
        <circle key={`fd-${i}`} className="ov-flow" r="2" fill={TEAL} style={{ opacity: 0 }}>
          <animateMotion
            dur={`${2.5 + (i % 3) * 0.5}s`}
            repeatCount="indefinite"
            path={`M${ORGANIZED_NODES[a].x},${ORGANIZED_NODES[a].y} L${ORGANIZED_NODES[b].x},${ORGANIZED_NODES[b].y}`}
          />
        </circle>
      ))}

      {/* Nodes */}
      {ORGANIZED_NODES.map((n, i) => (
        <g key={`nd-${i}`} className="ov-node" style={{ opacity: 0 }}>
          <circle cx={n.x} cy={n.y} r={i === 4 ? 8 : 5} fill={TEAL} opacity="0.6" filter="url(#ovGlow)" />
          <circle cx={n.x} cy={n.y} r={i === 4 ? 4 : 2.5} fill={TEAL} opacity="0.9" />
        </g>
      ))}

      {/* AI Agent labels */}
      {[
        { x: 300, y: 165 },
        { x: 185, y: 285 },
        { x: 415, y: 285 },
      ].map((pos, i) => (
        <g key={`ai-${i}`} className="ov-ai" style={{ opacity: 0 }}>
          <rect x={pos.x - 22} y={pos.y - 7} width="44" height="14" rx="3" fill={BG} opacity="0.7" />
          <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill={TEAL} fontSize="7" fontFamily="system-ui" letterSpacing="0.8" opacity="0.9">
            AI AGENT
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── Mobile phase icons ── */

function MobilePhaseIcon({ phaseIndex }: { phaseIndex: number }) {
  return (
    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
      <Image
        src={PHASE_IMAGES[phaseIndex]}
        alt={`Phase ${phaseIndex + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 0vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${BG}, transparent 40%)` }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════ */

export function TransformationAssembly({ phases }: TransformationAssemblyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });

  /* ── GSAP ScrollTrigger ── */

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const el = containerRef.current;
      if (!el) return;

      const phaseItems = el.querySelectorAll<HTMLElement>(".ta-phase-item");
      const phaseImages = el.querySelectorAll<HTMLElement>(".ta-phase-image");
      const progressFill = el.querySelector<HTMLElement>(".ta-progress-fill");
      const progressDots = el.querySelectorAll<HTMLElement>(".ta-progress-dot");
      const mobileIcons = el.querySelectorAll<HTMLElement>(".ta-mobile-icon");

      /* Initial states */
      phaseItems.forEach((item, i) => {
        if (i > 0) gsap.set(item, { opacity: 0, y: 24 });
      });
      phaseImages.forEach((img, i) => {
        if (i > 0) gsap.set(img, { opacity: 0 });
        /* Subtle initial zoom for cinematic parallax */
        gsap.set(img, { scale: 1.05 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          onUpdate: (self) => {
            progressRef.current.value = self.progress;
          },
        },
      });

      /*
       * Timeline — Cinematic crossfades with zoom
       *
       * 0.00 – 0.28  Phase 1 holds (Understand — slow zoom in)
       * 0.28 – 0.38  Crossfade: Phase 1 → Phase 2
       * 0.38 – 0.60  Phase 2 holds (Build — slow zoom in)
       * 0.60 – 0.70  Crossfade: Phase 2 → Phase 3
       * 0.70 – 1.00  Phase 3 holds (Operate — slow zoom in)
       */

      /* Phase 1: slow zoom during hold */
      tl.to(phaseImages[0], { scale: 1.12, duration: 0.28, ease: "none" }, 0);

      /* Phase 1 → 2 crossfade */
      tl.to(phaseItems[0], { opacity: 0, y: -16, duration: 0.06, ease: "power2.in" }, 0.28);
      tl.to(phaseImages[0], { opacity: 0, duration: 0.08, ease: "power2.in" }, 0.28);
      tl.fromTo(phaseItems[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.34);
      tl.fromTo(phaseImages[1], { opacity: 0 }, { opacity: 1, duration: 0.08, ease: "power2.out" }, 0.32);

      /* Progress indicators */
      if (progressFill) tl.to(progressFill, { scaleY: 2 / phases.length, duration: 0.04 }, 0.30);
      if (progressDots[1]) tl.to(progressDots[1], { backgroundColor: TEAL, scale: 1.4, duration: 0.04 }, 0.30);
      if (progressDots[0]) tl.to(progressDots[0], { scale: 1, opacity: 0.5, duration: 0.04 }, 0.30);

      /* Mobile icons */
      if (mobileIcons.length > 0) {
        if (mobileIcons[0]) tl.to(mobileIcons[0], { opacity: 0, duration: 0.06 }, 0.28);
        if (mobileIcons[1]) tl.to(mobileIcons[1], { opacity: 1, duration: 0.06 }, 0.34);
      }

      /* Phase 2: slow zoom during hold */
      tl.to(phaseImages[1], { scale: 1.12, duration: 0.22, ease: "none" }, 0.38);

      /* Phase 2 → 3 crossfade */
      tl.to(phaseItems[1], { opacity: 0, y: -16, duration: 0.06, ease: "power2.in" }, 0.60);
      tl.to(phaseImages[1], { opacity: 0, duration: 0.08, ease: "power2.in" }, 0.60);
      tl.fromTo(phaseItems[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.66);
      tl.fromTo(phaseImages[2], { opacity: 0 }, { opacity: 1, duration: 0.08, ease: "power2.out" }, 0.64);

      /* Progress indicators */
      if (progressFill) tl.to(progressFill, { scaleY: 1, duration: 0.04 }, 0.62);
      if (progressDots[2]) tl.to(progressDots[2], { backgroundColor: TEAL, scale: 1.4, duration: 0.04 }, 0.62);
      if (progressDots[1]) tl.to(progressDots[1], { scale: 1, opacity: 0.5, duration: 0.04 }, 0.62);

      /* Mobile icons */
      if (mobileIcons.length > 0) {
        if (mobileIcons[1]) tl.to(mobileIcons[1], { opacity: 0, duration: 0.06 }, 0.60);
        if (mobileIcons[2]) tl.to(mobileIcons[2], { opacity: 1, duration: 0.06 }, 0.66);
      }

      /* Phase 3: slow zoom during hold */
      tl.to(phaseImages[2], { scale: 1.12, duration: 0.30, ease: "none" }, 0.70);

      /* End hold */
      tl.to({}, { duration: 0.01 }, 1);
    },
    { scope: containerRef, dependencies: [phases] }
  );

  return (
    <div ref={containerRef} className="bg-bg-deep">
      <div className="relative min-h-[100vh] flex items-center overflow-hidden">

        {/* ── Background image layers (desktop) ── */}
        <div className="hidden lg:block absolute inset-0">
          {PHASE_IMAGES.map((src, i) => (
            <div
              key={`img-${i}`}
              className="ta-phase-image absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
              {/* Dark overlay for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, ${BG} 0%, ${BG}ee 35%, ${BG}88 55%, ${BG}44 70%, transparent 100%)`,
                }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${BG} 0%, transparent 25%, transparent 75%, ${BG} 100%)`,
                }}
              />
            </div>
          ))}

          {/* SVG data overlay */}
          <div className="absolute inset-0 flex items-center justify-end pr-8">
            <div className="w-[55%] aspect-[4/3] relative">
              <SVGOverlay progressRef={progressRef} />
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 w-full mx-auto max-w-7xl px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12 items-center">

          {/* ── Left column: phase text + progress indicator ── */}
          <div className="lg:col-span-5 relative flex">

            {/* Vertical progress track */}
            <div className="hidden lg:flex flex-col items-center mr-8 relative h-[240px] self-center">
              <div className="relative w-0.5 h-full bg-border-subtle/30 rounded-full overflow-hidden">
                <div
                  className="ta-progress-fill absolute top-0 left-0 w-full rounded-full origin-top"
                  style={{
                    height: "100%",
                    transform: `scaleY(${1 / phases.length})`,
                    background: `linear-gradient(to bottom, ${TEAL}, #059E87)`,
                  }}
                />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col justify-between h-full">
                {phases.map((_, i) => (
                  <div
                    key={i}
                    className="ta-progress-dot w-3 h-3 rounded-full border-2 transition-colors"
                    style={{
                      borderColor: i === 0 ? TEAL : "rgba(0, 229, 195, 0.3)",
                      backgroundColor: i === 0 ? TEAL : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Phase text */}
            <div className="relative flex-1 min-h-[280px] flex items-center">
              {phases.map((phase, i) => (
                <div
                  key={phase.num}
                  className={`ta-phase-item ${i === 0 ? "relative" : "absolute inset-0"} flex items-center`}
                >
                  <div className="max-w-lg">
                    <span
                      className="metric block text-5xl lg:text-6xl font-bold leading-none"
                      style={{ color: TEAL, opacity: 0.2 }}
                    >
                      {phase.num}
                    </span>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                      {phase.subtitle}
                    </p>
                    <h3
                      className="mt-3 text-2xl lg:text-3xl font-bold text-text-primary tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-text-secondary">
                      {phase.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {phase.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-text-muted">
                          <svg className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" viewBox="0 0 16 16" fill="none">
                            <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: mobile images ── */}
          <div className="lg:col-span-7 mt-10 lg:mt-0 lg:hidden">
            <div className="relative w-full flex justify-center" style={{ minHeight: 200 }}>
              {phases.map((_, i) => (
                <div
                  key={i}
                  className={`ta-mobile-icon w-full ${i === 0 ? "" : "absolute inset-0"}`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <MobilePhaseIcon phaseIndex={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
