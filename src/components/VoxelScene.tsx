import { useId } from "react";

type Block = {
  x: number;
  y: number;
  z: number;
  color: string;
  height?: number;
};

function shade(hex: string, factor: number) {
  return `#${[1, 3, 5]
    .map((i) =>
      Math.round(parseInt(hex.slice(i, i + 2), 16) * factor)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

// Original, code-native voxel illustration: no external imagery or fonts.
export function VoxelScene({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, "");
  const blocks: Block[] = [];
  const greens = ["#6a8a4a", "#758e4d", "#5f7e43", "#7d9854", "#6e884a"];
  for (let x = 0; x < 9; x++)
    for (let y = 0; y < 8; y++) {
      if (
        (x === 0 && (y === 0 || y > 5)) ||
        (x === 8 && (y < 2 || y > 5)) ||
        (y === 7 && (x < 2 || x > 6))
      )
        continue;
      const h = x < 3 && y < 4 ? 1.2 : 0;
      blocks.push({ x, y, z: -1.6, height: 1.6 + h, color: "#535446" });
      blocks.push({
        x,
        y,
        z: h,
        height: 0.35,
        color: greens[(x * 3 + y * 7) % greens.length],
      });
      if ((x + y * 3) % 11 === 0)
        blocks.push({
          x: x + 0.28,
          y: y + 0.28,
          z: h + 0.35,
          height: 0.16,
          color: "#9ea365",
        });
    }
  // Stone path into the portal.
  for (let y = 3; y < 8; y++)
    blocks.push({
      x: 4,
      y,
      z: 0.36,
      height: 0.13,
      color: y % 2 ? "#b2af92" : "#969981",
    });
  // Portal frame with a luminous green interior.
  for (let z = 0; z < 5; z++) {
    blocks.push({
      x: 3,
      y: 2,
      z: 0.35 + z * 0.65,
      height: 0.65,
      color: "#697779",
    });
    blocks.push({
      x: 6,
      y: 2,
      z: 0.35 + z * 0.65,
      height: 0.65,
      color: "#697779",
    });
  }
  for (let x = 3; x <= 6; x++)
    blocks.push({ x, y: 2, z: 3.6, height: 0.6, color: "#87918a" });
  // Two trees, with layered, chunky foliage.
  for (const [tx, ty, base] of [
    [1, 2, 1.55],
    [7, 5, 0.35],
  ]) {
    blocks.push({ x: tx, y: ty, z: base, height: 2.4, color: "#77644a" });
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++) {
        blocks.push({
          x: tx + dx * 0.8,
          y: ty + dy * 0.8,
          z: base + 2,
          height: 0.85,
          color: "#436e46",
        });
        if (Math.abs(dx) + Math.abs(dy) < 2)
          blocks.push({
            x: tx + dx * 0.7,
            y: ty + dy * 0.7,
            z: base + 2.85,
            height: 0.7,
            color: "#5f8852",
          });
      }
    blocks.push({
      x: tx,
      y: ty,
      z: base + 3.55,
      height: 0.65,
      color: "#799754",
    });
  }
  // A little cabin and a warm lantern beside the path.
  blocks.push({ x: 6, y: 6, z: 0.35, height: 0.8, color: "#a28c61" });
  blocks.push({ x: 6, y: 6, z: 1.15, height: 0.2, color: "#d2b76c" });
  blocks.push({ x: 2, y: 5, z: 0.35, height: 1.1, color: "#716a4f" });
  blocks.push({ x: 2, y: 5, z: 1.45, height: 0.55, color: "#e8c879" });
  blocks.sort((a, b) => a.x + a.y + a.z * 0.02 - (b.x + b.y + b.z * 0.02));
  function project(x: number, y: number, z: number) {
    return `${300 + (x - y) * 25},${205 + (x + y) * 13 - z * 30}`;
  }
  return (
    <svg
      className={`voxel-scene ${compact ? "compact" : ""}`}
      viewBox={compact ? "60 85 540 385" : "0 0 650 520"}
      fill="none"
      role="img"
      aria-label="Illustreret svævende Minecraft-ø med træer, en sti og en lysende grøn portal"
    >
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#a6ce72" stopOpacity=".22" />
          <stop offset="1" stopColor="#a6ce72" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-portal`} x1="0" x2="1" y2="1">
          <stop stopColor="#d7f5ab" />
          <stop offset=".4" stopColor="#a3d37d" />
          <stop offset="1" stopColor="#4b9a67" />
        </linearGradient>
        <pattern
          id={`${id}-grid`}
          width="50"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="m0 13 25-13 25 13-25 13Z"
            stroke="#80996b"
            strokeOpacity=".1"
            strokeWidth=".6"
          />
        </pattern>
      </defs>
      <ellipse cx="330" cy="285" rx="270" ry="225" fill={`url(#${id}-glow)`} />
      <path d="m30 310 295-154 295 154-295 154Z" fill={`url(#${id}-grid)`} />
      <ellipse cx="329" cy="420" rx="161" ry="30" fill="#060a07" opacity=".5" />
      <g className="island">
        {blocks.map((b, i) => {
          const top = b.z + (b.height ?? 1);
          return (
            <g key={i} stroke="#142416" strokeOpacity=".14" strokeWidth=".4">
              <polygon
                points={[
                  project(b.x, b.y + 1, top),
                  project(b.x + 1, b.y + 1, top),
                  project(b.x + 1, b.y + 1, b.z),
                  project(b.x, b.y + 1, b.z),
                ].join(" ")}
                fill={shade(b.color, 0.64)}
              />
              <polygon
                points={[
                  project(b.x + 1, b.y, top),
                  project(b.x + 1, b.y + 1, top),
                  project(b.x + 1, b.y + 1, b.z),
                  project(b.x + 1, b.y, b.z),
                ].join(" ")}
                fill={shade(b.color, 0.79)}
              />
              <polygon
                points={[
                  project(b.x, b.y, top),
                  project(b.x + 1, b.y, top),
                  project(b.x + 1, b.y + 1, top),
                  project(b.x, b.y + 1, top),
                ].join(" ")}
                fill={b.color}
              />
            </g>
          );
        })}
        <polygon
          points={[
            project(4, 2.1, 0.9),
            project(6, 2.1, 0.9),
            project(6, 2.1, 3.6),
            project(4, 2.1, 3.6),
          ].join(" ")}
          fill={`url(#${id}-portal)`}
          opacity=".94"
        />
        <path
          d="m346 189 18 10m-24 7 23 12m-18 10 17 9"
          stroke="#e8ffd4"
          strokeOpacity=".35"
          strokeWidth="2"
        />
      </g>
      <g fill="#c5dfa4" opacity=".65">
        <rect x="130" y="188" width="3" height="3" />
        <rect x="492" y="215" width="3" height="3" />
        <rect x="427" y="132" width="4" height="4" />
        <rect x="224" y="120" width="2" height="2" />
      </g>
      {!compact && (
        <>
          <path d="M462 312h82v-30" stroke="#6d795d" strokeWidth="1" />
          <circle cx="462" cy="312" r="3" fill="#b5e878" />
          <text
            x="500"
            y="266"
            fill="#a4ad9b"
            fontFamily="monospace"
            fontSize="10"
            letterSpacing="2"
          >
            DIN NÆSTE VERDEN
          </text>
          <path d="M120 325H63v38" stroke="#6d795d" />
          <circle cx="120" cy="325" r="3" fill="#b5e878" />
          <text
            x="51"
            y="383"
            fill="#88917f"
            fontFamily="monospace"
            fontSize="10"
            letterSpacing="1"
          >
            BYG VIDERE.
          </text>
        </>
      )}
    </svg>
  );
}
