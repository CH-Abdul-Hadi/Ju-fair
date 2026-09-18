import type { ReactNode } from "react";

type Variant = "stacked" | "split";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Only applies to the `stacked` variant. */
  align?: "center" | "left";
  /**
   * `stacked` — eyebrow / title / description in a centred (or left) column.
   * `split`   — title on the left, description on the right, sharing a
   *             baseline rule. Breaks the page out of an unbroken run of
   *             centred headers, which is what makes a site read as a
   *             template rather than an editorial layout. Collapses to a
   *             single column below `lg`.
   */
  variant?: Variant;
  /** Optional trailing element in the split variant's right column. */
  action?: ReactNode;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "stacked",
  action,
}: SectionTitleProps) {
  if (variant === "split") {
    return (
      <div className="grid gap-6 border-b border-border pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="text-title font-bold text-primary text-balance">{title}</h2>
          <div className="mt-5 h-1 w-12 rounded-full bg-accent" />
        </div>

        {(description || action) && (
          <div className="lg:pb-1">
            {description && (
              // 62ch keeps the measure inside the comfortable reading range
              // even when the column is wide.
              <p className="max-w-[62ch] text-lede text-muted-foreground">{description}</p>
            )}
            {action && <div className="mt-6">{action}</div>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="text-title font-bold text-primary mt-2 text-balance">{title}</h2>
      {description && <p className="mt-4 text-lede text-muted-foreground">{description}</p>}
      <div
        className={`mt-5 h-1 w-12 rounded-full bg-accent ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}
