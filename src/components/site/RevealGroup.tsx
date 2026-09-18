/**
 * RevealGroup / RevealItem — choreographed reveals for a grid of cards.
 *
 * `ScrollReveal` gives every element its own IntersectionObserver, so in a
 * multi-row grid each card fires the moment it personally crosses the
 * threshold. Rows then pop independently — the "popcorn" effect — and the
 * per-card `delay` props stop reading as a sequence.
 *
 * RevealGroup observes the grid ONCE and hands visibility down by context, so
 * every child cascades from a single trigger and the stagger is actually the
 * choreography it was written to be.
 *
 * Use for grids. A lone element is still better served by <ScrollReveal>.
 */

import { createContext, useContext, type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const GroupVisibility = createContext(false);

/**
 * Read the enclosing RevealGroup's visibility.
 *
 * For children that need to animate something other than the standard
 * fade-and-rise — the About timeline draws its connecting rail with scaleX off
 * this same trigger, so the rail and the year nodes stay in lockstep instead
 * of each running its own observer.
 */
export function useRevealGroup() {
  return useContext(GroupVisibility);
}

type Direction = "up" | "left" | "right";

// Matches ScrollReveal: horizontal offsets only from `sm` up, because a 32px
// sideways translate overflows a phone viewport and produces a horizontal
// scrollbar across the whole site.
const HIDDEN_TRANSFORM: Record<Direction, string> = {
  up: "translate-y-8",
  left: "translate-y-8 sm:translate-y-0 sm:-translate-x-8",
  right: "translate-y-8 sm:translate-y-0 sm:translate-x-8",
};

export function RevealGroup({
  children,
  className = "",
  /** Fraction of the grid that must be visible before the cascade starts. */
  threshold = 0.1,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold });

  return (
    <div ref={ref} className={className}>
      <GroupVisibility.Provider value={visible}>{children}</GroupVisibility.Provider>
    </div>
  );
}

export function RevealItem({
  children,
  index = 0,
  /** Milliseconds between consecutive items. */
  step = 90,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  index?: number;
  step?: number;
  direction?: Direction;
  className?: string;
}) {
  const visible = useContext(GroupVisibility);

  return (
    <div
      className={[
        "transition-all duration-700 ease-out-expo",
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${HIDDEN_TRANSFORM[direction]}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      // Only stagger on the way in; leaving (when `once` is false) should be
      // immediate rather than replaying the cascade backwards.
      style={visible && index ? { transitionDelay: `${index * step}ms` } : undefined}
    >
      {children}
    </div>
  );
}
