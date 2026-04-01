'use client';

import { useEffect, useRef } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<InstanceType<typeof import('lenis').default> | null>(null);
  const rafRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    async function init() {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const LenisModule = await import('lenis');

      const gsap = gsapModule.default;
      const Lenis = LenisModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        autoRaf: false,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.6,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      rafRef.current = raf;
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    init();

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      if (rafRef.current) {
        import('gsap').then((m) => {
          if (rafRef.current) m.default.ticker.remove(rafRef.current);
          rafRef.current = null;
        });
      }
    };
  }, []);

  return <>{children}</>;
}
