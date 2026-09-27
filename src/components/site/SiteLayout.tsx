import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { LocalizedLink } from "./LocalizedLink";
import { MagneticArea } from "./MagneticArea";
import { ScrollReveal } from "./ScrollReveal";
import { RouteArc } from "./RouteArc";
import { Photo } from "./Photo";
import { WhatsAppIcon, getWhatsAppLink } from "./WhatsAppIcon";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { HQ_COORDS, MEDIA, type MediaFile } from "@/lib/media";
import type { RoutePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* Skip link — the first tab stop on every page, hidden until focused. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {t(lang).nav.skipToContent}
      </a>

      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp label={t(lang).ui.whatsapp} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PageHero — the inner-page masthead.

   Left-aligned and editorial rather than a centred navy band: breadcrumb,
   eyebrow, a display-size title, and the subtitle set against a gold rule in
   its own column. An optional photograph sits under a directional ink wash so
   the type always has contrast, and the coordinate strip along the bottom ties
   every page back to Shanghai.

   The photo is decorative here (the page's own content carries the story), so
   it has empty alt text rather than an untranslated description.
   ───────────────────────────────────────────────────────────────────── */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: MediaFile;
  /** Extra content under the subtitle (stat chips, buttons). */
  children?: ReactNode;
}) {
  const { lang } = useLanguage();
  const tx = t(lang);

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {image && (
        <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
          <div className="sd-drift h-full w-full">
            <Photo file={image} alt="" sizes="100vw" priority className="opacity-50" />
          </div>
        </div>
      )}
      {/* Directional ink wash: solid behind the type, opening to the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, var(--color-ink) 18%, color-mix(in oklab, var(--color-ink) 78%, transparent) 52%, color-mix(in oklab, var(--color-primary) 40%, transparent) 100%), linear-gradient(0deg, var(--color-ink), transparent 45%)",
        }}
      />
      <div
        aria-hidden="true"
        className="bg-dots absolute inset-0 -z-10 text-white/[0.08] [mask-image:radial-gradient(ellipse_60%_70%_at_85%_20%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 30%, transparent), transparent 65%)",
        }}
      />
      <RouteArc className="absolute -bottom-24 -right-16 -z-10 hidden w-[560px] text-white opacity-60 md:block" />

      <div className="container-x pb-14 pt-32 md:pb-20 md:pt-40">
        <nav aria-label={tx.ui.breadcrumb} className="hero-animate">
          <ol className="meta flex flex-wrap items-center gap-2 text-white/55">
            <li>
              <LocalizedLink to="/" className="transition-colors hover:text-accent">
                {tx.nav.home}
              </LocalizedLink>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li aria-current="page" className="text-white/85">
              {title}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            {eyebrow && (
              <p className="eyebrow-light hero-animate" style={{ animationDelay: "80ms" }}>
                {eyebrow}
              </p>
            )}
            <h1 className="text-display font-extrabold text-white">
              <span className="line-mask">
                <span style={{ animationDelay: "120ms" }}>{title}</span>
              </span>
            </h1>
          </div>
          {(subtitle || children) && (
            <div className="hero-animate lg:col-span-5" style={{ animationDelay: "280ms" }}>
              {subtitle && (
                <p className="border-l-2 border-accent/70 pl-6 text-lede text-white/75">
                  {subtitle}
                </p>
              )}
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Coordinate strip. */}
      <div className="border-t border-white/10">
        <div className="container-x meta flex items-center justify-between gap-4 py-4 text-white/45">
          <span>JU FAIR GLOBAL · {tx.ui.hq}</span>
          <span className="hidden sm:inline">{HQ_COORDS}</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CtaBand — the closing decision point on every page.

   An inset ink panel carrying the hero skyline, so the page ends on the same
   image it opened with (on the homepage) or introduces it (everywhere else).
   ───────────────────────────────────────────────────────────────────── */
export function CtaBand({
  title,
  description,
  primary,
  secondary,
  className,
}: {
  title: string;
  description?: string;
  primary: { to: RoutePath; label: string };
  secondary?: { to: RoutePath; label: string };
  className?: string;
}) {
  return (
    <section className={cn("bg-surface section-pad", className)}>
      <div className="container-x">
        <ScrollReveal>
          <div className="relative isolate overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-white shadow-panel sm:px-12 md:px-16 md:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 -z-20 w-full overflow-hidden md:w-3/4"
            >
              <div className="sd-drift h-full w-full">
                <Photo
                  file={MEDIA.hero}
                  alt=""
                  sizes="(min-width: 768px) 75vw, 100vw"
                  className="opacity-60"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-ink) 25%, color-mix(in oklab, var(--color-ink) 70%, transparent) 60%, color-mix(in oklab, var(--color-ink) 30%, transparent))",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-24 -z-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 65%)",
              }}
            />
            <RouteArc className="absolute -right-6 -top-4 -z-10 w-[520px] text-white opacity-80" />

            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="text-section font-extrabold text-white">{title}</h2>
                {description && (
                  <p className="mt-6 max-w-[54ch] text-lede text-white/70">{description}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end">
                <MagneticArea>
                  <LocalizedLink to={primary.to} className="btn-primary">
                    {primary.label} <ArrowRight size={17} />
                  </LocalizedLink>
                </MagneticArea>
                {secondary && (
                  <LocalizedLink to={secondary.to} className="btn-light">
                    {secondary.label}
                  </LocalizedLink>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   FloatingWhatsApp — the fastest route to a human, once the visitor is
   actually reading. Hidden over the first screen so it never competes with
   the hero CTAs; `inert` while hidden so it is not a stray tab stop.
   Navy rather than WhatsApp green: the palette is fixed.
   ───────────────────────────────────────────────────────────────────── */
function FloatingWhatsApp({ label }: { label: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setShown(window.scrollY > 560);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      inert={!shown}
      className={cn(
        "fixed bottom-5 right-5 z-40 transition-all duration-500 ease-out-expo md:bottom-7 md:right-7",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="group flex items-center gap-3"
      >
        <span className="meta pointer-events-none hidden translate-x-2 rounded-full bg-ink px-4 py-2.5 text-white opacity-0 shadow-panel transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 md:block">
          {label}
        </span>
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-panel ring-1 ring-white/15 transition-all duration-300 ease-spring group-hover:-translate-y-1 group-hover:bg-accent group-hover:text-accent-ink">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-2 ring-accent/60 pulse-ring"
          />
          <WhatsAppIcon size={24} />
        </span>
      </a>
    </div>
  );
}
