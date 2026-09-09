'use client';

import { useEffect, useRef, useState } from 'react';
import { NavLinks } from '@/components/layout/NavLinks';

/** Scroll depth past which the second tier may collapse. */
const COLLAPSE_AFTER = 64;
/** Movement below this is treated as noise, so the tier does not flutter. */
const HYSTERESIS = 6;
/** How long to ignore scroll after a change, while the layout settles. */
const SETTLE_MS = 320;

/**
 * The header's second tier below md: the six links, which collapse out of
 * the way once the reader is past the first screen and come back the
 * moment they scroll up. The bar is sticky at every width, so on a 844px
 * phone the two tiers were holding about 15 percent of the viewport at all
 * times; this gives that back without hiding a destination behind a menu.
 *
 * Height only, driven by one rAF-throttled scroll listener. While collapsed
 * the tier is inert, so a keyboard reader can never tab into a row clipped
 * to zero height; scrolling up in any way, including with the keyboard,
 * brings it and its links straight back, and the footer carries every
 * destination regardless. Under reduced motion the collapse still happens,
 * without the transition.
 */
export function MobileNavTier() {
  const [collapsed, setCollapsed] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const settleUntil = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const read = () => {
      ticking.current = false;
      const y = window.scrollY;
      // Near the top the tier is always open, whatever the direction of
      // travel. Without this the state could stick: a flick to the top ends
      // the scroll stream, and if the last event landed inside the settle
      // window below there would be no further event to correct it.
      if (y <= COLLAPSE_AFTER) {
        lastY.current = y;
        setCollapsed(false);
        return;
      }
      // The bar is in flow, so changing its height moves everything below it
      // and the browser corrects the scroll position. That correction looks
      // exactly like a deliberate scroll, which flipped the tier straight
      // back and left it flapping. Ignore movement until the change settles.
      if (performance.now() < settleUntil.current) {
        lastY.current = y;
        return;
      }
      const delta = y - lastY.current;
      if (Math.abs(delta) < HYSTERESIS) return;
      lastY.current = y;
      setCollapsed((prev) => {
        const next = y > COLLAPSE_AFTER && delta > 0;
        if (next !== prev) settleUntil.current = performance.now() + SETTLE_MS;
        return next;
      });
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(read);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      data-collapsed={collapsed || undefined}
      inert={collapsed || undefined}
      className={`overflow-hidden transition-[max-height] duration-300 ease-out motion-reduce:transition-none md:hidden ${
        collapsed ? 'max-h-0' : 'max-h-24'
      }`}
    >
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-center gap-x-6 gap-y-0 pb-2 text-[14px] font-medium"
      >
        <NavLinks />
      </nav>
    </div>
  );
}
