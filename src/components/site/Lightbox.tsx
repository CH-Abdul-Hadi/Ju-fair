/**
 * Lightbox.tsx — full-screen gallery viewer for the /experience photos.
 *
 * Built on @radix-ui/react-dialog, which the project already depends on. That
 * is deliberate: a modal needs a focus trap, focus restoration on close,
 * `aria-modal` semantics, background scroll locking and Escape handling, and
 * hand-rolling those is exactly where accessibility bugs live. Radix gives all
 * of it; this file adds only what Radix does not cover — arrow-key paging,
 * the counter, and the styling.
 *
 * Note this is the first use of a Radix primitive in the site layer. It is
 * used directly rather than through src/components/ui/dialog.tsx, whose
 * shadcn styling assumes a small centred panel with a close button, not a
 * full-bleed image stage.
 *
 * Phase 1 removed the "open" arrow from the gallery tiles because nothing
 * opened; it comes back with this, now that the affordance is real.
 */

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

export interface LightboxPhoto {
  src: string;
  w: number;
  h: number;
  alt: string;
}

interface LightboxProps {
  photos: LightboxPhoto[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  /** Accessible name for the dialog, and labels for the paging controls. */
  labels: { dialog: string; previous: string; next: string; close: string };
}

export function Lightbox({ photos, index, onIndexChange, labels }: LightboxProps) {
  const isOpen = index !== null;
  const photo = index === null ? undefined : photos[index];

  const step = useCallback(
    (delta: number) => {
      if (index === null || photos.length === 0) return;
      // Wrap around so paging never dead-ends.
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange],
  );

  // Arrow-key paging. Radix already owns Escape and the focus trap.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, step]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onIndexChange(null)}>
      <Dialog.Portal>
        {/* No exit animations here, deliberately.
            This version of tw-animate-css defines `animate-in` (keyframes
            `enter`) but NOT `animate-out` — a `data-[state=closed]:animate-out`
            class resolves to `animation-name: exit` with no matching keyframe,
            so `animationend` never fires. Radix keeps an exiting element
            mounted until that event arrives, which left this full-screen
            z-[101] overlay in the DOM at opacity 1 with pointer-events auto
            after every close, swallowing all clicks on the site.
            Enter-only means Radix unmounts immediately and reliably. */}
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-[#04101f]/92 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />

        <Dialog.Content
          aria-label={labels.dialog}
          className="fixed inset-0 z-[101] flex flex-col items-center justify-center p-4 focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 sm:p-8"
        >
          {/* Radix requires an accessible title; it is announced, not shown. */}
          <Dialog.Title className="sr-only">{labels.dialog}</Dialog.Title>

          {photo && (
            <figure className="flex max-h-full flex-col items-center gap-4">
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.w}
                height={photo.h}
                // Not lazy: this is the one thing the visitor asked to see.
                decoding="async"
                className="max-h-[74vh] w-auto max-w-full rounded-[14px] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
              />
              <figcaption className="max-w-2xl text-center text-[14px] leading-relaxed text-white/75">
                {photo.alt}
              </figcaption>
            </figure>
          )}

          {/* ── Controls ── */}
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={labels.previous}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-200 ease-out-soft hover:bg-accent hover:text-accent-ink"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="min-w-[4.5rem] text-center text-[13px] font-bold tabular-nums tracking-[0.18em] text-white/70">
              {(index ?? 0) + 1} / {photos.length}
            </span>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label={labels.next}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-200 ease-out-soft hover:bg-accent hover:text-accent-ink"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <Dialog.Close
            aria-label={labels.close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-200 ease-out-soft hover:bg-accent hover:text-accent-ink sm:right-8 sm:top-8"
          >
            <X size={20} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
