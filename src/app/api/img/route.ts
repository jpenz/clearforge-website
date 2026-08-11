import { type NextRequest, NextResponse } from 'next/server';
import { normalizeTrustedImageUrl } from '@/lib/url-safety';

const HEYBOSS_IMAGE_HOST = 'heyboss.heeyo.ai';
const MAX_PROXIED_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_MEDIA_TYPES = new Set([
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/webp',
]);

function getImageMediaType(headers: Headers): string | null {
  const contentType = headers.get('content-type');
  if (!contentType) return null;

  const mediaType = contentType.split(';', 1)[0]?.trim().toLowerCase();
  return mediaType && ALLOWED_IMAGE_MEDIA_TYPES.has(mediaType) ? mediaType : null;
}

function exceedsDeclaredByteLimit(headers: Headers, maxBytes: number): boolean {
  const contentLength = headers.get('content-length');
  if (!contentLength) return false;

  const length = Number(contentLength);
  return Number.isInteger(length) && length > maxBytes;
}

async function readResponseBytesWithinLimit(
  response: Response,
  maxBytes: number,
): Promise<Uint8Array | null> {
  if (exceedsDeclaredByteLimit(response.headers, maxBytes)) return null;
  if (!response.body) return new Uint8Array();

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const image = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    image.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return image;
}

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get('src');
  if (!src) return NextResponse.json({ error: 'Missing src' }, { status: 400 });

  const imageUrl = normalizeTrustedImageUrl(src, HEYBOSS_IMAGE_HOST);
  if (!imageUrl) {
    return NextResponse.json({ error: 'Invalid source' }, { status: 403 });
  }

  try {
    // Do not follow CDN redirects: a redirect could turn this into an SSRF proxy.
    const res = await fetch(imageUrl.href, {
      next: { revalidate: 86400 },
      redirect: 'error',
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);

    const mediaType = getImageMediaType(res.headers);
    if (!mediaType) {
      return NextResponse.json({ error: 'Unsupported image type' }, { status: 415 });
    }

    const image = await readResponseBytesWithinLimit(res, MAX_PROXIED_IMAGE_BYTES);
    if (!image) {
      return NextResponse.json({ error: 'Image exceeds maximum size' }, { status: 413 });
    }

    return new NextResponse(Buffer.from(image), {
      headers: {
        'Content-Type': mediaType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
  }
}
