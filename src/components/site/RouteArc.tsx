import { cn } from "@/lib/utils";

/**
 * RouteArc — the site's signature ornament: a gold trade corridor arcing
 * between two nodes, with dashes travelling along it toward the destination.
 *
 * Purely decorative. It draws in a fixed 600×300 box and is scaled by the
 * caller's classes, so it can sit behind a hero, a CTA or a card corner.
 * The dash flow is `motion-safe` only; under reduced motion the corridor is
 * drawn static.
 */
export function RouteArc({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 300"
      fill="none"
      className={cn("pointer-events-none", className)}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* Secondary, fainter corridor for depth. */}
      <path
        d="M40 270 C 170 40, 430 10, 580 150"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="1"
      />
      <path
        d="M20 250 C 160 90, 390 60, 560 60"
        stroke="var(--color-accent)"
        strokeOpacity="0.35"
        strokeWidth="1.25"
      />
      <path
        d="M20 250 C 160 90, 390 60, 560 60"
        stroke="var(--color-accent)"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="route-flow"
        strokeDasharray="4 8"
      />
      {/* Origin and destination nodes. */}
      <circle cx="20" cy="250" r="4" fill="var(--color-accent)" />
      <circle
        cx="560"
        cy="60"
        r="10"
        stroke="var(--color-accent)"
        strokeOpacity="0.5"
        className="pulse-ring"
      />
      <circle cx="560" cy="60" r="5" fill="var(--color-accent)" />
      <circle cx="580" cy="150" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="40" cy="270" r="3" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}
