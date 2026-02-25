import { useId } from "react";

interface LinePatternProps {
  className?: string;
}

export function LinePattern({ className }: LinePatternProps) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <svg className={className} viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0 100 Q200 30 400 100 Q600 170 800 100" stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M0 120 Q200 50 400 120 Q600 190 800 120" stroke={`url(#${gradientId})`} strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M0 80 Q200 10 400 80 Q600 150 800 80" stroke={`url(#${gradientId})`} strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="800" y2="0">
          <stop offset="0%" stopColor="#0D9488" stopOpacity="0" />
          <stop offset="30%" stopColor="#0D9488" stopOpacity="1" />
          <stop offset="70%" stopColor="#06B6D4" stopOpacity="1" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
