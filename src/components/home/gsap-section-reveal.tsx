'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationType =
  | 'fade-up'
  | 'slide-left'
  | 'slide-right'
  | 'scale-up'
  | 'clip-reveal'
  | 'parallax'
  | 'pin';

interface GSAPSectionRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

const animationConfigs: Record<
  Exclude<AnimationType, 'parallax' | 'pin'>,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  'fade-up': {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
  },
  'slide-left': {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  'slide-right': {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },
  'scale-up': {
    from: { opacity: 0, scale: 0.92 },
    to: { opacity: 1, scale: 1 },
  },
  'clip-reveal': {
    from: { opacity: 0, y: 24, clipPath: 'inset(100% 0% 0% 0%)' },
    to: { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' },
  },
};

export function GSAPSectionReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  className,
}: GSAPSectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = containerRef.current;
      if (!el) return;

      if (animation === 'parallax') {
        gsap.to(el, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
        return;
      }

      if (animation === 'pin') {
        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
        });
        return;
      }

      const config = animationConfigs[animation];

      gsap.fromTo(el, config.from, {
        ...config.to,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef, dependencies: [animation, delay] },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/* ── Stagger variant ── */

interface StaggerRevealGSAPProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  childSelector?: string;
}

export function StaggerRevealGSAP({
  children,
  className,
  stagger = 0.15,
  childSelector = ':scope > *',
}: StaggerRevealGSAPProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = containerRef.current;
      if (!el) return;

      const targets = el.querySelectorAll(childSelector);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: containerRef, dependencies: [stagger, childSelector] },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
