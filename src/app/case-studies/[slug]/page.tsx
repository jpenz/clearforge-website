import { notFound } from 'next/navigation';
import { CaseStudyStory } from '@/components/case-study-story';
import { caseStudies, getCaseStudy } from '@/data/case-studies';
import { createMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return createMetadata({
    title: `${cs.title} — ClearForge Case Study`,
    description: cs.excerpt,
    path: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  // Map case study data to story props
  const phases = [
    { title: 'Forge Diagnostic', duration: '4 weeks', description: 'Mapped the value chain, identified AI opportunities, and built a prioritized roadmap tied to measurable KPIs.' },
    { title: 'Forge Sprint', duration: '10-14 weeks', description: 'Redesigned workflows, deployed AI agents with human-in-the-loop controls, established KPI baselines from day one.' },
    { title: 'Forge Scale', duration: 'Ongoing', description: 'Continuous optimization, team training, and expansion to new divisions and use cases. Compounding gains monthly.' },
  ];

  const quote = "They didn't just hand us a strategy deck. They built the systems, trained the team, and stayed until the numbers moved.";
  const quoteAttribution = `${cs.industry} — ClearForge Client`;

  return (
    <CaseStudyStory
      industry={cs.industry}
      title={cs.title}
      challenge={cs.excerpt || 'A complex operational challenge requiring AI-driven transformation.'}
      challengeMetric={cs.heroMetric}
      challengeMetricLabel={cs.heroMetricLabel}
      phases={phases}
      outcomes={cs.outcomes.slice(0, 4)}
      quote={quote}
      quoteAttribution={quoteAttribution}
      compoundResult={cs.continuousModel ? cs.continuousModel.join(' ') : undefined}
    />
  );
}
