import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Direction = "up" | "left" | "right";

interface Props {
  children: ReactNode;
  /** Stagger delay in ms — pass multiples of 100–150 for sequential reveals */
  delay?: number;
  /** Extra classes applied to the wrapper div */
  className?: string;
  /** Which direction the element slides in from (default: "up") */
  direction?: Direction;
  /** IntersectionObserver threshold (default: 0.15) */
  threshold?: number;
}

const hiddenTransforms: Record<Direction, string> = {
  up: "translate-y-8",
  left: "-translate-x-8",
  right: "translate-x-8",
};

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  threshold,
}: Props) {
  const { ref, visible } = useScrollReveal({ threshold });

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${hiddenTransforms[direction]}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
