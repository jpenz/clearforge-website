'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);

  useGSAP(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      );
    }
  }, [pathname]);

  return <div ref={containerRef}>{children}</div>;
}
