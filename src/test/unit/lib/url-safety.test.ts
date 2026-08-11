import { describe, expect, it } from 'vitest';
import {
  normalizePublicCompanyUrl,
  normalizeTrustedImageUrl,
  resolvePublicRedirectUrl,
} from '@/lib/url-safety';

describe('public company URL safety', () => {
  it('accepts an ordinary public company URL', () => {
    expect(normalizePublicCompanyUrl('clearforge.ai/approach')?.href).toBe(
      'https://clearforge.ai/approach',
    );
  });

  it.each([
    'https://user:password@example.com',
    'https://example.com:8443',
    'ftp://example.com/file',
    'http://127.0.0.1/admin',
    'http://[::1]/admin',
    'https://dashboard.internal',
    'https://service.local',
  ])('rejects non-public or nonstandard targets: %s', (value) => {
    expect(normalizePublicCompanyUrl(value)).toBeNull();
  });

  it('revalidates redirect destinations before allowing a second request', () => {
    const currentUrl = new URL('https://example.com/start');

    expect(resolvePublicRedirectUrl(currentUrl, '/next')?.href).toBe('https://example.com/next');
    expect(resolvePublicRedirectUrl(currentUrl, 'http://127.0.0.1/admin')).toBeNull();
    expect(resolvePublicRedirectUrl(currentUrl, 'https://user@evil.example/path')).toBeNull();
  });
});

describe('trusted image URL safety', () => {
  it('requires an exact HTTPS host with no credentials, custom port, or fragment', () => {
    expect(
      normalizeTrustedImageUrl('https://heyboss.heeyo.ai/assets/hero.webp', 'heyboss.heeyo.ai')
        ?.href,
    ).toBe('https://heyboss.heeyo.ai/assets/hero.webp');

    expect(
      normalizeTrustedImageUrl(
        'https://heyboss.heeyo.ai@evil.example/image.webp',
        'heyboss.heeyo.ai',
      ),
    ).toBeNull();
    expect(
      normalizeTrustedImageUrl('https://heyboss.heeyo.ai:8443/image.webp', 'heyboss.heeyo.ai'),
    ).toBeNull();
    expect(
      normalizeTrustedImageUrl('https://heyboss.heeyo.ai/image.webp#variant', 'heyboss.heeyo.ai'),
    ).toBeNull();
  });
});
