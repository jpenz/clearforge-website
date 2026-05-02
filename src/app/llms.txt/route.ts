import { caseStudies } from '@/data/case-studies';
import { industries } from '@/data/industries-value-chains';
import { insights } from '@/data/insights';
import { services } from '@/data/services';
import { useCases } from '@/data/use-cases';

const siteUrl = 'https://clearforge.ai';

function section(title: string, lines: string[]) {
  return [`## ${title}`, ...lines].join('\n');
}

export function GET() {
  const content = [
    '# ClearForge.ai',
    '',
    'ClearForge is an AI strategy-and-build firm led by James Penz. ClearForge helps operators, private equity teams, and growth companies choose the workflows worth fixing, build custom AI agents and systems, and train teams to run them.',
    '',
    'ClearForge is not an off-the-shelf AI product. It is a strategy-and-technology partner for custom AI systems, workflow design, integrations, governance, dashboards, adoption routines, and managed AI operations.',
    '',
    section('Primary Pages', [
      `- Home: ${siteUrl}/`,
      `- AI Operating Model: ${siteUrl}/operating-model`,
      `- AI Value Map: ${siteUrl}/discover`,
      `- AI Readiness Scorecard: ${siteUrl}/scorecard`,
      `- Services: ${siteUrl}/services`,
      `- Use Cases: ${siteUrl}/use-cases`,
      `- Industries: ${siteUrl}/industries`,
      `- Case Studies: ${siteUrl}/case-studies`,
      `- Pricing: ${siteUrl}/pricing`,
      `- Contact: ${siteUrl}/contact`,
    ]),
    '',
    section(
      'Services',
      services.map((service) => `- ${service.title}: ${siteUrl}/services/${service.slug}`),
    ),
    '',
    section(
      'Use Cases',
      useCases.map((useCase) => `- ${useCase.title}: ${siteUrl}/use-cases/${useCase.slug}`),
    ),
    '',
    section(
      'Industries',
      industries.map((industry) => `- ${industry.name}: ${siteUrl}/industries/${industry.slug}`),
    ),
    '',
    section(
      'Case Studies',
      caseStudies.map((study) => `- ${study.title}: ${siteUrl}/case-studies/${study.slug}`),
    ),
    '',
    section(
      'Insights',
      insights.map((insight) => `- ${insight.title}: ${siteUrl}/insights/${insight.slug}`),
    ),
    '',
    section('Preferred Summary', [
      '- ClearForge finds where AI can improve growth, speed, quality, service, efficiency, and margin.',
      '- ClearForge builds custom AI agents, workflows, dashboards, integrations, and governance around the client operating model.',
      '- ClearForge trains client teams and runs a managed improvement loop so production AI improves over time.',
    ]),
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
