import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GET } from '@/app/api/img/route';

function imageRequest(src: string): NextRequest {
  return new NextRequest(`http://localhost/api/img?src=${encodeURIComponent(src)}`);
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('image proxy safety', () => {
  it('rejects a credential-shaped lookalike host before fetching', async () => {
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);

    const response = await GET(
      imageRequest('https://heyboss.heeyo.ai@evil.example/credential-lookalike.webp'),
    );

    expect(response.status).toBe(403);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('fetches a valid raster image without following redirects', async () => {
    const fetcher = vi.fn(
      async () =>
        new Response(new Uint8Array([1, 2, 3]), {
          status: 200,
          headers: { 'content-type': 'image/webp', 'content-length': '3' },
        }),
    );
    vi.stubGlobal('fetch', fetcher);

    const response = await GET(imageRequest('https://heyboss.heeyo.ai/assets/hero.webp'));

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/webp');
    await expect(response.arrayBuffer()).resolves.toEqual(new Uint8Array([1, 2, 3]).buffer);
    expect(fetcher).toHaveBeenCalledWith(
      'https://heyboss.heeyo.ai/assets/hero.webp',
      expect.objectContaining({ redirect: 'error' }),
    );
  });

  it('rejects non-image responses and declared oversized image payloads', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        new Response('not an image', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        }),
      )
      .mockResolvedValueOnce(
        new Response('small body, unsafe declaration', {
          status: 200,
          headers: {
            'content-type': 'image/webp',
            'content-length': String(5 * 1024 * 1024 + 1),
          },
        }),
      );
    vi.stubGlobal('fetch', fetcher);

    await expect(
      GET(imageRequest('https://heyboss.heeyo.ai/assets/hero.webp')),
    ).resolves.toMatchObject({
      status: 415,
    });
    await expect(
      GET(imageRequest('https://heyboss.heeyo.ai/assets/hero.webp')),
    ).resolves.toMatchObject({
      status: 413,
    });
  });
});
