
"use client";

import { useId } from "react";

type EnergyOrbProps = {
  className?: string;
};

const ribbons = [
  "M 105 315 C 111 188 210 105 315 114 C 429 119 500 214 491 319 C 481 434 386 492 281 480 C 165 467 111 384 105 315 Z",
  "M 133 254 C 182 135 313 105 411 175 C 511 249 495 389 395 449 C 299 506 170 444 147 354 C 129 297 170 248 243 213",
  "M 177 169 C 279 111 405 155 454 245 C 501 335 433 441 335 465 C 237 483 142 415 141 321 C 141 240 207 174 289 182",
  "M 161 376 C 160 284 224 194 308 175 C 409 152 473 215 469 309 C 465 393 405 446 328 428 C 249 409 228 342 252 281 C 277 220 356 209 404 252",
  "M 199 436 C 137 382 145 274 204 211 C 272 139 391 147 436 220 C 484 295 444 388 379 407 C 302 431 244 376 256 314 C 265 268 335 242 386 278",
  "M 124 324 C 142 422 257 483 351 449 C 433 420 482 319 444 245 C 409 171 304 166 255 226 C 203 287 231 359 293 376 C 358 394 408 352 404 296",
];

const particles = Array.from({ length: 42 }, (_, index) => {
  const angle = index * 2.399963229728653;
  const radius = 190 + (index % 9) * 20;

  return {
    x: 300 + Math.cos(angle) * radius,
    y: 300 + Math.sin(angle) * radius,
    radius: index % 5 === 0 ? 1.8 : 0.8,
    opacity: 0.2 + (index % 5) * 0.13,
  };
});

export default function EnergyOrb({
  className = "",
}: EnergyOrbProps) {
  const unique = useId().replace(/:/g, "");

  const gradientId = `${unique}-energy-gradient`;
  const coreId = `${unique}-core-gradient`;
  const blurId = `${unique}-energy-blur`;
  const haloId = `${unique}-halo-blur`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative aspect-square w-full select-none ${className}`}
    >
      <div className="absolute inset-[18%] rounded-full bg-violet-600/20 blur-[90px]" />

      <svg
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        className="solveoi-orb-drift relative h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6D2BB6" />
            <stop offset="21%" stopColor="#B962FF" />
            <stop offset="48%" stopColor="#F3BEFF" />
            <stop offset="70%" stopColor="#A046EE" />
            <stop offset="100%" stopColor="#4E1A9E" />
          </linearGradient>

          <radialGradient id={coreId}>
            <stop offset="0%" stopColor="#B05BFF" stopOpacity="0.15" />
            <stop offset="55%" stopColor="#7C2EE6" stopOpacity="0.22" />
            <stop offset="82%" stopColor="#260E55" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#090610" stopOpacity="0" />
          </radialGradient>

          <filter
            id={blurId}
            x="-70%"
            y="-70%"
            width="240%"
            height="240%"
          >
            <feGaussianBlur stdDeviation="9" />
          </filter>

          <filter
            id={haloId}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>

        {/* Outer purple aura */}
        <circle
          cx="300"
          cy="300"
          r="220"
          fill="#7024C4"
          opacity="0.22"
          filter={`url(#${haloId})`}
        />

        <circle
          cx="300"
          cy="300"
          r="210"
          fill={`url(#${coreId})`}
        />

        {/* Rotating blurred energy ribbons */}
        <g
          className="solveoi-orb-rotate"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          filter={`url(#${blurId})`}
          opacity="0.9"
        >
          {ribbons.map((path, index) => (
            <path
              key={`glow-${index}`}
              d={path}
              strokeWidth={index % 2 === 0 ? 13 : 8}
              opacity={0.6 + (index % 3) * 0.13}
              transform={`rotate(${index * 13} 300 300)`}
            />
          ))}
        </g>

        {/* Fine illuminated ribbons */}
        <g
          className="solveoi-orb-rotate-reverse"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
        >
          {ribbons.map((path, index) => (
            <path
              key={`line-${index}`}
              d={path}
              strokeWidth={index % 3 === 0 ? 3.1 : 1.6}
              opacity={index % 2 === 0 ? 0.88 : 0.52}
              transform={`rotate(${index * 11} 300 300)`}
            />
          ))}
        </g>

        {/* Twisting inner rings */}
        <g
          className="solveoi-orb-rotate"
          fill="none"
          stroke={`url(#${gradientId})`}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <ellipse
              key={index}
              cx="300"
              cy="300"
              rx={120 + index * 8}
              ry={62 + index * 6}
              transform={`rotate(${index * 17 + 12} 300 300)`}
              strokeWidth={index % 3 === 0 ? 2 : 0.9}
              opacity={0.17 + (index % 4) * 0.11}
            />
          ))}
        </g>

        {/* Bright outer ring */}
        <circle
          cx="300"
          cy="300"
          r="207"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeDasharray="380 160 270 490"
          opacity="0.58"
        />

        <circle
          cx="300"
          cy="300"
          r="211"
          fill="none"
          stroke="#B261FF"
          strokeWidth="7"
          strokeDasharray="420 950"
          opacity="0.32"
          filter={`url(#${blurId})`}
        />

        {/* Small stars surrounding the orb */}
        <g className="solveoi-orb-pulse">
          {particles.map((particle, index) => (
            <circle
              key={index}
              cx={particle.x}
              cy={particle.y}
              r={particle.radius}
              fill="#E9C5FF"
              opacity={particle.opacity}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
