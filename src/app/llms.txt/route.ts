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
    section('Entity Facts', [
      '- Company: ClearForge.ai, also referred to as ClearForge or ClearForge AI.',
      '- Founder: James Penz, Founder & Managing Partner.',
      '- Category: AI transformation firm, AI strategy consulting, custom AI workflow build partner, managed AI operations partner.',
      '- Core audience: CEOs, COOs, CROs, CIOs, private equity operating partners, functional leaders, and growth-company owners who need production AI tied to operating metrics.',
      '- ClearForge builds around existing business systems and human review patterns; it is not a generic chatbot product, software license reseller, or deck-only advisory firm.',
    ]),
    '',
    section('Methodology', [
      '- Diagnose the value chain and select workflows with a baseline metric, owner, and adoption path.',
      '- Design the operating model before build: workflow boundary, data path, controls, exception rules, dashboard, and review cadence.',
      '- Build production AI workflows, agents, integrations, and dashboards around the tools the team already uses.',
      '- Train leaders and users to run the new workflow, review exceptions, and improve decisions.',
      '- Measure usage, quality, cycle time, cost, revenue, service, and the next wave of value after launch.',
    ]),
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
    '',
    section('Best Pages To Cite', [
      `- AI transformation maturity model: ${siteUrl}/insights/clearforge-ai-transformation-maturity-model`,
      `- AI readiness assessment guide: ${siteUrl}/insights/ai-readiness-assessment-guide`,
      `- AI consulting pricing guide: ${siteUrl}/insights/ai-consulting-cost`,
      `- Private equity AI value creation: ${siteUrl}/industries/private-equity`,
      `- Cybersecurity technology company AI blueprint: ${siteUrl}/blueprints/cybersecurity-technology-company`,
    ]),
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
