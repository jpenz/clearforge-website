import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge Diagnostic | AI Build-Readiness Readout',
  description:
    'Take the free ClearForge Diagnostic. Ten workflow-specific questions reveal whether your first AI build has the value case, data path, controls, and adoption cadence to ship.',
  path: '/scorecard',
});

export default function ScorecardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
