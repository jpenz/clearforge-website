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
        // Shorter duration = snappier catch-up (was 1.2 — felt floaty)
        duration: 1.0,
        // Expo-out easing — natural deceleration
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        // Manually ticked by gsap.ticker to stay in sync with ScrollTrigger
        autoRaf: false,
        smoothWheel: true,
        // 1.0 = 1:1 wheel-to-scroll (was 0.8 — felt heavy/laggy)
        wheelMultiplier: 1.0,
        // Touch stays responsive on iPad
        touchMultiplier: 1.8,
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
