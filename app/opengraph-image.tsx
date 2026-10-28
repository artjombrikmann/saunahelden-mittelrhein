import { ImageResponse } from "next/og";

export const alt = "Saunahelden Mittelrhein: mobile Fasssauna mieten in Boppard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #071425 0%, #16263F 100%)",
          color: "#FFF8F0",
        }}
      >
        <div style={{ fontSize: 30, color: "#FDBA53", letterSpacing: 6, textTransform: "uppercase", display: "flex" }}>
          Saunahelden Mittelrhein
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05, marginTop: 24, textTransform: "uppercase", display: "flex", flexDirection: "column" }}>
          <span>Mobile Fasssauna mieten.</span>
          <span style={{ color: "#D7261E" }}>Wellness, wo du willst.</span>
        </div>
        <div style={{ fontSize: 32, color: "#A9B8CE", marginTop: 36, display: "flex" }}>
          Abholung in Boppard oder Lieferung am Mittelrhein
        </div>
      </div>
    ),
    size,
  );
}
