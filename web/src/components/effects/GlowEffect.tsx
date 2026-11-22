import type { CSSProperties } from "react";

type GlowEffectProps = {
  className?: string;
  color?: string;
  style?: CSSProperties;
};

export default function GlowEffect({ className = "", color = "#6C4DFF", style }: GlowEffectProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute -z-10 rounded-full opacity-40 blur-3xl ${className}`}
      style={{ width: 350, height: 350, background: color, ...style }} />
  );
}
