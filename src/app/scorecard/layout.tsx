import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'AI Readiness Scorecard | ClearForge',
  description:
    "Take the free AI Readiness Scorecard. 20 questions across 5 pillars to assess your organization's AI maturity and get a personalized roadmap.",
  path: '/scorecard',
});

export default function ScorecardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
