import { afterEach, describe, expect, it } from 'vitest';
import { POST } from '@/app/api/discover/value-chain/route';

const originalAnthropicKey = process.env.ANTHROPIC_API_KEY;

function restoreAnthropicKey() {
  if (originalAnthropicKey === undefined) {
    delete process.env.ANTHROPIC_API_KEY;
  } else {
    process.env.ANTHROPIC_API_KEY = originalAnthropicKey;
  }
}

function repeatedText(length: number) {
  return 'Workflow evidence, operating model signals, customer handoffs, and adoption constraints. '
    .repeat(Math.ceil(length / 82))
    .slice(0, length);
}

function requestWithPayload(payload: unknown) {
  return new Request('http://localhost/api/discover/value-chain', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': `discover-value-chain-test-${crypto.randomUUID()}`,
    },
    body: JSON.stringify(payload),
  });
}

afterEach(() => {
  restoreAnthropicKey();
});

describe('discover value-chain route', () => {
  it('accepts Perplexity research responses large enough for real company lookups', async () => {
    delete process.env.ANTHROPIC_API_KEY;

    const response = await POST(
      requestWithPayload({
        domain: 'clearforge.ai',
        company: repeatedText(7000),
        jobs: repeatedText(6500),
        useCases: repeatedText(7000),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        fallback: true,
      }),
    );
  });

  it('rejects malformed research payloads before generation', async () => {
    delete process.env.ANTHROPIC_API_KEY;

    const response = await POST(
      requestWithPayload({
        domain: 'clearforge.ai',
        company: repeatedText(200),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        error: 'Research data required',
      }),
    );
  });
});
