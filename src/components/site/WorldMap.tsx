import { useMemo } from "react";

interface Marker {
  x: number;
  y: number;
  label: string;
}

// Simple dotted world map SVG background component
export function WorldMap({
  className = "",
  highlighted = false,
}: {
  className?: string;
  highlighted?: boolean;
}) {
  // Generate the dotted world map continent shapes deterministically
  const dots = useMemo(() => {
    return [
      // North America (Alaska, Canada, US, Mexico)
      ...gen(80, 50, 180, 60, 0.45, 100),
      ...gen(120, 110, 110, 50, 0.45, 200),
      ...gen(130, 160, 50, 50, 0.35, 300),

      // South America
      ...gen(210, 210, 80, 80, 0.45, 400),
      ...gen(220, 290, 45, 90, 0.35, 500),

      // Europe
      ...gen(460, 30, 60, 40, 0.4, 600),
      ...gen(430, 70, 90, 50, 0.45, 700),
      ...gen(420, 120, 70, 30, 0.35, 800),

      // Africa
      ...gen(430, 150, 100, 70, 0.45, 900),
      ...gen(470, 220, 60, 90, 0.4, 1000),
      ...gen(540, 270, 20, 40, 0.3, 1100),

      // Asia
      ...gen(520, 40, 260, 60, 0.45, 1200),
      ...gen(540, 100, 220, 80, 0.45, 1300),
      ...gen(500, 160, 70, 50, 0.35, 1400),
      ...gen(590, 180, 50, 50, 0.4, 1500),
      ...gen(650, 200, 70, 60, 0.4, 1600),
      ...gen(730, 110, 30, 60, 0.35, 1700),

      // Oceania
      ...gen(680, 250, 80, 40, 0.35, 1800),
      ...gen(720, 290, 90, 60, 0.4, 1900),
      ...gen(800, 340, 20, 40, 0.3, 2000),
    ];
  }, []);

  const markers: Marker[] = [
    { x: 140, y: 130, label: "North America Hub (New York)" },
    { x: 230, y: 260, label: "South America Hub (São Paulo)" },
    { x: 470, y: 110, label: "Europe Hub (Frankfurt)" },
    { x: 500, y: 240, label: "Africa Hub (Nairobi)" },
    { x: 620, y: 140, label: "Middle East Hub (Dubai)" },
    { x: 720, y: 290, label: "Asia-Pacific Hub (Sydney)" },
  ];

  return (
    <svg viewBox="0 0 900 400" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill="currentColor" opacity={0.5} />
      ))}
      {highlighted &&
        markers.map((m, i) => (
          <g key={`m${i}`} className="group cursor-pointer">
            <title>{m.label}</title>
            {/* Outermost pulsing ring — CSS keyframe animation */}
            <circle
              cx={m.x}
              cy={m.y}
              r={11}
              fill="#F5A623"
              className={`map-marker-pulse`}
              style={{
                animationDelay: `${(i * 0.4) % 1.6}s`,
                opacity: 0.2,
              }}
            />
            {/* Outer hover boundary */}
            <circle
              cx={m.x}
              cy={m.y}
              r={9}
              fill="#F5A623"
              className="opacity-20 transition-all duration-300 group-hover:opacity-40"
            />
            {/* Middle ring */}
            <circle
              cx={m.x}
              cy={m.y}
              r={6}
              fill="#F5A623"
              className="opacity-45 transition-all duration-300 group-hover:opacity-70"
            />
            {/* Core dot */}
            <circle
              cx={m.x}
              cy={m.y}
              r={3}
              fill="#F5A623"
              className="transition-all duration-300 group-hover:fill-white"
            />
          </g>
        ))}
    </svg>
  );
}

// Seeded deterministic pseudo-random generator
function gen(
  x: number,
  y: number,
  w: number,
  h: number,
  density: number,
  seed: number,
): [number, number][] {
  const step = 10;
  const out: [number, number][] = [];

  for (let i = 0; i < w; i += step) {
    for (let j = 0; j < h; j += step) {
      // Seed varies per grid coordinate to avoid simple pattern repetitions
      const pointSeed = seed + i * 31 + j * 17;
      const rand = Math.abs(Math.sin(pointSeed)) * 10000;
      const val = rand - Math.floor(rand);
      if (val < density) {
        out.push([x + i, y + j]);
      }
    }
  }
  return out;
}
