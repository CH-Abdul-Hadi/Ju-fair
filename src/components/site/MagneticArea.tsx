/**
 * MagneticArea.tsx — makes a CTA drift slightly toward the cursor.
 *
 * The wrapper listens; the button inside moves. CSS custom properties inherit,
 * so `--px`/`--py` set on this element are readable by the `.btn-primary`
 * utility, which folds them into its own transform. That matters because
 * `.btn-primary` already animates transform on hover and active — writing an
 * inline transform onto the button itself would clobber the lift and the
 * press-down. Going through variables lets all three compose.
 *
 * It also sidesteps ref forwarding entirely, so this works with TanStack's
 * <Link>, a plain <a>, or a <button> without caring which.
 *
 * Inherits useParallaxPointer's opt-outs: no effect on touch, none under
 * `prefers-reduced-motion`.
 */

import type { ReactNode } from "react";
import { useParallaxPointer } from "@/hooks/useParallaxPointer";

export function MagneticArea({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useParallaxPointer<HTMLSpanElement>();

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
