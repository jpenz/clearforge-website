import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/service-detail';
import { getServiceBySlug } from '@/data/services';
import { serviceJsonLd } from '@/lib/metadata';

const service = getServiceBySlug('pe-value-creation')!;

export const metadata: Metadata = {
  title: 'PE Value Creation',
  description:
    'AI-driven value creation for PE firms and portfolio companies. 90-day sprints to EBITDA improvement.',
  openGraph: {
    title: 'PE Value Creation — ClearForge.ai',
    description:
      'AI-driven value creation for PE firms and portfolio companies. 90-day sprints to EBITDA improvement.',
  },
};

export default function PEValueCreationPage() {
  if (!service) return notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)),
        }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
