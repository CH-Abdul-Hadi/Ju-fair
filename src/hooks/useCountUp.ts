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

    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease-out cubic: fast start, smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, start]);

  return count;
}
