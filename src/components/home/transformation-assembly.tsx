"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Types ── */

interface Phase {
  num: string;
  title: string;
  description: string;
}

interface TransformationAssemblyProps {
  phases: Array<Phase>;
}

/* ── Constants ── */

const TEAL = "#00E5C3";
const BG = "#060B14";
const PARTICLE_COUNT = 60;

/* ── Particle state targets for each phase ── */

interface ParticleState {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/** Generate the four target states for each particle. */
function generateParticleStates(
  count: number,
  w: number,
  h: number
): ParticleState[][] {
  const states: ParticleState[][] = [[], [], [], []];

  for (let i = 0; i < count; i++) {
    const s = seededRandom(i + 1);
    const s2 = seededRandom(i + 100);
    const s3 = seededRandom(i + 200);
    const s4 = seededRandom(i + 300);

    // Phase 1 — scattered signal points revealed by a scan line
    states[0].push({
      x: s * w,
      y: s2 * h,
      r: 1.5 + s3 * 2.5,
      opacity: 0.15 + s4 * 0.35,
    });

    // Phase 2 — organized into 4 horizontal channels
    const row = i % 4;
    const rowY = h * 0.15 + row * (h * 0.2);
    const col = Math.floor(i / 4);
    const totalPerRow = Math.ceil(count / 4);
    const xSpacing = w / (totalPerRow + 1);
    states[1].push({
      x: xSpacing * (col + 1),
      y: rowY + (s3 - 0.5) * 6,
      r: 2 + s3 * 2,
      opacity: 0.4 + s4 * 0.4,
    });

    // Phase 3 — converge into a central engine
    const cx = w * 0.5;
    const cy = h * 0.5;
    const isCore = i < 12;
    const isInput = i >= 12 && i < 28;
    const isOutput = i >= 28 && i < 40;
    // remaining are orbit particles

    if (isCore) {
      // concentric ring positions
      const ring = i % 3;
      const ringR = 12 + ring * 22;
      const angle = (i / 12) * Math.PI * 2 + s * 0.5;
      states[2].push({
        x: cx + Math.cos(angle) * ringR,
        y: cy + Math.sin(angle) * ringR,
        r: 2.5 + (2 - ring) * 1,
        opacity: 0.7 + (2 - ring) * 0.1,
      });
    } else if (isInput) {
      // left-side input lines converging
      const inputRow = (i - 12) % 4;
      const inputIdx = Math.floor((i - 12) / 4);
      const startY = h * 0.15 + inputRow * (h * 0.2);
      const t = inputIdx / 4;
      states[2].push({
        x: w * 0.05 + t * (cx - w * 0.05 - 60),
        y: startY + t * (cy - startY),
        r: 2,
        opacity: 0.5 + t * 0.3,
      });
    } else if (isOutput) {
      // right-side output nodes diverging
      const outRow = (i - 28) % 3;
      const outIdx = Math.floor((i - 28) / 3);
      const endY = h * 0.25 + outRow * (h * 0.25);
      const t = outIdx / 4;
      states[2].push({
        x: cx + 60 + t * (w * 0.45 - 60),
        y: cy + t * (endY - cy),
        r: 2.5,
        opacity: 0.5 + t * 0.2,
      });
    } else {
      // orbit particles
      const angle = (i / count) * Math.PI * 2;
      const orbitR = 50 + s * 30;
      states[2].push({
        x: cx + Math.cos(angle) * orbitR,
        y: cy + Math.sin(angle) * orbitR,
        r: 1.5,
        opacity: 0.3,
      });
    }

    // Phase 4 — engine replicates into satellite systems
    const mainCx = cx;
    const mainCy = cy;
    const satPositions = [
      { sx: w * 0.18, sy: h * 0.18 },
      { sx: w * 0.82, sy: h * 0.18 },
      { sx: w * 0.85, sy: h * 0.82 },
      { sx: w * 0.15, sy: h * 0.82 },
      { sx: w * 0.5, sy: h * 0.12 },
    ];

    if (i < 8) {
      // main engine core
      const angle = (i / 8) * Math.PI * 2;
      const ringR = 10 + (i % 2) * 14;
      states[3].push({
        x: mainCx + Math.cos(angle) * ringR,
        y: mainCy + Math.sin(angle) * ringR,
        r: 2.5,
        opacity: 0.9,
      });
    } else if (i < 8 + satPositions.length * 6) {
      // satellite system particles
      const satIdx = Math.floor((i - 8) / 6);
      const satI = (i - 8) % 6;
      const sat = satPositions[satIdx % satPositions.length];
      const angle = (satI / 6) * Math.PI * 2;
      const satR = 8 + (satI % 2) * 10;
      states[3].push({
        x: sat.sx + Math.cos(angle) * satR,
        y: sat.sy + Math.sin(angle) * satR,
        r: 2,
        opacity: 0.6 + s3 * 0.2,
      });
    } else {
      // connection path particles — traveling between main and satellites
      const pathIdx = (i - 38) % satPositions.length;
      const sat = satPositions[pathIdx];
      const t = s;
      states[3].push({
        x: mainCx + (sat.sx - mainCx) * t,
        y: mainCy + (sat.sy - mainCy) * t,
        r: 1.5,
        opacity: 0.3 + s3 * 0.3,
      });
    }
  }

  return states;
}

/* ── Lerp helper ── */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ── Mobile static SVG icons per phase ── */

function MobilePhaseIcon({ phaseIndex }: { phaseIndex: number }) {
  const icons = [
    // Phase 1: Scanning dots
    <svg key="m0" viewBox="0 0 120 120" fill="none" className="w-20 h-20 mx-auto">
      <rect x="35" y="10" width="2" height="100" fill={TEAL} opacity={0.4} rx={1} />
      <circle cx="20" cy="30" r="4" fill={TEAL} opacity={0.8} />
      <circle cx="28" cy="70" r="3" fill={TEAL} opacity={0.6} />
      <circle cx="15" cy="90" r="3.5" fill={TEAL} opacity={0.7} />
      <circle cx="60" cy="40" r="3" fill={TEAL} opacity={0.2} />
      <circle cx="80" cy="60" r="3.5" fill={TEAL} opacity={0.2} />
      <circle cx="95" cy="35" r="2.5" fill={TEAL} opacity={0.15} />
      <circle cx="75" cy="85" r="3" fill={TEAL} opacity={0.2} />
      <circle cx="100" cy="80" r="2.5" fill={TEAL} opacity={0.15} />
    </svg>,
    // Phase 2: Organized rows
    <svg key="m1" viewBox="0 0 120 120" fill="none" className="w-20 h-20 mx-auto">
      <line x1="10" y1="30" x2="110" y2="30" stroke={TEAL} strokeWidth={1.5} opacity={0.4} />
      <line x1="10" y1="55" x2="110" y2="55" stroke={TEAL} strokeWidth={1.5} opacity={0.35} />
      <line x1="10" y1="80" x2="110" y2="80" stroke={TEAL} strokeWidth={1.5} opacity={0.3} />
      <line x1="10" y1="105" x2="110" y2="105" stroke={TEAL} strokeWidth={1.5} opacity={0.25} />
      <circle cx="25" cy="30" r="4" fill={TEAL} opacity={0.8} />
      <circle cx="55" cy="30" r="3.5" fill={TEAL} opacity={0.7} />
      <circle cx="85" cy="30" r="3" fill={TEAL} opacity={0.6} />
      <circle cx="35" cy="55" r="3.5" fill={TEAL} opacity={0.6} />
      <circle cx="70" cy="55" r="3" fill={TEAL} opacity={0.5} />
      <circle cx="45" cy="80" r="3.5" fill={TEAL} opacity={0.5} />
      <circle cx="80" cy="80" r="3" fill={TEAL} opacity={0.45} />
      <circle cx="60" cy="105" r="3" fill={TEAL} opacity={0.4} />
    </svg>,
    // Phase 3: Central engine
    <svg key="m2" viewBox="0 0 120 120" fill="none" className="w-20 h-20 mx-auto">
      <circle cx="60" cy="60" r="28" fill="none" stroke={TEAL} strokeWidth={2} opacity={0.6} />
      <circle cx="60" cy="60" r="18" fill="none" stroke={TEAL} strokeWidth={1.5} opacity={0.4} strokeDasharray="4 3" />
      <circle cx="60" cy="60" r="8" fill="none" stroke={TEAL} strokeWidth={1.5} opacity={0.6} />
      <circle cx="60" cy="60" r="3" fill={TEAL} />
      <line x1="10" y1="30" x2="36" y2="46" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <line x1="10" y1="60" x2="32" y2="60" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <line x1="10" y1="90" x2="36" y2="74" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <line x1="88" y1="50" x2="110" y2="35" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <line x1="88" y1="60" x2="110" y2="60" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <line x1="88" y1="70" x2="110" y2="85" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <circle cx="10" cy="30" r="3" fill={TEAL} opacity={0.7} />
      <circle cx="10" cy="60" r="3" fill={TEAL} opacity={0.6} />
      <circle cx="10" cy="90" r="3" fill={TEAL} opacity={0.7} />
      <circle cx="110" cy="35" r="3.5" fill={TEAL} opacity={0.8} />
      <circle cx="110" cy="60" r="3.5" fill={TEAL} opacity={0.7} />
      <circle cx="110" cy="85" r="3.5" fill={TEAL} opacity={0.8} />
    </svg>,
    // Phase 4: Satellites
    <svg key="m3" viewBox="0 0 120 120" fill="none" className="w-20 h-20 mx-auto">
      <circle cx="60" cy="60" r="12" fill="none" stroke={TEAL} strokeWidth={2} opacity={0.7} />
      <circle cx="60" cy="60" r="4" fill={TEAL} opacity={0.9} />
      <line x1="60" y1="48" x2="60" y2="18" stroke={TEAL} strokeWidth={1.5} opacity={0.4} />
      <line x1="70" y1="52" x2="95" y2="28" stroke={TEAL} strokeWidth={1.5} opacity={0.4} />
      <line x1="72" y1="60" x2="105" y2="60" stroke={TEAL} strokeWidth={1.5} opacity={0.4} />
      <line x1="70" y1="68" x2="95" y2="92" stroke={TEAL} strokeWidth={1.5} opacity={0.4} />
      <line x1="60" y1="72" x2="60" y2="102" stroke={TEAL} strokeWidth={1.5} opacity={0.4} />
      <line x1="50" y1="68" x2="25" y2="92" stroke={TEAL} strokeWidth={1.5} opacity={0.4} />
      <line x1="48" y1="60" x2="15" y2="60" stroke={TEAL} strokeWidth={1.5} opacity={0.4} />
      <line x1="50" y1="52" x2="25" y2="28" stroke={TEAL} strokeWidth={1.5} opacity={0.4} />
      {/* Satellite nodes */}
      <circle cx="60" cy="15" r="5" fill="none" stroke={TEAL} strokeWidth={1} opacity={0.5} />
      <circle cx="60" cy="15" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="95" cy="25" r="5" fill="none" stroke={TEAL} strokeWidth={1} opacity={0.5} />
      <circle cx="95" cy="25" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="105" cy="60" r="5" fill="none" stroke={TEAL} strokeWidth={1} opacity={0.5} />
      <circle cx="105" cy="60" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="95" cy="95" r="5" fill="none" stroke={TEAL} strokeWidth={1} opacity={0.5} />
      <circle cx="95" cy="95" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="60" cy="105" r="5" fill="none" stroke={TEAL} strokeWidth={1} opacity={0.5} />
      <circle cx="60" cy="105" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="25" cy="95" r="5" fill="none" stroke={TEAL} strokeWidth={1} opacity={0.5} />
      <circle cx="25" cy="95" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="15" cy="60" r="5" fill="none" stroke={TEAL} strokeWidth={1} opacity={0.5} />
      <circle cx="15" cy="60" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="25" cy="25" r="5" fill="none" stroke={TEAL} strokeWidth={1} opacity={0.5} />
      <circle cx="25" cy="25" r="2" fill={TEAL} opacity={0.6} />
    </svg>,
  ];

  return icons[phaseIndex] ?? null;
}

/* ── Main Component ── */

export function TransformationAssembly({ phases }: TransformationAssemblyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef({ value: 0 });
  const animFrameRef = useRef<number>(0);
  const particleStatesRef = useRef<ParticleState[][] | null>(null);
  const dimensionsRef = useRef({ w: 0, h: 0 });

  /** Rebuild particle positions for the current canvas size. */
  const rebuildStates = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    dimensionsRef.current = { w, h };
    particleStatesRef.current = generateParticleStates(PARTICLE_COUNT, w, h);
  }, []);

  /* ── Canvas draw loop ── */

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const allStates = particleStatesRef.current;
    if (!allStates) return;

    const { w, h } = dimensionsRef.current;
    const dpr = canvas.width / w;
    const progress = progressRef.current.value; // 0..1

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Determine which two phases we're interpolating between
    const totalPhases = 4;
    const phaseFloat = progress * (totalPhases - 1); // 0..3
    const phaseA = Math.min(Math.floor(phaseFloat), totalPhases - 2);
    const phaseB = phaseA + 1;
    const t = phaseFloat - phaseA; // 0..1 within the sub-phase

    const statesA = allStates[phaseA];
    const statesB = allStates[phaseB];

    // ── Phase-specific background elements ──

    // Blueprint grid (strongest in phase 1, fades by phase 3)
    const gridOpacity = Math.max(0, 0.08 - progress * 0.07);
    if (gridOpacity > 0.005) {
      ctx.strokeStyle = `rgba(0, 229, 195, ${gridOpacity})`;
      ctx.lineWidth = 0.5;
      const gridSpacing = 40;
      ctx.beginPath();
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    }

    // Phase 1: Scanning sweep line
    if (progress < 0.3) {
      const scanProgress = Math.min(progress / 0.25, 1);
      const scanX = scanProgress * w;
      const grad = ctx.createLinearGradient(scanX, 0, scanX, h);
      grad.addColorStop(0, "rgba(0, 229, 195, 0)");
      grad.addColorStop(0.3, `rgba(0, 229, 195, ${0.25 * (1 - scanProgress)})`);
      grad.addColorStop(0.5, `rgba(0, 229, 195, ${0.4 * (1 - scanProgress)})`);
      grad.addColorStop(0.7, `rgba(0, 229, 195, ${0.25 * (1 - scanProgress)})`);
      grad.addColorStop(1, "rgba(0, 229, 195, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(scanX - 6, 0, 12, h);

      // bright scan edge
      ctx.strokeStyle = `rgba(0, 229, 195, ${0.6 * (1 - scanProgress)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, h);
      ctx.stroke();
    }

    // Phase 2: Horizontal channel lines
    if (progress > 0.15 && progress < 0.65) {
      const channelOpacity = progress < 0.25
        ? (progress - 0.15) / 0.1
        : progress > 0.5
          ? 1 - (progress - 0.5) / 0.15
          : 1;
      ctx.strokeStyle = `rgba(0, 229, 195, ${0.15 * channelOpacity})`;
      ctx.lineWidth = 1;
      for (let row = 0; row < 4; row++) {
        const rowY = h * 0.15 + row * (h * 0.2);
        ctx.beginPath();
        ctx.moveTo(0, rowY);
        ctx.lineTo(w, rowY);
        ctx.stroke();
      }
    }

    // Phase 3: Central engine concentric circles
    if (progress > 0.35 && progress < 0.85) {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const engineOpacity = progress < 0.5
        ? (progress - 0.35) / 0.15
        : progress > 0.75
          ? 1 - (progress - 0.75) / 0.1
          : 1;
      const radii = [56, 38, 20];
      radii.forEach((r, ri) => {
        ctx.strokeStyle = `rgba(0, 229, 195, ${(0.25 - ri * 0.06) * engineOpacity})`;
        ctx.lineWidth = ri === 0 ? 2 : 1.5;
        if (ri === 1) {
          ctx.setLineDash([5, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      // core dot
      ctx.fillStyle = `rgba(0, 229, 195, ${0.9 * engineOpacity})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      // glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 65);
      glowGrad.addColorStop(0, `rgba(0, 229, 195, ${0.08 * engineOpacity})`);
      glowGrad.addColorStop(1, "rgba(0, 229, 195, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.fill();
    }

    // Phase 4: Expansion rings and satellite connection lines
    if (progress > 0.65) {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const scaleOpacity = (progress - 0.65) / 0.35;
      const satPositions = [
        { sx: w * 0.18, sy: h * 0.18 },
        { sx: w * 0.82, sy: h * 0.18 },
        { sx: w * 0.85, sy: h * 0.82 },
        { sx: w * 0.15, sy: h * 0.82 },
        { sx: w * 0.5, sy: h * 0.12 },
      ];

      // expansion rings
      ctx.strokeStyle = `rgba(0, 229, 195, ${0.08 * scaleOpacity})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(0, 229, 195, ${0.05 * scaleOpacity})`;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // connection lines from center to satellites
      satPositions.forEach((sat) => {
        ctx.strokeStyle = `rgba(0, 229, 195, ${0.2 * scaleOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(sat.sx, sat.sy);
        ctx.stroke();

        // satellite circles
        ctx.strokeStyle = `rgba(0, 229, 195, ${0.4 * scaleOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sat.sx, sat.sy, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(0, 229, 195, ${0.7 * scaleOpacity})`;
        ctx.beginPath();
        ctx.arc(sat.sx, sat.sy, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // energy flow dots moving outward
      const time = Date.now() * 0.001;
      satPositions.forEach((sat, si) => {
        const tOffset = (time + si * 0.7) % 2 / 2; // 0..1 cycling
        const fx = cx + (sat.sx - cx) * tOffset;
        const fy = cy + (sat.sy - cy) * tOffset;
        ctx.fillStyle = `rgba(0, 229, 195, ${(0.8 - tOffset * 0.5) * scaleOpacity})`;
        ctx.beginPath();
        ctx.arc(fx, fy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // ── Draw particles ──
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const a = statesA[i];
      const b = statesB[i];
      if (!a || !b) continue;

      // Smooth easing
      const eased = t * t * (3 - 2 * t); // smoothstep

      const px = lerp(a.x, b.x, eased);
      const py = lerp(a.y, b.y, eased);
      const pr = lerp(a.r, b.r, eased);
      const po = lerp(a.opacity, b.opacity, eased);

      // Glow
      const glowR = pr * 3;
      const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
      glow.addColorStop(0, `rgba(0, 229, 195, ${po * 0.3})`);
      glow.addColorStop(1, "rgba(0, 229, 195, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = `rgba(0, 229, 195, ${po})`;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  /* ── Resize handling ── */

  useEffect(() => {
    const handleResize = () => {
      rebuildStates();
    };

    // Only run canvas logic on non-mobile
    const mql = window.matchMedia("(min-width: 1024px)");
    if (mql.matches) {
      rebuildStates();
      animFrameRef.current = requestAnimationFrame(draw);
    }

    const onMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        rebuildStates();
        animFrameRef.current = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animFrameRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    mql.addEventListener("change", onMediaChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mql.removeEventListener("change", onMediaChange);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [rebuildStates, draw]);

  /* ── GSAP ScrollTrigger ── */

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const el = containerRef.current;
      if (!el) return;

      const phaseItems = el.querySelectorAll<HTMLElement>(".ta-phase-item");
      const progressFill = el.querySelector<HTMLElement>(".ta-progress-fill");
      const progressDots = el.querySelectorAll<HTMLElement>(".ta-progress-dot");
      const mobileIcons = el.querySelectorAll<HTMLElement>(".ta-mobile-icon");

      // Initial states
      phaseItems.forEach((item, i) => {
        if (i > 0) gsap.set(item, { opacity: 0, y: 24 });
      });

      // Master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => {
            progressRef.current.value = self.progress;
          },
        },
      });

      // Phase transitions at 25% boundaries
      for (let i = 1; i < phases.length; i++) {
        const label = `phase${i}`;

        // Fade out current phase text
        tl.to(phaseItems[i - 1], {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.in",
        }, label);

        // Fade in new phase text
        tl.fromTo(
          phaseItems[i],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          `${label}+=0.05`
        );

        // Progress bar
        if (progressFill) {
          tl.to(progressFill, {
            scaleY: (i + 1) / phases.length,
            duration: 0.2,
            ease: "power2.out",
          }, label);
        }

        // Progress dots
        if (progressDots[i]) {
          tl.to(progressDots[i], {
            backgroundColor: TEAL,
            scale: 1.4,
            duration: 0.15,
          }, label);
        }
        // De-emphasize previous dot
        if (progressDots[i - 1] && i > 0) {
          tl.to(progressDots[i - 1], {
            scale: 1,
            opacity: 0.5,
            duration: 0.15,
          }, label);
        }

        // Mobile icon transitions
        if (mobileIcons.length > 0) {
          if (mobileIcons[i - 1]) {
            tl.to(mobileIcons[i - 1], { opacity: 0, scale: 0.8, duration: 0.15 }, label);
          }
          if (mobileIcons[i]) {
            tl.to(mobileIcons[i], { opacity: 1, scale: 1, duration: 0.2 }, `${label}+=0.05`);
          }
        }

        // Spacer between transitions
        if (i < phases.length - 1) {
          tl.to({}, { duration: 0.35 });
        }
      }

      // Final hold
      tl.to({}, { duration: 0.25 });
    },
    { scope: containerRef, dependencies: [phases] }
  );

  return (
    <div ref={containerRef}>
      <div className="relative min-h-[100vh] flex items-center">
        <div className="w-full lg:grid lg:grid-cols-5 lg:gap-8 items-center">

          {/* ── Left column: phase text + progress indicator ── */}
          <div className="lg:col-span-2 relative flex">

            {/* Vertical progress track */}
            <div className="hidden lg:flex flex-col items-center mr-8 relative h-[280px] self-center">
              <div className="relative w-0.5 h-full bg-border-subtle/30 rounded-full overflow-hidden">
                <div
                  className="ta-progress-fill absolute top-0 left-0 w-full rounded-full origin-top"
                  style={{
                    height: "100%",
                    transform: "scaleY(0.25)",
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

            {/* Phase text cards */}
            <div className="relative flex-1 min-h-[200px] flex items-center">
              {phases.map((phase, i) => (
                <div
                  key={phase.num}
                  className={`ta-phase-item ${i === 0 ? "relative" : "absolute inset-0"} flex items-center`}
                >
                  <div className="max-w-md">
                    <span
                      className="metric block text-6xl lg:text-7xl font-bold leading-none"
                      style={{ color: TEAL, opacity: 0.25 }}
                    >
                      {phase.num}
                    </span>
                    <h3
                      className="mt-3 text-3xl lg:text-4xl font-bold text-text-primary tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {phase.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-text-secondary font-medium">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: Canvas (desktop) / Static icons (mobile) ── */}
          <div className="lg:col-span-3 mt-10 lg:mt-0">

            {/* Desktop canvas */}
            <div
              className="hidden lg:block relative w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: "4 / 3", backgroundColor: BG }}
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ display: "block" }}
              />
              {/* Vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, transparent 40%, ${BG} 100%)`,
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Mobile: static SVG icons */}
            <div className="lg:hidden relative w-full flex justify-center" style={{ minHeight: 120 }}>
              {phases.map((_, i) => (
                <div
                  key={i}
                  className={`ta-mobile-icon ${i === 0 ? "" : "absolute inset-0 flex justify-center"}`}
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
