'use client';

import { CirclePause, CirclePlay } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const BASE_STORAGE_KEY = 'clearforge:motion-paused';

function readStoredMotionPreference(storageKey: string) {
  try {
    return window.localStorage.getItem(storageKey) === 'true';
  } catch {
    return false;
  }
}

function storeMotionPreference(storageKey: string, paused: boolean) {
  try {
    window.localStorage.setItem(storageKey, String(paused));
  } catch {
    // Non-critical: storage restrictions should not break playback.
  }
}

export function MotionBackground({
  poster,
  mp4,
  webm,
  imageAlt = '',
  priority = false,
  imageClassName,
  videoClassName,
  controlClassName,
  storageKey = BASE_STORAGE_KEY,
}: {
  poster: string;
  mp4: string;
  webm?: string;
  imageAlt?: string;
  priority?: boolean;
  imageClassName?: string;
  videoClassName?: string;
  controlClassName?: string;
  storageKey?: string;
}) {
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
    setPaused(readStoredMotionPreference(storageKey));
    setPreferenceReady(true);
  }, [storageKey]);

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
      storeMotionPreference(storageKey, true);
    });
  }, [motionAllowed, paused, preferenceReady, storageKey]);

  const toggleMotion = () => {
    setPaused((current) => {
      const next = !current;
      storeMotionPreference(storageKey, next);
      return next;
    });
  };

  const showVideo = motionAllowed && preferenceReady;
  const label = paused ? 'Play background motion' : 'Pause background motion';

  return (
    <>
      <Image
        src={poster}
        alt={imageAlt}
        fill
        sizes="100vw"
        priority={priority}
        fetchPriority={priority ? 'high' : undefined}
        className={cn('pointer-events-none object-cover opacity-50', imageClassName)}
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
            poster={poster}
            className={cn(
              'absolute inset-0 h-full w-full object-cover opacity-[0.52]',
              videoClassName,
            )}
          >
            {webm ? <source src={webm} type="video/webm" /> : null}
            <source src={mp4} type="video/mp4" />
          </video>

          <button
            type="button"
            aria-label={label}
            title={label}
            onClick={toggleMotion}
            className={cn(
              'absolute z-20 inline-flex h-10 w-10 items-center justify-center border border-bone/20 bg-forge-black/55 text-bone shadow-sm backdrop-blur transition-colors hover:border-bone/40 hover:bg-forge-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black',
              controlClassName,
            )}
          >
            {paused ? <CirclePlay className="h-5 w-5" /> : <CirclePause className="h-5 w-5" />}
          </button>
        </>
      ) : null}
    </>
  );
}
