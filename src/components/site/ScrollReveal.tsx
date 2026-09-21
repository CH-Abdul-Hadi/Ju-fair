import type { ReactNode, RefObject } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Direction = "up" | "left" | "right";

interface Props {
  children: ReactNode;
  /** Stagger delay in ms — pass multiples of 100–150 for sequential reveals */
  delay?: number;
  /** Extra classes applied to the wrapper element */
  className?: string;
  /** Which direction the element slides in from (default: "up") */
  direction?: Direction;
  /** IntersectionObserver threshold (default: 0.15) */
  threshold?: number;
  /**
   * Element to render (default: "div").
   *
   * Needed because a `<div>` is not a valid child of `<ul>` or `<ol>`. Wrapping
   * list items in a reveal produced `<ul><div><li>`, which fails the WCAG list
   * structure rules and — the part that actually matters — stops a screen
   * reader announcing "list, 4 items". Pass `as="li"` inside a list.
   */
  as?: "div" | "li";
}

// Horizontal reveals only from `sm` up. Below that the 32px offset pushed
// elements past the viewport edge — a `direction="right"` block started 12px
// outside a 400px screen — which gave the whole site a horizontal scrollbar on
// mobile. Phones get the vertical reveal instead; nothing is lost visually
// because a single-column layout reads top-to-bottom anyway.
const hiddenTransforms: Record<Direction, string> = {
  up: "translate-y-8",
  left: "translate-y-8 sm:translate-y-0 sm:-translate-x-8",
  right: "translate-y-8 sm:translate-y-0 sm:translate-x-8",
};

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  threshold,
  as = "div",
}: Props) {
  const { ref, visible } = useScrollReveal<HTMLElement>({ threshold });

  const classes = [
    // ease-out-expo decelerates far harder than Tailwind's default ease-out,
    // so reveals settle rather than drift — the shared entrance curve.
    "transition-all duration-700 ease-out-expo",
    visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenTransforms[direction]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  // Two explicit branches rather than a dynamic tag. The observer ref is typed
  // as the generic HTMLElement, and React's `ref` prop is invariant in the
  // element type, so a single `<Tag>` would not type-check against both. One
  // narrowing cast per branch is clearer than making the hook's type generic
  // enough to satisfy every possible tag.
  if (as === "li") {
    return (
      <li ref={ref as RefObject<HTMLLIElement>} className={classes} style={style}>
        {children}
      </li>
    );
  }

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={classes} style={style}>
      {children}
    </div>
  );
}
