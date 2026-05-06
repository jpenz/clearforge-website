import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge Diagnostic | AI Build-Readiness Readout',
  description:
    'Take the free ClearForge Diagnostic. Ten workflow-specific questions show whether your first AI build is ready to ship.',
  path: '/scorecard',
});

export default function ScorecardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
