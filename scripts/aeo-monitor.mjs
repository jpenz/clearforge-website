/**
 * AEO Citation Monitor — weekly check: do the AI answer engines cite
 * clearforge.ai for the queries buyers actually ask? Logs history to
 * ~/agentforge/aeo-monitor/history.jsonl and prints a gap report.
 *
 *   PERPLEXITY_API_KEY=... node scripts/aeo-monitor.mjs
 */
import { appendFileSync, existsSync, readFileSync } from 'node:fs';

const KEY = process.env.PERPLEXITY_API_KEY;
if (!KEY) { console.error('PERPLEXITY_API_KEY required'); process.exit(1); }

const LOG = `${process.env.HOME}/agentforge/aeo-monitor/history.jsonl`;
const QUERIES = [
  'best AI consulting firm for mid-market companies',
  'AI readiness assessment for my company',
  'how much does AI consulting cost',
  'custom AI agents for business operations',
  'AI for private equity portfolio companies',
  'AI adoption consulting after failed pilot',
  'fractional chief AI officer vs full time',
  'AI implementation partner for manufacturing',
  'why do AI pilots fail to reach production',
  'AI consulting firm with transparent pricing',
  'AI agent vs automation what is the difference',
  'AI operating model for mid-market company',
];

const run = { at: new Date().toISOString(), engine: 'perplexity-sonar', results: [] };
for (const q of QUERIES) {
  try {
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'sonar',
        messages: [{ role: 'user', content: q }],
        max_tokens: 600,
      }),
    });
    const data = await res.json();
    const citations = data.citations ?? data.search_results?.map((r) => r.url) ?? [];
    const answer = data.choices?.[0]?.message?.content ?? '';
    const citedIdx = citations.findIndex((c) => String(c).includes('clearforge.ai'));
    const mentioned = /clearforge/i.test(answer);
    const domains = [...new Set(citations.map((c) => { try { return new URL(String(c)).hostname.replace(/^www\./, ''); } catch { return String(c).slice(0, 40); } }))];
    run.results.push({ q, cited: citedIdx >= 0, position: citedIdx >= 0 ? citedIdx + 1 : null, mentioned, domains: domains.slice(0, 8) });
    console.log(citedIdx >= 0 ? `  ✓ CITED #${citedIdx + 1}` : (mentioned ? '  ◐ mentioned, not cited' : '  ✗ absent '), '·', q);
  } catch (e) {
    run.results.push({ q, error: String(e).slice(0, 120) });
    console.log('  ! error ·', q);
  }
  await new Promise((r) => setTimeout(r, 1100));
}

const citedNow = run.results.filter((r) => r.cited).length;
console.log(`\nSCORE: cited on ${citedNow}/${QUERIES.length} queries`);

// deltas vs previous run
if (existsSync(LOG)) {
  const lines = readFileSync(LOG, 'utf8').trim().split('\n');
  const prev = lines.length ? JSON.parse(lines[lines.length - 1]) : null;
  if (prev) {
    const prevCited = new Set(prev.results.filter((r) => r.cited).map((r) => r.q));
    const gained = run.results.filter((r) => r.cited && !prevCited.has(r.q)).map((r) => r.q);
    const lost = [...prevCited].filter((q) => !run.results.find((r) => r.q === q)?.cited);
    if (gained.length) console.log('GAINED:', gained.join(' | '));
    if (lost.length) console.log('LOST:', lost.join(' | '));
  }
}

// top competitor domains across uncited queries → the gap list
const gapDomains = {};
for (const r of run.results.filter((r) => !r.cited && r.domains)) {
  for (const d of r.domains) gapDomains[d] = (gapDomains[d] ?? 0) + 1;
}
const topRivals = Object.entries(gapDomains).sort((a, b) => b[1] - a[1]).slice(0, 8);
console.log('\nMOST-CITED DOMAINS WHERE WE ARE ABSENT:');
for (const [d, n] of topRivals) console.log(`  ${String(n).padStart(2)}x ${d}`);
console.log('\nBIGGEST GAPS (uncited queries):');
for (const r of run.results.filter((r) => !r.cited)) console.log('  -', r.q);

appendFileSync(LOG, JSON.stringify(run) + '\n');
console.log(`\nlogged → ${LOG}`);
