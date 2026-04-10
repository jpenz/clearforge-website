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
 * V8.1 Hero — Content-first with scroll-driven enhancement.
 *
 * PRINCIPLE: Content is ALWAYS visible. GSAP enhances on scroll as a bonus.
 * No hiding content behind scroll interactions. No blank screens.
 *
 * On load: Everything visible with CSS fade-in animations.
 * On scroll (desktop only): Background parallax, trust metrics counter pop,
 * subtle scale/opacity enhancements as sections come into focus.
 */
export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || window.innerWidth < 768) return;
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;

      // Subtle background parallax on scroll — content stays visible
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
      className="dark-section relative min-h-[100svh] overflow-hidden"
    >
      {/* Background with parallax */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-transparent to-forge-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        {/* Asymmetric grid */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">

          {/* LEFT: Headline + CTA — always visible */}
          <div className="lg:col-span-7 lg:pt-8">
            <p className="overline text-xs animate-fade-in">
              Production AI for Mid-Market &amp; Growth-Stage Companies
            </p>

            <h1
              className="mt-6 text-bone animate-fade-in-up delay-1"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                fontWeight: 400,
              }}
            >
              Stuck in AI pilot purgatory?{' '}
              <em className="italic text-brass-light">
                We build production systems in 10 weeks.
              </em>
            </h1>

            <p className="mt-6 text-body-lg text-stone max-w-lg animate-fade-in-up delay-2">
              No enterprise budgets. No strategy decks collecting dust.
              Your AI system, live in your business, in 10 weeks flat.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up delay-3">
              <Button size="lg" className="shadow-sm hover:shadow-md" asChild>
                <Link href="/discover">Get My Free AI Readiness Score</Link>
              </Button>
              <Link
                href="#results"
                className="inline-flex items-center gap-2 text-sm font-medium text-bone/60 hover:text-bone transition-colors h-12 px-4"
              >
                See our work <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-stone/60 animate-fade-in delay-4">
              Free · 5 minutes · No sales call required
            </p>

            {/* Trust metrics — visible immediately */}
            <div className="mt-8 flex flex-wrap gap-6 animate-fade-in-up delay-4">
              {[
                { value: '89%', label: 'Production rate' },
                { value: '3.2x', label: 'Avg ROI' },
                { value: '<90 days', label: 'To first ROI' },
              ].map((m) => (
                <div key={m.label}>
                  <span className="metric text-lg text-brass-light">{m.value}</span>
                  <p className="text-xs text-stone/70">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Featured case study card — always visible */}
          <div className="lg:col-span-5 mt-12 lg:mt-0 animate-fade-in-up delay-3">
            <Link href="/case-studies/industrial-manufacturer" className="group block">
              <div className="relative overflow-hidden bg-gradient-to-b from-brass/10 to-forge-black border border-divider-dark card-hover">
                <div className="relative h-48 lg:h-56 img-zoom">
                  <Image
                    src="/images/featured-case-study.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forge-black to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light bg-forge-black/60 px-2 py-1">
                    Case Study
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  <h3
                    className="text-lg sm:text-xl text-bone font-medium leading-snug group-hover:text-brass-light transition-colors"
                    style={{ fontFamily: 'var(--font-instrument-serif)' }}
                  >
                    How a $4B industrial conglomerate identified 1,181 qualified opportunities in 6 months
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm text-stone">
                    Read the case study <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom row: 3 content cards — always visible */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up delay-5">
          <Link href="/insights" className="group relative overflow-hidden h-52 md:h-48 card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/80" />
            <div className="img-zoom absolute inset-0">
              <Image src="/images/card-finance.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-30" />
            </div>
            <div className="relative h-full p-5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light">Research</span>
              <h4 className="mt-2 text-bone text-sm font-medium leading-snug group-hover:text-brass-light transition-colors">
                The AI value gap: why 87% of pilots never reach production
              </h4>
              <span className="mt-2 inline-flex items-center text-xs text-stone group-hover:text-bone transition-colors">
                Read more <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          </Link>

          <Link href="/discover" className="group relative overflow-hidden h-52 md:h-48 card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 to-teal-900/60" />
            <div className="img-zoom absolute inset-0">
              <Image src="/images/card-healthcare.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-20" />
            </div>
            <div className="relative h-full p-5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light">Interactive Tool</span>
              <h4 className="mt-2 text-bone text-sm font-medium leading-snug group-hover:text-brass-light transition-colors">
                AI Readiness Assessment — get your personalized report in 5 minutes
              </h4>
              <span className="mt-2 inline-flex items-center text-xs text-stone group-hover:text-bone transition-colors">
                Start now <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          </Link>

          <Link href="/services" className="group relative overflow-hidden h-52 md:h-48 card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-gray-900/80" />
            <div className="img-zoom absolute inset-0">
              <Image src="/images/card-manufacturing.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-20" />
            </div>
            <div className="relative h-full p-5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light">The Forge Method</span>
              <h4 className="mt-2 text-bone text-sm font-medium leading-snug group-hover:text-brass-light transition-colors">
                From diagnosis to production in 90 days — transparent timelines, transparent investment
              </h4>
              <span className="mt-2 inline-flex items-center text-xs text-stone group-hover:text-bone transition-colors">
                How it works <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
