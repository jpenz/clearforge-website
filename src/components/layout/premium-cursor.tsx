'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, summary, [role="button"], input[type="button"], input[type="submit"], [data-cursor="interactive"]';
const TEXT_INPUT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]), textarea, select, [contenteditable="true"], [role="textbox"]';

export function PremiumCursor() {
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncCapability = () => {
      const shouldEnable = finePointer.matches && !reducedMotion.matches;
      setEnabled(shouldEnable);
      document.documentElement.classList.toggle('premium-cursor-enabled', shouldEnable);
    };

    syncCapability();
    finePointer.addEventListener('change', syncCapability);
    reducedMotion.addEventListener('change', syncCapability);

    return () => {
      finePointer.removeEventListener('change', syncCapability);
      reducedMotion.removeEventListener('change', syncCapability);
      document.documentElement.classList.remove('premium-cursor-enabled');
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const moveCursor = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;

      targetX = event.clientX;
      targetY = event.clientY;
      dotRef.current?.style.setProperty(
        'transform',
        `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`,
      );
      setHidden(false);
    };

    const animateCursor = () => {
      ringX += (targetX - ringX) * 0.24;
      ringY += (targetY - ringY) * 0.24;
      ringRef.current?.style.setProperty(
        'transform',
        `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`,
      );
      frame = window.requestAnimationFrame(animateCursor);
    };

    const inspectTarget = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const overTextInput = Boolean(target?.closest(TEXT_INPUT_SELECTOR));

      setHidden(overTextInput);
      setInteractive(!overTextInput && Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const pressCursor = () => setPressed(true);
    const releaseCursor = () => setPressed(false);
    const leaveViewport = () => {
      setHidden(true);
      setPressed(false);
      setInteractive(false);
    };

    window.addEventListener('pointermove', moveCursor, { passive: true });
    window.addEventListener('pointerover', inspectTarget, { passive: true });
    window.addEventListener('pointerdown', pressCursor, { passive: true });
    window.addEventListener('pointerup', releaseCursor, { passive: true });
    document.addEventListener('mouseleave', leaveViewport);
    frame = window.requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerover', inspectTarget);
      window.removeEventListener('pointerdown', pressCursor);
      window.removeEventListener('pointerup', releaseCursor);
      document.removeEventListener('mouseleave', leaveViewport);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={[
        'premium-cursor',
        interactive ? 'is-interactive' : '',
        pressed ? 'is-pressed' : '',
        hidden ? 'is-hidden' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span ref={ringRef} className="premium-cursor__ring" />
      <span ref={dotRef} className="premium-cursor__dot" />
    </div>
  );
}
