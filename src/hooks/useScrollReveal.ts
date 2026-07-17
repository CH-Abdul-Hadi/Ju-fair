import { useEffect, useRef, useState } from "react";

interface Options {
  /** 0–1 — how much of the element must be visible before triggering. Default: 0.15 */
  threshold?: number;
  /** Shrinks the root viewport to trigger earlier/later. Default: "0px 0px -60px 0px" */
  rootMargin?: string;
  /** When true, animation only fires once and observer disconnects. Default: true */
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frameId: number;
    let obs: IntersectionObserver | null = null;

    // Defer observer creation by one animation frame.
    //
    // Context: on page navigation, the router root uses useLayoutEffect to
    // scroll to the top (which fires before paint). This useEffect fires
    // AFTER paint — but browsers may still be asynchronously repositioning
    // the viewport. Waiting one rAF (the next paint opportunity) guarantees
    // the scroll position is fully settled at 0 before we start observing,
    // preventing observers from firing during the browser's scroll reset.
    frameId = requestAnimationFrame(() => {
      const currentEl = ref.current;
      if (!currentEl) return; // element unmounted during the frame — bail safely

      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs!.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        },
        { threshold, rootMargin }
      );

      obs.observe(currentEl);
    });

    return () => {
      cancelAnimationFrame(frameId);
      obs?.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}
