/**
 * ContactMap.tsx — Map Component with Dynamic Provider Selection
 *
 * Conditional Map Fallback Logic:
 * 1. Checks if the AMap (高德地图) API key (`VITE_AMAP_KEY`) is available in environment configuration.
 * 2. If AMap key is present and valid, renders AMap iframe embed for China & global performance.
 * 3. If AMap key is missing or not configured, seamlessly falls back to Google Maps embed iframe.
 */

interface ContactMapProps {
  latitude?: number;
  longitude?: number;
  locationName?: string;
  zoom?: number;
  className?: string;
}

export function ContactMap({
  latitude = 31.23,
  longitude = 121.47,
  locationName = "JU Fair Global",
  zoom = 15,
  className = "w-full h-80 rounded-[12px] border-0",
}: ContactMapProps) {
  // 1. Detect whether AMap API key is present and non-empty
  const amapKey = import.meta.env.VITE_AMAP_KEY;
  const hasAmapKey = Boolean(
    amapKey &&
    typeof amapKey === "string" &&
    amapKey.trim() !== "" &&
    amapKey !== "your_amap_js_api_key_here"
  );

  // 2. Determine Map Embed URL based on availability of AMap key
  let mapSrc: string;
  let providerName: string;

  if (hasAmapKey) {
    // ── Primary: AMap (高德地图) ──
    // Retains full existing AMap marker functionality
    mapSrc = `https://uri.amap.com/marker?position=${longitude},${latitude}&name=${encodeURIComponent(
      locationName
    )}&coordinate=gaode&zoom=${zoom}&key=${amapKey}`;
    providerName = "AMap (高德地图)";
  } else {
    // ── Fallback: Google Maps ──
    // Uses Google Maps embed API or iframe fallback when AMap key is unavailable
    const googleKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
    if (googleKey && typeof googleKey === "string" && googleKey.trim() !== "") {
      mapSrc = `https://www.google.com/maps/embed/v1/place?key=${googleKey}&q=${latitude},${longitude}&zoom=${zoom}`;
    } else {
      mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=${zoom}&output=embed`;
    }
    providerName = "Google Maps";
  }

  return (
    <iframe
      title={`Office location on ${providerName}`}
      src={mapSrc}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
