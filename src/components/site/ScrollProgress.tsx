/**
 * ScrollProgress.tsx — thin gold reading-progress bar pinned to the top.
 *
 * Sits above the header (z-[60] vs the header's z-50) so it stays visible
 * through the header's transparent → solid transition.
 *
 * Writes `scaleX` straight to the node from inside a rAF rather than going
 * through React state: this updates on every scroll frame, and re-rendering
 * the whole layout tree that often would be wasteful. The bar is progress
 * feedback rather than decoration, so it stays on under `prefers-reduced-
 * motion` — it just loses its easing transition.
 */

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? Math.min(doc.scrollTop / scrollable, 1) : 0;
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
      // Hide the bar entirely at the very top so it doesn't sit as a stray
      // dot over the hero.
      bar.style.opacity = progress > 0.002 ? "1" : "0";
    };

    const onScroll = () => {
      if (frame) return; // already queued for this frame
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-accent to-accent-hover opacity-0 transition-opacity duration-300 ease-out-soft"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
