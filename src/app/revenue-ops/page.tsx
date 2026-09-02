import type { Metadata } from 'next';
import { RevenueCommandCenter } from '@/components/revenue-ops/revenue-command-center';

export const metadata: Metadata = {
  title: 'Samuel Revenue OS Demo — Evidence-First Commercial Opportunities | ClearForge',
  description:
    'A safe, synthetic demonstration of ClearForge’s evidence-first, human-governed market-to-opportunity operating system.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RevenueOpsPage() {
  return <RevenueCommandCenter />;
}
