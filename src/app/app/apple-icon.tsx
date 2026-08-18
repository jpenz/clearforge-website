import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The brand mark: a solid cobalt square on the ghost canvas. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f8ff",
        }}
      >
        <div style={{ width: 116, height: 116, backgroundColor: "#2454ff" }} />
      </div>
    ),
    { ...size },
  );
}
