"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ───────────────────────────────────────────────────────────────────
   UNIFIED VISUAL SYSTEM: "The Signal Path"

   Same visual vocabulary across all illustrations:
   • Dots = data points, signals       (3-8px)
   • Lines = connections, pathways      (1-2.5px)
   • Nodes = hubs, processing centers   (circles w/ stroke)
   • Monospace labels                   (7-8px)
   • Color: #059E87 at varying opacity

   These are DETAILED versions of the phase icons.
   ─────────────────────────────────────────────────────────────────── */

/* ── 01 · UNDERSTAND ──
   A scanning grid sweeps across the field, revealing labeled
   hotspots and zones. Like a radar mapping the business terrain.
*/

export function AnalyzeVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const svg = svgRef.current;
      if (!svg) return;

      const scanLine = svg.querySelector(".a-scan");
      const dots = svg.querySelectorAll(".a-dot");
      const dimDots = svg.querySelectorAll(".a-dim");
      const labels = svg.querySelectorAll(".a-label");
      const zones = svg.querySelectorAll(".a-zone");
      const hotspot = svg.querySelector(".a-hotspot");
      const hotspotRing = svg.querySelector(".a-hotspot-ring");
      const progress = svg.querySelector(".a-progress");

      gsap.set(scanLine, { x: -200 });
      gsap.set(dots, { opacity: 0, scale: 0 });
      gsap.set(dimDots, { opacity: 0 });
      gsap.set(labels, { opacity: 0, y: 6 });
      gsap.set(zones, { opacity: 0 });
      gsap.set(hotspot, { opacity: 0, scale: 0 });
      gsap.set(hotspotRing, { opacity: 0, scale: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(dimDots, { opacity: 1, duration: 0.5, stagger: 0.02 })
        .to(scanLine, { x: 420, duration: 2.5, ease: "power1.inOut" }, 0.2)
        .to(progress, { scaleX: 1, duration: 2.5, ease: "power1.inOut" }, 0.2)
        .to(dots, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, 0.5)
        .to(zones, { opacity: 1, duration: 0.4, stagger: 0.1 }, 0.8)
        .to(labels, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, 1.2)
        .to(hotspot, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)" }, 1.6)
        .to(hotspotRing, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 1.7)
        .to(hotspotRing, { scale: 1.3, opacity: 0.3, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" }, 2.1);
    },
    { scope: svgRef }
  );

  return (
    <svg ref={svgRef} viewBox="0 0 420 380" className="w-full h-auto" aria-hidden>
      {/* Subtle grid backdrop */}
      <pattern id="analyzeGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(5,158,135,0.06)" strokeWidth="0.5" />
      </pattern>
      <rect width="420" height="345" fill="url(#analyzeGrid)" />

      {/* Scan line — vertical sweep */}
      <g className="a-scan">
        <rect x="0" y="0" width="3" height="345" fill="url(#scanLineGrad)" />
        <rect x="-40" y="0" width="40" height="345" fill="url(#scanTrail)" />
      </g>

      {/* Dim/undiscovered dots — scattered field */}
      <circle className="a-dim" cx="55" cy="65" r="3" fill="rgba(5,158,135,0.12)" />
      <circle className="a-dim" cx="120" cy="45" r="2.5" fill="rgba(5,158,135,0.1)" />
      <circle className="a-dim" cx="185" cy="80" r="2.5" fill="rgba(5,158,135,0.1)" />
      <circle className="a-dim" cx="260" cy="55" r="3" fill="rgba(5,158,135,0.12)" />
      <circle className="a-dim" cx="330" cy="70" r="2" fill="rgba(5,158,135,0.08)" />
      <circle className="a-dim" cx="380" cy="50" r="2.5" fill="rgba(5,158,135,0.1)" />
      <circle className="a-dim" cx="80" cy="160" r="2" fill="rgba(5,158,135,0.08)" />
      <circle className="a-dim" cx="160" cy="280" r="2.5" fill="rgba(5,158,135,0.1)" />
      <circle className="a-dim" cx="300" cy="300" r="2" fill="rgba(5,158,135,0.08)" />
      <circle className="a-dim" cx="370" cy="260" r="2.5" fill="rgba(5,158,135,0.1)" />
      <circle className="a-dim" cx="50" cy="290" r="2" fill="rgba(5,158,135,0.08)" />
      <circle className="a-dim" cx="390" cy="170" r="2" fill="rgba(5,158,135,0.08)" />

      {/* Zone dividers — vertical dashed lines */}
      <g className="a-zone">
        <line x1="145" y1="30" x2="145" y2="340" stroke="rgba(5,158,135,0.18)" strokeWidth="1" strokeDasharray="5 7" />
        <text x="75" y="345" textAnchor="middle" fill="rgba(5,158,135,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="2">REVENUE</text>
      </g>
      <g className="a-zone">
        <line x1="280" y1="30" x2="280" y2="340" stroke="rgba(5,158,135,0.18)" strokeWidth="1" strokeDasharray="5 7" />
        <text x="212" y="345" textAnchor="middle" fill="rgba(5,158,135,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="2">OPERATIONS</text>
      </g>
      <g className="a-zone">
        <text x="350" y="345" textAnchor="middle" fill="rgba(5,158,135,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="2">SUPPORT</text>
      </g>

      {/* Discovered dots — bright, with tags */}
      <circle className="a-dot" cx="85" cy="110" r="5" fill="#059E87" opacity="0.8" />
      <circle className="a-dot" cx="200" cy="140" r="6" fill="#059E87" opacity="0.85" />
      <circle className="a-dot" cx="105" cy="210" r="4.5" fill="#059E87" opacity="0.7" />
      <circle className="a-dot" cx="320" cy="150" r="5" fill="#059E87" opacity="0.75" />
      <circle className="a-dot" cx="250" cy="220" r="4" fill="#059E87" opacity="0.65" />
      <circle className="a-dot" cx="350" cy="200" r="4.5" fill="#059E87" opacity="0.7" />
      <circle className="a-dot" cx="170" cy="185" r="3.5" fill="#059E87" opacity="0.6" />

      {/* Primary hotspot — biggest opportunity */}
      <circle className="a-hotspot-ring" cx="200" cy="140" r="22" fill="none" stroke="#059E87" strokeWidth="2" strokeDasharray="4 3" />
      <circle className="a-hotspot" cx="200" cy="140" r="12" fill="rgba(5,158,135,0.15)" stroke="#059E87" strokeWidth="2" />

      {/* Annotation labels — discovered insights */}
      <g className="a-label">
        <line x1="85" y1="104" x2="85" y2="80" stroke="rgba(5,158,135,0.5)" strokeWidth="1" />
        <rect x="45" y="63" width="80" height="18" rx="3" fill="rgba(5,158,135,0.12)" stroke="rgba(5,158,135,0.3)" strokeWidth="0.75" />
        <text x="85" y="76" textAnchor="middle" fill="#059E87" fontSize="7.5" fontFamily="monospace" fontWeight="600">REVENUE LEAK</text>
      </g>
      <g className="a-label">
        <line x1="200" y1="155" x2="200" y2="175" stroke="rgba(5,158,135,0.6)" strokeWidth="1" />
        <rect x="155" y="176" width="90" height="18" rx="3" fill="rgba(5,158,135,0.18)" stroke="#059E87" strokeWidth="1" />
        <text x="200" y="189" textAnchor="middle" fill="#059E87" fontSize="7.5" fontFamily="monospace" fontWeight="bold">PRIMARY TARGET</text>
      </g>
      <g className="a-label">
        <line x1="320" y1="144" x2="320" y2="120" stroke="rgba(5,158,135,0.5)" strokeWidth="1" />
        <rect x="270" y="103" width="100" height="18" rx="3" fill="rgba(5,158,135,0.12)" stroke="rgba(5,158,135,0.3)" strokeWidth="0.75" />
        <text x="320" y="116" textAnchor="middle" fill="#059E87" fontSize="7.5" fontFamily="monospace" fontWeight="600">MANUAL HANDOFF</text>
      </g>
      <g className="a-label">
        <line x1="350" y1="195" x2="350" y2="180" stroke="rgba(5,158,135,0.4)" strokeWidth="1" />
        <rect x="318" y="163" width="64" height="18" rx="3" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.25)" strokeWidth="0.75" />
        <text x="350" y="176" textAnchor="middle" fill="rgba(5,158,135,0.7)" fontSize="7" fontFamily="monospace">BOTTLENECK</text>
      </g>

      {/* Progress bar at bottom */}
      <rect x="30" y="358" width="360" height="4" rx="2" fill="rgba(5,158,135,0.08)" />
      <rect className="a-progress" x="30" y="358" width="360" height="4" rx="2" fill="#059E87" opacity="0.5" />
      <text x="30" y="353" fill="rgba(5,158,135,0.4)" fontSize="6.5" fontFamily="monospace" letterSpacing="1">MAPPING COMPLETE</text>

      <defs>
        <linearGradient id="scanLineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059E87" stopOpacity="0" />
          <stop offset="30%" stopColor="#059E87" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#059E87" stopOpacity="1" />
          <stop offset="70%" stopColor="#059E87" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#059E87" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="scanTrail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#059E87" stopOpacity="0" />
          <stop offset="100%" stopColor="#059E87" stopOpacity="0.06" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── 02 · BUILD ──
   The organized signals now flow into a system.
   Clear INPUT → ENGINE → OUTPUT architecture.
   Same visual language as Phase 03 icon, but full detail.
*/

export function SystemVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const svg = svgRef.current;
      if (!svg) return;

      const grid = svg.querySelector(".s-grid");
      const inputs = svg.querySelectorAll(".s-input");
      const connections = svg.querySelectorAll(".s-conn");
      const core = svg.querySelectorAll(".s-core");
      const lens = svg.querySelector(".s-lens");
      const outputs = svg.querySelectorAll(".s-output");
      const controls = svg.querySelectorAll(".s-ctrl");
      const flowDots = svg.querySelectorAll(".s-flow");

      gsap.set(grid, { opacity: 0 });
      gsap.set(inputs, { opacity: 0, x: -25 });
      gsap.set(connections, { strokeDashoffset: 200 });
      gsap.set(core, { opacity: 0, scale: 0.85 });
      gsap.set(lens, { opacity: 0, scale: 0 });
      gsap.set(outputs, { opacity: 0, x: 20 });
      gsap.set(controls, { opacity: 0, y: 12 });
      gsap.set(flowDots, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(grid, { opacity: 1, duration: 0.4 })
        .to(inputs, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.2)
        .to(connections, { strokeDashoffset: 0, duration: 0.8, stagger: 0.05, ease: "power2.inOut" }, 0.5)
        .to(core, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: "back.out(2)" }, 0.8)
        .to(lens, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(3)" }, 1.1)
        .to(outputs, { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }, 1.2)
        .to(controls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }, 1.4)
        .to(flowDots, { opacity: 1, duration: 0.3 }, 1.6)
        .to(lens, { scale: 1.04, opacity: 0.85, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" }, 2);
    },
    { scope: svgRef }
  );

  return (
    <svg ref={svgRef} viewBox="0 0 420 380" className="w-full h-auto" aria-hidden>
      {/* Grid background */}
      <g className="s-grid">
        <pattern id="buildGrid" width="35" height="35" patternUnits="userSpaceOnUse">
          <path d="M 35 0 L 0 0 0 35" fill="none" stroke="rgba(5,158,135,0.07)" strokeWidth="0.5" />
        </pattern>
        <rect width="420" height="380" fill="url(#buildGrid)" />
      </g>

      {/* Input signals — left column */}
      <g className="s-input">
        <circle cx="40" cy="100" r="6" fill="#059E87" opacity="0.75" stroke="rgba(5,158,135,0.5)" strokeWidth="1" />
        <text x="40" y="82" textAnchor="middle" fill="rgba(5,158,135,0.55)" fontSize="7.5" fontFamily="monospace" fontWeight="600">DATA</text>
      </g>
      <g className="s-input">
        <circle cx="40" cy="155" r="6" fill="#059E87" opacity="0.7" stroke="rgba(5,158,135,0.45)" strokeWidth="1" />
        <text x="40" y="137" textAnchor="middle" fill="rgba(5,158,135,0.55)" fontSize="7.5" fontFamily="monospace" fontWeight="600">WORKFLOW</text>
      </g>
      <g className="s-input">
        <circle cx="40" cy="210" r="6" fill="#059E87" opacity="0.7" stroke="rgba(5,158,135,0.45)" strokeWidth="1" />
        <text x="40" y="192" textAnchor="middle" fill="rgba(5,158,135,0.55)" fontSize="7.5" fontFamily="monospace" fontWeight="600">RULES</text>
      </g>
      <g className="s-input">
        <circle cx="40" cy="265" r="6" fill="#059E87" opacity="0.75" stroke="rgba(5,158,135,0.5)" strokeWidth="1" />
        <text x="40" y="247" textAnchor="middle" fill="rgba(5,158,135,0.55)" fontSize="7.5" fontFamily="monospace" fontWeight="600">PEOPLE</text>
      </g>

      {/* Connection paths — input to engine */}
      <path className="s-conn" d="M 46,100 Q 100,120 140,155 L 165,172" fill="none" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" strokeDasharray="200" />
      <path className="s-conn" d="M 46,155 Q 90,160 130,168 L 165,178" fill="none" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" strokeDasharray="200" />
      <path className="s-conn" d="M 46,210 Q 90,205 130,198 L 165,190" fill="none" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" strokeDasharray="200" />
      <path className="s-conn" d="M 46,265 Q 100,245 140,215 L 165,198" fill="none" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" strokeDasharray="200" />

      {/* Central ENGINE — the hub */}
      <rect className="s-core" x="163" y="128" width="104" height="110" rx="6" fill="rgba(5,158,135,0.07)" stroke="rgba(5,158,135,0.45)" strokeWidth="2" />

      {/* Internal processing blocks */}
      <rect className="s-core" x="175" y="138" width="36" height="22" rx="3" fill="rgba(5,158,135,0.15)" stroke="rgba(5,158,135,0.35)" strokeWidth="1" />
      <text x="193" y="153" textAnchor="middle" fill="rgba(5,158,135,0.5)" fontSize="6" fontFamily="monospace">INGEST</text>
      <rect className="s-core" x="219" y="138" width="36" height="22" rx="3" fill="rgba(5,158,135,0.15)" stroke="rgba(5,158,135,0.35)" strokeWidth="1" />
      <text x="237" y="153" textAnchor="middle" fill="rgba(5,158,135,0.5)" fontSize="6" fontFamily="monospace">PROCESS</text>
      <rect className="s-core" x="175" y="210" width="36" height="22" rx="3" fill="rgba(5,158,135,0.15)" stroke="rgba(5,158,135,0.35)" strokeWidth="1" />
      <text x="193" y="225" textAnchor="middle" fill="rgba(5,158,135,0.5)" fontSize="6" fontFamily="monospace">VALIDATE</text>
      <rect className="s-core" x="219" y="210" width="36" height="22" rx="3" fill="rgba(5,158,135,0.15)" stroke="rgba(5,158,135,0.35)" strokeWidth="1" />
      <text x="237" y="225" textAnchor="middle" fill="rgba(5,158,135,0.5)" fontSize="6" fontFamily="monospace">DEPLOY</text>

      {/* Engine core — concentric circles (same as phase icon) */}
      <g className="s-lens">
        <circle cx="215" cy="183" r="24" fill="none" stroke="#059E87" strokeWidth="2.5" />
        <circle cx="215" cy="183" r="16" fill="none" stroke="rgba(5,158,135,0.55)" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="215" cy="183" r="8" fill="none" stroke="rgba(5,158,135,0.65)" strokeWidth="1" />
        <circle cx="215" cy="183" r="3.5" fill="#059E87" />
        <circle cx="215" cy="183" r="30" fill="rgba(5,158,135,0.04)" />
      </g>

      {/* Connection paths — engine to outputs */}
      <path className="s-conn" d="M 267,162 Q 295,145 320,130 L 345,118" fill="none" stroke="rgba(5,158,135,0.55)" strokeWidth="1.5" strokeDasharray="200" />
      <path className="s-conn" d="M 267,183 Q 295,183 320,183 L 345,183" fill="none" stroke="rgba(5,158,135,0.6)" strokeWidth="1.5" strokeDasharray="200" />
      <path className="s-conn" d="M 267,204 Q 295,220 320,234 L 345,248" fill="none" stroke="rgba(5,158,135,0.55)" strokeWidth="1.5" strokeDasharray="200" />

      {/* Output nodes — right column */}
      <g className="s-output">
        <circle cx="355" cy="118" r="7" fill="#059E87" opacity="0.8" stroke="#059E87" strokeWidth="1.5" />
        <text x="355" y="100" textAnchor="middle" fill="rgba(5,158,135,0.6)" fontSize="7.5" fontFamily="monospace" fontWeight="bold">AGENTS</text>
      </g>
      <g className="s-output">
        <circle cx="355" cy="183" r="7" fill="#059E87" opacity="0.75" stroke="#059E87" strokeWidth="1.5" />
        <text x="355" y="165" textAnchor="middle" fill="rgba(5,158,135,0.6)" fontSize="7.5" fontFamily="monospace" fontWeight="bold">CONTROLS</text>
      </g>
      <g className="s-output">
        <circle cx="355" cy="248" r="7" fill="#059E87" opacity="0.8" stroke="#059E87" strokeWidth="1.5" />
        <text x="355" y="230" textAnchor="middle" fill="rgba(5,158,135,0.6)" fontSize="7.5" fontFamily="monospace" fontWeight="bold">KPIs</text>
      </g>

      {/* Flow dots */}
      <circle className="s-flow" r="2.5" fill="#059E87">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 46,155 Q 90,160 130,168 L 165,178 L 215,183" />
      </circle>
      <circle className="s-flow" r="2.5" fill="#059E87" opacity="0.8">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 267,183 Q 295,183 320,183 L 355,183" begin="0.5s" />
      </circle>
      <circle className="s-flow" r="2" fill="#059E87" opacity="0.7">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M 46,210 Q 90,205 130,198 L 165,190 L 215,183" begin="1s" />
      </circle>

      {/* Governance strip */}
      <g className="s-ctrl">
        <line x1="163" y1="255" x2="267" y2="255" stroke="rgba(5,158,135,0.2)" strokeWidth="0.75" />
        <rect x="170" y="262" width="18" height="6" rx="2" fill="rgba(5,158,135,0.35)" />
        <rect x="193" y="262" width="18" height="6" rx="2" fill="rgba(5,158,135,0.25)" />
        <rect x="216" y="262" width="18" height="6" rx="2" fill="#059E87" opacity="0.5" />
        <rect x="239" y="262" width="18" height="6" rx="2" fill="rgba(5,158,135,0.3)" />
      </g>
      <g className="s-ctrl">
        <text x="215" y="285" textAnchor="middle" fill="rgba(5,158,135,0.45)" fontSize="6.5" fontFamily="monospace" fontWeight="600" letterSpacing="1">GOVERNANCE LAYER</text>
      </g>

      {/* Direction labels */}
      <text x="40" y="55" textAnchor="middle" fill="rgba(5,158,135,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="1">INPUTS</text>
      <text x="355" y="75" textAnchor="middle" fill="rgba(5,158,135,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="1">OUTPUTS</text>
    </svg>
  );
}

/* ── 03 · OPERATE ──
   The assembled system is running. Metrics climb,
   flows pulse, KPIs report. Evidence that it works.
*/

export function DashboardVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const svg = svgRef.current;
      if (!svg) return;

      const system = svg.querySelector(".o-system");
      const bars = svg.querySelectorAll(".o-bar");
      const trendLine = svg.querySelector(".o-trend");
      const dots = svg.querySelectorAll(".o-dot");
      const ring = svg.querySelector(".o-ring");
      const ringText = svg.querySelector(".o-ringtext");
      const metrics = svg.querySelectorAll(".o-metric");
      const cadence = svg.querySelectorAll(".o-cadence");
      const flowDots = svg.querySelectorAll(".o-flow");

      gsap.set(system, { opacity: 0, scale: 0.9 });
      gsap.set(bars, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(trendLine, { strokeDashoffset: 500 });
      gsap.set(dots, { opacity: 0, scale: 0 });
      gsap.set(ring, { strokeDashoffset: 195 });
      gsap.set(ringText, { opacity: 0 });
      gsap.set(metrics, { opacity: 0, y: 8 });
      gsap.set(cadence, { opacity: 0, scale: 0.5 });
      gsap.set(flowDots, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(system, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" })
        .to(flowDots, { opacity: 1, duration: 0.4 }, 0.4)
        .to(bars, { scaleY: 1, duration: 0.6, stagger: 0.04, ease: "power2.out" }, 0.5)
        .to(trendLine, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.6)
        .to(dots, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: "back.out(2)" }, 1.2)
        .to(ring, { strokeDashoffset: 48, duration: 1, ease: "power2.out" }, 0.8)
        .to(ringText, { opacity: 1, duration: 0.4 }, 1.2)
        .to(metrics, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, 1.3)
        .to(cadence, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(2)" }, 1.5)
        .to(cadence, { opacity: 0.3, duration: 0.8, stagger: { each: 0.12, repeat: -1, yoyo: true }, ease: "sine.inOut" }, 2);
    },
    { scope: svgRef }
  );

  const barData = [0.2, 0.28, 0.35, 0.32, 0.42, 0.48, 0.45, 0.55, 0.58, 0.62, 0.68, 0.72, 0.78, 0.85, 0.92];
  const trendPoints = "75,230 95,218 115,222 135,208 155,200 175,192 195,182 215,170 235,158 255,148 275,135 295,120 315,105 335,90 355,75";

  return (
    <svg ref={svgRef} viewBox="0 0 420 380" className="w-full h-auto" aria-hidden>
      {/* Running system indicator — top left, small version of the engine */}
      <g className="o-system">
        <rect x="25" y="15" width="70" height="50" rx="4" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.4)" strokeWidth="1.5" />
        <circle cx="60" cy="40" r="10" fill="none" stroke="#059E87" strokeWidth="1.5" />
        <circle cx="60" cy="40" r="5" fill="none" stroke="rgba(5,158,135,0.5)" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="60" cy="40" r="2.5" fill="#059E87" />
        {/* Live indicator */}
        <circle cx="88" cy="24" r="4" fill="#059E87" />
        <circle cx="88" cy="24" r="7" fill="rgba(5,158,135,0.12)" />
        <text x="60" y="78" textAnchor="middle" fill="rgba(5,158,135,0.55)" fontSize="7" fontFamily="monospace" fontWeight="600" letterSpacing="1">SYSTEM LIVE</text>
      </g>

      {/* Flow dots from system */}
      <circle className="o-flow" r="2" fill="#059E87">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 95,40 Q 150,42 200,75 Q 260,110 320,100" />
      </circle>
      <circle className="o-flow" r="2" fill="#059E87" opacity="0.7">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M 95,40 Q 140,65 180,95 Q 230,130 280,140" begin="0.8s" />
      </circle>

      {/* Chart area */}
      <rect x="55" y="95" width="320" height="175" rx="3" fill="rgba(5,158,135,0.03)" stroke="rgba(5,158,135,0.1)" strokeWidth="0.5" />
      <line x1="60" y1="260" x2="370" y2="260" stroke="rgba(5,158,135,0.2)" strokeWidth="1" />
      <line x1="60" y1="210" x2="370" y2="210" stroke="rgba(5,158,135,0.08)" strokeWidth="0.5" strokeDasharray="4 6" />
      <line x1="60" y1="160" x2="370" y2="160" stroke="rgba(5,158,135,0.08)" strokeWidth="0.5" strokeDasharray="4 6" />
      <line x1="60" y1="110" x2="370" y2="110" stroke="rgba(5,158,135,0.08)" strokeWidth="0.5" strokeDasharray="4 6" />

      {/* Bar chart */}
      {barData.map((h, i) => (
        <rect
          key={`bar-${i}`}
          className="o-bar"
          x={68 + i * 20}
          y={260 - h * 190}
          width="14"
          height={h * 190}
          rx="2"
          fill={`rgba(5,158,135,${0.18 + h * 0.3})`}
        />
      ))}

      {/* Trend line */}
      <polyline
        className="o-trend"
        points={trendPoints}
        fill="none"
        stroke="#059E87"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="500"
      />

      {/* Trend data points */}
      {trendPoints.split(" ").filter((_, i) => i % 2 === 0).map((pt, i) => {
        const [x, y] = pt.split(",").map(Number);
        return <circle key={`td-${i}`} className="o-dot" cx={x} cy={y} r="3" fill="#059E87" stroke="rgba(5,158,135,0.3)" strokeWidth="2" />;
      })}

      {/* Health ring */}
      <circle cx="370" cy="35" r="28" fill="none" stroke="rgba(5,158,135,0.15)" strokeWidth="4" />
      <circle
        className="o-ring"
        cx="370" cy="35" r="28"
        fill="none"
        stroke="#059E87"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="176"
        transform="rotate(-90 370 35)"
      />
      <text className="o-ringtext" x="370" y="40" textAnchor="middle" fill="#059E87" fontSize="14" fontFamily="monospace" fontWeight="bold">87%</text>
      <text x="370" y="72" textAnchor="middle" fill="rgba(5,158,135,0.5)" fontSize="7" fontFamily="monospace" fontWeight="600">HEALTH</text>

      {/* KPI readouts */}
      <g className="o-metric">
        <text x="70" y="290" fill="rgba(5,158,135,0.55)" fontSize="7.5" fontFamily="monospace" fontWeight="600">THROUGHPUT</text>
        <text x="70" y="310" fill="#059E87" fontSize="18" fontFamily="monospace" fontWeight="bold">+42%</text>
      </g>
      <g className="o-metric">
        <text x="185" y="290" fill="rgba(5,158,135,0.55)" fontSize="7.5" fontFamily="monospace" fontWeight="600">CYCLE TIME</text>
        <text x="185" y="310" fill="#059E87" fontSize="18" fontFamily="monospace" fontWeight="bold">-31%</text>
      </g>
      <g className="o-metric">
        <text x="300" y="290" fill="rgba(5,158,135,0.55)" fontSize="7.5" fontFamily="monospace" fontWeight="600">ADOPTION</text>
        <text x="300" y="310" fill="#059E87" fontSize="18" fontFamily="monospace" fontWeight="bold">94%</text>
      </g>

      {/* Cadence strip */}
      <text x="70" y="340" fill="rgba(5,158,135,0.45)" fontSize="6.5" fontFamily="monospace" fontWeight="600" letterSpacing="1">OPTIMIZATION CADENCE</text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={`cad-${i}`} className="o-cadence" x={70 + i * 38} y={348} width="30" height="6" rx="3" fill="#059E87" opacity="0.65" />
      ))}
    </svg>
  );
}
