import { createFileRoute } from "@tanstack/react-router";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { RevealGroup, RevealItem } from "@/components/site/RevealGroup";
import { Tilt } from "@/components/site/Tilt";
import { MagneticArea } from "@/components/site/MagneticArea";
import { SectionDivider } from "@/components/site/SectionDivider";
import { useLanguage } from "@/hooks/useLanguage";
import { useParallaxPointer } from "@/hooks/useParallaxPointer";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { EXHIBITION_ROUTES } from "@/lib/paths";
import { redirectLegacyLang } from "@/lib/langRedirect";
import {
  Users,
  Handshake,
  Building2,
  LineChart,
  CheckCircle2,
  Search,
  MessageSquare,
  Rocket,
  ArrowRight,
  Award,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/", search),
  head: () => seoHead("/", "en"),
  component: Home,
});

// Real partner/exhibition marks from public/logos (these replaced five
// repeated copies of favicon.png, which read as a broken image loop).
const trustLogos = [
  { name: "Canton Fair", src: "/logos/cantonFair.png" },
  { name: "Hannover Messe", src: "/logos/hm_logo_col.png", square: true },
  { name: "bauma", src: "/logos/bauma-logo.svg" },
  { name: "Gulfood", src: "/logos/Gulfood.png" },
  { name: "GFU — Home of IFA", src: "/logos/GFU.png" },
];

const serviceIcons = [Handshake, Building2, LineChart];
const stepIcons = [Search, Target, MessageSquare, Rocket];

// The client's own exhibition photography, served locally. Previously four
// hot-linked Unsplash stock shots (a data centre, a casual coworking loft) that
// were both off-brand and a hard dependency on external CDN availability.
// `base` drives the WebP srcset; `src` is the fallback for the ~3% of
// browsers without WebP. These render in a two-column grid inside a half-width
// column — roughly 250–300px each — so a 1280px original was ~4x more pixels
// than any screen could use.
const whyChooseImages = [
  {
    base: "/Expo/expo1",
    src: "/Expo/expo1.jpeg",
    alt: "International pavilion inauguration ceremony at a JU Fair Global trade event",
  },
  {
    base: "/Expo/expo2",
    src: "/Expo/expo2.jpeg",
    alt: "International delegates in conversation on the exhibition floor",
  },
  {
    base: "/Expo/expo4",
    src: "/Expo/expo4.jpeg",
    alt: "Visitors and exhibitors at a busy international trade show stand",
  },
  {
    base: "/images/business-deal",
    src: "/images/business-deal.webp",
    alt: "Two business partners celebrating a closed trade agreement",
  },
];

/** Two columns inside a half-width column on desktop; two columns below that. */
const WHY_CHOOSE_SIZES = "(min-width: 1024px) 22vw, 45vw";

export function Home() {
  const heroRef = useParallaxPointer<HTMLElement>();
  const { lang } = useLanguage();
  const tx = t(lang).home;

  return (
    <SiteLayout>
      {/* ─── HERO ───
          Three stacked planes that drift at different rates as the pointer
          moves, driven by the --px/--py variables useParallaxPointer writes on
          this section. The photograph counter-moves, the gold bloom leads, and
          the content stays put — deliberately, because the glass panel and the
          badge use backdrop-filter, which is fragile inside a transformed
          ancestor. Touch devices and reduced-motion visitors never get the
          variables at all, so every layer sits at its var() fallback of 0. */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-primary"
      >
        {/* Plane 1 — photograph. Over-scaled so the drift never exposes an edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-transform duration-300 ease-out-soft will-change-transform"
          style={{
            backgroundImage: "url('/hero.webp')",
            transform:
              "translate3d(calc(var(--px, 0) * -12px), calc(var(--py, 0) * -8px), 0) scale(1.08)",
          }}
        />

        {/* Plane 2 — readability tint (static, so contrast never shifts). */}
        <div aria-hidden="true" className="absolute inset-0 bg-primary/50" />

        {/* Plane 3 — gold bloom, leads the pointer to sell the depth. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-transform duration-500 ease-out-soft will-change-transform"
          style={{
            backgroundImage:
              "radial-gradient(48rem 32rem at 72% 38%, rgba(245,166,35,0.18) 0, transparent 68%)",
            transform:
              "translate3d(calc(var(--px, 0) * 22px), calc(var(--py, 0) * 16px), 0)",
          }}
        />

        <div className="container-x relative grid lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-center pt-28 pb-16 sm:py-32 z-10">
          {/* LEFT: Content */}
          <div>
            <span className="hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-accent text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm border border-white/10" style={{ animationDelay: "0ms" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
              {tx.hero.badge}
            </span>

            <h1 className="hero-animate text-hero font-extrabold text-white max-w-xl drop-shadow-lg" style={{ animationDelay: "120ms" }}>
              {tx.hero.headline}{" "}
              <span className="text-accent">{tx.hero.headlineAccent}</span>
            </h1>

            <p className="hero-animate mt-6 text-lede text-white/80 max-w-md" style={{ animationDelay: "260ms" }}>
              {tx.hero.description}
            </p>

            <div className="hero-animate mt-10 flex flex-wrap gap-4" style={{ animationDelay: "380ms" }}>
              <MagneticArea>
                <LocalizedLink to="/partner" className="btn-primary shadow-[0_0_24px_rgba(245,166,35,0.4)] hover:shadow-[0_0_32px_rgba(245,166,35,0.6)]">
                  {tx.hero.btnPartner} <ArrowRight size={16} className="ml-1" />
                </LocalizedLink>
              </MagneticArea>
              <LocalizedLink to="/services" className="btn-outline !border-white/40 !text-white hover:!bg-white/15 backdrop-blur-sm">
                {tx.hero.btnExplore}
              </LocalizedLink>
            </div>

            {/* Stats */}
            <div className="hero-animate mt-10 grid grid-cols-3 gap-3 sm:gap-6" style={{ animationDelay: "500ms" }}>
              {tx.hero.stats.map((s) => (
                <div key={s.label} className="text-center py-3 px-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="text-[20px] sm:text-[24px] font-extrabold text-white">{s.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-accent uppercase tracking-wider font-bold mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave separator */}
        <div className="absolute bottom-0 inset-x-0 z-10">
          <svg viewBox="0 0 1440 60" fill="var(--color-surface)" preserveAspectRatio="none" className="w-full h-[60px] block">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>


      {/* ─── SERVICES ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              eyebrow={tx.services.eyebrow}
              title={tx.services.title}
              description={tx.services.description}
            />
          </ScrollReveal>

          <div className="mt-16">
            {/* Featured Card */}
            <ScrollReveal direction="up" delay={100}>
              <div className="rounded-[18px] bg-gradient-to-r from-primary to-primary-dark p-10 lg:p-12 grid lg:grid-cols-2 gap-12 items-center mb-8 shadow-xl">
                <div>
                  <div className="icon-chip-invert mb-6 !h-16 !w-16 !rounded-2xl">
                    <Users size={30} />
                  </div>
                  <h3 className="text-heading font-bold text-white">{tx.services.featured.title}</h3>
                  <p className="mt-4 text-[17px] text-white/75 leading-[1.6]">
                    {tx.services.featured.desc}
                  </p>
                  <LocalizedLink to="/services" className="mt-8 inline-flex items-center gap-2 text-accent font-semibold text-[15px] hover:gap-3 transition-all duration-200">
                    {tx.services.featured.link} <ArrowRight size={16} />
                  </LocalizedLink>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tx.services.featured.points.map((s) => (
                    <div key={s} className="rounded-xl bg-white/10 p-5 text-white font-semibold flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-[14px] leading-snug">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Supporting Cards */}
            <RevealGroup className="grid md:grid-cols-3 gap-6">
              {tx.services.cards.map((s, i) => {
                const Icon = serviceIcons[i];
                return (
                  <RevealItem key={s.title} index={i} step={110}>
                    <Tilt className="group">
                    <div className="card-elevated flex h-full flex-col">
                      <div className="icon-chip mb-5">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-[20px] font-semibold text-primary md:min-h-[1.6em]">{s.title}</h3>
                      <p className="mt-3 flex-1 text-[16px] text-muted-foreground leading-[1.6]">{s.desc}</p>
                      <LocalizedLink
                        to="/services"
                        className="mt-6 inline-flex items-center gap-1.5 text-accent-text text-[14px] font-semibold hover:gap-2.5 transition-all duration-200"
                      >
                        {/*
                          Three cards each rendered a bare "Read more", which is
                          three identical entries in a screen reader's link list
                          and three identical anchor texts pointing at
                          /services — anchor text is a ranking signal, and
                          "Read more" describes nothing.

                          The service name goes in an sr-only span rather than
                          an aria-label: sr-only text is part of the link's text
                          content, so it fixes the anchor text as well as the
                          accessible name. An aria-label fixes only the latter,
                          which is why Lighthouse's link-text audit ignores it.
                        */}
                        {tx.services.readMore}
                        <span className="sr-only"> — {s.title}</span>
                        <ArrowRight size={14} />
                      </LocalizedLink>
                    </div>
                    </Tilt>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      <SectionDivider from="var(--color-surface)" to="var(--color-surface-sunken)" />

      {/* ─── WHY CHOOSE US ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-center">
          <ScrollReveal direction="left">
            <div>
              <SectionTitle
                eyebrow={tx.whyChoose.eyebrow}
                title={tx.whyChoose.title}
                align="left"
                description={tx.whyChoose.description}
              />
              <ul className="mt-10 space-y-4">
                {/* as="li" — a <div> is not a valid child of <ul>, and the old
                    nesting stopped screen readers announcing this as a list. */}
                {tx.whyChoose.items.map((item, i) => (
                  <ScrollReveal
                    key={item.label}
                    delay={i * 80}
                    as="li"
                    className="flex items-start gap-4 rounded-xl border border-black/[0.03] bg-white p-4 shadow-sm"
                  >
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-text">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-primary text-[16px]">{item.label}</div>
                      <div className="text-[14px] text-muted-foreground mt-1">{item.desc}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <div className="overflow-hidden grid grid-cols-2 gap-4">
              {whyChooseImages.map((img, i) => (
                <div
                  key={img.src}
                  className={`rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,.12)] ${i % 2 ? "sm:translate-y-8" : ""}`}
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${img.base}-600.webp 600w, ${img.base}-1200.webp 1200w`}
                      sizes={WHY_CHOOSE_SIZES}
                    />
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={600}
                      height={384}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </picture>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="var(--color-surface-sunken)" to="var(--color-surface)" flip />

      {/* ─── HOW IT WORKS ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.howItWorks.eyebrow}
              title={tx.howItWorks.title}
              description={tx.howItWorks.description}
            />
          </ScrollReveal>
          {/* Four identical centred columns joined by a dashed rule read as a
              diagram, not a designed sequence. Each step is now a left-aligned
              card carrying its own oversized ghost numeral, and the row climbs
              in a gentle stair at lg — the descending offset does the work the
              connector line used to do, and reads as progression. */}
          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:mb-[84px] lg:grid-cols-4 lg:gap-5">
            {tx.howItWorks.steps.map((s, i) => {
              const Icon = stepIcons[i];
              // 0 / 28 / 56 / 84px — enough to feel deliberate, not enough to
              // strand the last card in whitespace.
              // Offset with a transform, not a margin: grid items stretch by
              // default, so a margin-top just shortens the card and every
              // bottom edge stays level — no visible stair at all. A translate
              // moves the painted card while leaving the equal row height
              // intact.
              const stair = ["", "lg:translate-y-7", "lg:translate-y-14", "lg:translate-y-[84px]"][i];
              return (
                <RevealItem key={s.title} index={i} step={120}>
                  <div
                    className={`card-elevated group relative h-full overflow-hidden transition-transform duration-500 ease-out-expo ${stair}`}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-3 -top-5 select-none font-display text-[104px] font-extrabold leading-none text-primary/[0.05] transition-colors duration-500 ease-out-expo group-hover:text-accent/[0.16]"
                    >
                      {i + 1}
                    </span>

                    <div className="relative">
                      <div className="icon-chip">
                        <Icon size={24} />
                      </div>
                      <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-text">
                        {tx.howItWorks.stepLabel} 0{i + 1}
                      </div>
                      <h3 className="mt-2 text-[19px] font-bold text-primary">{s.title}</h3>
                      <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <SectionDivider from="var(--color-surface)" to="var(--color-surface-sunken)" />

      {/* ─── TRUST & TESTIMONIALS ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.trust.eyebrow}
              title={tx.trust.title}
              description={tx.trust.description}
            />
          </ScrollReveal>

          {/* Logo Carousel */}
          <ScrollReveal delay={200} direction="up">
            <div className="mt-16 overflow-hidden relative before:absolute before:inset-y-0 before:left-0 before:w-32 before:bg-gradient-to-r before:from-surface-sunken before:z-10 after:absolute after:inset-y-0 after:right-0 after:w-32 after:bg-gradient-to-l after:from-surface-sunken after:z-10">
              <div className="logo-track">
                {[...trustLogos, ...trustLogos, ...trustLogos].map((logo, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center w-48 sm:w-64 h-16 shrink-0 opacity-45 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      width={160}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      // A square mark rendered to the same height as a wide
                      // wordmark reads far smaller; square logos get extra
                      // height so every mark carries similar optical weight.
                      className={`w-auto max-w-[150px] object-contain ${
                        logo.square ? "h-12 sm:h-14" : "h-9 sm:h-10"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ─── PROOF POINTS ───
              This slot used to hold three testimonials attributed to named
              people at named companies, rendered with a five-star rating. None
              of those people or companies appear anywhere in the client's
              material, so every claim in the section — including the stars —
              was unverifiable.

              It now carries the three real engagements instead. Each figure is
              the one published in the matching case study on /experience, so
              the two pages corroborate each other rather than the homepage
              asserting something nothing backs. Search quality raters are
              trained to flag exactly that kind of unsupported claim, which is
              also why no Review or aggregateRating markup exists on this site. */}
          <div className="mt-20">
            <ScrollReveal>
              <SectionTitle
                eyebrow={tx.proof.eyebrow}
                title={tx.proof.title}
                description={tx.proof.description}
              />
            </ScrollReveal>

            <div className="grid gap-8 md:grid-cols-3 mt-14">
              {/* Each proof card is one exhibition engagement, and
                  EXHIBITION_ROUTES is in the same order, so the card links
                  straight to the page that tells that story in full. */}
              {tx.proof.items.map((item, i) => (
                <ScrollReveal key={item.event} delay={i * 150} direction="up">
                  <Tilt className="group">
                    <LocalizedLink
                      to={EXHIBITION_ROUTES[i]}
                      className="card-elevated relative flex h-full flex-col overflow-hidden"
                    >
                      {/* The figure is the hero of the card, so it is set in
                          the display face at stat scale rather than buried in
                          the body copy. */}
                      <div className="relative">
                        <p className="eyebrow">{item.event}</p>
                        <p className="mt-3 font-display text-stat font-extrabold text-primary tabular-nums">
                          {item.stat}
                        </p>
                        <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-text">
                          {item.label}
                        </p>
                      </div>

                      <p className="relative mt-6 flex-1 border-t border-border pt-6 text-[15px] leading-[1.7] text-muted-foreground">
                        {item.desc}
                      </p>
                    </LocalizedLink>
                  </Tilt>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={200}>
              <div className="mt-12 text-center">
                <LocalizedLink to="/experience" className="btn-outline inline-flex">
                  {tx.proof.cta}
                </LocalizedLink>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── PARTNER CTA ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <div className="rounded-[24px] bg-gradient-to-r from-primary to-primary-dark text-primary-foreground p-8 sm:p-12 md:p-16 text-center shadow-[0_20px_60px_rgba(11,61,145,0.2)] relative overflow-hidden">
              {/* Abstract dot field. This was a 10%-opacity render of the
                  flat world map, whose baked-in "GLOBAL MAP" title and ocean
                  labels showed through as readable text over the CTA. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-[0.07]"
                style={{
                  backgroundImage: "radial-gradient(#ffffff 1.4px, transparent 1.4px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(38rem 26rem at 78% 18%, rgba(245,166,35,0.16) 0, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <Award className="mx-auto text-accent mb-6" size={48} />
                <h2 className="text-white text-section font-extrabold">
                  {tx.cta.title}
                </h2>
                <p className="mt-6 text-white/80 max-w-2xl mx-auto text-lede">
                  {tx.cta.description}
                </p>
                <MagneticArea className="mt-10">
                  <LocalizedLink to="/partner" className="btn-primary inline-flex !h-14 !px-8 !text-[16px]">
                    {tx.cta.btn} <ArrowRight size={18} className="ml-1" />
                  </LocalizedLink>
                </MagneticArea>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
