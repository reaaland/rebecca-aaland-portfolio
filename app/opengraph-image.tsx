import { ImageResponse } from "next/og";

export const alt = "Aaland Web Design & Site Care";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#05070b",
          color: "#f4f7fb",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px 72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            justifyContent: "space-between",
            textTransform: "uppercase",
          }}
        >
          <span>Aaland Web Design &amp; Site Care</span>
          <span style={{ color: "#4da3ff" }}>Rochester, MN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1020 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              marginBottom: 24,
              textTransform: "uppercase",
            }}
          >
            Web design · Updates · Site care
          </span>
          <span
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: -6,
              lineHeight: 0.95,
            }}
          >
            Websites built around what your business actually needs.
          </span>
        </div>
        <div
          style={{
            background: "#0d131d",
            border: "2px solid #4da3ff",
            color: "#43dcff",
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            justifyContent: "center",
            padding: "18px 24px",
          }}
        >
          Build · Improve · Support
        </div>
      </div>
    ),
    size,
  );
}
