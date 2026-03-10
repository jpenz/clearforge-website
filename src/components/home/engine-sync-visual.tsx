"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ───────────────────────────────────────────────────────────────────
   ENGINE SYNC VISUAL

   Two engine systems — Growth Strategy (radar/lens) and Performance
   Improvement (gear/circuit) — start pulsing at different rates and
   synchronize as the user scrolls into view. A teal energy bridge
   connects them.

   Colors:
   - Core: #00E5C3
   - Outline: #059E87
   - Connection: rgba(0,229,195,0.4) → rgba(0,229,195,0.8) synced
   - Labels: #059E87 monospace
   ─────────────────────────────────────────────────────────────────── */

/* Gear tooth path generator — creates evenly spaced teeth around a circle */
function gearPath(cx: number, cy: number, innerR: number, outerR: number, teeth: number): string {
  const step = (Math.PI * 2) / teeth;
  const halfStep = step / 2;
  const toothWidth = step * 0.35;
  let d = "";

  for (let i = 0; i < teeth; i++) {
    const angle = i * step;
    // Inner arc start
    const ix1 = cx + innerR * Math.cos(angle - halfStep + toothWidth);
    const iy1 = cy + innerR * Math.sin(angle - halfStep + toothWidth);
    // Outer tooth start
    const ox1 = cx + outerR * Math.cos(angle - toothWidth * 0.6);
    const oy1 = cy + outerR * Math.sin(angle - toothWidth * 0.6);
    // Outer tooth end
    const ox2 = cx + outerR * Math.cos(angle + toothWidth * 0.6);
    const oy2 = cy + outerR * Math.sin(angle + toothWidth * 0.6);
    // Inner arc end
    const ix2 = cx + innerR * Math.cos(angle + halfStep - toothWidth);
    const iy2 = cy + innerR * Math.sin(angle + halfStep - toothWidth);

    if (i === 0) {
      d += `M ${ix1.toFixed(2)} ${iy1.toFixed(2)} `;
    }
    d += `L ${ox1.toFixed(2)} ${oy1.toFixed(2)} `;
    d += `L ${ox2.toFixed(2)} ${oy2.toFixed(2)} `;
    d += `L ${ix2.toFixed(2)} ${iy2.toFixed(2)} `;
    // Arc along inner radius to next tooth
    const nextAngle = (i + 1) * step;
    const nix = cx + innerR * Math.cos(nextAngle - halfStep + toothWidth);
    const niy = cy + innerR * Math.sin(nextAngle - halfStep + toothWidth);
    d += `A ${innerR} ${innerR} 0 0 1 ${nix.toFixed(2)} ${niy.toFixed(2)} `;
  }
  d += "Z";
  return d;
}

export function EngineSyncVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const svg = svgRef.current;
      if (!svg) return;

      // ── Element references ──
      const leftCore = svg.querySelector(".es-left-core");
      const leftRings = svg.querySelectorAll(".es-left-ring");
      const leftSweep = svg.querySelector(".es-left-sweep");
      const leftLabel = svg.querySelector(".es-left-label");

      const rightCore = svg.querySelector(".es-right-core");
      const rightGears = svg.querySelectorAll(".es-right-gear");
      const rightCircuitDots = svg.querySelectorAll(".es-right-circuit-dot");
      const rightLabel = svg.querySelector(".es-right-label");

      const bridge = svg.querySelector(".es-bridge");
      const bridgeGlow = svg.querySelector(".es-bridge-glow");
      const particleDots = svg.querySelectorAll(".es-particle");

      const leftGlow = svg.querySelector(".es-left-glow");
      const rightGlow = svg.querySelector(".es-right-glow");

      // ── Mobile: static synchronized state ──
      if (isMobile) {
        gsap.set(leftCore, { opacity: 1 });
        gsap.set(leftRings, { opacity: 0.7 });
        gsap.set(leftSweep, { opacity: 0.5 });
        gsap.set(leftLabel, { opacity: 1 });
        gsap.set(rightCore, { opacity: 1 });
        gsap.set(rightGears, { opacity: 0.8 });
        gsap.set(rightCircuitDots, { opacity: 0.7 });
        gsap.set(rightLabel, { opacity: 1 });
        gsap.set(bridge, { opacity: 0.8 });
        gsap.set(bridgeGlow, { opacity: 0.4 });
        gsap.set(particleDots, { opacity: 0.8 });
        gsap.set(leftGlow, { opacity: 0.3 });
        gsap.set(rightGlow, { opacity: 0.3 });

        // Simple synchronized pulse
        const syncTl = gsap.timeline({ repeat: -1, yoyo: true });
        syncTl.to([leftCore, rightCore], {
          scale: 1.08,
          duration: 1.5,
          ease: "sine.inOut",
          transformOrigin: "center center",
        });
        syncTl.to(bridge, { opacity: 1, duration: 1.5, ease: "sine.inOut" }, 0);
        return;
      }

      // ── Desktop: scroll-driven synchronization ──

      // Initial state — everything hidden
      gsap.set([leftCore, rightCore], { opacity: 0, scale: 0.6 });
      gsap.set(leftRings, { opacity: 0, scale: 0.5 });
      gsap.set(leftSweep, { opacity: 0 });
      gsap.set(rightGears, { opacity: 0, scale: 0.5 });
      gsap.set(rightCircuitDots, { opacity: 0, scale: 0 });
      gsap.set([leftLabel, rightLabel], { opacity: 0, y: 10 });
      gsap.set(bridge, { opacity: 0 });
      gsap.set(bridgeGlow, { opacity: 0 });
      gsap.set(particleDots, { opacity: 0 });
      gsap.set([leftGlow, rightGlow], { opacity: 0 });

      // ── Phase 1: Entrance (play once on scroll into view) ──
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      entranceTl
        // Cores appear
        .to(leftCore, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" })
        .to(rightCore, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }, 0.15)
        // Rings / gears appear
        .to(leftRings, { opacity: 0.6, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.3)
        .to(leftSweep, { opacity: 0.4, duration: 0.5 }, 0.5)
        .to(rightGears, { opacity: 0.7, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 0.35)
        .to(rightCircuitDots, { opacity: 0.6, scale: 1, duration: 0.3, stagger: 0.04, ease: "back.out(2)" }, 0.5)
        // Labels
        .to([leftLabel, rightLabel], { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, 0.6)
        // Glows
        .to([leftGlow, rightGlow], { opacity: 0.15, duration: 0.8 }, 0.5)
        // Bridge fades in dim
        .to(bridge, { opacity: 0.3, duration: 0.6 }, 0.8)
        .to(particleDots, { opacity: 0.4, duration: 0.4 }, 1.0);

      // ── Phase 2: Unsynchronized pulsing (different rates) ──
      // Left engine: slower pulse (2.2s cycle)
      const leftPulse = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
      leftPulse
        .to(leftCore, { scale: 1.12, duration: 1.1, ease: "sine.inOut", transformOrigin: "center center" })
        .to(leftRings, { scale: 1.06, opacity: 0.8, duration: 1.1, ease: "sine.inOut", stagger: 0.05 }, 0)
        .to(leftGlow, { opacity: 0.35, duration: 1.1, ease: "sine.inOut" }, 0);

      // Right engine: faster pulse (1.4s cycle)
      const rightPulse = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
      rightPulse
        .to(rightCore, { scale: 1.15, duration: 0.7, ease: "sine.inOut", transformOrigin: "center center" })
        .to(rightGears, { scale: 1.04, opacity: 0.9, duration: 0.7, ease: "sine.inOut", stagger: 0.03 }, 0)
        .to(rightGlow, { opacity: 0.4, duration: 0.7, ease: "sine.inOut" }, 0);

      // Left sweep rotation
      const sweepRotation = gsap.to(leftSweep, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "200px 175px",
        paused: true,
      });

      // Right gear rotation
      const gearRotation = gsap.to(".es-right-gear-outer", {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
        transformOrigin: "600px 175px",
        paused: true,
      });

      const gearRotationInner = gsap.to(".es-right-gear-inner", {
        rotation: -360,
        duration: 6,
        repeat: -1,
        ease: "none",
        transformOrigin: "600px 175px",
        paused: true,
      });

      // Start pulses after entrance
      entranceTl.eventCallback("onComplete", () => {
        leftPulse.play();
        rightPulse.play();
        sweepRotation.play();
        gearRotation.play();
        gearRotationInner.play();
      });

      // ── Phase 3: Scroll-driven synchronization ──
      // scrub controls the "sync factor" from 0 (out of sync) to 1 (perfect sync)
      const syncTl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1.5,
        },
      });

      // As sync increases:
      // 1. Right pulse slows to match left (via timeScale)
      syncTl.to(rightPulse, { timeScale: 0.64, duration: 1, ease: "power2.inOut" }, 0);
      // 2. Bridge brightens
      syncTl.to(bridge, { opacity: 0.8, duration: 1, ease: "power2.inOut" }, 0);
      syncTl.to(bridgeGlow, { opacity: 0.5, duration: 1, ease: "power2.inOut" }, 0.3);
      // 3. Particles become visible and bright
      syncTl.to(particleDots, { opacity: 0.9, duration: 0.8 }, 0.2);
      // 4. Glows intensify
      syncTl.to(leftGlow, { opacity: 0.45, duration: 1 }, 0.2);
      syncTl.to(rightGlow, { opacity: 0.45, duration: 1 }, 0.2);
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  // Gear paths
  const outerGearD = gearPath(600, 175, 52, 65, 12);
  const innerGearD = gearPath(600, 175, 28, 38, 8);

  // Circuit trace points around right engine
  const circuitDots = [
    { cx: 545, cy: 125 }, { cx: 560, cy: 110 }, { cx: 580, cy: 100 },
    { cx: 620, cy: 100 }, { cx: 640, cy: 110 }, { cx: 655, cy: 125 },
    { cx: 660, cy: 150 }, { cx: 660, cy: 200 }, { cx: 655, cy: 225 },
    { cx: 640, cy: 240 }, { cx: 620, cy: 250 }, { cx: 580, cy: 250 },
    { cx: 560, cy: 240 }, { cx: 545, cy: 225 }, { cx: 540, cy: 200 },
    { cx: 540, cy: 150 },
  ];

  // Particle positions along the bridge
  const bridgePath = "M 280,175 C 340,175 360,155 400,155 C 440,155 460,195 500,195 C 540,195 520,175 520,175";

  return (
    <div ref={containerRef} className="w-full">
      <svg
        ref={svgRef}
        viewBox="0 0 800 350"
        className="w-full h-auto"
        aria-hidden
      >
        <defs>
          {/* Glow filter for engine cores */}
          <filter id="engineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0.898  0 0 0 0 0.765  0 0 0 0.6 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Softer glow for ambient light */}
          <filter id="ambientGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>

          {/* Bridge glow */}
          <filter id="bridgeGlow" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>

          {/* Radar sweep gradient */}
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5C3" stopOpacity="0" />
            <stop offset="70%" stopColor="#00E5C3" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00E5C3" stopOpacity="0.35" />
          </linearGradient>

          {/* Connection line gradient */}
          <linearGradient id="bridgeLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5C3" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00E5C3" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00E5C3" stopOpacity="0.8" />
          </linearGradient>

          {/* Radial glow for ambient circles */}
          <radialGradient id="coreRadialGlow">
            <stop offset="0%" stopColor="#00E5C3" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#00E5C3" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00E5C3" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── LEFT ENGINE: Growth Strategy (Radar/Lens) ── */}

        {/* Ambient glow */}
        <circle
          className="es-left-glow"
          cx="200"
          cy="175"
          r="95"
          fill="url(#coreRadialGlow)"
          filter="url(#ambientGlow)"
          opacity="0"
        />

        {/* Concentric rings */}
        <circle
          className="es-left-ring"
          cx="200"
          cy="175"
          r="80"
          fill="none"
          stroke="#059E87"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="6 4"
        />
        <circle
          className="es-left-ring"
          cx="200"
          cy="175"
          r="60"
          fill="none"
          stroke="#059E87"
          strokeWidth="1.2"
          strokeOpacity="0.3"
          strokeDasharray="4 6"
        />
        <circle
          className="es-left-ring"
          cx="200"
          cy="175"
          r="40"
          fill="none"
          stroke="#059E87"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        <circle
          className="es-left-ring"
          cx="200"
          cy="175"
          r="20"
          fill="none"
          stroke="#059E87"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeDasharray="3 3"
        />

        {/* Crosshair lines */}
        <line x1="200" y1="90" x2="200" y2="260" stroke="#059E87" strokeWidth="0.5" strokeOpacity="0.15" />
        <line x1="115" y1="175" x2="285" y2="175" stroke="#059E87" strokeWidth="0.5" strokeOpacity="0.15" />

        {/* Radar sweep wedge */}
        <path
          className="es-left-sweep"
          d="M 200,175 L 200,95 A 80,80 0 0,1 268,135 Z"
          fill="url(#sweepGrad)"
          opacity="0"
        />

        {/* Core dot with glow */}
        <g className="es-left-core" filter="url(#engineGlow)">
          <circle cx="200" cy="175" r="8" fill="#00E5C3" />
          <circle cx="200" cy="175" r="4" fill="#060B14" />
          <circle cx="200" cy="175" r="2.5" fill="#00E5C3" />
        </g>

        {/* Discovered signal dots on rings */}
        <circle cx="230" cy="140" r="2.5" fill="#00E5C3" opacity="0.5" className="es-left-ring" />
        <circle cx="175" cy="205" r="2" fill="#00E5C3" opacity="0.4" className="es-left-ring" />
        <circle cx="248" cy="190" r="2" fill="#00E5C3" opacity="0.35" className="es-left-ring" />
        <circle cx="160" cy="150" r="1.8" fill="#00E5C3" opacity="0.3" className="es-left-ring" />

        {/* Label */}
        <g className="es-left-label">
          <text
            x="200"
            y="72"
            textAnchor="middle"
            fill="#059E87"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="700"
            letterSpacing="3"
          >
            WHERE TO WIN
          </text>
          <text
            x="200"
            y="288"
            textAnchor="middle"
            fill="#059E87"
            fontSize="8"
            fontFamily="monospace"
            fontWeight="600"
            opacity="0.6"
          >
            Growth Strategy Engine
          </text>
        </g>

        {/* ── RIGHT ENGINE: Performance Improvement (Gear/Circuit) ── */}

        {/* Ambient glow */}
        <circle
          className="es-right-glow"
          cx="600"
          cy="175"
          r="95"
          fill="url(#coreRadialGlow)"
          filter="url(#ambientGlow)"
          opacity="0"
        />

        {/* Outer gear */}
        <path
          className="es-right-gear es-right-gear-outer"
          d={outerGearD}
          fill="none"
          stroke="#059E87"
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />

        {/* Inner gear (counter-rotating) */}
        <path
          className="es-right-gear es-right-gear-inner"
          d={innerGearD}
          fill="none"
          stroke="#059E87"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />

        {/* Circuit traces — connecting lines between dots */}
        {circuitDots.map((dot, i) => {
          const next = circuitDots[(i + 1) % circuitDots.length];
          return (
            <line
              key={`ct-${i}`}
              className="es-right-gear"
              x1={dot.cx}
              y1={dot.cy}
              x2={next.cx}
              y2={next.cy}
              stroke="#059E87"
              strokeWidth="0.8"
              strokeOpacity="0.2"
            />
          );
        })}

        {/* Circuit node dots */}
        {circuitDots.map((dot, i) => (
          <circle
            key={`cd-${i}`}
            className="es-right-circuit-dot"
            cx={dot.cx}
            cy={dot.cy}
            r={i % 3 === 0 ? 3 : 2}
            fill={i % 3 === 0 ? "#00E5C3" : "#059E87"}
            opacity="0"
          />
        ))}

        {/* Inner hub ring */}
        <circle
          className="es-right-gear"
          cx="600"
          cy="175"
          r="16"
          fill="none"
          stroke="#059E87"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="3 2"
        />

        {/* Core dot with glow */}
        <g className="es-right-core" filter="url(#engineGlow)">
          <circle cx="600" cy="175" r="8" fill="#00E5C3" />
          <circle cx="600" cy="175" r="4" fill="#060B14" />
          <circle cx="600" cy="175" r="2.5" fill="#00E5C3" />
        </g>

        {/* Label */}
        <g className="es-right-label">
          <text
            x="600"
            y="72"
            textAnchor="middle"
            fill="#059E87"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="700"
            letterSpacing="3"
          >
            HOW TO WIN
          </text>
          <text
            x="600"
            y="288"
            textAnchor="middle"
            fill="#059E87"
            fontSize="8"
            fontFamily="monospace"
            fontWeight="600"
            opacity="0.6"
          >
            Performance Improvement Engine
          </text>
        </g>

        {/* ── ENERGY BRIDGE ── */}

        {/* Bridge glow (behind the line) */}
        <path
          className="es-bridge-glow"
          d={bridgePath}
          fill="none"
          stroke="#00E5C3"
          strokeWidth="8"
          strokeOpacity="0.15"
          filter="url(#bridgeGlow)"
          opacity="0"
        />

        {/* Main bridge line */}
        <path
          className="es-bridge"
          d={bridgePath}
          fill="none"
          stroke="url(#bridgeLineGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0"
        />

        {/* Flowing particle dots along the bridge */}
        <circle className="es-particle" r="3" fill="#00E5C3" opacity="0">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={bridgePath}
          />
        </circle>
        <circle className="es-particle" r="2.5" fill="#00E5C3" opacity="0">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={bridgePath}
            begin="0.6s"
          />
        </circle>
        <circle className="es-particle" r="2" fill="#00E5C3" opacity="0">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={bridgePath}
            begin="1.2s"
          />
        </circle>
        <circle className="es-particle" r="2.5" fill="#00E5C3" opacity="0">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={bridgePath}
            begin="1.8s"
          />
        </circle>
        <circle className="es-particle" r="2" fill="#00E5C3" opacity="0">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={bridgePath}
            begin="2.4s"
          />
        </circle>

        {/* Reverse-flowing particles */}
        <circle className="es-particle" r="2" fill="#00E5C3" opacity="0">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M 520,175 C 520,175 540,195 500,195 C 460,195 440,155 400,155 C 360,155 340,175 280,175"
          />
        </circle>
        <circle className="es-particle" r="1.8" fill="#00E5C3" opacity="0">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M 520,175 C 520,175 540,195 500,195 C 460,195 440,155 400,155 C 360,155 340,175 280,175"
            begin="1.75s"
          />
        </circle>
      </svg>
    </div>
  );
}
