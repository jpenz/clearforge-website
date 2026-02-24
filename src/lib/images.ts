// Generated visual assets via SkillBoss Flux Schnell
// Proxied through /api/img to avoid external domain dependency

const cdn = (filename: string) =>
  `/api/img?src=${encodeURIComponent(`https://heyboss.heeyo.ai/${filename}`)}`;

export const images = {
  heroBg: cdn("replicate-flux-schnell-1771907800-dccc0d96.webp"),
  serviceStrategy: cdn("replicate-flux-schnell-1771907816-13627b33.webp"),
  serviceBuild: cdn("replicate-flux-schnell-1771907819-f12bac1f.webp"),
  aiMarketingAgent: cdn("replicate-flux-schnell-1771907822-ccfc7cd4.webp"),
  caseStudy: cdn("replicate-flux-schnell-1771907825-08d7fe08.webp"),
  serviceManaged: cdn("replicate-flux-schnell-1771907829-00e2aaa1.webp"),
  serviceRetainer: cdn("replicate-flux-schnell-1771907832-83523ebf.webp"),
} as const;
