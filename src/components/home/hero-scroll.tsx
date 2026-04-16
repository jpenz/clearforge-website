'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * V8 Editorial Hero — No cards. Typography IS the design.
 *
 * Large serif headline, asymmetric layout, ruled lines.
 * Content visible immediately. GSAP adds parallax only.
 */
export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || window.innerWidth < 768) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const bg = bgRef.current;
      const section = sectionRef.current;
      if (!bg || !section) return;

      gsap.to(bg, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="dark-section relative min-h-[100svh] flex items-end overflow-hidden"
    >
      {/* Background — Veo 3 ambient loop on desktop, static fallback on mobile */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-bg.webp"
          className="absolute inset-0 w-full h-full object-cover opacity-55 hidden md:block"
        >
          <source src="/videos/hero-ambient.mp4" type="video/mp4" />
        </video>
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40 animate-ken-burns md:hidden"
          priority
          fetchPriority="high"
        />
        {/* Reduced gradient — keeps text legible without burying the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/35 to-forge-black/45" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-28 pt-32 sm:pt-40">
        {/* Overline */}
        <p className="overline text-xs animate-fade-in">
          Production AI for Mid-Market &amp; Growth-Stage Companies
        </p>

        {/* Hero headline — LARGE, the typography is the design */}
        <h1
          className="mt-8 max-w-[900px] text-bone animate-fade-in-up delay-1"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            fontWeight: 400,
          }}
        >
          Stuck in AI pilot purgatory?
        </h1>
        <p
          className="mt-2 max-w-[900px] text-brass-light animate-fade-in-up delay-2"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            fontWeight: 400,
            fontStyle: 'italic',
          }}
        >
          We build production systems in 10 weeks.
        </p>

        {/* Subline */}
        <p className="mt-8 text-body-lg text-stone max-w-lg animate-fade-in-up delay-3">
          No enterprise budgets. No strategy decks collecting dust.
          Your AI system, live in your business, in 10 weeks flat.
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-wrap items-center gap-6 animate-fade-in-up delay-4">
          <Button size="lg" asChild>
            <Link href="/discover">Get My Free AI Readiness Score</Link>
          </Button>
          <Link
            href="#results"
            className="inline-flex items-center gap-2 text-sm text-stone hover:text-bone transition-colors link-underline"
          >
            See our work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-3 text-xs text-stone/50 animate-fade-in delay-5">
          Free · 5 minutes · No sales call required
        </p>

        {/* Ruled line + metrics at bottom */}
        <div className="mt-14 pt-8 border-t border-bone/10 flex flex-wrap gap-10 animate-fade-in-up delay-5">
          {[
            { value: '89%', label: 'Production rate' },
            { value: '3.2x', label: 'Avg ROI' },
            { value: '<90d', label: 'To first ROI' },
            { value: '47', label: 'Engagements' },
          ].map((m) => (
            <div key={m.label}>
              <span className="metric text-xl text-brass-light">{m.value}</span>
              <p className="text-[11px] text-stone/60 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
