import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Forge Intelligence\u2122 \u2014 AI Value Map | ClearForge',
  description:
    'Enter your company website and Forge Intelligence maps the highest-value AI opportunities across your operating model.',
  path: '/discover',
});

export default function DiscoverLayout({ children }: { children: React.ReactNode }) {
  return children;
}
