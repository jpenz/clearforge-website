'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollVideo — video whose playhead is bound to scroll position.
 *
 * On desktop: the section is pinned for `pinLength` (default 200% of viewport).
 * As the user scrolls, video.currentTime advances linearly through the video.
 * This is the Herk Advisory / Nate Herk scroll-driven-hero effect.
 *
 * On mobile and with prefers-reduced-motion: falls back to a silent autoplay
 * loop (no pin, no scrub). Mobile scroll-scrub is unreliable across Safari /
 * Chrome / in-app browsers, so we don't attempt it.
 *
 * Usage:
 *   <ScrollVideo src="/videos/hero.mp4" poster="/images/hero-poster.webp">
 *     <div className="overlay">{children}</div>
 *   </ScrollVideo>
 */
interface ScrollVideoProps {
  src: string;
  /** Optional first-frame poster image shown while video loads. Must be served as a static asset. */
  poster?: string;
  /** Extra classes on the outer <section>. */
  className?: string;
  /** Extra classes on the <video> element (e.g. for opacity / object-fit tweaks). */
  videoClassName?: string;
  /** Scroll distance the section pins for (as a percentage of viewport height). Default 200. */
  pinLength?: number;
  /** Overlay content (text, buttons, etc.) — rendered on top of the video. */
  children?: ReactNode;
}

export function ScrollVideo({
  src,
  poster,
  className = '',
  videoClassName = '',
  pinLength = 200,
  children,
}: ScrollVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 1024;
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      // Mobile / reduced motion: autoplay loop, no scrub, no pin
      if (reduced || isMobile) {
        video.loop = true;
        video.muted = true;
        video.play().catch(() => {
          /* autoplay blocked — user will see poster, still graceful */
        });
        return;
      }

      // Desktop scroll-scrub path — wait for metadata so we know duration
      const armScrub = () => {
        if (!video.duration || !Number.isFinite(video.duration)) return;

        // Prevent native looping during scrub; scroll drives currentTime
        video.loop = false;
        video.pause();

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${pinLength}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const t = video.duration * self.progress;
            // Only seek if we moved meaningfully — reduces decoder churn
            if (Math.abs(video.currentTime - t) > 0.04) {
              try {
                video.currentTime = t;
              } catch {
                /* some browsers throw if seek isn't ready yet */
              }
            }
          },
        });

        return () => trigger.kill();
      };

      if (video.readyState >= 1) {
        armScrub();
      } else {
        video.addEventListener('loadedmetadata', armScrub, { once: true });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        // autoplay is needed for mobile fallback loop — harmless on desktop
        // since the GSAP path calls .pause() as soon as metadata loads
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover ${videoClassName}`}
      />
      {children}
    </section>
  );
}
