'use client';

import { useEffect, useRef } from 'react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<InstanceType<typeof import('lenis').default> | null>(null);
  const rafCallbackRef = useRef<((time: number) => void) | null>(null);

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
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        autoRaf: false,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
      });
      lenisRef.current = lenis;

      // Connect Lenis scroll events to ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Connect GSAP ticker to Lenis raf — store the callback ref for cleanup
      const rafCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      rafCallbackRef.current = rafCallback;
      gsap.ticker.add(rafCallback);

      // Disable GSAP's built-in lag smoothing so Lenis controls timing
      gsap.ticker.lagSmoothing(0);
    }

    init();

    return () => {
      // Destroy Lenis instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // Remove the GSAP ticker callback
      if (rafCallbackRef.current) {
        import('gsap').then((gsapModule) => {
          const gsap = gsapModule.default;
          if (rafCallbackRef.current) {
            gsap.ticker.remove(rafCallbackRef.current);
            rafCallbackRef.current = null;
          }
        });
      }
    };
  }, []);

  return <>{children}</>;
}
