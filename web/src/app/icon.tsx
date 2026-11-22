
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 18,
          background: "linear-gradient(135deg, #101C30, #302268)",
          color: "#FFFFFF",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        O<span style={{ color: "#77E8DD" }}>i</span>
      </div>
    ),
    size
  );
}
