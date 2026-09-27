/**
 * WorldMap.tsx — the trade-corridor map on /global-network.
 *
 * Built on the client's `world-map.png`, which needs three corrections to be
 * usable as a basemap:
 *
 * 1. PROJECTION. The image is square (1024×1024) and roughly Mercator, not a
 *    2:1 equirectangular map, so the old `(90 - lat) / 180` maths put
 *    Shanghai over Mongolia. `project()` below is a least-squares fit against
 *    fourteen coastline landmarks (Gibraltar, Cape of Good Hope, Florida,
 *    Cape Horn, Singapore, Sydney …); residuals are under ~1% of the width.
 *
 * 2. CROP. The artwork carries a baked-in "GLOBAL MAP" title, a legend, a
 *    paper frame and Antarctica. The viewport below shows only the band that
 *    holds the trading world, so none of that renders.
 *
 * 3. COLOUR. A cream-and-steel map fights the navy palette. An SVG duotone
 *    filter remaps its luminance onto ink (oceans) and navy (land), so the
 *    same asset reads as part of the brand.
 *
 * Markers are aria-hidden: the hub directory beside the map is the keyboard
 * and screen-reader path to the same selection, and duplicating every hub as
 * a second unlabeled button would only add noise.
 */

import { useMemo, useState } from "react";
import { GLOBAL_HUBS, type HubId, type HubMarker } from "@/lib/hubs";
import { cn } from "@/lib/utils";

/* ── Calibration, in source-image pixels ─────────────────────────────── */
const SRC = 1024;
// Visible window: inside the paper frame horizontally; title/legend and the
// Southern Ocean labels cropped away vertically.
const VIEW = { x0: 27, x1: 997, y0: 143, y1: 819 };
const VIEW_W = VIEW.x1 - VIEW.x0; // 970
const VIEW_H = VIEW.y1 - VIEW.y0; // 676

function project([lat, lng]: [number, number]) {
  const x = 500.26 + 2.7566 * lng;
  const merc = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
  const y = 587.14 - 181.26 * merc;
  // Returned in the window's own coordinates (0…VIEW_W, 0…VIEW_H).
  // Rounded to 0.01px: Math.log/Math.tan differ in the last floating-point
  // digit between Node (SSR) and the browser, and the unrounded values made
  // every corridor path a hydration mismatch.
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(x - VIEW.x0), y: round(y - VIEW.y0) };
}

export interface WorldMapProps {
  className?: string;
  activeHubId?: HubId | null;
  onSelectHub?: (hub: HubMarker | null) => void;
  /** Short label per hub for the on-map tag. */
  labels: Record<HubId, string>;
}

export function WorldMap({ className, activeHubId, onSelectHub, labels }: WorldMapProps) {
  // A fixed id, not useId(): the server and client trees number useId
  // differently here, which produced a hydration mismatch on the filter
  // reference. There is only ever one map on a page.
  const filterId = "worldmap-duotone";
  const [hovered, setHovered] = useState<HubId | null>(null);

  const points = useMemo(() => GLOBAL_HUBS.map((hub) => ({ hub, ...project(hub.location) })), []);
  const hq = points.find((p) => p.hub.isHQ) ?? points[0];
  const focus = hovered ?? activeHubId ?? null;

  return (
    <div
      className={cn("relative w-full select-none overflow-hidden", className)}
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
    >
      {/* Duotone: grey → ink for the oceans (flattened), navy for land. */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <filter id={filterId} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.035 0.035 0.05 0.14" />
            <feFuncG type="table" tableValues="0.1 0.1 0.16 0.34" />
            <feFuncB type="table" tableValues="0.21 0.21 0.36 0.66" />
          </feComponentTransfer>
        </filter>
      </svg>

      <img
        src="/world-map.png"
        alt=""
        width={SRC}
        height={SRC}
        loading="lazy"
        decoding="async"
        className="absolute max-w-none"
        style={{
          width: `${(SRC / VIEW_W) * 100}%`,
          height: `${(SRC / VIEW_H) * 100}%`,
          left: `${(-VIEW.x0 / VIEW_W) * 100}%`,
          top: `${(-VIEW.y0 / VIEW_H) * 100}%`,
          filter: `url(#${filterId})`,
        }}
      />

      {/* Depth: vignette to the edges, dot texture over the oceans. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 55% 45%, transparent 40%, var(--color-ink) 100%)",
        }}
      />
      <div aria-hidden="true" className="bg-dots absolute inset-0 text-white/[0.05]" />

      {/* Corridors, drawn in the window's own units so nothing distorts. */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <radialGradient id={`${filterId}-glow`}>
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {points
          .filter((p) => !p.hub.isHQ)
          .map((p) => {
            const lift = Math.max(70, Math.hypot(p.x - hq.x, p.y - hq.y) * 0.32);
            const mx = Math.round(((hq.x + p.x) / 2) * 100) / 100;
            const my = Math.round((Math.min(hq.y, p.y) - lift) * 100) / 100;
            const d = `M ${hq.x} ${hq.y} Q ${mx} ${my} ${p.x} ${p.y}`;
            const on = focus === p.hub.id || focus === "shanghai";
            const dim = focus !== null && !on;
            return (
              <g
                key={p.hub.id}
                className="transition-opacity duration-500"
                opacity={dim ? 0.18 : 1}
              >
                <path
                  d={d}
                  stroke="var(--color-accent)"
                  strokeOpacity={on ? 0.55 : 0.25}
                  strokeWidth={on ? 2 : 1.25}
                />
                <path
                  d={d}
                  stroke="var(--color-accent)"
                  strokeWidth={on ? 2.5 : 1.75}
                  strokeLinecap="round"
                  className="route-flow"
                  strokeDasharray="4 8"
                />
              </g>
            );
          })}
        {/* Soft glow under every node. */}
        {points.map((p) => (
          <circle
            key={p.hub.id}
            cx={p.x}
            cy={p.y}
            r={p.hub.isHQ ? 46 : 30}
            fill={`url(#${filterId}-glow)`}
          />
        ))}
      </svg>

      {/* Markers */}
      {points.map(({ hub, x, y }) => {
        const selected = activeHubId === hub.id;
        const showTag = hub.isHQ || selected || hovered === hub.id;
        return (
          <div
            key={hub.id}
            aria-hidden="true"
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` }}
          >
            <button
              type="button"
              tabIndex={-1}
              onClick={() => onSelectHub?.(selected ? null : hub)}
              onMouseEnter={() => setHovered(hub.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative grid h-8 w-8 place-items-center"
            >
              <span
                className={cn(
                  "absolute inset-1 rounded-full bg-accent/50 pulse-ring",
                  !hub.isHQ && "[animation-delay:0.8s]",
                )}
              />
              <span
                className={cn(
                  "relative rounded-full border-2 border-ink bg-accent shadow-[0_0_16px_var(--color-accent)] transition-transform duration-300 ease-spring",
                  hub.isHQ ? "h-4 w-4 ring-4 ring-accent/30" : "h-3 w-3",
                  (selected || hovered === hub.id) && "scale-150",
                )}
              />
            </button>
            <span
              className={cn(
                "pointer-events-none absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-display text-[11px] font-semibold shadow-lg transition-all duration-300 ease-out-expo",
                selected || hovered === hub.id
                  ? "bg-accent text-accent-ink opacity-100"
                  : "bg-ink/80 text-white/90 ring-1 ring-white/15",
                showTag ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              )}
            >
              {labels[hub.id]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
