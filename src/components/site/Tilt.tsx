/**
 * Tilt.tsx — 3D pointer tilt for card surfaces.
 *
 * Wraps a card and rotates it in perspective as the pointer crosses it, with a
 * gold specular sheen that tracks the same position. The wrapper owns the
 * rotation; the card inside keeps its own `card-elevated` hover lift, so the
 * two compose into one motion instead of fighting for the transform property.
 *
 * Reuses useParallaxPointer — it already publishes pointer position as
 * `--px`/`--py` (-1…1 from centre) and already opts out on touch devices and
 * for `prefers-reduced-motion`, which is exactly the contract tilt needs.
 */

import type { ReactNode } from "react";
import { useParallaxPointer } from "@/hooks/useParallaxPointer";

interface TiltProps {
  children: ReactNode;
  /** Maximum rotation in degrees at the card's edge. Keep it subtle. */
  max?: number;
  /** Render the gold specular highlight that follows the pointer. */
  sheen?: boolean;
  className?: string;
}

export function Tilt({ children, max = 5, sheen = true, className = "" }: TiltProps) {
  const ref = useParallaxPointer<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative h-full transition-transform duration-300 ease-out-soft [transform-style:preserve-3d] ${className}`}
      style={{
        // rotateX is negated: pointer below centre should tip the card's far
        // edge away from the viewer, not toward them.
        transform: `perspective(1000px) rotateX(calc(var(--py, 0) * ${-max}deg)) rotateY(calc(var(--px, 0) * ${max}deg))`,
      }}
    >
      {children}

      {sheen && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-300 ease-out-soft [transform:translateZ(1px)] group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(22rem 22rem at calc(50% + var(--px, 0) * 50%) calc(50% + var(--py, 0) * 50%), rgba(245,166,35,0.14) 0, transparent 60%)",
          }}
        />
      )}
    </div>
  );
}
