import { describe, expect, it } from 'vitest';
import { isPublicResolvableAddress } from '@/lib/url-safety.server';

describe('resolved host safety', () => {
  it.each([
    '127.0.0.1',
    '10.0.0.8',
    '100.64.0.1',
    '169.254.169.254',
    '172.16.0.1',
    '192.168.1.1',
    '198.18.0.1',
    '203.0.113.10',
    '::1',
    'fc00::1',
    'fe80::1',
    '::ffff:127.0.0.1',
  ])('rejects a private or reserved resolved address: %s', (address) => {
    expect(isPublicResolvableAddress(address)).toBe(false);
  });

  it('allows ordinary public IPv4 and IPv6 addresses', () => {
    expect(isPublicResolvableAddress('8.8.8.8')).toBe(true);
    expect(isPublicResolvableAddress('2606:4700:4700::1111')).toBe(true);
  });
});
