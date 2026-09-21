/**
 * SectionDivider.tsx — the single transition shape between sections.
 *
 * Replaces three different ad-hoc techniques that were in use:
 *   1. `clipPath: polygon(...)` triangles on a bare div,
 *   2. inline <svg> waves repeated per call site,
 *   3. negative-margin overlaps (`-mt-20 pt-32`) on the following <section>,
 *      which had to be kept in sync by hand and broke at unusual viewports.
 *
 * One wave shape used everywhere gives the page a consistent seam language;
 * `flip` mirrors it so consecutive dividers alternate instead of repeating.
 *
 * Purely decorative, so it is hidden from assistive tech.
 */

type DividerVariant = "wave" | "slant";

interface SectionDividerProps {
  /** Background colour of the section ABOVE. */
  from: string;
  /** Background colour of the section BELOW — this is what the shape is filled with. */
  to: string;
  /** Shape language. Defaults to the wave used across the site. */
  variant?: DividerVariant;
  /** Mirror the shape vertically so adjacent dividers don't read as repeats. */
  flip?: boolean;
  className?: string;
}

const PATHS: Record<DividerVariant, string> = {
  // Gentle symmetric trough, matching the curve already used under the hero.
  wave: "M0,0 C480,64 960,64 1440,0 L1440,64 L0,64 Z",
  // Single diagonal sweep.
  slant: "M0,64 L1440,0 L1440,64 Z",
};

export function SectionDivider({
  from,
  to,
  variant = "wave",
  flip = false,
  className = "",
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      // leading-[0] stops the inline SVG from inheriting a text line-box,
      // which would otherwise leave a hairline gap under the shape.
      className={`relative w-full leading-[0] ${className}`}
      style={{ backgroundColor: from }}
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        fill={to}
        focusable="false"
        className="block w-full h-[clamp(32px,4.5vw,64px)]"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
      >
        <path d={PATHS[variant]} />
      </svg>
    </div>
  );
}
