/**
 * WorldMap.tsx — Real-World Map Component
 *
 * Renders a high-resolution real-world map background overlayed with:
 *  - Animated trade corridor connection lines emanating from Shanghai HQ
 *  - Interactive pulsing markers for global trade hubs
 *  - Rich tooltips and active hub card details
 */

import { useState, useMemo } from "react";

/* ── Hub marker definition ────────────────────────────────────────── */
export interface HubMarker {
  id: string;
  location: [number, number]; // [lat, lng]
  size: number;
  label: string;
  region: string;
  buyers: string;
  isHQ?: boolean;
}

export const GLOBAL_HUBS: HubMarker[] = [
  { id: "shanghai",  location: [31.2304,  121.4737], size: 0.10, label: "JU FAIR HQ (Shanghai)",        region: "East Asia",     buyers: "1,200+ Global Partners", isHQ: true },
  { id: "frankfurt", location: [50.1109,    8.6821], size: 0.07, label: "Europe Hub (Frankfurt)",        region: "Europe",        buyers: "850+ Verified Buyers" },
  { id: "dubai",     location: [25.2048,   55.2708], size: 0.07, label: "Middle East Hub (Dubai)",       region: "Middle East",   buyers: "600+ Verified Buyers" },
  { id: "newyork",   location: [40.7128,  -74.0060], size: 0.07, label: "North America Hub (New York)",  region: "North America", buyers: "750+ Verified Buyers" },
  { id: "saopaulo",  location: [-23.5505, -46.6333], size: 0.06, label: "South America Hub (São Paulo)", region: "Latin America", buyers: "400+ Verified Buyers" },
  { id: "nairobi",   location: [-1.2921,   36.8219], size: 0.06, label: "Africa Hub (Nairobi)",          region: "Africa",        buyers: "350+ Verified Buyers" },
  { id: "sydney",    location: [-33.8688, 151.2093], size: 0.07, label: "Asia-Pacific Hub (Sydney)",     region: "Oceania",       buyers: "500+ Verified Buyers" },
];

/* ── Convert [lat, lng] to percentage coordinates on map ────────────── */
function latLngToPercent([lat, lng]: [number, number]): { x: number; y: number } {
  // Equirectangular projection formula with calibrated offsets for standard 2:1 world maps
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
}

/* ── Props ─────────────────────────────────────────────────────────── */
export interface WorldMapProps {
  className?: string;
  highlighted?: boolean;
  activeHubId?: string | null;
  onSelectHub?: (hub: HubMarker | null) => void;
  viewMode?: "3d" | "2d";
  mapImageSrc?: string;
}

/* ── Component ─────────────────────────────────────────────────────── */
export function WorldMap({
  className = "",
  highlighted = false,
  activeHubId,
  onSelectHub,
  mapImageSrc = "/world-map.png",
}: WorldMapProps) {
  const [hoveredHub, setHoveredHub] = useState<HubMarker | null>(null);

  const activeHub = useMemo(
    () => GLOBAL_HUBS.find((h) => h.id === activeHubId) || null,
    [activeHubId]
  );

  const hqPos = useMemo(() => {
    const hq = GLOBAL_HUBS.find((h) => h.isHQ) || GLOBAL_HUBS[0];
    return latLngToPercent(hq.location);
  }, []);

  return (
    <div className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Container for Real-World Map & Overlay SVG */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#07172B] group">
        
        {/* Real-World Map Image */}
        <img
          src={mapImageSrc}
          alt="Real World Map — Global Network"
          className="w-full h-auto object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100 min-h-[260px]"
          loading="lazy"
        />

        {/* Subtle Gradient Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/60 via-transparent to-[#0B1D3A]/30 pointer-events-none" />

        {/* SVG Layer for Animated Trade Corridor Arcs */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="tradeArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {GLOBAL_HUBS.filter((h) => !h.isHQ).map((hub) => {
            const pos = latLngToPercent(hub.location);
            // Draw smooth curved arc connecting HQ to Hub
            const midX = (hqPos.x + pos.x) / 2;
            const midY = Math.min(hqPos.y, pos.y) - 12; // curved apex
            const isActive = activeHubId === hub.id || activeHubId === "shanghai";

            return (
              <g key={hub.id}>
                {/* Background Arc */}
                <path
                  d={`M ${hqPos.x} ${hqPos.y} Q ${midX} ${midY} ${pos.x} ${pos.y}`}
                  fill="none"
                  stroke="url(#tradeArcGrad)"
                  strokeWidth={isActive ? "0.6" : "0.35"}
                  strokeDasharray="1.5 1.5"
                  opacity={isActive ? 0.9 : 0.4}
                />
              </g>
            );
          })}
        </svg>

        {/* Interactive Hub Markers */}
        {GLOBAL_HUBS.map((hub) => {
          const { x, y } = latLngToPercent(hub.location);
          const isSelected = activeHubId === hub.id;
          const isHovered = hoveredHub?.id === hub.id;

          return (
            <div
              key={hub.id}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group/pin"
              onClick={() => onSelectHub?.(isSelected ? null : hub)}
              onMouseEnter={() => setHoveredHub(hub)}
              onMouseLeave={() => setHoveredHub(null)}
            >
              {/* Outer Pulse Ring */}
              <div
                className={`absolute inset-0 -m-2 rounded-full transition-transform duration-300 ${
                  hub.isHQ ? "bg-[#FFD700]/40" : "bg-[#F5A623]/30"
                } ${isSelected ? "animate-ping scale-150" : "animate-pulse"}`}
              />

              {/* Marker Pin */}
              <div
                className={`relative rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-lg ${
                  hub.isHQ
                    ? "w-5 h-5 bg-[#FFD700] border-white text-black font-extrabold text-[10px]"
                    : isSelected
                    ? "w-4.5 h-4.5 bg-accent border-white scale-125"
                    : "w-3.5 h-3.5 bg-accent/90 border-white/80 hover:scale-125"
                }`}
              >
                {hub.isHQ && "★"}
              </div>

              {/* Marker Label */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap backdrop-blur-md shadow-md border transition-all duration-200 pointer-events-none ${
                  isSelected || isHovered
                    ? "bg-accent text-white border-accent scale-105 z-30"
                    : "bg-black/75 text-white/90 border-white/20 opacity-80"
                }`}
              >
                {hub.isHQ ? "⭐ Shanghai HQ" : hub.region}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected / Active Hub Info Card */}
      {highlighted && activeHub && (
        <div className="mt-4 bg-[#0B1D3A]/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-accent/40 backdrop-blur-md text-center max-w-sm z-30 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-accent">
              {activeHub.isHQ ? "⭐ Global HQ" : activeHub.region}
            </span>
          </div>
          <div className="text-[15px] font-bold text-white">{activeHub.label}</div>
          <div className="text-[13px] text-white/80 mt-1">{activeHub.buyers}</div>
        </div>
      )}
    </div>
  );
}
