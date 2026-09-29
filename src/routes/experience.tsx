import { createFileRoute } from "@tanstack/react-router";
import { useState, type ElementType } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { RevealGroup, RevealItem } from "@/components/site/RevealGroup";
import { Tilt } from "@/components/site/Tilt";
import { SectionDivider } from "@/components/site/SectionDivider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { EXHIBITION_ROUTES } from "@/lib/paths";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { TrendingUp, Users, Award, Globe2, ArrowUpRight } from "lucide-react";
import { Lightbox } from "@/components/site/Lightbox";

export const Route = createFileRoute("/experience")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/experience", search),
  head: () => seoHead("/experience", "en"),
  component: ExperiencePage,
});

// Only the physical facts about each file live here — intrinsic dimensions so
// the browser can reserve space before decode (no layout shift). The
// captions are content, so they come from the translation object and stay in
// step with the active language.
// `base` drives the WebP srcset; `src` stays the fallback for browsers
// without WebP, and is also what the lightbox opens at full size.
const galleryFiles = [
  { base: "/Expo/expo1", src: "/Expo/expo1.jpeg", w: 1038, h: 692 },
  { base: "/Expo/expo2", src: "/Expo/expo2.jpeg", w: 1280, h: 853 },
  { base: "/Expo/expo3", src: "/Expo/expo3.jpeg", w: 1280, h: 853 },
  { base: "/Expo/expo4", src: "/Expo/expo4.jpeg", w: 1280, h: 853 },
];

/** Grid: four columns on desktop, two on tablet, one on mobile. */
const GALLERY_SIZES = "(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw";

/**
 * Which entries in `exhibitions.names` have a landing page of their own.
 *
 * Keyed by index into that array, mapping to EXHIBITION_ROUTES:
 *   0 = China Yiwu International Commodities Fair -> buyer support
 *   1 = Canton Fair                              -> buyer recruitment
 *   3 = ShanghaiTex                              -> matchmaking
 *
 * The other four are listed but not linked, because there is no documented
 * engagement behind them to build a page from.
 */
const EXHIBITION_PAGE_BY_INDEX: Record<number, (typeof EXHIBITION_ROUTES)[number]> = {
  0: EXHIBITION_ROUTES[2],
  1: EXHIBITION_ROUTES[0],
  3: EXHIBITION_ROUTES[1],
};

const statIcons = [Users, Globe2, Award, TrendingUp];
const statTargets = [3000, 3, 5, 1];
const statSuffixes = ["+", "", "", "M+"];
const statPrefixes = ["", "", "", "$"];

/** Animated results stat — counts up on scroll */
function ResultStat({
  icon: Icon,
  n,
  label,
  target,
  prefix = "",
  suffix = "+",
}: {
  icon: ElementType;
  n: string;
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const count = useCountUp(target, 1800, visible);
  return (
    // Restyled for the light panel: gold icon chip that fills on hover, navy
    // figure, muted label. The dividers only appear from md up, where the four
    // stats actually sit in a row.
    <div
      ref={ref}
      className="group relative text-center md:border-l md:border-border md:first:border-l-0"
    >
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-accent/12 text-accent-text transition-all duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:bg-accent group-hover:text-accent-ink group-hover:shadow-[0_8px_20px_rgba(245,166,35,0.35)]">
        <Icon size={26} />
      </div>
      <div className="text-stat font-display font-extrabold text-primary tabular-nums">
        {visible ? `${prefix}${count.toLocaleString()}${suffix}` : n}
      </div>
      <div className="mx-auto mt-2 max-w-[16ch] text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function ExperiencePage() {
  const { lang } = useLanguage();
  const tx = t(lang).experience;
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);

  // Zip the files against the translated captions (same positional-array
  // convention the rest of this codebase uses for icons and targets).
  const gallery = galleryFiles.map((file, i) => ({
    ...file,
    alt: tx.gallery.captions[i],
  }));

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
      />

      {/* ─── RESULTS / ACHIEVEMENTS ───
          A floating panel that overlaps the hero's lower edge, rather than a
          second navy band. The page previously stacked PageHero (navy) on top
          of this section (also navy) with nothing between them, so the top of
          /experience read as one undifferentiated blue slab. Lifting the
          metrics onto an elevated white panel breaks that, gives the count-up
          figures the emphasis they deserve, and starts the page's light/dark
          rhythm immediately. */}
      <section className="bg-surface pb-20 md:pb-28">
        <div className="container-x">
          <ScrollReveal>
            <div className="relative z-20 -mt-14 rounded-[26px] border border-border bg-card px-6 py-10 shadow-panel md:-mt-20 md:px-12 md:py-14">
              <div className="text-center">
                <p className="eyebrow">{tx.results.eyebrow}</p>
                <h2 className="text-title font-bold text-primary">{tx.results.title}</h2>
                <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-accent" />
              </div>

              <div className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-14 md:grid-cols-4 md:gap-6">
                {tx.results.stats.map((s, i) => (
                  <ResultStat
                    key={s.label}
                    icon={statIcons[i]}
                    n={s.n}
                    label={s.label}
                    target={statTargets[i]}
                    prefix={statPrefixes[i]}
                    suffix={statSuffixes[i]}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PARTNER EXHIBITIONS ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              eyebrow={tx.exhibitions.eyebrow}
              title={tx.exhibitions.title}
              description={tx.exhibitions.description}
            />
          </ScrollReveal>
          <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {tx.exhibitions.names.map((n, i) => {
              const href = EXHIBITION_PAGE_BY_INDEX[i];
              const card = (
                <div className="bg-white rounded-[16px] shadow-sm border border-border/50 group grid place-items-center h-28 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <span className="font-display font-bold text-[16px] text-primary group-hover:text-accent-text transition-colors duration-300 text-center px-4">
                    {n}
                  </span>
                </div>
              );
              return (
                <RevealItem key={n} index={i} step={60} direction="up">
                  {/* The three with a documented engagement link to their own
                      page; the rest are plain cards. Linking all seven would
                      mean building four pages with nothing to say on them. */}
                  {href ? (
                    <LocalizedLink to={href} className="block h-full">
                      {card}
                    </LocalizedLink>
                  ) : (
                    card
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <SectionDivider from="var(--color-surface-sunken)" to="var(--color-surface)" flip />

      {/* ─── CASE STUDIES ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle variant="split" eyebrow={tx.caseStudies.eyebrow} title={tx.caseStudies.title} />
          </ScrollReveal>
          {/* Asymmetric: the first case study is the feature — it spans the
              left half in navy and runs full height, with the other two
              stacked beside it. Three equal cards gave all three the same
              weight and left the section with nothing to look at first. */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-7">
            {tx.caseStudies.items.slice(0, 1).map((c) => (
              <ScrollReveal key={c.title} direction="left">
                <Tilt className="group" max={3}>
                  <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[18px] bg-gradient-to-br from-primary via-primary to-primary-dark p-8 text-white shadow-panel md:p-10">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                      }}
                    />
                    <div className="relative">
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                        {c.label}
                      </span>
                      <div className="mt-7 font-display text-[clamp(3rem,2rem+4vw,4.5rem)] font-extrabold leading-none text-white tabular-nums">
                        {c.stat}
                      </div>
                    </div>
                    <div className="relative mt-8">
                      <h3 className="text-[22px] font-bold text-white">{c.title}</h3>
                      <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.65] text-white/75">
                        {c.desc}
                      </p>
                    </div>
                  </article>
                </Tilt>
              </ScrollReveal>
            ))}

            <div className="grid gap-6 lg:gap-7">
              {tx.caseStudies.items.slice(1).map((c, i) => (
                <ScrollReveal key={c.title} direction="right" delay={120 + i * 120}>
                  <Tilt className="group" max={4}>
                    <article className="card-elevated flex h-full flex-col justify-center">
                      <div className="flex items-end gap-3">
                        <div className="font-display text-stat font-extrabold text-primary tabular-nums">
                          {c.stat}
                        </div>
                        <div className="pb-1 text-[13px] font-bold uppercase tracking-wide text-accent-text">
                          {c.label}
                        </div>
                      </div>
                      <h3 className="mt-4 text-[20px] font-bold text-primary">{c.title}</h3>
                      <p className="mt-2.5 text-[15px] leading-[1.6] text-muted-foreground">
                        {c.desc}
                      </p>
                    </article>
                  </Tilt>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES SERVED ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.industries.eyebrow}
              title={tx.industries.title}
              description={tx.industries.description}
            />
          </ScrollReveal>
          <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {tx.industries.items.map((item, i) => (
              <RevealItem key={item} index={i} step={60} direction="up">
                <div className="bg-white rounded-[16px] shadow-sm border border-border/50 group grid place-items-center h-24 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 px-4 text-center">
                  <span className="font-semibold text-[15px] text-primary group-hover:text-accent-text transition-colors duration-300">
                    {item}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.gallery.eyebrow}
              title={tx.gallery.title}
              description={tx.gallery.description}
            />
          </ScrollReveal>

          {/* A grid, not a masonry column layout.

              All four photographs are the same 3:2 ratio (1038×692 and
              1280×853 both reduce to 1.50), and masonry exists to reconcile
              DIFFERENT heights. With four equal-ratio images in three columns,
              CSS columns put two in the first column and one in each of the
              others — a tall left column beside two short ones, with a ragged
              bottom edge.

              Two further faults came with it: `space-y-6` applies margin-top to
              every child except the first OVERALL, not the first in each
              column, so the tops of columns two and three sat 24px lower than
              column one; and `break-inside-avoid` sat on the <button> while the
              column child was the ScrollReveal wrapper, one level too high to
              take effect.

              Four tiles divide evenly into 1, 2 and 4 columns — never 3, which
              would leave one orphan on its own row. */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.src} delay={i * 80} direction="up">
                <button
                  type="button"
                  onClick={() => setOpenPhoto(i)}
                  aria-label={`${tx.gallery.lightbox.dialog} — ${photo.alt}`}
                  className="group relative block aspect-[3/2] w-full cursor-pointer overflow-hidden rounded-[16px] shadow-sm"
                >
                  {/* WebP with the original JPEG as the fallback source.
                      A <picture> rather than swapping the src outright: the
                      JPEGs have to stay anyway (they are the og:image sources,
                      and WebP share cards are unreliable in messaging
                      clients), so the fallback costs nothing. */}
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${photo.base}-600.webp 600w, ${photo.base}-1200.webp 1200w`}
                      sizes={GALLERY_SIZES}
                    />
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.w}
                      height={photo.h}
                      loading="lazy"
                      decoding="async"
                      // h-full, not h-auto: the tile now owns the aspect ratio,
                      // so the image fills it and every tile is identical.
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </picture>
                  {/* Hover Overlay */}
                  {/* The open affordance is back now that it opens something. */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-5 text-left opacity-0 transition-opacity duration-300 ease-out-soft group-hover:opacity-100 group-focus-visible:opacity-100">
                    <h3 className="translate-y-4 text-[16px] font-bold text-white transition-transform duration-300 ease-out-soft group-hover:translate-y-0 group-focus-visible:translate-y-0">
                      {tx.gallery.overlay}
                    </h3>
                    <span className="mt-2 flex items-center gap-1.5 text-accent text-[14px] font-semibold opacity-0 translate-y-4 transition-all duration-300 ease-out-soft delay-100 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                      <ArrowUpRight size={16} />
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
    </SiteLayout>
  );
}
