import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "stacked" | "split";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Only applies to the `stacked` variant. */
  align?: "center" | "left";
  /**
   * `stacked` — eyebrow / title / description in one column.
   * `split`   — title left, description right, sharing a baseline. Breaks the
   *             page out of an unbroken run of centred headers, which is what
   *             makes a site read as a template rather than an editorial
   *             layout. Collapses to one column below `lg`.
   */
  variant?: Variant;
  /** Section ordinal ("01") set as a quiet numeral beside the eyebrow. */
  index?: string;
  /** `dark` for navy / ink sections. */
  tone?: "light" | "dark";
  /** Trailing element — a link or button — under the description. */
  action?: ReactNode;
  /** Heading level. Defaults to h2; exhibition/legal pages nest deeper. */
  as?: "h2" | "h3";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "stacked",
  index,
  tone = "light",
  action,
  as: Heading = "h2",
  className,
}: SectionTitleProps) {
  const dark = tone === "dark";

  const eyebrowRow = (eyebrow || index) && (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "center" && variant === "stacked" && "justify-center",
      )}
    >
      {/* Without an eyebrow the index takes its place, rule and all, so the
          heading never sits under a lone floating numeral. */}
      {eyebrow ? (
        <p className={cn(dark ? "eyebrow-light" : "eyebrow")}>{eyebrow}</p>
      ) : (
        <p aria-hidden="true" className={cn("tabular-nums", dark ? "eyebrow-light" : "eyebrow")}>
          {index}
        </p>
      )}
      {eyebrow && index && (
        <span
          aria-hidden="true"
          className={cn("meta mb-5", dark ? "text-white/45" : "text-primary/45")}
        >
          {index}
        </span>
      )}
    </div>
  );

  const heading = (
    <Heading
      className={cn(
        "text-section font-extrabold text-balance",
        dark ? "text-white" : "text-primary",
      )}
    >
      {title}
    </Heading>
  );

  if (variant === "split") {
    return (
      <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
        <div className="lg:col-span-7">
          {eyebrowRow}
          {heading}
        </div>
        {(description || action) && (
          <div className="lg:col-span-5 lg:pb-2">
            {description && (
              <p
                className={cn(
                  "max-w-[52ch] text-lede",
                  dark ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {description}
              </p>
            )}
            {action && <div className="mt-7">{action}</div>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrowRow}
      {heading}
      {description && (
        <p
          className={cn(
            "mt-6 max-w-[58ch] text-lede",
            align === "center" && "mx-auto",
            dark ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
