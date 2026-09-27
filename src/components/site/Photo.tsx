import type { MediaFile } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * One photograph, served as WebP with the original as fallback.
 *
 * A <picture> rather than swapping `src` outright: the JPEGs have to stay
 * anyway (they are og:image sources, and WebP share cards are unreliable in
 * messaging clients), so the fallback costs nothing.
 *
 * `sizes` must describe the real rendered width — it is what stops a phone
 * downloading the 1200w file for a 300px slot.
 */
export function Photo({
  file,
  alt,
  sizes,
  className,
  priority = false,
}: {
  file: MediaFile;
  alt: string;
  sizes: string;
  className?: string;
  /** Above-the-fold: eager, high fetch priority. Everything else is lazy. */
  priority?: boolean;
}) {
  return (
    <picture className="contents">
      {file.base && (
        <source
          type="image/webp"
          srcSet={`${file.base}-600.webp 600w, ${file.base}-1200.webp 1200w`}
          sizes={sizes}
        />
      )}
      <img
        src={file.src}
        alt={alt}
        width={file.w}
        height={file.h}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={cn("h-full w-full object-cover", className)}
      />
    </picture>
  );
}
