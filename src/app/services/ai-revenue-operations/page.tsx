import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/service-detail';
import { getServiceBySlug } from '@/data/services';
import { serviceJsonLd } from '@/lib/metadata';

const service = getServiceBySlug('ai-revenue-operations')!;

export const metadata: Metadata = {
  title: 'AI Revenue Operations',
  description:
    'AI-powered sales automation, intent signals, and pipeline analytics that turn data into deals.',
  openGraph: {
    title: 'AI Revenue Operations — ClearForge.ai',
    description:
      'AI-powered sales automation, intent signals, and pipeline analytics that turn data into deals.',
  },
};

export default function AIRevenueOperationsPage() {
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
