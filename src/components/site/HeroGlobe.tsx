/**
 * HeroGlobe.tsx — the interactive WebGL globe.
 *
 * This is now the site's only world map. The flat raster map it replaced
 * (`public/world-map.png`) was an illustration rather than a basemap: square
 * rather than 2:1 equirectangular — which silently broke the equirectangular
 * marker projection — and it carried a baked-in title block, legend, compass
 * rose and ocean labels that showed through as readable text wherever it was
 * used as a background.
 *
 * Built on `cobe`, already a dependency but unused before this.
 *
 * Data comes from lib/hubs — the same array that labels the region panel and
 * the /global-network chips, so nothing can drift.
 *
 * Engineering notes:
 *  - cobe is imported dynamically inside the effect: it touches WebGL so it
 *    must never run during SSR, and this splits it out of the initial bundle.
 *  - cobe v2 ships no animation loop; the caller owns the rAF and pushes
 *    rotation through `globe.update()`. That is what makes pausing possible.
 *  - The loop pauses when the globe scrolls out of view or the tab is hidden.
 *    An expo machine can sit on this page all day.
 *  - `prefers-reduced-motion` disables auto-rotation and the fly-to easing;
 *    the globe still renders and can still be dragged deliberately.
 *  - A CSS-only sphere is painted behind the canvas from first paint, and
 *    stays permanently on any failure (no WebGL, blocked context, chunk
 *    error). It covers the load gap as well as the failure case: creation is
 *    deferred to an idle callback, and without it the hero showed an empty
 *    square until the chunk arrived. Deliberately image-free, so the retired
 *    illustration is not reintroduced through the back door.
 */

import { useEffect, useRef, useState } from "react";
import type { Globe } from "cobe";
import {
  GLOBAL_HUBS,
  HQ_HUB,
  phiForLongitude,
  thetaForLatitude,
  type HubId,
} from "@/lib/hubs";

/* Brand palette as cobe's 0–1 RGB triples: gold #F5A623, and a mid-navy
   landmass that reads against the deep navy without adding a new colour. */
const GOLD: [number, number, number] = [0.961, 0.651, 0.137];
const LAND: [number, number, number] = [0.19, 0.33, 0.58];
const GLOW: [number, number, number] = [0.13, 0.25, 0.45];

const AUTO_SPIN_PER_FRAME = 0.0035;
const DRAG_SENSITIVITY = 0.006;
const RESUME_SPIN_DELAY_MS = 1600;
/** Per-frame fraction of the remaining angle when flying to a hub. */
const FLY_EASING = 0.075;

interface HeroGlobeProps {
  className?: string;
  /** When set, the globe rotates that hub to face the viewer and holds it. */
  focusHubId?: HubId | null;
}

/**
 * The static sphere shown before the WebGL globe is ready, and permanently if
 * WebGL is unavailable. Shared by both paths so the loading state and the
 * fallback cannot drift apart visually.
 */
const SPHERE_STYLE: React.CSSProperties = {
  background: "radial-gradient(circle at 34% 28%, #2a4a87 0%, #14294d 48%, #081428 100%)",
  boxShadow: "inset -14px -18px 46px rgba(0,0,0,0.65), 0 0 60px rgba(245,166,35,0.12)",
};

export function HeroGlobe({ className = "", focusHubId = null }: HeroGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  // Read inside the rAF loop, which must see changes without rebuilding the
  // globe (recreating the WebGL context on every selection would flicker).
  const focusRef = useRef<HubId | null>(focusHubId);
  useEffect(() => {
    focusRef.current = focusHubId;
  }, [focusHubId]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let disposed = false;
    let globe: Globe | null = null;
    let frame = 0;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let bootHandle: number | undefined;
    let bootIsIdleCallback = false;

    let phi = phiForLongitude(HQ_HUB.location[1]);
    let theta = 0.22;
    let size = 0;
    let visible = true;
    let dragging = false;
    let lastPointerX = 0;

    const prefersReduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let autoSpin = !prefersReduced();

    const create = (createGlobe: typeof import("cobe").default) => {
      globe?.destroy();
      globe = null;
      if (size <= 0) return;

      // Capped at 1.5, not 2. This globe renders at 280–360 CSS px, so 2x
      // meant ~518k pixels per frame against ~292k at 1.5 — a 44% cut in both
      // creation cost and per-frame cost for no visible difference at this
      // size. Lighthouse traced the homepage's entire Total Blocking Time to
      // globe creation.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = size * dpr;
      canvas.height = size * dpr;

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi,
        theta,
        dark: 1,
        diffuse: 1.25,
        // 16000 is cobe's showcase value, sized for a full-width globe.
        // Halved: the dot map is generated by sampling on the main thread at
        // creation, and at this diameter the extra samples land on top of each
        // other.
        mapSamples: 8000,
        mapBrightness: 5.2,
        baseColor: LAND,
        markerColor: GOLD,
        glowColor: GLOW,
        markers: GLOBAL_HUBS.map((hub) => ({
          location: hub.location,
          size: hub.isHQ ? 0.1 : 0.055,
        })),
        // Trade corridors, HQ → every regional hub.
        arcs: GLOBAL_HUBS.filter((hub) => !hub.isHQ).map((hub) => ({
          from: HQ_HUB.location,
          to: hub.location,
        })),
        arcColor: GOLD,
        // A low, tight arc. At the previous 0.35 the corridors bulged a third
        // of the globe's radius above the surface, so they read as free-floating
        // ribbons rather than lines joining two markers — the endpoints visually
        // detached from the dots they connect. Hugging the sphere makes each
        // corridor legibly run HQ → hub and rotate with the globe.
        arcWidth: 0.28,
        arcHeight: 0.16,
      });
    };

    /** Shortest signed angular distance, so the globe never spins the long way. */
    const shortestDelta = (target: number, current: number) => {
      const twoPi = Math.PI * 2;
      let d = (target - current) % twoPi;
      if (d > Math.PI) d -= twoPi;
      if (d < -Math.PI) d += twoPi;
      return d;
    };

    const tick = () => {
      if (!disposed && visible && globe) {
        const focusId = focusRef.current;
        const focusHub = focusId ? GLOBAL_HUBS.find((h) => h.id === focusId) : undefined;

        if (focusHub && !dragging) {
          const targetPhi = phiForLongitude(focusHub.location[1]);
          const targetTheta = thetaForLatitude(focusHub.location[0]);
          if (prefersReduced()) {
            phi = targetPhi;
            theta = targetTheta;
          } else {
            phi += shortestDelta(targetPhi, phi) * FLY_EASING;
            theta += (targetTheta - theta) * FLY_EASING;
          }
        } else if (autoSpin && !dragging) {
          phi += AUTO_SPIN_PER_FRAME;
          theta += (0.22 - theta) * 0.02; // drift back to the neutral tilt
        }

        globe.update({ phi, theta });
      }
      frame = requestAnimationFrame(tick);
    };

    /* ── Pointer drag ─────────────────────────────────────────────── */
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastPointerX = event.clientX;
      autoSpin = false;
      clearTimeout(resumeTimer);
      canvas.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      phi += (event.clientX - lastPointerX) * DRAG_SENSITIVITY;
      lastPointerX = event.clientX;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      canvas.releasePointerCapture?.(event.pointerId);
      if (!prefersReduced()) {
        resumeTimer = setTimeout(() => {
          autoSpin = true;
        }, RESUME_SPIN_DELAY_MS);
      }
    };

    /* ── Pause when offscreen or backgrounded ─────────────────────── */
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
      },
      { threshold: 0.01 },
    );
    intersection.observe(wrap);

    const onVisibilityChange = () => {
      visible = !document.hidden && wrap.getBoundingClientRect().bottom > 0;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    /* ── Boot ─────────────────────────────────────────────────────── */
    let resize: ResizeObserver | undefined;

    /**
     * Run the boot once the browser has nothing more urgent to do.
     *
     * Creating the globe is a single long task — it compiles shaders and
     * samples the dot map synchronously. Firing it the moment the dynamic
     * import resolved put it straight on top of React hydration, producing one
     * 880 ms block during which the page could not respond to input at all.
     *
     * Only the SYNCHRONOUS work waits. The dynamic import is kicked off
     * immediately below, because a network fetch costs no main-thread time
     * until it resolves — delaying it too just added dead waiting.
     *
     * A static sphere is painted behind the canvas from first paint, so the
     * hero is never an empty box while this is pending.
     *
     * `requestIdleCallback` is unavailable in older Safari, hence the timeout
     * fallback. The 1500 ms cap stops a permanently busy page starving it.
     *
     * That cap was briefly lowered to 700 ms to make the globe appear sooner,
     * and it measurably hurt: creation landed back inside the Total Blocking
     * Time window and TBT rose from ~60 ms to a 140–440 ms spread. It is back
     * at 1500 ms because the static sphere behind the canvas already covers
     * the wait — there is nothing left to rush.
     */
    const scheduleBoot = (run: () => void) => {
      if (typeof requestIdleCallback === "function") {
        bootIsIdleCallback = true;
        bootHandle = requestIdleCallback(run, { timeout: 1500 });
      } else {
        bootHandle = window.setTimeout(run, 200);
      }
    };

    // Fetch the chunk now, run the expensive create() later. Marking the
    // rejection handled here stops an unmount-before-boot turning a failed
    // import into an unhandled rejection.
    const cobeModule = import("cobe");
    cobeModule.catch(() => {});

    const boot = async () => {
      try {
        const createGlobe = (await cobeModule).default;
        if (disposed) return;

        size = Math.round(wrap.clientWidth);
        create(createGlobe);
        setReady(true);
        frame = requestAnimationFrame(tick);

        // cobe fixes its render size at creation, so a width change means a
        // rebuild. Rounded and guarded so sub-pixel jitter cannot thrash it.
        resize = new ResizeObserver(() => {
          const next = Math.round(wrap.clientWidth);
          if (next === size || next <= 0) return;
          size = next;
          create(createGlobe);
        });
        resize.observe(wrap);

        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointermove", onPointerMove, { passive: true });
        canvas.addEventListener("pointerup", onPointerUp);
        canvas.addEventListener("pointercancel", onPointerUp);
      } catch (error) {
        console.error("HeroGlobe: WebGL globe unavailable —", error);
        if (!disposed) setFailed(true);
      }
    };

    scheduleBoot(() => {
      void boot();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(resumeTimer);
      if (bootHandle !== undefined) {
        if (bootIsIdleCallback) cancelIdleCallback(bootHandle);
        else clearTimeout(bootHandle);
      }
      intersection.disconnect();
      resize?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      globe?.destroy();
    };
  }, []);

  if (failed) {
    // CSS-only sphere. No raster fallback by design.
    return (
      <div className={`relative aspect-square w-full ${className}`} aria-hidden="true">
        <div className="absolute inset-[8%] rounded-full" style={SPHERE_STYLE} />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className}`}>
      {/*
        The same CSS sphere, painted IMMEDIATELY and always — not only on
        failure.

        Globe creation is deferred to an idle callback (see the boot below), and
        the canvas is transparent until `ready`. Without something behind it
        that left a visible hole in the hero for as long as it took the cobe
        chunk to arrive and compile — an empty square where the artwork should
        be, which reads as a broken page rather than a loading one.

        Now the sphere is there from first paint and the real globe cross-fades
        in over it. The two are deliberately the same size and colour ramp, so
        the swap reads as the globe resolving rather than as one thing being
        replaced by another.
      */}
      <div
        aria-hidden="true"
        className={`absolute inset-[8%] rounded-full transition-opacity duration-700 ease-out-soft ${
          ready ? "opacity-0" : "opacity-100"
        }`}
        style={SPHERE_STYLE}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`relative h-full w-full cursor-grab touch-none transition-opacity duration-700 ease-out-soft active:cursor-grabbing ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ contain: "layout paint size" }}
      />
    </div>
  );
}
