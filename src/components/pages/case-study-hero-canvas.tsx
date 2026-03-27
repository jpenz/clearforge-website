'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Types ── */

interface DivisionNode {
  x: number;
  y: number;
  /** Isolated cluster position (silo state) */
  siloX: number;
  siloY: number;
  /** Connected network position (growth state) */
  networkX: number;
  networkY: number;
  radius: number;
  opacity: number;
  cluster: number; // which division (0-15)
  isHotspot: boolean;
  hotspotDelay: number; // when this hotspot "activates" (0-1 within scan phase)
  driftPhase: number;
  driftSpeed: number;
  driftAmp: number;
}

interface AgentDot {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  trail: { x: number; y: number }[];
  isHubAgent: boolean; // flows to/from hub
}

/* ── Constants ── */

const TEAL = { r: 0, g: 229, b: 195 };
const TEAL_DIM = { r: 0, g: 120, b: 100 };
const GOLD = { r: 255, g: 200, b: 60 };
const NUM_CLUSTERS = 16;
const NODES_PER_CLUSTER = 5;
const TOTAL_NODES = NUM_CLUSTERS * NODES_PER_CLUSTER;
const HUB_APPEAR_AT = 0.4; // progress value when hub starts appearing
const NUM_AGENTS = 12;

/* ── Helpers ── */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

/* ── Component ── */

export function CaseStudyHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const nodesRef = useRef<DivisionNode[]>([]);
  const agentsRef = useRef<AgentDot[]>([]);
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const sizeRef = useRef({ width: 0, height: 0 });
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const hubRef = useRef({ x: 0, y: 0 });
  const scanAngleRef = useRef(0);

  /** Initialize nodes */
  const initNodes = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const nodesPerCluster = isMobile ? 3 : NODES_PER_CLUSTER;
    const numClusters = isMobile ? 8 : NUM_CLUSTERS;
    const totalNodes = numClusters * nodesPerCluster;

    const cx = width / 2;
    const cy = height / 2;
    hubRef.current = { x: cx, y: cy };

    const nodes: DivisionNode[] = [];

    // Place clusters in a scattered pattern (silo positions)
    const clusterCenters: { x: number; y: number }[] = [];
    const margin = isMobile ? 40 : 80;
    for (let c = 0; c < numClusters; c++) {
      // Spread clusters around the canvas with some randomness
      const angle = (c / numClusters) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const radiusRange = isMobile
        ? { min: height * 0.15, max: height * 0.38 }
        : { min: Math.min(width, height) * 0.15, max: Math.min(width, height) * 0.42 };
      const r = radiusRange.min + Math.random() * (radiusRange.max - radiusRange.min);
      const clusterX = clamp(cx + Math.cos(angle) * r, margin, width - margin);
      const clusterY = clamp(cy + Math.sin(angle) * r, margin, height - margin);
      clusterCenters.push({ x: clusterX, y: clusterY });
    }

    // Network positions: connected ring around hub
    const networkCenters: { x: number; y: number }[] = [];
    for (let c = 0; c < numClusters; c++) {
      const angle = (c / numClusters) * Math.PI * 2;
      const ringRadius = Math.min(width, height) * (isMobile ? 0.28 : 0.32);
      networkCenters.push({
        x: cx + Math.cos(angle) * ringRadius,
        y: cy + Math.sin(angle) * ringRadius,
      });
    }

    // Create nodes per cluster
    for (let c = 0; c < numClusters; c++) {
      const sc = clusterCenters[c];
      const nc = networkCenters[c];
      const clusterSpread = isMobile ? 18 : 30;
      const networkSpread = isMobile ? 14 : 22;

      for (let n = 0; n < nodesPerCluster; n++) {
        const siloAngle = Math.random() * Math.PI * 2;
        const siloDist = Math.random() * clusterSpread;
        const netAngle = Math.random() * Math.PI * 2;
        const netDist = Math.random() * networkSpread;

        const isHotspot = n === 0; // first node in each cluster is a hotspot
        // Hotspot activates based on cluster angle (simulating scan sweep)
        const hotspotDelay = c / numClusters;

        nodes.push({
          x: sc.x + Math.cos(siloAngle) * siloDist,
          y: sc.y + Math.sin(siloAngle) * siloDist,
          siloX: sc.x + Math.cos(siloAngle) * siloDist,
          siloY: sc.y + Math.sin(siloAngle) * siloDist,
          networkX: nc.x + Math.cos(netAngle) * netDist,
          networkY: nc.y + Math.sin(netAngle) * netDist,
          radius: isHotspot ? (isMobile ? 3 : 4) : (isMobile ? 1.5 : 2) + Math.random() * 1.5,
          opacity: 0.3 + Math.random() * 0.4,
          cluster: c,
          isHotspot,
          hotspotDelay,
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.2 + Math.random() * 0.4,
          driftAmp: isMobile ? 3 : 5 + Math.random() * 5,
        });
      }
    }

    nodesRef.current = nodes;

    // Initialize agent dots
    const agents: AgentDot[] = [];
    const agentCount = isMobile ? 6 : NUM_AGENTS;
    for (let a = 0; a < agentCount; a++) {
      const fromCluster = Math.floor(Math.random() * numClusters);
      const toCluster =
        (fromCluster + 1 + Math.floor(Math.random() * (numClusters - 1))) % numClusters;
      agents.push({
        fromIdx: fromCluster * nodesPerCluster,
        toIdx: toCluster * nodesPerCluster,
        progress: Math.random(),
        speed: 0.15 + Math.random() * 0.25,
        trail: [],
        isHubAgent: a < agentCount / 2,
      });
    }
    agentsRef.current = agents;
  }, []);

  /** Handle resize */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    sizeRef.current = { width, height };
    initNodes(width, height);
  }, [initNodes]);

  /** Main render loop */
  const render = useCallback(() => {
    if (!isVisibleRef.current) {
      animFrameRef.current = requestAnimationFrame(render);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    if (width === 0 || height === 0) {
      animFrameRef.current = requestAnimationFrame(render);
      return;
    }

    const now = performance.now();
    const delta = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0.016;
    lastTimeRef.current = now;
    timeRef.current += delta;
    const time = timeRef.current;

    const progress = progressRef.current.value;
    const nodes = nodesRef.current;
    const hub = hubRef.current;

    ctx.clearRect(0, 0, width, height);

    // ── Progress phases ──
    // 0.0 - 0.2: Silos (isolated clusters, dim)
    // 0.2 - 0.4: Scanning (radar sweep, hotspots light up)
    // 0.4 - 0.7: Building system (hub appears, agents flow, connections form)
    // 0.7 - 1.0: Growth (full network, bright, metrics)

    const siloPhase = clamp(progress / 0.2, 0, 1);
    const scanPhase = clamp((progress - 0.15) / 0.25, 0, 1);
    const buildPhase = clamp((progress - 0.4) / 0.3, 0, 1);
    const growthPhase = clamp((progress - 0.7) / 0.3, 0, 1);
    const networkBlend = clamp((progress - 0.35) / 0.35, 0, 1); // silo → network position

    // ── Update scan angle ──
    scanAngleRef.current = scanPhase * Math.PI * 2.5; // sweep 2.5 rotations during scan phase

    // ── Update node positions ──
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Ambient drift (subtle)
      const driftScale = lerp(1.0, 0.3, networkBlend);
      const driftX =
        Math.sin(time * node.driftSpeed + node.driftPhase) * node.driftAmp * driftScale;
      const driftY =
        Math.cos(time * node.driftSpeed * 0.7 + node.driftPhase + 1.5) *
        node.driftAmp *
        0.6 *
        driftScale;

      // Blend between silo and network positions
      const t = easeInOut(networkBlend);
      const baseX = lerp(node.siloX, node.networkX, t);
      const baseY = lerp(node.siloY, node.networkY, t);

      node.x = baseX + driftX;
      node.y = baseY + driftY;
    }

    // ── Draw intra-cluster connections (always visible, dim in silo state) ──
    const nodesPerCluster =
      nodes.length > 0
        ? Math.round(nodes.length / new Set(nodes.map((n) => n.cluster)).size)
        : NODES_PER_CLUSTER;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const ni = nodes[i];
        const nj = nodes[j];
        const sameCluster = ni.cluster === nj.cluster;
        const d = dist(ni.x, ni.y, nj.x, nj.y);

        if (sameCluster && d < 60) {
          // Intra-cluster: always visible
          const proximityAlpha = 1 - d / 60;
          const baseAlpha = lerp(0.08, 0.2, growthPhase);
          const alpha = baseAlpha * proximityAlpha;
          ctx.beginPath();
          ctx.moveTo(ni.x, ni.y);
          ctx.lineTo(nj.x, nj.y);
          ctx.strokeStyle = `rgba(${TEAL_DIM.r}, ${TEAL_DIM.g}, ${TEAL_DIM.b}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else if (!sameCluster && buildPhase > 0 && d < lerp(0, 200, buildPhase)) {
          // Cross-cluster connections: appear during build phase
          const maxDist = lerp(80, 200, buildPhase);
          if (d < maxDist) {
            const proximityAlpha = 1 - d / maxDist;
            const alpha = buildPhase * 0.15 * proximityAlpha;
            if (alpha > 0.02) {
              ctx.beginPath();
              ctx.moveTo(ni.x, ni.y);
              ctx.lineTo(nj.x, nj.y);
              ctx.strokeStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    }

    // ── Draw hub-to-cluster connections (build phase+) ──
    if (buildPhase > 0) {
      const hubAlpha = easeInOut(buildPhase);
      const uniqueClusters = [...new Set(nodes.map((n) => n.cluster))];

      for (const c of uniqueClusters) {
        const clusterNodes = nodes.filter((n) => n.cluster === c);
        if (clusterNodes.length === 0) continue;
        const hotspot = clusterNodes.find((n) => n.isHotspot) || clusterNodes[0];

        // Line from hub to cluster hotspot
        const d = dist(hub.x, hub.y, hotspot.x, hotspot.y);
        const alpha = hubAlpha * 0.25;

        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(hotspot.x, hotspot.y);
        ctx.strokeStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${alpha})`;
        ctx.lineWidth = lerp(0.5, 1.5, growthPhase);
        ctx.stroke();
      }
    }

    // ── Draw scanning radar sweep ──
    if (scanPhase > 0 && scanPhase < 1) {
      const sweepAngle = scanAngleRef.current;
      const sweepRadius = Math.max(width, height);

      // Radar sweep line
      const sweepX = hub.x + Math.cos(sweepAngle) * sweepRadius;
      const sweepY = hub.y + Math.sin(sweepAngle) * sweepRadius;

      // Sweep arc (fading trail)
      const trailLength = 0.4; // radians
      for (let t = 0; t < 20; t++) {
        const a = sweepAngle - (t / 20) * trailLength;
        const endX = hub.x + Math.cos(a) * sweepRadius;
        const endY = hub.y + Math.sin(a) * sweepRadius;
        const alpha = (1 - t / 20) * 0.06 * (1 - Math.abs(scanPhase - 0.5) * 2);

        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // ── Draw nodes ──
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Determine if this node has been "scanned" (illuminated)
      const nodeAngle = Math.atan2(node.y - hub.y, node.x - hub.x);
      const normalizedNodeAngle = ((nodeAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const scanReached = scanPhase > node.hotspotDelay;

      let nodeOpacity = node.opacity;
      let nodeRadius = node.radius;
      let color = TEAL_DIM;

      if (node.isHotspot && scanReached && scanPhase > 0) {
        // Hotspot: bright pulse after scan reaches it
        const activationProgress = clamp((scanPhase - node.hotspotDelay) / 0.3, 0, 1);
        nodeOpacity = lerp(0.3, 1.0, activationProgress);
        nodeRadius = node.radius * lerp(1, 1.5, activationProgress);
        color = TEAL;

        // Pulsing glow in growth phase
        if (growthPhase > 0) {
          const pulse = 1 + Math.sin(time * 2 + node.driftPhase) * 0.2 * growthPhase;
          nodeRadius *= pulse;
        }
      } else if (buildPhase > 0) {
        // All nodes brighten during build phase
        nodeOpacity = lerp(node.opacity, node.opacity + 0.3, buildPhase);
        color = {
          r: lerp(TEAL_DIM.r, TEAL.r, buildPhase * 0.5),
          g: lerp(TEAL_DIM.g, TEAL.g, buildPhase * 0.5),
          b: lerp(TEAL_DIM.b, TEAL.b, buildPhase * 0.5),
        };
      }

      // Growth phase: everything gets brighter
      if (growthPhase > 0) {
        nodeOpacity = Math.min(nodeOpacity + growthPhase * 0.3, 1);
      }

      // Draw outer glow for hotspots
      if (node.isHotspot && scanReached) {
        const glowSize = nodeRadius + lerp(4, 8, growthPhase);
        const glowAlpha = lerp(0.08, 0.2, growthPhase) * nodeOpacity;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${glowAlpha})`;
        ctx.fill();
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${nodeOpacity})`;
      ctx.fill();
    }

    // ── Draw hub (central dashboard) ──
    if (buildPhase > 0) {
      const hubScale = easeInOut(buildPhase);
      const hubRadius = lerp(0, width < 768 ? 12 : 18, hubScale);
      const hubPulse = 1 + Math.sin(time * 1.5) * 0.1 * growthPhase;
      const finalHubRadius = hubRadius * hubPulse;

      // Outer ring glow
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, finalHubRadius + 12, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${0.05 * hubScale})`;
      ctx.fill();

      // Middle ring
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, finalHubRadius + 5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${0.3 * hubScale})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core hub
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, finalHubRadius, 0, Math.PI * 2);
      const hubGrad = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, finalHubRadius);
      hubGrad.addColorStop(0, `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${0.9 * hubScale})`);
      hubGrad.addColorStop(1, `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${0.3 * hubScale})`);
      ctx.fillStyle = hubGrad;
      ctx.fill();

      // Orbiting ring (dashboard activity indicator)
      if (growthPhase > 0) {
        const orbitRadius = finalHubRadius + 20;
        const orbitAngle = time * 1.2;
        for (let o = 0; o < 3; o++) {
          const a = orbitAngle + (o * Math.PI * 2) / 3;
          const ox = hub.x + Math.cos(a) * orbitRadius;
          const oy = hub.y + Math.sin(a) * orbitRadius;
          ctx.beginPath();
          ctx.arc(ox, oy, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${0.6 * growthPhase})`;
          ctx.fill();
        }
      }
    }

    // ── Draw agent dots (flowing between clusters & hub) ──
    if (buildPhase > 0.1) {
      const agents = agentsRef.current;
      const agentAlpha = clamp((buildPhase - 0.1) / 0.3, 0, 1);

      for (let a = 0; a < agents.length; a++) {
        const agent = agents[a];
        agent.progress += agent.speed * delta;

        if (agent.progress >= 1) {
          agent.progress = 0;
          // Reassign random route
          const numClusters = new Set(nodes.map((n) => n.cluster)).size;
          const nodesPerC = Math.round(nodes.length / numClusters);
          if (agent.isHubAgent) {
            // Hub to random cluster
            const targetCluster = Math.floor(Math.random() * numClusters);
            agent.fromIdx = -1; // hub
            agent.toIdx = targetCluster * nodesPerC;
          } else {
            const fromCluster = Math.floor(Math.random() * numClusters);
            const toCluster =
              (fromCluster + 1 + Math.floor(Math.random() * (numClusters - 1))) % numClusters;
            agent.fromIdx = fromCluster * nodesPerC;
            agent.toIdx = toCluster * nodesPerC;
          }
          agent.trail = [];
        }

        // Calculate position
        let fromX: number, fromY: number, toX: number, toY: number;

        if (agent.fromIdx === -1) {
          fromX = hub.x;
          fromY = hub.y;
        } else if (agent.fromIdx < nodes.length) {
          fromX = nodes[agent.fromIdx].x;
          fromY = nodes[agent.fromIdx].y;
        } else continue;

        if (agent.toIdx < nodes.length) {
          toX = nodes[agent.toIdx].x;
          toY = nodes[agent.toIdx].y;
        } else continue;

        // Curved path through hub (for non-hub agents)
        let dotX: number, dotY: number;
        if (!agent.isHubAgent && buildPhase > 0.3) {
          // Bezier curve through hub area
          const t = agent.progress;
          const midX = hub.x + (Math.random() - 0.5) * 20;
          const midY = hub.y + (Math.random() - 0.5) * 20;
          dotX = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * midX + t * t * toX;
          dotY = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * midY + t * t * toY;
        } else {
          dotX = lerp(fromX, toX, agent.progress);
          dotY = lerp(fromY, toY, agent.progress);
        }

        // Trail
        agent.trail.push({ x: dotX, y: dotY });
        if (agent.trail.length > 8) agent.trail.shift();

        // Draw trail
        for (let t = 0; t < agent.trail.length - 1; t++) {
          const trailAlpha = (t / agent.trail.length) * 0.3 * agentAlpha;
          ctx.beginPath();
          ctx.arc(agent.trail[t].x, agent.trail[t].y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${trailAlpha})`;
          ctx.fill();
        }

        // Draw agent dot
        const dotGlow = 2 + Math.sin(time * 3 + a) * 0.5;
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotGlow + 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${0.08 * agentAlpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dotX, dotY, dotGlow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${0.8 * agentAlpha})`;
        ctx.fill();
      }
    }

    // ── Draw metric counters (growth phase) ──
    if (growthPhase > 0.3) {
      const textAlpha = easeInOut(clamp((growthPhase - 0.3) / 0.4, 0, 1));
      const isMobile = width < 768;

      // Floating metrics near hotspots
      const metrics = ['1,181', '99.8%', '32x', '631+'];
      const hotspots = nodes.filter((n) => n.isHotspot).slice(0, 4);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let m = 0; m < Math.min(metrics.length, hotspots.length); m++) {
        const hs = hotspots[m];
        const yOffset = -20 - (isMobile ? 8 : 14);
        const fontSize = isMobile ? 10 : 13;

        ctx.font = `bold ${fontSize}px monospace`;
        ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${textAlpha * 0.7})`;
        ctx.fillText(metrics[m], hs.x, hs.y + yOffset);
      }
    }

    // ── Radial vignette ──
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.15,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.65,
    );
    gradient.addColorStop(0, 'rgba(6, 11, 20, 0)');
    gradient.addColorStop(1, 'rgba(6, 11, 20, 0.5)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  // ── ScrollTrigger ──
  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const container = containerRef.current;
      if (!container) return;

      gsap.to(progressRef.current, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef, dependencies: [] },
  );

  // ── Lifecycle ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    handleResize();
    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(render);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };
    window.addEventListener('resize', onResize);

    const onVisibility = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) lastTimeRef.current = performance.now();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(resizeTimer);
    };
  }, [handleResize, render]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
