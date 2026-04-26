import { NextResponse } from 'next/server';

/**
 * POST /api/discover/report
 *
 * Takes conversation history + company intelligence and generates
 * a structured report. Returns JSON that the frontend can render
 * as a downloadable PDF (using browser print-to-PDF or a library).
 *
 * For V1, we return structured data. PDF generation can be added
 * via @react-pdf/renderer or html2pdf in a future iteration.
 */
export async function POST(request: Request) {
  try {
    const { messages, intelligence, valueChain, annotations, name, email, company } = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Report generation unavailable' }, { status: 500 });
    }

    // Build value chain context if available
    let valueChainContext = '';
    if (valueChain && valueChain.functions) {
      valueChainContext = `\n\n## Custom AI Value Chain Generated for ${valueChain.companyName}\n`;
      valueChain.functions.forEach((fn: { function: string; activities: { name: string; aiImpact: string; impact: string }[] }) => {
        valueChainContext += `\n### ${fn.function}\n${fn.activities.map((a) => `- ${a.name}: ${a.aiImpact} (${a.impact})`).join('\n')}`;
      });

      if (annotations) {
        const must = Object.entries(annotations).filter(([_, a]) => (a as { priority?: string }).priority === 'must');
        const curious = Object.entries(annotations).filter(([_, a]) => (a as { priority?: string }).priority === 'curious');
        if (must.length || curious.length) {
          valueChainContext += `\n\n## Client's Annotated Priorities\n`;
          if (must.length) {
            valueChainContext += `\n**Must-have:**\n${must.map(([k, a]) => `- ${k}${(a as { notes?: string }).notes ? ` — ${(a as { notes: string }).notes}` : ''}`).join('\n')}`;
          }
          if (curious.length) {
            valueChainContext += `\n\n**Curious:**\n${curious.map(([k, a]) => `- ${k}${(a as { notes?: string }).notes ? ` — ${(a as { notes: string }).notes}` : ''}`).join('\n')}`;
          }
        }
      }
    }

    // Use Claude to synthesize conversation into a structured report
    const reportPrompt = `Based on this discovery conversation, generate a structured AI readiness report for ${company || 'the client'}.

${intelligence ? `Company Research:\n${JSON.stringify(intelligence)}\n\n` : ''}${valueChainContext}

Conversation:
${messages.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`).join('\n\n')}

Generate a report with these exact sections (use markdown headers):

## Executive Summary
2-3 paragraph overview of the company's AI readiness and key opportunities.

## AI Maturity Assessment
Score each dimension 1-10 and explain:
- Data Readiness: X/10
- Process Maturity: X/10
- Technology Infrastructure: X/10
- Team Capability: X/10
- Strategic Alignment: X/10

## Top 3 AI Opportunities
For each opportunity:
- What it is
- Expected ROI
- Timeline to implement
- Recommended Forge Method engagement

## Recommended Tech Stack
Based on their industry and current infrastructure.

## Recommended Engagement
Which Forge Method product(s) and why.

## Next Steps
3 specific actions they should take.

Be specific to their company. Use real numbers where possible.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: reportPrompt }],
      }),
    });

    if (!response.ok) {
      console.error('Claude report error:', await response.text());
      return NextResponse.json({ error: 'Report generation failed' }, { status: 500 });
    }

    const data = await response.json();
    const reportContent = data.content?.[0]?.text || '';

    // Save lead data to log (Supabase integration can be added)
    if (email) {
      console.log(JSON.stringify({
        type: 'forge_intelligence_lead',
        name,
        email,
        company,
        domain: intelligence?.domain,
        reportGenerated: true,
        timestamp: new Date().toISOString(),
      }));
    }

    return NextResponse.json({
      report: reportContent,
      generatedAt: new Date().toISOString(),
      company: company || intelligence?.domain || 'Unknown',
    });
  } catch (error) {
    console.error('Report API error:', error);
    return NextResponse.json({ error: 'Report generation failed' }, { status: 500 });
  }
}
