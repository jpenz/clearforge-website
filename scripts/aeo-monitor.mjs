/**
 * AEO citation monitor: do AI assistants with live web search name or cite
 * clearforge.ai for the questions buyers actually ask? Asks Claude and
 * ChatGPT (each with its own web search) every query, records whether
 * clearforge.ai is cited or ClearForge is named, and appends one run to
 * ~/agentforge/aeo-monitor/history.jsonl. Prints a scorecard.
 *
 *   ANTHROPIC_API_KEY=... OPENAI_API_KEY=... node scripts/aeo-monitor.mjs
 *
 * Either key alone runs that engine only. Replaced the Perplexity-only
 * version on 2026-10-19 after its key stopped working.
 */
import { appendFileSync, mkdirSync } from 'node:fs';

const LOG_DIR = `${process.env.HOME}/agentforge/aeo-monitor`;
const QUERIES = [
  // Private equity: the buyer this work is for.
  'AI consulting firm for private equity portfolio companies',
  'how can private equity firms use AI to create value across a portfolio',
  'who helps PE-backed companies implement AI and get their teams to use it',
  'AI due diligence for a private equity acquisition',
  'how to measure the ROI of AI in portfolio companies',
  'how to choose an AI partner for portfolio companies',
  // Mid-market operators.
  'AI consulting for a mid-market industrial distributor',
  'fixed price AI assessment for a mid-market company',
  'company that builds AI agents for B2B sales teams at manufacturers',
  'why do AI pilots fail to reach production and how to fix it',
  // Brand: is the firm known at all.
  'What does ClearForge (clearforge.ai) do?',
];

const ask = {
  async claude(query) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-5-5',
        max_tokens: 1200,
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
        messages: [{ role: 'user', content: query }],
      }),
    });
    if (!res.ok) throw new Error(`claude ${res.status}`);
    const data = await res.json();
    const text = data.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join(' ');
    const urls = data.content
      .flatMap((b) => (b.type === 'web_search_tool_result' ? b.content ?? [] : []))
      .map((r) => r.url)
      .filter(Boolean);
    return { text, urls };
  },
  async chatgpt(query) {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: 'gpt-4.1-mini', tools: [{ type: 'web_search' }], input: query }),
    });
    if (!res.ok) throw new Error(`chatgpt ${res.status}`);
    const data = await res.json();
    const parts = (data.output ?? []).flatMap((o) => o.content ?? []);
    const text = parts.map((p) => p.text ?? '').join(' ');
    const urls = parts.flatMap((p) => (p.annotations ?? []).map((a) => a.url)).filter(Boolean);
    return { text, urls };
  },
};

const engines = Object.keys(ask).filter((e) =>
  e === 'claude' ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY,
);
if (!engines.length) {
  console.error('Set ANTHROPIC_API_KEY and/or OPENAI_API_KEY');
  process.exit(1);
}

const run = { at: new Date().toISOString(), engines, results: [] };
for (const query of QUERIES) {
  for (const engine of engines) {
    try {
      const { text, urls } = await ask[engine](query);
      const domains = [...new Set(urls.map((u) => new URL(u).hostname.replace(/^www\./, '')))];
      run.results.push({
        engine,
        query,
        cited: domains.some((d) => d.endsWith('clearforge.ai')),
        named: /clearforge/i.test(text),
        domains: domains.slice(0, 8),
      });
    } catch (error) {
      run.results.push({ engine, query, error: String(error.message ?? error) });
    }
  }
}

mkdirSync(LOG_DIR, { recursive: true });
appendFileSync(`${LOG_DIR}/history.jsonl`, `${JSON.stringify(run)}\n`);

for (const engine of engines) {
  const rows = run.results.filter((r) => r.engine === engine);
  const ok = rows.filter((r) => !r.error);
  const cited = ok.filter((r) => r.cited || r.named);
  console.log(`\n${engine}: ClearForge cited or named in ${cited.length} of ${ok.length} answers`);
  for (const r of rows) {
    const mark = r.error ? `error ${r.error}` : r.cited ? 'CITED' : r.named ? 'named' : '-';
    console.log(`  ${mark.padEnd(10)} ${r.query}${r.error || r.cited || r.named ? '' : `  [${r.domains.slice(0, 3).join(', ')}]`}`);
  }
}
