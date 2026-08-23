import { describe, expect, it } from "vitest";
import { getCompanyDomain, normalizePublicCompanyUrl } from "./url-safety";

describe("normalizePublicCompanyUrl", () => {
  it("accepts normal public domains", () => {
    expect(normalizePublicCompanyUrl("example.com")?.hostname).toBe("example.com");
    expect(normalizePublicCompanyUrl("https://acme.co/path")?.hostname).toBe("acme.co");
  });

  it("blocks loopback and private ranges", () => {
    for (const bad of [
      "localhost",
      "127.0.0.1",
      "10.0.0.5",
      "172.16.0.1",
      "192.168.1.1",
      "169.254.169.254", // cloud metadata
      "0.0.0.0",
    ]) {
      expect(normalizePublicCompanyUrl(bad), bad).toBeNull();
    }
  });

  it("blocks encoded IP literals that resolvers still accept", () => {
    for (const bad of [
      "0x7f000001", // hex 127.0.0.1
      "017700000001", // octal
      "2130706433", // 32-bit decimal 127.0.0.1
      "127.1", // short form
    ]) {
      expect(normalizePublicCompanyUrl(bad), bad).toBeNull();
    }
  });

  it("blocks IPv6 loopback, link-local, and mapped forms", () => {
    for (const bad of ["::1", "[::1]", "fe80::1", "[::ffff:127.0.0.1]", "fd00::1"]) {
      expect(normalizePublicCompanyUrl(bad), bad).toBeNull();
    }
  });

  it("blocks internal TLDs and embedded credentials", () => {
    expect(normalizePublicCompanyUrl("db.internal")).toBeNull();
    expect(normalizePublicCompanyUrl("printer.local")).toBeNull();
    expect(normalizePublicCompanyUrl("https://user:pass@example.com")).toBeNull();
  });

  it("rejects non-http protocols and junk", () => {
    for (const bad of ["file:///etc/passwd", "ftp://example.com", "javascript:alert(1)", "", "   "]) {
      expect(normalizePublicCompanyUrl(bad), bad).toBeNull();
    }
  });

  it("strips www for the display domain", () => {
    expect(getCompanyDomain("https://www.example.com")).toBe("example.com");
  });
});
