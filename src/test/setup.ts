import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Clean up DOM after each test
afterEach(() => {
  cleanup();
});

// ── Next.js mocks ────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return Object.assign(document.createElement('img'), { src, alt, ...props });
  },
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    return Object.assign(document.createElement('a'), { href, ...props, children });
  },
}));

// ── Animation mocks (Framer Motion, GSAP) ────────────────────────────────────

vi.mock('framer-motion', () => {
  const React = require('react');
  // Create a passthrough component for any motion.* element
  const createMotionComponent = (tag: string) =>
    React.forwardRef(({ children, ...rest }: Record<string, unknown>, ref: unknown) =>
      React.createElement(tag, { ...rest, ref }, children),
    );

  const motion = new Proxy({}, { get: (_t, prop) => createMotionComponent(String(prop)) });

  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn(), set: vi.fn() }),
    useInView: () => true,
    useScroll: () => ({ scrollY: { get: () => 0 }, scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
    useSpring: () => 0,
    useMotionValue: () => ({ get: () => 0, set: vi.fn() }),
    useReducedMotion: () => false,
    m: new Proxy({}, { get: (_t, prop) => createMotionComponent(String(prop)) }),
  };
});

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((fn: () => void) => fn()),
}));

vi.mock('gsap', () => ({
  default: {
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
    })),
    registerPlugin: vi.fn(),
    context: vi.fn((fn: () => void) => ({ revert: vi.fn(), kill: vi.fn() })),
  },
  ScrollTrigger: { refresh: vi.fn(), update: vi.fn() },
}));

vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    raf: vi.fn(),
    destroy: vi.fn(),
  })),
}));
