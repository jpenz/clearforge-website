'use client';

import { CirclePause, CirclePlay } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const MOTION_STORAGE_KEY = 'clearforge:hero-motion-paused';

function readStoredMotionPreference() {
  try {
    return window.localStorage.getItem(MOTION_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function storeMotionPreference(paused: boolean) {
  try {
    window.localStorage.setItem(MOTION_STORAGE_KEY, String(paused));
  } catch {
    // Non-critical: private browsing or locked-down storage should not break playback.
  }
}

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [preferenceReady, setPreferenceReady] = useState(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setMotionAllowed(!mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);

    return () => mediaQuery.removeEventListener('change', syncMotionPreference);
  }, []);

  useEffect(() => {
    setPaused(readStoredMotionPreference());
    setPreferenceReady(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!(video && motionAllowed && preferenceReady)) {
      return;
    }

    if (paused) {
      video.pause();
      return;
    }

    video.play().catch(() => {
      setPaused(true);
      storeMotionPreference(true);
    });
  }, [motionAllowed, paused, preferenceReady]);

  const toggleMotion = () => {
    setPaused((current) => {
      const next = !current;
      storeMotionPreference(next);
      return next;
    });
  };

  const showVideo = motionAllowed && preferenceReady;
  const label = paused ? 'Play background motion' : 'Pause background motion';

  return (
    <>
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="pointer-events-none object-cover opacity-50"
      />

      {showVideo ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-bg.webp"
            className="absolute inset-0 h-full w-full object-cover opacity-52"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          <button
            type="button"
            aria-label={label}
            title={label}
            onClick={toggleMotion}
            className="absolute top-24 right-4 z-20 inline-flex h-10 w-10 items-center justify-center border border-bone/20 bg-forge-black/55 text-bone shadow-sm backdrop-blur transition-colors hover:border-bone/40 hover:bg-forge-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black lg:top-auto lg:right-8 lg:bottom-28"
          >
            {paused ? <CirclePlay className="h-5 w-5" /> : <CirclePause className="h-5 w-5" />}
          </button>
        </>
      ) : null}
    </>
  );
}
