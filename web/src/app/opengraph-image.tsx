
import { ImageResponse } from "next/og";


export const alt = "SolveOi — Carry less. Grow more.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 90,
          background:
            "linear-gradient(130deg, #fffcf4 0%, #ffe9d6 55%, #ffc99f 100%)",
          color: "#422b23",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -3,
          }}
        >
          <span style={{ color: "#422b23" }}>Solve</span>
          <span style={{ color: "#c66b3e" }}>Oi</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 60,
            fontSize: 65,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.12,
          }}
        >
          <div style={{ display: "flex" }}>
            Real problems.
          </div>
          <div
            style={{
              display: "flex",
              color: "#c66b3e",
            }}
          >
            Intelligent solutions.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 38,
            fontSize: 28,
            color: "#745143",
          }}
        >
          Carry less. Grow more.
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 50,
            left: 90,
            fontSize: 21,
            color: "#93654c",
          }}
        >
          solveoi.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
