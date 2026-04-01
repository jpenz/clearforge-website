import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Forge Intelligence\u2122 \u2014 AI-Powered Discovery | ClearForge',
  description:
    'Tell us about your business and challenges. Our AI-powered discovery process identifies the highest-value opportunities for AI transformation.',
  path: '/discover',
});

export default function DiscoverLayout({ children }: { children: React.ReactNode }) {
  return children;
}
