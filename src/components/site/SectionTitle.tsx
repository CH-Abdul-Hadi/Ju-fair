export function SectionTitle({
  eyebrow,
  title,
  align = "center",
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  subtitle?: string;
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-primary">{title}</h2>
      <div className={`mt-3 h-1 w-16 bg-accent rounded ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && (
        <p
          className={`mt-4 text-muted-foreground max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
