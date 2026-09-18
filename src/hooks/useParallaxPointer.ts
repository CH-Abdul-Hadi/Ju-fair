import { useEffect, useRef } from "react";

/**
 * Tracks the pointer across an element and publishes its position as two CSS
 * custom properties on that element: `--px` and `--py`, each normalised to
 * roughly -1 … 1 from the element's centre.
 *
 * Child layers then opt into the effect purely in CSS, e.g.
 *   transform: translate3d(calc(var(--px, 0) * -10px), calc(var(--py, 0) * -10px), 0)
 *
 * Why custom properties instead of React state: a pointermove handler that
 * calls setState re-renders the whole hero on every frame. Writing the two
 * variables straight to the node keeps the effect entirely on the compositor
 * and costs zero React renders.
 *
 * Opts out automatically when:
 *   - the device has no fine pointer (touch — there is no cursor to follow), or
 *   - the visitor asked for reduced motion.
 * In both cases `--px`/`--py` are never set, so the `var(..., 0)` fallbacks
 * leave every layer at rest.
 */
export function useParallaxPointer<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;

    const write = (x: number, y: number) => {
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
    };

    const onMove = (event: PointerEvent) => {
      // Coalesce to one write per frame; pointermove can fire far more often.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        write(
          ((event.clientX - rect.left) / rect.width - 0.5) * 2,
          ((event.clientY - rect.top) / rect.height - 0.5) * 2,
        );
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      write(0, 0); // ease every layer back to centre
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
    };
  }, []);

  return ref;
}
