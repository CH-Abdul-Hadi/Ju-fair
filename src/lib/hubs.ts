/**
 * hubs.ts — the global trade-hub network, as structural data.
 *
 * Coordinates and sizes only. Every human-readable string for a hub — label,
 * region, buyer count — lives in the translation object under
 * `globalNetwork.hubs`, keyed by the ids below, so the network speaks whichever
 * language the visitor chose.
 *
 * `HubId` is a union rather than `string` on purpose: adding a hub without
 * adding its copy is then a compile error, not a blank tooltip discovered at
 * the expo.
 *
 * This lived inside WorldMap.tsx until the flat raster map was retired in
 * favour of the WebGL globe. It is plain data with no rendering concerns, so
 * it belongs here rather than inside whichever component happens to draw it.
 */

export type HubId =
  | "shanghai"
  | "frankfurt"
  | "dubai"
  | "newyork"
  | "saopaulo"
  | "nairobi"
  | "sydney";

export interface HubMarker {
  id: HubId;
  /** [latitude, longitude] in degrees. */
  location: [number, number];
  /** Marker radius, in the globe renderer's own units. */
  size: number;
  isHQ?: boolean;
}

export const GLOBAL_HUBS: HubMarker[] = [
  { id: "shanghai", location: [31.2304, 121.4737], size: 0.1, isHQ: true },
  { id: "frankfurt", location: [50.1109, 8.6821], size: 0.07 },
  { id: "dubai", location: [25.2048, 55.2708], size: 0.07 },
  { id: "newyork", location: [40.7128, -74.006], size: 0.07 },
  { id: "saopaulo", location: [-23.5505, -46.6333], size: 0.06 },
  { id: "nairobi", location: [-1.2921, 36.8219], size: 0.06 },
  { id: "sydney", location: [-33.8688, 151.2093], size: 0.07 },
];

export const HQ_HUB = GLOBAL_HUBS.find((hub) => hub.isHQ) ?? GLOBAL_HUBS[0];

/** Longitude → the globe's phi, so a given hub faces the viewer. */
export function phiForLongitude(lng: number): number {
  return -(lng * Math.PI) / 180;
}

/** Latitude → the globe's theta tilt, clamped to a natural viewing range. */
export function thetaForLatitude(lat: number): number {
  const t = (lat / 90) * 0.5;
  return Math.max(-0.42, Math.min(0.42, t));
}
