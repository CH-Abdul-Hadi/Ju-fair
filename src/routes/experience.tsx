import { createFileRoute } from "@tanstack/react-router";
import { useState, type ElementType } from "react";
import { SiteLayout, PageHero, CtaBand } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { RevealGroup, RevealItem } from "@/components/site/RevealGroup";
import { Photo } from "@/components/site/Photo";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { EXHIBITION_ROUTES } from "@/lib/paths";
import { EXPO_PHOTOS, MEDIA } from "@/lib/media";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Users,
  Award,
  Globe2,
  ArrowDown,
  ArrowRight,
  Maximize2,
  ShoppingBag,
  Shirt,
  Factory,
  Stethoscope,
  BrickWall,
  FlaskConical,
  MonitorSmartphone,
  Cpu,
} from "lucide-react";
import { Lightbox } from "@/components/site/Lightbox";

export const Route = createFileRoute("/experience")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/experience", search),
  head: () => seoHead("/experience", "en"),
  component: ExperiencePage,
});

/** Bento: the first photo spans 2×2 on desktop, so it is served larger. */
const GALLERY_SIZES = [
  "(min-width: 768px) 50vw, 92vw",
  "(min-width: 768px) 50vw, 92vw",
  "(min-width: 768px) 25vw, 92vw",
  "(min-width: 768px) 25vw, 92vw",
];
const GALLERY_LAYOUT = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
];

const statIcons = [Users, Globe2, Award, TrendingUp];
const statTargets = [3000, 3, 5, 1];
const statSuffixes = ["+", "+", "+", "M+"];
const statPrefixes = ["", "", "", "$"];

const industryIcons = [
  ShoppingBag,
  Shirt,
  Factory,
  Stethoscope,
  BrickWall,
  FlaskConical,
  MonitorSmartphone,
  Cpu,
];

/** Animated results stat — counts up once it scrolls into view. */
function ResultStat({
  icon: Icon,
  n,
  label,
  target,
  prefix = "",
  suffix = "+",
  className,
}: {
  icon: ElementType;
  n: string;
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const count = useCountUp(target, 1800, visible);
  return (
    <div ref={ref} className={cn("group px-2 py-8 md:px-8 md:py-4", className)}>
      <div className="flex items-center gap-3">
        <span className="icon-chip !h-10 !w-10 !rounded-xl">
          <Icon size={18} />
        </span>
      </div>
      <div className="mt-6 whitespace-nowrap font-display text-[clamp(2.5rem,1.9rem+2.3vw,3.875rem)] font-extrabold leading-none tracking-[-0.03em] text-primary tabular-nums">
        {visible ? `${prefix}${count.toLocaleString()}${suffix}` : n}
      </div>
      <div className="meta mt-3 max-w-[18ch] text-muted-foreground">{label}</div>
    </div>
  );
}

export function ExperiencePage() {
  const { lang } = useLanguage();
  const all = t(lang);
  const tx = all.experience;
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);

  const gallery = EXPO_PHOTOS.map((file, i) => ({ ...file, alt: tx.gallery.captions[i] }));

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
        image={MEDIA.expo4}
      />

      {/* ─── RESULTS ─── a white panel lifted over the hero's lower edge. */}
      <section className="bg-surface pb-20 md:pb-28">
        <div className="container-x">
          <ScrollReveal>
            <div className="relative z-20 -mt-12 rounded-[28px] border border-border bg-card px-6 py-10 shadow-panel md:-mt-16 md:px-10 md:py-12">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
                <div>
                  <p className="eyebrow">{tx.results.eyebrow}</p>
                  <h2 className="text-title font-extrabold text-primary">{tx.results.title}</h2>
                </div>
                <span aria-hidden="true" className="meta text-primary/40">
                  2022 — {new Date().getFullYear()}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                {tx.results.stats.map((s, i) => (
                  <ResultStat
                    key={s.label}
                    icon={statIcons[i]}
                    n={s.n}
                    label={s.label}
                    target={statTargets[i]}
                    prefix={statPrefixes[i]}
                    suffix={statSuffixes[i]}
                    className={cn(
                      i > 0 && "border-t border-border",
                      i === 1 && "sm:border-l sm:border-t-0",
                      i === 3 && "sm:border-l",
                      i >= 2 && "lg:border-l lg:border-t-0",
                    )}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── EXHIBITIONS — departure board ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="01"
              eyebrow={tx.exhibitions.eyebrow}
              title={tx.exhibitions.title}
              description={tx.exhibitions.description}
            />
          </ScrollReveal>
          {/* Every exhibition gets the same row. Only three have a
              documented engagement (and a page) — see EXHIBITION_ROUTES — so
              linking some rows and not others made the four unlinked ones
              look broken. The board is now a uniform record of who we work
              with; the case studies directly below carry the links. */}
          <RevealGroup className="mt-14">
            <ol className="grid overflow-hidden rounded-[28px] border border-border bg-card shadow-card">
              {tx.exhibitions.names.map((n, i) => (
                <RevealItem
                  key={n}
                  as="li"
                  index={i}
                  step={60}
                  className={cn(
                    "group flex items-center gap-5 px-6 py-5 transition-colors duration-300 hover:bg-surface md:px-8 md:py-6",
                    i > 0 && "border-t border-border",
                  )}
                >
                  <span className="meta w-8 shrink-0 text-primary/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-[clamp(1.0625rem,1rem+0.5vw,1.375rem)] font-semibold text-primary">
                    {n}
                  </span>
                  {/* The same route mark on every row — decorative only. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 80 10"
                    fill="none"
                    className="hidden h-2.5 w-20 shrink-0 text-accent sm:block"
                  >
                    <path d="M4 5 H72" stroke="currentColor" strokeOpacity="0.3" />
                    <path
                      d="M4 5 H72"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                    />
                    <circle cx="4" cy="5" r="2.5" fill="currentColor" />
                    <circle cx="75" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </RevealItem>
              ))}
            </ol>
          </RevealGroup>

          <ScrollReveal className="mt-8">
            <a href="#case-studies" className="btn-ghost">
              {tx.caseStudies.title}
              <ArrowDown size={16} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CASE STUDIES ───
          Same order as EXHIBITION_ROUTES, so each card links to its page. */}
      <section id="case-studies" className="section-pad scroll-mt-24 bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="02"
              eyebrow={tx.caseStudies.eyebrow}
              title={tx.caseStudies.title}
            />
          </ScrollReveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {tx.caseStudies.items.map((c, i) => {
              const featured = i === 0;
              return (
                <ScrollReveal key={c.title} delay={i * 120}>
                  <LocalizedLink
                    to={EXHIBITION_ROUTES[i]}
                    className={cn(
                      "group relative isolate flex h-full min-h-[420px] flex-col overflow-hidden rounded-[28px] p-8 transition-all duration-500 ease-out-expo hover:-translate-y-1 md:p-10",
                      featured
                        ? "bg-primary text-white shadow-panel"
                        : "border border-border bg-card shadow-card hover:shadow-card-hover",
                    )}
                  >
                    {featured && (
                      <div
                        aria-hidden="true"
                        className="bg-dots absolute inset-0 -z-10 text-white/[0.07] [mask-image:radial-gradient(ellipse_at_100%_0%,#000,transparent_70%)]"
                      />
                    )}
                    <span
                      className={cn(
                        "meta self-start rounded-full px-3 py-1.5 text-[11px]",
                        featured ? "bg-white/10 text-accent" : "bg-primary/[0.06] text-primary",
                      )}
                    >
                      {c.label}
                    </span>
                    <div
                      className={cn(
                        "mt-10 font-display text-[clamp(3.5rem,2.5rem+3.5vw,5.5rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums",
                        featured ? "text-white" : "text-primary",
                      )}
                    >
                      {c.stat}
                    </div>
                    <h3
                      className={cn(
                        "mt-auto pt-12 text-heading font-bold",
                        featured ? "text-white" : "text-primary",
                      )}
                    >
                      {c.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-[16px] leading-[1.6]",
                        featured ? "text-white/75" : "text-muted-foreground",
                      )}
                    >
                      {c.desc}
                    </p>
                    <span
                      className={cn(
                        "mt-8 inline-flex items-center gap-2 border-t pt-6 font-display text-[14px] font-semibold",
                        featured ? "border-white/15 text-accent" : "border-border text-primary",
                      )}
                    >
                      {all.ui.caseStudy}
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </LocalizedLink>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="03"
              eyebrow={tx.industries.eyebrow}
              title={tx.industries.title}
              description={tx.industries.description}
            />
          </ScrollReveal>
          <RevealGroup className="mt-14">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {tx.industries.items.map((item, i) => {
                const Icon = industryIcons[i];
                return (
                  <RevealItem key={item} as="li" index={i} step={60}>
                    <div className="group card-elevated flex h-full min-h-[168px] flex-col justify-between !p-6">
                      <div className="flex items-start justify-between">
                        <span className="icon-chip">
                          <Icon size={20} />
                        </span>
                        <span aria-hidden="true" className="meta text-primary/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="mt-8 font-display text-[16px] font-semibold leading-snug text-primary">
                        {item}
                      </span>
                    </div>
                  </RevealItem>
                );
              })}
            </ul>
          </RevealGroup>
        </div>
      </section>

      {/* ─── GALLERY — bento on ink ─── */}
      <section className="section-pad relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 text-white/[0.05]" />
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              tone="dark"
              index="04"
              eyebrow={tx.gallery.eyebrow}
              title={tx.gallery.title}
              description={tx.gallery.description}
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-4 md:h-[620px] md:grid-cols-4 md:grid-rows-2">
            {gallery.map((photo, i) => (
              <ScrollReveal
                key={photo.src}
                delay={i * 90}
                className={cn("h-full", GALLERY_LAYOUT[i])}
              >
                <button
                  type="button"
                  onClick={() => setOpenPhoto(i)}
                  aria-label={`${tx.gallery.lightbox.dialog} — ${photo.alt}`}
                  className="group relative block aspect-[3/2] h-full w-full overflow-hidden rounded-[24px] text-left md:aspect-auto"
                >
                  <Photo
                    file={photo}
                    alt={photo.alt}
                    sizes={GALLERY_SIZES[i]}
                    className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                    <div className="min-w-0">
                      <span className="meta text-[11px] text-accent">
                        {String(i + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                      </span>
                      <p className="mt-2 line-clamp-2 text-[14px] font-medium leading-snug text-white/90">
                        {photo.alt}
                      </p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <Maximize2 size={16} />
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        photos={gallery}
        index={openPhoto}
        onIndexChange={setOpenPhoto}
        labels={tx.gallery.lightbox}
      />

      <CtaBand
        title={all.home.cta.title}
        description={all.home.cta.description}
        primary={{ to: "/partner", label: all.home.cta.btn }}
        secondary={{ to: "/contact", label: all.nav.contact }}
      />
    </SiteLayout>
  );
}
