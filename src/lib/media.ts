/**
 * media.ts — every photograph the site uses, as physical facts only.
 *
 * Intrinsic dimensions let the browser reserve space before decode (no layout
 * shift). `base` drives the 600w / 1200w WebP srcset; `src` is the fallback
 * and, for the JPEGs, also the og:image source. Alt text is content, so it is
 * passed in by the caller — the four expo photos use the translated
 * `experience.gallery.captions`, in this same order.
 */

export interface MediaFile {
  /** Prefix of the `-600.webp` / `-1200.webp` variants, when they exist. */
  base?: string;
  src: string;
  w: number;
  h: number;
}

export const MEDIA = {
  expo1: { base: "/Expo/expo1", src: "/Expo/expo1.jpeg", w: 1038, h: 692 },
  expo2: { base: "/Expo/expo2", src: "/Expo/expo2.jpeg", w: 1280, h: 853 },
  expo3: { base: "/Expo/expo3", src: "/Expo/expo3.jpeg", w: 1280, h: 853 },
  expo4: { base: "/Expo/expo4", src: "/Expo/expo4.jpeg", w: 1280, h: 853 },
  deal: { base: "/images/business-deal", src: "/images/business-deal.webp", w: 1200, h: 800 },
  evening: {
    base: "/images/networking-evening",
    src: "/images/networking-evening.webp",
    w: 1200,
    h: 800,
  },
  hero: { src: "/hero.webp", w: 1774, h: 887 },
} satisfies Record<string, MediaFile>;

/** The expo photos, in the order of `experience.gallery.captions`. */
export const EXPO_PHOTOS = [MEDIA.expo1, MEDIA.expo2, MEDIA.expo3, MEDIA.expo4] as const;

/** Headquarters, as printed on the coordinate stamps. */
export const HQ_COORDS = "31.23° N · 121.47° E";
