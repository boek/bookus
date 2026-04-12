import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            backgroundColor: "#818cf8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 700, color: "white" }}>
            B
          </span>
        </div>
        <div style={{ fontSize: 48, fontWeight: 700, color: "#c4c3d4" }}>
          boek.us
        </div>
      </div>
    ),
    size,
  );
}
