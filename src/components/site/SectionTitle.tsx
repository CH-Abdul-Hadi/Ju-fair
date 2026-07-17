export function SectionTitle({
  eyebrow,
  title,
  align = "center",
  description,
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  description?: string;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {/* Line 1: Eyebrow */}
      {eyebrow && (
        <p className="eyebrow">{eyebrow}</p>
      )}
      {/* Line 2: Main heading — 38px */}
      <h2 className="text-[38px] font-bold text-primary leading-[1.2] mt-2">
        {title}
      </h2>
      {/* Line 3: Description (optional) */}
      {description && (
        <p className="mt-4 text-[18px] text-muted-foreground leading-[1.6]">
          {description}
        </p>
      )}
      {/* Accent underline */}
      <div className={`mt-5 h-1 w-12 rounded-full bg-accent
                       ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}
