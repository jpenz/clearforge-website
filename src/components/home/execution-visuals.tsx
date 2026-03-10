"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ───────────────────────────────────────────────────────────────────
   01 · UNDERSTAND — The Terrain Survey
   A topographic landscape scanned by a lighthouse beam from above.
   Contour lines illuminate as the beam sweeps, revealing annotations.
   ─────────────────────────────────────────────────────────────────── */

export function AnalyzeVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const svg = svgRef.current;
      if (!svg) return;

      const contours = svg.querySelectorAll(".t-contour");
      const beam = svg.querySelector(".t-beam");
      const annotations = svg.querySelectorAll(".t-annotation");
      const leaders = svg.querySelectorAll(".t-leader");
      const hotspot = svg.querySelector(".t-hotspot");
      const lighthouse = svg.querySelector(".t-lighthouse");

      gsap.set(contours, { strokeDashoffset: 800, opacity: 0.3 });
      gsap.set(beam, { opacity: 0, rotation: -20, transformOrigin: "20px 20px" });
      gsap.set(annotations, { opacity: 0, y: 8 });
      gsap.set(leaders, { strokeDashoffset: 100 });
      gsap.set(hotspot, { opacity: 0, scale: 0 });
      gsap.set(lighthouse, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(lighthouse, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .to(beam, { opacity: 0.7, duration: 0.5, ease: "power2.out" }, 0.2)
        .to(beam, { rotation: 25, duration: 2.5, ease: "power1.inOut" }, 0.2)
        .to(contours, { strokeDashoffset: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: "power2.out" }, 0.4)
        .to(leaders, { strokeDashoffset: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 1.2)
        .to(annotations, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, 1.4)
        .to(hotspot, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)" }, 1.8)
        .to(hotspot, { scale: 1.2, opacity: 0.6, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" }, 2.2);
    },
    { scope: svgRef }
  );

  return (
    <svg ref={svgRef} viewBox="0 0 420 380" className="w-full h-auto" aria-hidden>
      {/* Lighthouse beam from upper-left */}
      <g className="t-lighthouse">
        <rect x="8" y="8" width="6" height="28" rx="1" fill="rgba(5,158,135,0.4)" />
        <rect x="4" y="4" width="14" height="8" rx="2" fill="rgba(5,158,135,0.5)" />
        <circle cx="11" cy="8" r="2" fill="#059E87" />
      </g>
      <polygon
        className="t-beam"
        points="18,12 380,80 380,200 18,18"
        fill="url(#beamGrad)"
      />

      {/* Topographic contour lines — organic curves representing business terrain */}
      <path className="t-contour" d="M 40,320 Q 100,290 160,310 Q 220,330 280,300 Q 340,270 400,290" fill="none" stroke="rgba(5,158,135,0.18)" strokeWidth="1" strokeDasharray="800" />
      <path className="t-contour" d="M 50,280 Q 120,250 180,275 Q 240,300 300,260 Q 360,220 400,250" fill="none" stroke="rgba(5,158,135,0.22)" strokeWidth="1" strokeDasharray="800" />
      <path className="t-contour" d="M 60,240 Q 130,210 190,235 Q 250,260 310,220 Q 370,180 410,210" fill="none" stroke="rgba(5,158,135,0.28)" strokeWidth="1" strokeDasharray="800" />
      <path className="t-contour" d="M 70,200 Q 140,170 200,195 Q 260,220 320,180 Q 380,140 410,170" fill="none" stroke="rgba(5,158,135,0.32)" strokeWidth="1" strokeDasharray="800" />
      <path className="t-contour" d="M 80,160 Q 150,130 210,155 Q 270,180 330,140 Q 390,100 420,130" fill="none" stroke="rgba(5,158,135,0.25)" strokeWidth="1" strokeDasharray="800" />
      <path className="t-contour" d="M 90,120 Q 160,90 220,115 Q 280,140 340,100 Q 400,60 420,90" fill="none" stroke="rgba(5,158,135,0.18)" strokeWidth="1" strokeDasharray="800" />

      {/* Zone borders — subtle regions */}
      <line x1="160" y1="60" x2="160" y2="350" stroke="rgba(5,158,135,0.08)" strokeWidth="1" strokeDasharray="3 6" />
      <line x1="300" y1="60" x2="300" y2="350" stroke="rgba(5,158,135,0.08)" strokeWidth="1" strokeDasharray="3 6" />

      {/* Hotspot — primary opportunity */}
      <circle className="t-hotspot" cx="230" cy="200" r="18" fill="rgba(5,158,135,0.12)" stroke="#059E87" strokeWidth="1.5" />
      <circle cx="230" cy="200" r="4" fill="#059E87" className="t-hotspot" />

      {/* Annotation leaders */}
      <line className="t-leader" x1="100" y1="150" x2="100" y2="115" stroke="rgba(5,158,135,0.4)" strokeWidth="0.75" strokeDasharray="100" />
      <line className="t-leader" x1="230" y1="178" x2="230" y2="148" stroke="rgba(5,158,135,0.4)" strokeWidth="0.75" strokeDasharray="100" />
      <line className="t-leader" x1="350" y1="170" x2="350" y2="135" stroke="rgba(5,158,135,0.4)" strokeWidth="0.75" strokeDasharray="100" />

      {/* Annotations */}
      <g className="t-annotation">
        <rect x="60" y="98" width="80" height="16" rx="2" fill="rgba(5,158,135,0.08)" />
        <text x="100" y="110" textAnchor="middle" fill="rgba(5,158,135,0.7)" fontSize="7" fontFamily="monospace">REVENUE LEAK</text>
      </g>
      <g className="t-annotation">
        <rect x="190" y="130" width="80" height="16" rx="2" fill="rgba(5,158,135,0.12)" />
        <text x="230" y="142" textAnchor="middle" fill="#059E87" fontSize="7" fontFamily="monospace" fontWeight="bold">PRIMARY TARGET</text>
      </g>
      <g className="t-annotation">
        <rect x="305" y="118" width="90" height="16" rx="2" fill="rgba(5,158,135,0.08)" />
        <text x="350" y="130" textAnchor="middle" fill="rgba(5,158,135,0.7)" fontSize="7" fontFamily="monospace">MANUAL HANDOFF</text>
      </g>

      <defs>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#059E87" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#059E87" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────────────
   02 · BUILD — The Assembly Floor
   Components flowing in from the left, assembling around a central
   Fresnel lens core, with control layer and output channels.
   ─────────────────────────────────────────────────────────────────── */

export function SystemVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const svg = svgRef.current;
      if (!svg) return;

      const grid = svg.querySelector(".s-grid");
      const inputs = svg.querySelectorAll(".s-input");
      const core = svg.querySelectorAll(".s-core");
      const connections = svg.querySelectorAll(".s-conn");
      const outputs = svg.querySelectorAll(".s-output");
      const controls = svg.querySelectorAll(".s-ctrl");
      const lens = svg.querySelector(".s-lens");
      const flowDots = svg.querySelectorAll(".s-flow");

      gsap.set(grid, { opacity: 0 });
      gsap.set(inputs, { opacity: 0, x: -30 });
      gsap.set(core, { opacity: 0, scale: 0.8 });
      gsap.set(connections, { strokeDashoffset: 200 });
      gsap.set(outputs, { opacity: 0, x: 20 });
      gsap.set(controls, { opacity: 0, y: 15 });
      gsap.set(lens, { opacity: 0, scale: 0 });
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
        .to(inputs, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 0.2)
        .to(connections, { strokeDashoffset: 0, duration: 0.7, stagger: 0.06, ease: "power2.inOut" }, 0.5)
        .to(core, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, 0.7)
        .to(lens, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(3)" }, 1)
        .to(outputs, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 1.1)
        .to(controls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }, 1.3)
        .to(flowDots, { opacity: 1, duration: 0.3 }, 1.6)
        .to(lens, { scale: 1.05, opacity: 0.8, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" }, 2);
    },
    { scope: svgRef }
  );

  return (
    <svg ref={svgRef} viewBox="0 0 420 380" className="w-full h-auto" aria-hidden>
      {/* Grid background */}
      <g className="s-grid">
        <pattern id="asmGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(5,158,135,0.06)" strokeWidth="0.5" />
        </pattern>
        <rect width="420" height="380" fill="url(#asmGrid)" />
      </g>

      {/* Input blocks — left side, representing workflow components */}
      <g className="s-input">
        <rect x="20" y="90" width="55" height="28" rx="3" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
        <text x="47" y="108" textAnchor="middle" fill="rgba(5,158,135,0.5)" fontSize="7" fontFamily="monospace">DATA</text>
      </g>
      <g className="s-input">
        <rect x="20" y="140" width="55" height="28" rx="3" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
        <text x="47" y="158" textAnchor="middle" fill="rgba(5,158,135,0.5)" fontSize="7" fontFamily="monospace">WORKFLOW</text>
      </g>
      <g className="s-input">
        <rect x="20" y="190" width="55" height="28" rx="3" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
        <text x="47" y="208" textAnchor="middle" fill="rgba(5,158,135,0.5)" fontSize="7" fontFamily="monospace">RULES</text>
      </g>
      <g className="s-input">
        <rect x="20" y="240" width="55" height="28" rx="3" fill="rgba(5,158,135,0.1)" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
        <text x="47" y="258" textAnchor="middle" fill="rgba(5,158,135,0.5)" fontSize="7" fontFamily="monospace">PEOPLE</text>
      </g>

      {/* Connection paths — input to core */}
      <path className="s-conn" d="M 75,104 L 130,150 L 170,160" fill="none" stroke="rgba(5,158,135,0.3)" strokeWidth="1" strokeDasharray="200" />
      <path className="s-conn" d="M 75,154 L 120,162 L 170,170" fill="none" stroke="rgba(5,158,135,0.3)" strokeWidth="1" strokeDasharray="200" />
      <path className="s-conn" d="M 75,204 L 120,190 L 170,182" fill="none" stroke="rgba(5,158,135,0.3)" strokeWidth="1" strokeDasharray="200" />
      <path className="s-conn" d="M 75,254 L 130,215 L 170,195" fill="none" stroke="rgba(5,158,135,0.3)" strokeWidth="1" strokeDasharray="200" />

      {/* Core assembly — central machine */}
      <rect className="s-core" x="170" y="120" width="100" height="110" rx="5" fill="rgba(5,158,135,0.06)" stroke="rgba(5,158,135,0.25)" strokeWidth="1.5" />
      {/* Internal components */}
      <rect className="s-core" x="182" y="132" width="30" height="18" rx="2" fill="rgba(5,158,135,0.12)" stroke="rgba(5,158,135,0.2)" strokeWidth="0.75" />
      <rect className="s-core" x="228" y="132" width="30" height="18" rx="2" fill="rgba(5,158,135,0.12)" stroke="rgba(5,158,135,0.2)" strokeWidth="0.75" />
      <rect className="s-core" x="182" y="200" width="30" height="18" rx="2" fill="rgba(5,158,135,0.12)" stroke="rgba(5,158,135,0.2)" strokeWidth="0.75" />
      <rect className="s-core" x="228" y="200" width="30" height="18" rx="2" fill="rgba(5,158,135,0.12)" stroke="rgba(5,158,135,0.2)" strokeWidth="0.75" />

      {/* Fresnel lens — the lighthouse core, now inside the machine */}
      <g className="s-lens">
        <circle cx="220" cy="175" r="22" fill="none" stroke="#059E87" strokeWidth="1.5" />
        <circle cx="220" cy="175" r="15" fill="none" stroke="rgba(5,158,135,0.4)" strokeWidth="1" strokeDasharray="4 3" />
        <circle cx="220" cy="175" r="8" fill="none" stroke="rgba(5,158,135,0.5)" strokeWidth="1" />
        <circle cx="220" cy="175" r="3" fill="#059E87" />
      </g>

      {/* Connection paths — core to outputs */}
      <path className="s-conn" d="M 270,155 L 310,140 L 345,130" fill="none" stroke="rgba(5,158,135,0.3)" strokeWidth="1" strokeDasharray="200" />
      <path className="s-conn" d="M 270,175 L 310,175 L 345,175" fill="none" stroke="rgba(5,158,135,0.35)" strokeWidth="1" strokeDasharray="200" />
      <path className="s-conn" d="M 270,195 L 310,210 L 345,220" fill="none" stroke="rgba(5,158,135,0.3)" strokeWidth="1" strokeDasharray="200" />

      {/* Output channels — right side */}
      <g className="s-output">
        <rect x="345" y="118" width="55" height="24" rx="3" fill="rgba(5,158,135,0.15)" stroke="#059E87" strokeWidth="1" />
        <text x="372" y="134" textAnchor="middle" fill="#059E87" fontSize="7" fontFamily="monospace">AGENTS</text>
      </g>
      <g className="s-output">
        <rect x="345" y="163" width="55" height="24" rx="3" fill="rgba(5,158,135,0.15)" stroke="#059E87" strokeWidth="1" />
        <text x="372" y="179" textAnchor="middle" fill="#059E87" fontSize="7" fontFamily="monospace">CONTROLS</text>
      </g>
      <g className="s-output">
        <rect x="345" y="208" width="55" height="24" rx="3" fill="rgba(5,158,135,0.15)" stroke="#059E87" strokeWidth="1" />
        <text x="372" y="224" textAnchor="middle" fill="#059E87" fontSize="7" fontFamily="monospace">KPIs</text>
      </g>

      {/* Flow dots on connections */}
      <circle className="s-flow" cx="120" cy="156" r="2" fill="#059E87">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 0,0 L 50,-6 L 95,8" />
      </circle>
      <circle className="s-flow" cx="310" cy="175" r="2" fill="#059E87">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 0,0 L 35,0 L 75,0" />
      </circle>

      {/* Control layer — bottom strip */}
      <line x1="170" y1="260" x2="270" y2="260" stroke="rgba(5,158,135,0.15)" strokeWidth="0.5" />
      <g className="s-ctrl">
        <rect x="175" y="270" width="18" height="8" rx="1" fill="rgba(5,158,135,0.2)" />
        <rect x="198" y="270" width="18" height="8" rx="1" fill="rgba(5,158,135,0.15)" />
        <rect x="221" y="270" width="18" height="8" rx="1" fill="#059E87" opacity="0.3" />
        <rect x="244" y="270" width="18" height="8" rx="1" fill="rgba(5,158,135,0.2)" />
      </g>
      <g className="s-ctrl">
        <text x="175" y="292" fill="rgba(5,158,135,0.45)" fontSize="6" fontFamily="monospace">GOVERNANCE</text>
        <text x="237" y="292" fill="rgba(5,158,135,0.45)" fontSize="6" fontFamily="monospace">CONTROLS</text>
      </g>
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────────────
   03 · OPERATE — The Running System
   The assembled machine is now alive. Data flows, metrics rise,
   cadence pulses in rhythm. Everything is in motion.
   ─────────────────────────────────────────────────────────────────── */

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
        .to(dots, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(2)" }, 1.2)
        .to(ring, { strokeDashoffset: 48, duration: 1, ease: "power2.out" }, 0.8)
        .to(ringText, { opacity: 1, duration: 0.4 }, 1.2)
        .to(metrics, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 1.3)
        .to(cadence, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, 1.5)
        // Continuous animations
        .to(cadence, { opacity: 0.4, duration: 0.8, stagger: { each: 0.15, repeat: -1, yoyo: true }, ease: "sine.inOut" }, 2)
        .to(dots, { opacity: 0.5, duration: 1, stagger: { each: 0.1, repeat: -1, yoyo: true }, ease: "sine.inOut" }, 2);
    },
    { scope: svgRef }
  );

  // Bar chart data — rising trend
  const barData = [0.2, 0.28, 0.35, 0.32, 0.42, 0.48, 0.45, 0.55, 0.58, 0.62, 0.68, 0.72, 0.78, 0.85, 0.92];
  const trendPoints = "75,230 95,218 115,222 135,208 155,200 175,192 195,182 215,170 235,158 255,148 275,135 295,120 315,105 335,90 355,75";

  return (
    <svg ref={svgRef} viewBox="0 0 420 380" className="w-full h-auto" aria-hidden>
      {/* Miniature system schematic — the machine from Step 02, now small and running */}
      <g className="o-system">
        <rect x="30" y="20" width="70" height="50" rx="3" fill="rgba(5,158,135,0.06)" stroke="rgba(5,158,135,0.2)" strokeWidth="1" />
        {/* Fresnel lens — small, inside the running system */}
        <circle cx="65" cy="45" r="10" fill="none" stroke="#059E87" strokeWidth="1" />
        <circle cx="65" cy="45" r="6" fill="none" stroke="rgba(5,158,135,0.4)" strokeWidth="0.75" strokeDasharray="2 2" />
        <circle cx="65" cy="45" r="2.5" fill="#059E87" />
        {/* Status indicator */}
        <circle cx="92" cy="28" r="3" fill="#059E87" opacity="0.8" />
        <text x="65" y="80" textAnchor="middle" fill="rgba(5,158,135,0.4)" fontSize="6" fontFamily="monospace">SYSTEM ACTIVE</text>
      </g>

      {/* Flow dots emanating from system */}
      <circle className="o-flow" r="1.5" fill="#00E5C3">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 100,45 Q 150,45 200,80 Q 250,110 300,100" />
      </circle>
      <circle className="o-flow" r="1.5" fill="#00E5C3">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M 100,45 Q 140,70 180,100 Q 220,130 260,140" begin="0.8s" />
      </circle>
      <circle className="o-flow" r="1.5" fill="#00E5C3">
        <animateMotion dur="5s" repeatCount="indefinite" path="M 100,45 Q 160,55 220,70 Q 300,85 380,70" begin="1.5s" />
      </circle>

      {/* Axis lines */}
      <line x1="60" y1="260" x2="370" y2="260" stroke="rgba(5,158,135,0.12)" strokeWidth="0.5" />
      <line x1="60" y1="210" x2="370" y2="210" stroke="rgba(5,158,135,0.06)" strokeWidth="0.5" strokeDasharray="3 5" />
      <line x1="60" y1="160" x2="370" y2="160" stroke="rgba(5,158,135,0.06)" strokeWidth="0.5" strokeDasharray="3 5" />
      <line x1="60" y1="110" x2="370" y2="110" stroke="rgba(5,158,135,0.06)" strokeWidth="0.5" strokeDasharray="3 5" />

      {/* Bar chart — performance over time */}
      {barData.map((h, i) => (
        <rect
          key={`bar-${i}`}
          className="o-bar"
          x={68 + i * 20}
          y={260 - h * 190}
          width="12"
          height={h * 190}
          rx="1.5"
          fill={`rgba(5,158,135,${0.12 + h * 0.2})`}
        />
      ))}

      {/* Trend line overlay */}
      <polyline
        className="o-trend"
        points={trendPoints}
        fill="none"
        stroke="#059E87"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="500"
      />

      {/* Data points on trend */}
      {trendPoints.split(" ").filter((_, i) => i % 2 === 0).map((pt, i) => {
        const [x, y] = pt.split(",").map(Number);
        return <circle key={`td-${i}`} className="o-dot" cx={x} cy={y} r="3" fill="#059E87" />;
      })}

      {/* Progress ring — system health */}
      <circle cx="370" cy="35" r="25" fill="none" stroke="rgba(5,158,135,0.12)" strokeWidth="3" />
      <circle
        className="o-ring"
        cx="370" cy="35" r="25"
        fill="none"
        stroke="#059E87"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="157"
        transform="rotate(-90 370 35)"
      />
      <text className="o-ringtext" x="370" y="39" textAnchor="middle" fill="#059E87" fontSize="12" fontFamily="monospace" fontWeight="bold">87%</text>
      <text x="370" y="70" textAnchor="middle" fill="rgba(5,158,135,0.4)" fontSize="6" fontFamily="monospace">HEALTH</text>

      {/* KPI readouts */}
      <g className="o-metric">
        <text x="70" y="290" fill="rgba(5,158,135,0.45)" fontSize="7" fontFamily="monospace">THROUGHPUT</text>
        <text x="70" y="305" fill="#059E87" fontSize="14" fontFamily="monospace" fontWeight="bold">+42%</text>
      </g>
      <g className="o-metric">
        <text x="180" y="290" fill="rgba(5,158,135,0.45)" fontSize="7" fontFamily="monospace">CYCLE TIME</text>
        <text x="180" y="305" fill="#059E87" fontSize="14" fontFamily="monospace" fontWeight="bold">-31%</text>
      </g>
      <g className="o-metric">
        <text x="290" y="290" fill="rgba(5,158,135,0.45)" fontSize="7" fontFamily="monospace">ADOPTION</text>
        <text x="290" y="305" fill="#059E87" fontSize="14" fontFamily="monospace" fontWeight="bold">94%</text>
      </g>

      {/* Cadence strip — operating rhythm */}
      <g>
        <text x="70" y="340" fill="rgba(5,158,135,0.35)" fontSize="6" fontFamily="monospace">OPTIMIZATION CADENCE</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={`cad-${i}`} className="o-cadence" x={70 + i * 38} y={348} width="28" height="4" rx="2" fill="#059E87" opacity="0.6" />
        ))}
      </g>
    </svg>
  );
}
