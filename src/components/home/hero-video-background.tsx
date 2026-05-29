import { MotionBackground } from '@/components/ui/motion-background';

export function HeroVideoBackground() {
  return (
    <MotionBackground
      poster="/images/hero-bg.webp"
      mp4="/videos/hero.mp4"
      webm="/videos/hero.webm"
      priority
      storageKey="clearforge:hero-motion-paused"
      imageClassName="opacity-[0.64]"
      videoClassName="opacity-[0.7]"
      controlClassName="top-24 right-4 lg:top-auto lg:right-8 lg:bottom-28"
    />
  );
}
