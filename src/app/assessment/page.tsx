import { AssessmentPage } from '@/components/pages/assessment-page';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'AI Readiness Assessment — ClearForge',
  description:
    '20 questions. Real-time company research. Get a customized AI strategy report with a prioritized action plan.',
  path: '/assessment',
});

export default function Page() {
  return <AssessmentPage />;
}
