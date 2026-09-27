import { createFileRoute } from "@tanstack/react-router";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { SiteLayout, CtaBand } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { RevealGroup, RevealItem, useRevealGroup } from "@/components/site/RevealGroup";
import { MagneticArea } from "@/components/site/MagneticArea";
import { RouteArc } from "@/components/site/RouteArc";
import { Photo } from "@/components/site/Photo";
import { useLanguage } from "@/hooks/useLanguage";
import { useParallaxPointer } from "@/hooks/useParallaxPointer";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { EXHIBITION_ROUTES } from "@/lib/paths";
import { HQ_COORDS, MEDIA } from "@/lib/media";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { cn } from "@/lib/utils";
import {
  Users,
  Handshake,
  Building2,
  LineChart,
  Search,
  MessageSquare,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  Target,
  Plane,
} from "lucide-react";

export const Route = createFileRoute("/")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/", search),
  head: () => seoHead("/", "en"),
  component: Home,
});

// Real exhibition marks from public/logos. Square marks get a taller box so
// every logo carries similar optical weight beside the wide wordmarks.
const trustLogos = [
  { name: "Canton Fair", src: "/logos/cantonFair.png", w: 425, h: 128 },
  { name: "Hannover Messe", src: "/logos/hm_logo_col.png", w: 170, h: 170, square: true },
  { name: "bauma", src: "/logos/bauma-logo.svg", w: 160, h: 40 },
  { name: "Gulfood", src: "/logos/Gulfood.png", w: 197, h: 128 },
  { name: "GFU — Home of IFA", src: "/logos/GFU.png", w: 443, h: 128 },
];

const serviceIcons = [Handshake, Building2, LineChart];
const stepIcons = [Search, Target, MessageSquare, Rocket];

export function Home() {
  const heroRef = useParallaxPointer<HTMLElement>();
  const { lang } = useLanguage();
  const all = t(lang);
  const tx = all.home;
  const captions = all.experience.gallery.captions;
  const regions = Object.entries(all.globalNetwork.regions) as [string, readonly string[]][];

  return (
    <SiteLayout>
      {/* ─── HERO ───
          The skyline-and-globe photograph under a directional ink wash, a
          headline that rises out of a mask line by line, and — on the right —
          a "departures board" of the four corridors running into Shanghai.
          The photo counter-drifts against the pointer (useParallaxPointer
          writes --px/--py; touch and reduced-motion never get them). The
          content itself never moves, because the board uses backdrop-filter,
          which is fragile inside a transformed ancestor. */}
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 transition-transform duration-500 ease-out-soft will-change-transform"
          style={{
            transform:
              "translate3d(calc(var(--px, 0) * -14px), calc(var(--py, 0) * -10px), 0) scale(1.08)",
          }}
        >
          <Photo file={MEDIA.hero} alt="" sizes="100vw" priority className="object-[center_65%]" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(95deg, var(--color-ink) 12%, color-mix(in oklab, var(--color-ink) 72%, transparent) 48%, color-mix(in oklab, var(--color-ink) 20%, transparent) 100%), linear-gradient(0deg, var(--color-ink) 2%, transparent 42%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 transition-transform duration-700 ease-out-soft"
          style={{
            backgroundImage:
              "radial-gradient(44rem 30rem at 78% 30%, color-mix(in oklab, var(--color-accent) 20%, transparent), transparent 70%)",
            transform: "translate3d(calc(var(--px, 0) * 24px), calc(var(--py, 0) * 16px), 0)",
          }}
        />

        <div className="container-x grid flex-1 items-center gap-12 pb-12 pt-32 lg:grid-cols-12 lg:gap-10 lg:pt-36">
          {/* LEFT — the pitch */}
          <div className="lg:col-span-7">
            <span
              className="hero-animate inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 font-display text-[12px] font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md"
              style={{ animationDelay: "0ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-accent pulse-ring" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {tx.hero.badge}
            </span>

            <h1 className="mt-8 text-hero font-extrabold text-white">
              <span className="line-mask">
                <span style={{ animationDelay: "100ms" }}>{tx.hero.headline}</span>
              </span>
              <span className="line-mask">
                <span className="text-accent" style={{ animationDelay: "220ms" }}>
                  {tx.hero.headlineAccent}
                </span>
              </span>
            </h1>

            <p
              className="hero-animate mt-8 max-w-[46ch] text-lede text-white/75"
              style={{ animationDelay: "380ms" }}
            >
              {tx.hero.description}
            </p>

            <div
              className="hero-animate mt-10 flex flex-wrap gap-4"
              style={{ animationDelay: "480ms" }}
            >
              <MagneticArea>
                <LocalizedLink to="/partner" className="btn-primary">
                  {tx.hero.btnPartner} <ArrowRight size={17} />
                </LocalizedLink>
              </MagneticArea>
              <LocalizedLink to="/services" className="btn-light">
                {tx.hero.btnExplore}
              </LocalizedLink>
            </div>
          </div>

          {/* RIGHT — the corridor board */}
          <div
            className="hero-animate hidden lg:col-span-5 lg:block"
            style={{ animationDelay: "560ms" }}
          >
            <CorridorBoard
              title={all.globalNetwork.map.liveCorridor}
              hq={all.ui.hq}
              regions={regions}
              countriesLabel={all.ui.countries}
            />
          </div>
        </div>

        {/* Stats rail */}
        <div className="hero-animate border-t border-white/10" style={{ animationDelay: "680ms" }}>
          <div className="container-x grid grid-cols-3 items-stretch">
            {tx.hero.stats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "py-6 md:py-8",
                  i > 0 && "border-l border-white/10 pl-4 sm:pl-8 md:pl-10",
                )}
              >
                <div className="font-display text-[clamp(1.625rem,1rem+2.6vw,3.25rem)] font-extrabold leading-none tabular-nums text-white">
                  {s.value}
                </div>
                <div className="meta mt-3 text-[10.5px] text-white/55 sm:text-[12px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ───
          Directly under the hero, so proof arrives before the pitch does. */}
      <section className="border-b border-border bg-surface-sunken">
        <div className="container-x grid items-center gap-8 py-10 lg:grid-cols-12 lg:py-12">
          <div className="lg:col-span-4">
            <p className="eyebrow !mb-3">{tx.trust.eyebrow}</p>
            <h2 className="text-heading font-bold text-primary">{tx.trust.title}</h2>
          </div>
          <div className="marquee overflow-hidden lg:col-span-8">
            <ul className="marquee-track items-center">
              {[...trustLogos, ...trustLogos].map((logo, i) => (
                <li
                  key={i}
                  // The second copy exists only to make the loop seamless.
                  aria-hidden={i >= trustLogos.length || undefined}
                  className="flex h-20 w-44 shrink-0 items-center justify-center px-6 sm:w-56"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    width={logo.w}
                    height={logo.h}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "w-auto max-w-[150px] object-contain opacity-55 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0",
                      logo.square ? "h-14" : "h-10",
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── SERVICES — BENTO ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="01"
              eyebrow={tx.services.eyebrow}
              title={tx.services.title}
              description={tx.services.description}
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-12">
            {/* Featured: the core service, in navy, carrying its own playbook. */}
            <ScrollReveal className="lg:col-span-7 lg:row-span-3">
              <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] bg-primary p-7 text-white shadow-panel sm:p-10 lg:p-12">
                <div
                  aria-hidden="true"
                  className="bg-dots absolute inset-0 -z-10 text-white/[0.07] [mask-image:radial-gradient(ellipse_at_100%_0%,#000,transparent_65%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-40 -right-40 -z-10 h-96 w-96 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 26%, transparent), transparent 65%)",
                  }}
                />
                <RouteArc className="absolute -bottom-10 -right-20 -z-10 w-[460px] text-white opacity-60" />

                <div className="flex items-center justify-between">
                  <div className="icon-chip-invert !h-14 !w-14 !rounded-2xl">
                    <Users size={26} />
                  </div>
                  <span aria-hidden="true" className="meta text-white/40">
                    01 / 04
                  </span>
                </div>
                <h3 className="mt-10 max-w-[18ch] text-title font-extrabold text-white">
                  {tx.services.featured.title}
                </h3>
                <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.65] text-white/75">
                  {tx.services.featured.desc}
                </p>

                <ol className="mt-10 grid gap-x-8 sm:grid-cols-2">
                  {tx.services.featured.points.map((p, i) => (
                    <li key={p} className="flex gap-4 border-t border-white/12 py-4">
                      <span className="meta pt-0.5 text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] font-medium leading-snug text-white/90">
                        {p}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-auto pt-10">
                  <LocalizedLink to="/services" className="btn-primary">
                    {tx.services.featured.link} <ArrowRight size={17} />
                  </LocalizedLink>
                </div>
              </article>
            </ScrollReveal>

            {/* Supporting services: horizontal rows, the whole card a link. */}
            {tx.services.cards.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <ScrollReveal key={s.title} delay={100 + i * 90} className="lg:col-span-5">
                  <LocalizedLink
                    to="/services"
                    className="group card-elevated flex h-full items-start gap-5 !p-6 sm:!p-7"
                  >
                    <div className="icon-chip">
                      <Icon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[19px] font-bold text-primary">{s.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">
                        {s.desc}
                      </p>
                      {/* sr-only name inside the anchor fixes the accessible
                          name AND the anchor text crawlers read — an
                          aria-label would only fix the former. */}
                      <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[14px] font-semibold text-accent-text">
                        {tx.services.readMore}
                        <span className="sr-only"> — {s.title}</span>
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-primary transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                    >
                      <ArrowUpRight size={17} />
                    </span>
                  </LocalizedLink>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ───
          The client's own photography, composed rather than tiled: a large
          frame, an overlapping second frame, and a gold founding stamp. */}
      <section className="section-pad-lg overflow-hidden bg-surface-sunken">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <ScrollReveal direction="left" className="lg:col-span-6">
            <div className="relative mx-auto h-[400px] max-w-[560px] sm:h-[520px] lg:mx-0">
              <div className="absolute left-0 top-0 h-[72%] w-[84%] overflow-hidden rounded-[28px] shadow-panel">
                <div className="sd-drift h-full w-full">
                  <Photo
                    file={MEDIA.expo1}
                    alt={captions[0]}
                    sizes="(min-width: 1024px) 40vw, 84vw"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 h-[50%] w-[60%] overflow-hidden rounded-[28px] border-[6px] border-surface-sunken shadow-panel">
                <div className="sd-drift h-full w-full">
                  <Photo
                    file={MEDIA.expo2}
                    alt={captions[1]}
                    sizes="(min-width: 1024px) 30vw, 60vw"
                  />
                </div>
              </div>
              <div className="absolute bottom-10 left-4 rounded-[22px] bg-accent px-6 py-5 text-accent-ink shadow-[var(--shadow-btn-hover)] sm:bottom-14 sm:left-8">
                <div className="font-display text-[26px] font-extrabold leading-none">
                  {all.ui.est}
                </div>
                <div className="meta mt-2 text-accent-ink/80">{all.ui.hq}</div>
              </div>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-6">
            <ScrollReveal>
              <SectionTitle
                align="left"
                index="02"
                eyebrow={tx.whyChoose.eyebrow}
                title={tx.whyChoose.title}
                description={tx.whyChoose.description}
              />
            </ScrollReveal>
            <ol className="mt-12">
              {tx.whyChoose.items.map((item, i) => (
                <ScrollReveal
                  key={item.label}
                  as="li"
                  delay={i * 90}
                  className="group grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-primary/10 py-6 last:border-b"
                >
                  <span className="font-display text-[15px] font-bold tabular-nums text-primary/40 transition-colors duration-300 group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-3 text-[19px] font-bold text-primary">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="h-0.5 w-0 rounded-full bg-accent transition-all duration-500 ease-out-expo group-hover:w-8"
                      />
                    </h3>
                    <p className="mt-2 text-[16px] leading-[1.6] text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ───
          Full-bleed navy. The four steps sit on one corridor: a gold track
          draws across when the row arrives, and a bead travels it on loop. */}
      <section className="section-pad-lg relative isolate overflow-hidden bg-primary text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(160deg, var(--color-primary) 10%, var(--color-primary-dark) 60%, var(--color-ink))",
          }}
        />
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 text-white/[0.06]" />
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              tone="dark"
              index="03"
              eyebrow={tx.howItWorks.eyebrow}
              title={tx.howItWorks.title}
              description={tx.howItWorks.description}
            />
          </ScrollReveal>

          <RevealGroup className="relative mt-16 lg:mt-24" threshold={0.25}>
            <StepTrack />
            <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {tx.howItWorks.steps.map((s, i) => {
                const Icon = stepIcons[i];
                return (
                  <RevealItem
                    key={s.title}
                    index={i}
                    step={140}
                    as="li"
                    className="group relative pl-16 lg:pl-0"
                  >
                    <div className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-primary-dark text-accent shadow-[0_0_0_6px_var(--color-primary)] transition-all duration-500 ease-spring group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink lg:relative">
                      <Icon size={20} />
                    </div>
                    <p className="meta mt-0 text-accent lg:mt-8">
                      {tx.howItWorks.stepLabel} {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-heading font-bold text-white">{s.title}</h3>
                    <p className="mt-3 max-w-[30ch] text-[16px] leading-[1.6] text-white/70">
                      {s.desc}
                    </p>
                  </RevealItem>
                );
              })}
            </ol>
          </RevealGroup>
        </div>
      </section>

      {/* ─── PROVEN RESULTS ───
          Three real engagements whose figures match the case studies on
          /experience — no testimonials, no ratings, nothing unverifiable.
          EXHIBITION_ROUTES is in the same order, so each column links to the
          page that tells that story in full. */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="04"
              eyebrow={tx.proof.eyebrow}
              title={tx.proof.title}
              description={tx.proof.description}
              action={
                <LocalizedLink to="/experience" className="btn-outline">
                  {tx.proof.cta} <ArrowRight size={16} />
                </LocalizedLink>
              }
            />
          </ScrollReveal>

          <RevealGroup className="mt-16 grid border-y border-border md:grid-cols-3">
            {tx.proof.items.map((item, i) => (
              <RevealItem
                key={item.event}
                index={i}
                step={120}
                className={cn(i > 0 && "border-t border-border md:border-l md:border-t-0")}
              >
                <LocalizedLink
                  to={EXHIBITION_ROUTES[i]}
                  className="group relative flex h-full flex-col px-2 py-10 transition-colors duration-500 ease-out-expo hover:bg-card md:px-8 md:py-12"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                  />
                  <p className="meta text-primary/60">{item.event}</p>
                  <p className="mt-6 font-display text-stat font-extrabold tracking-[-0.03em] text-primary tabular-nums">
                    {item.stat}
                  </p>
                  <p className="meta mt-3 text-accent-text">{item.label}</p>
                  <p className="mt-6 flex-1 text-[16px] leading-[1.65] text-muted-foreground">
                    {item.desc}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 font-display text-[14px] font-semibold text-primary">
                    {all.ui.caseStudy}
                    <span className="sr-only"> — {item.event}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </LocalizedLink>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        className="!pt-0"
        title={tx.cta.title}
        description={tx.cta.description}
        primary={{ to: "/partner", label: tx.cta.btn }}
        secondary={{ to: "/contact", label: all.nav.contact }}
      />
    </SiteLayout>
  );
}

/* The corridor board in the hero: Shanghai as the origin, each region a
   departure with its country count and a live route line. */
function CorridorBoard({
  title,
  hq,
  regions,
  countriesLabel,
}: {
  title: string;
  hq: string;
  regions: [string, readonly string[]][];
  countriesLabel: string;
}) {
  return (
    <div className="glass-dark relative overflow-hidden rounded-[28px] p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <span className="flex items-center gap-2.5 meta text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-accent pulse-ring" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          {title}
        </span>
        <Plane size={16} className="text-white/50" aria-hidden="true" />
      </div>

      {/* Origin */}
      <div className="flex items-center justify-between gap-4 py-5">
        <div>
          <div className="font-display text-[22px] font-bold text-white">{hq}</div>
          <div className="meta mt-1 text-white/45">{HQ_COORDS}</div>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 font-display text-[12px] font-bold text-accent-ink">
          SHA
        </span>
      </div>

      <ul className="space-y-2">
        {regions.map(([region, countries], i) => (
          <li
            key={region}
            className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 transition-colors hover:border-accent/40 hover:bg-white/[0.07]"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="font-display text-[15px] font-semibold text-white">{region}</span>
                {/* Route line — dashes flow toward the region. */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 80 8"
                  className="h-2 w-16 flex-shrink-0 text-accent"
                  fill="none"
                >
                  <path d="M0 4 H80" stroke="currentColor" strokeOpacity="0.25" />
                  <path
                    d="M0 4 H80"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="route-flow"
                    style={{ animationDelay: `${i * -0.45}s` }}
                  />
                </svg>
              </div>
              <div className="mt-1 truncate text-[13px] text-white/55">{countries.join(" · ")}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-[20px] font-bold leading-none tabular-nums text-accent">
                {String(countries.length).padStart(2, "0")}
              </div>
              <div className="meta mt-1 text-[10px] text-white/45">{countriesLabel}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* The gold corridor behind the four process steps. Draws with scaleX off the
   enclosing RevealGroup's trigger, so line and nodes stay in lockstep. */
function StepTrack() {
  const visible = useRevealGroup();
  return (
    <>
      {/* Desktop: horizontal, through the node centres. */}
      <div
        aria-hidden="true"
        className="absolute left-6 right-6 top-6 hidden h-px bg-white/15 lg:block"
      >
        <div
          className={cn(
            "h-full origin-left bg-gradient-to-r from-accent via-accent to-accent/20 transition-transform duration-[1600ms] ease-out-expo",
            visible ? "scale-x-100" : "scale-x-0",
          )}
        />
        <span className="track-dot absolute -top-[3px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]" />
      </div>
      {/* Mobile / tablet: vertical, down the node column. */}
      <div aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-white/15 sm:hidden">
        <div
          className={cn(
            "w-full origin-top bg-accent transition-transform duration-[1600ms] ease-out-expo",
            visible ? "h-full scale-y-100" : "h-full scale-y-0",
          )}
        />
      </div>
    </>
  );
}
