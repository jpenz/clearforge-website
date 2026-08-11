import { RevenueCommandCenter } from '@/components/revenue-ops/revenue-command-center';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Samuel Revenue OS Demo — Evidence-First Commercial Opportunities | ClearForge',
  description:
    'A safe, synthetic demonstration of ClearForge’s evidence-first, human-governed market-to-opportunity operating system.',
  path: '/revenue-ops',
  noIndex: true,
});

export default function RevenueOpsPage() {
  return <RevenueCommandCenter />;
}
