import { ImageResponse } from "next/og";

export const alt = "Open-Weight Models for Development Tasks";
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
          padding: 96,
          background: "#fbfaf7",
          color: "#1f1f1c",
          borderTop: "16px solid #1f1f1c",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 600 }}>Open-Weight Models for Development Tasks</div>
        <div style={{ fontSize: 32, color: "#5b5852", marginTop: 24 }}>
          Benchmark plan, task catalog and datasets
        </div>
      </div>
    ),
    size,
  );
}
