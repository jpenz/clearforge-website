/**
 * First-published date per article, taken from the git history of
 * src/data/insights.ts (the commit where each slug first appears). Used
 * only in structured data. Add a row when an article is added; set
 * INSIGHT_UPDATED when an article is substantially rewritten.
 */
export const INSIGHT_PUBLISHED: Record<string, string> = {
  'what-ai-consulting-costs': '2026-08-25',
  'the-70-percent-adoption-bar': '2026-08-25',
  'every-sprint-ships-with-an-eval-harness': '2026-08-25',
  'the-sponsor-mandate-gap': '2026-08-25',
  '10-to-14-weeks-to-production': '2026-08-25',
  'two-weeks-one-workflow': '2026-08-25',
  'clearforge-ai-transformation-maturity-model': '2026-05-02',
  'ai-pilots-operating-systems': '2026-05-02',
  'custom-agent-stack-mid-market': '2026-05-02',
  'pe-ai-ebitda-playbook': '2026-05-02',
  'widening-ai-value-gap': '2026-03-26',
  'ai-agents-new-workforce': '2026-03-26',
  'legacy-systems-ai-bridge': '2026-03-26',
  'why-ai-pilots-fail-5-things-work': '2026-03-26',
  'hybrid-workforce-playbook': '2026-03-26',
  'continuous-ai-agents': '2026-03-26',
  'ai-readiness-ceo-guide': '2026-03-26',
  'pe-value-creation-with-ai': '2026-03-26',
  'choosing-an-ai-partner-for-portfolio-companies': '2026-10-19',
  'hidden-cost-manual-processes': '2026-03-26',
  'ai-agents-explained': '2026-03-26',
  'ai-consulting-cost': '2026-04-25',
  'ai-readiness-assessment-guide': '2026-04-25',
  'fractional-caio-vs-full-time': '2026-04-25',
};

export const INSIGHT_UPDATED: Record<string, string> = {
  'pe-value-creation-with-ai': '2026-10-19',
};
