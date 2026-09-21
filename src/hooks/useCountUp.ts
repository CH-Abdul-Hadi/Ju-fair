import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value from 0 to `target` over `duration` ms,
 * using an ease-out cubic curve. Starts counting when `start` becomes true.
 */
export function useCountUp(
  target: number,
  duration = 1800,
  start = false
): number {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;

    // The global prefers-reduced-motion rule in styles.css only collapses CSS
    // animations; a requestAnimationFrame counter has to opt out itself.
    // Jump straight to the final figure — the number is the information, the
    // count-up is only decoration.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(target);
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      // Clamp BOTH ends. A rAF callback can fire with a timestamp earlier than
      // the one captured above — a frame already queued when the effect ran,
      // which is routine in a throttled or backgrounded tab. Clamping only the
      // top let `progress` go negative, and the ease-out cubic turns a negative
      // progress into a negative eased value: the stats rendered as "-73+",
      // "-1" and "$-1M+" instead of counting up.
      const elapsed = now - startTime;
      const progress = elapsed <= 0 ? 0 : Math.min(elapsed / duration, 1);
      // Ease-out cubic: fast start, smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.max(0, Math.floor(eased * target)));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, start]);

  return count;
}
