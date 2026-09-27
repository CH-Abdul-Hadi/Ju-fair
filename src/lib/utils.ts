import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about the fluid type steps defined in
 * styles.css. Out of the box it reads `text-section` as a text COLOUR, so
 * `cn("text-section", "text-primary")` silently dropped the font size and
 * every heading built through `cn()` collapsed to body size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["mega", "hero", "display", "section", "title", "stat", "heading", "lede"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
