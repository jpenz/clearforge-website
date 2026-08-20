import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { SITE_NAME, SITE_TAGLINE } from "@/data/site";

export const alt = `${SITE_NAME}: ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HAIRLINE = "rgba(1,11,19,0.12)";
const HAIRLINE_STRONG = "rgba(1,11,19,0.3)";

function loadFont(file: string) {
  return readFile(path.join(process.cwd(), "src/assets/fonts", file));
}

/** The share card, in the Swiss Hairline register. Fonts are bundled locally. */
export default async function OpenGraphImage() {
  const [bodoni, bodoniItalic, hanken] = await Promise.all([
    loadFont("bodoni-moda-500.ttf"),
    loadFont("bodoni-moda-500-italic.ttf"),
    loadFont("hanken-grotesk-600.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8f8ff",
          color: "#010b13",
          padding: 40,
          fontFamily: "Hanken Grotesk",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            border: `1px solid ${HAIRLINE_STRONG}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "26px 48px",
              borderBottom: `1px solid ${HAIRLINE}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{ width: 22, height: 22, backgroundColor: "#2454ff" }}
              />
              <div style={{ fontSize: 30 }}>{SITE_NAME}</div>
            </div>
            <div
              style={{
                fontSize: 16,
                letterSpacing: 3,
                color: "rgba(1,11,19,0.6)",
              }}
            >
              FOUNDER-LED AI CONSULTING AND BUILD
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              padding: "0 48px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Bodoni Moda",
                fontSize: 84,
                lineHeight: 1.14,
              }}
            >
              <div>AI systems your team</div>
              <div style={{ fontStyle: "italic", color: "#2454ff" }}>
                actually uses.
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 48px",
              borderTop: `1px solid ${HAIRLINE}`,
            }}
          >
            <div style={{ fontSize: 21, color: "rgba(1,11,19,0.7)" }}>
              Forge Diagnostic · Fixed fee · 2 weeks
            </div>
            <div style={{ fontSize: 21, color: "#2454ff" }}>clearforge.ai</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni Moda", data: bodoni, weight: 500, style: "normal" },
        {
          name: "Bodoni Moda",
          data: bodoniItalic,
          weight: 500,
          style: "italic",
        },
        { name: "Hanken Grotesk", data: hanken, weight: 600, style: "normal" },
      ],
    },
  );
}
