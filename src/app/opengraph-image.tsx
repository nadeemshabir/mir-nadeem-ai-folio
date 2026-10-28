import { ImageResponse } from "next/og";

export const alt = "Nadeem Shabir Mir, AI engineer and final-year student at IIT Bombay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#232833",
          color: "#e8edf4",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#9ec4f5",
          }}
        >
          <span>IIT Bombay, Class of 2027</span>
          <span>Mumbai</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -1 }}>Nadeem Shabir Mir</div>
          <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, maxWidth: 860 }}>
            Documents, retrieval, speech, and software agents.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#b7c2d1" }}>
          mirnadeem2021@gmail.com · github.com/nadeemshabir
        </div>
      </div>
    ),
    { ...size },
  );
}
