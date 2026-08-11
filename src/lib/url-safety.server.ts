import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

function isPrivateOrReservedIpv4(address: string): boolean {
  const octets = address.split('.').map(Number);
  if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet))) return true;

  const [first, second, third] = octets;
  if (first === 0 || first === 10 || first === 127 || first >= 224) return true;
  if (first === 100 && second >= 64 && second <= 127) return true;
  if (first === 169 && second === 254) return true;
  if (first === 172 && second >= 16 && second <= 31) return true;
  if (first === 192 && (second === 0 || second === 168)) return true;
  if (first === 198 && (second === 18 || second === 19 || (second === 51 && third === 100))) {
    return true;
  }
  if (first === 203 && second === 0 && third === 113) return true;

  return false;
}

function isPrivateOrReservedIpv6(address: string): boolean {
  const normalized = address.toLowerCase();
  return (
    normalized === '::' ||
    normalized === '::1' ||
    normalized.startsWith('::ffff:') ||
    normalized.startsWith('fc') ||
    normalized.startsWith('fd') ||
    /^fe[89ab]/.test(normalized) ||
    normalized.startsWith('ff') ||
    normalized.startsWith('2001:db8:')
  );
}

/**
 * Keeps server-side fetches off loopback, link-local, private, multicast,
 * carrier-grade NAT, benchmarking, and documentation address ranges.
 */
export function isPublicResolvableAddress(address: string): boolean {
  const family = isIP(address);
  if (family === 4) return !isPrivateOrReservedIpv4(address);
  if (family === 6) return !isPrivateOrReservedIpv6(address);
  return false;
}

/**
 * Resolve every address before a public-site fetch. A DNS failure or a single
 * unsafe answer fails closed. Callers must still disable automatic redirects
 * and validate every redirect destination.
 */
export async function resolvesToPublicAddresses(hostname: string): Promise<boolean> {
  try {
    const results = await lookup(hostname, { all: true, verbatim: true });
    return (
      results.length > 0 && results.every((result) => isPublicResolvableAddress(result.address))
    );
  } catch {
    return false;
  }
}
