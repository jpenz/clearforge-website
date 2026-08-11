import { describe, expect, it, vi } from 'vitest';
import { fetchPublicCompanyPage } from '@/app/api/hero-analyze/route';

function fetchStub(responses: Response[]): typeof fetch {
  return vi.fn(async () => {
    const response = responses.shift();
    if (!response) throw new Error('Unexpected fetch call');
    return response;
  }) as unknown as typeof fetch;
}

describe('hero company-page fetch safety', () => {
  it('does not follow a redirect to a private address', async () => {
    const fetcher = fetchStub([
      new Response(null, {
        status: 302,
        headers: { location: 'http://127.0.0.1/admin' },
      }),
    ]);

    await expect(
      fetchPublicCompanyPage(new URL('https://example.com'), fetcher, async () => true),
    ).resolves.toBe('');
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith(
      'https://example.com/',
      expect.objectContaining({ redirect: 'manual' }),
    );
  });

  it('follows only revalidated public redirects', async () => {
    const fetcher = fetchStub([
      new Response(null, {
        status: 301,
        headers: { location: 'https://www.example.com/home' },
      }),
      new Response('<main>Public operating model</main>', {
        status: 200,
        headers: { 'content-type': 'text/html' },
      }),
    ]);

    await expect(
      fetchPublicCompanyPage(new URL('https://example.com'), fetcher, async () => true),
    ).resolves.toContain('Public operating model');
    expect(fetcher).toHaveBeenNthCalledWith(
      2,
      'https://www.example.com/home',
      expect.objectContaining({ redirect: 'manual' }),
    );
  });

  it('rejects a remote document that declares an oversized payload', async () => {
    const fetcher = fetchStub([
      new Response('Small body, misleading header.', {
        status: 200,
        headers: {
          'content-type': 'text/html',
          'content-length': String(512 * 1024 + 1),
        },
      }),
    ]);

    await expect(
      fetchPublicCompanyPage(new URL('https://example.com'), fetcher, async () => true),
    ).resolves.toBe('');
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('stops reading an oversized streamed payload without a content-length header', async () => {
    const oversizedStream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array(512 * 1024 + 1));
        controller.close();
      },
    });
    const fetcher = fetchStub([
      new Response(oversizedStream, {
        status: 200,
        headers: { 'content-type': 'text/html' },
      }),
    ]);

    await expect(
      fetchPublicCompanyPage(new URL('https://example.com'), fetcher, async () => true),
    ).resolves.toBe('');
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('refuses a public-looking hostname that resolves to a private address', async () => {
    const fetcher = fetchStub([
      new Response('<main>Should not be fetched</main>', {
        status: 200,
        headers: { 'content-type': 'text/html' },
      }),
    ]);
    const resolveHostname = vi.fn(async () => false);

    await expect(
      fetchPublicCompanyPage(new URL('https://public-looking.example'), fetcher, resolveHostname),
    ).resolves.toBe('');
    expect(resolveHostname).toHaveBeenCalledWith('public-looking.example');
    expect(fetcher).not.toHaveBeenCalled();
  });
});
