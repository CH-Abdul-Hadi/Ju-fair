import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteLayout, PageHero, CtaBand } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { RouteArc } from "@/components/site/RouteArc";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { EXHIBITION_ROUTES } from "@/lib/paths";
import { MEDIA } from "@/lib/media";

/** Masthead photo per engagement, in EXHIBITION_ROUTES order. */
const HERO_IMAGES = [MEDIA.expo1, MEDIA.expo2, MEDIA.expo3];

/**
 * Shared shell for the per-exhibition landing pages.
 *
 * All three share a structure, but none shares its substance: each carries
 * its own figure, service emphasis and buyer profile, taken from a documented
 * engagement. That is why only three of the seven exhibitions have a page —
 * see `EXHIBITION_ROUTES` in `src/lib/paths.ts`.
 *
 * `index` selects from `translations.exhibitions.items`, zipped positionally
 * against `EXHIBITION_ROUTES`.
 */
export function ExhibitionPage({ index }: { index: number }) {
  const { lang } = useLanguage();
  const all = t(lang);
  const tx = all.exhibitions;
  const item = tx.items[index];
  const c = tx.common;
  const others = tx.items.map((it, i) => ({ it, i })).filter(({ i }) => i !== index);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={c.eyebrow}
        title={item.title}
        subtitle={item.subtitle}
        image={HERO_IMAGES[index]}
      />

      {/* ─── RESULT ───
          The figure leads: it is the one thing a prospect cannot get from a
          competitor's service description, and it matches the case study on
          /experience so the two corroborate each other. */}
      <section className="bg-surface pb-20 md:pb-28">
        <div className="container-x">
          <ScrollReveal>
            <div className="relative z-20 -mt-12 grid overflow-hidden rounded-[28px] border border-border bg-card shadow-panel md:-mt-16 md:grid-cols-12">
              <div className="relative isolate overflow-hidden bg-primary p-8 text-white md:col-span-5 md:p-12">
                <div
                  aria-hidden="true"
                  className="bg-dots absolute inset-0 -z-10 text-white/[0.07]"
                />
                <p className="eyebrow-light">{c.resultTitle}</p>
                <p className="font-display text-[clamp(4rem,2.8rem+4.5vw,7rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
                  {item.stat}
                </p>
                <p className="meta mt-4 text-accent">{item.statLabel}</p>
              </div>
              <div className="flex items-center p-8 md:col-span-7 md:p-12">
                <p className="font-display text-[clamp(1.125rem,1rem+0.55vw,1.5rem)] font-medium leading-[1.55] text-primary">
                  {item.summary}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── APPROACH ─── sticky heading, numbered ledger of what was done. */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ScrollReveal className="lg:sticky lg:top-32">
              {/* No eyebrow: it would only repeat the event name in the H1. */}
              <SectionTitle align="left" index="01" title={c.approachTitle} />
            </ScrollReveal>
          </div>
          <ol className="lg:col-span-7">
            {item.approach.map((point, i) => (
              <ScrollReveal
                key={point}
                as="li"
                delay={i * 80}
                className="group grid grid-cols-[4rem_minmax(0,1fr)] items-baseline gap-4 border-t border-primary/10 py-7 last:border-b"
              >
                <span className="font-display text-[34px] font-extrabold leading-none tabular-nums text-primary/20 transition-colors duration-500 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[17px] leading-[1.6] text-foreground">{point}</p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── REACH ─── */}
      <section className="section-pad-lg relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 text-white/[0.05]" />
        <RouteArc
          className="absolute -left-20 bottom-0 -z-10 w-[640px] text-white opacity-50"
          flip
        />
        <div className="container-x">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <SectionTitle align="left" tone="dark" index="02" title={c.reachTitle} />
              <p className="mt-8 font-display text-[clamp(1.25rem,1.05rem+0.9vw,1.875rem)] font-medium leading-[1.45] text-white/85">
                {item.reach}
              </p>
              <div className="mt-12 flex flex-wrap gap-4 border-t border-white/10 pt-10">
                <LocalizedLink to="/services" className="btn-primary">
                  {c.servicesLink} <ArrowRight size={17} />
                </LocalizedLink>
                <LocalizedLink to="/experience" className="btn-light">
                  {c.experienceLink}
                </LocalizedLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── THE OTHER ENGAGEMENTS ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle variant="split" index="03" title={c.experienceLink} />
          </ScrollReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {others.map(({ it, i }, n) => (
              <ScrollReveal key={it.event} delay={n * 120}>
                <LocalizedLink
                  to={EXHIBITION_ROUTES[i]}
                  className="group card-elevated flex h-full items-end justify-between gap-6 md:!p-10"
                >
                  <div>
                    <p className="meta text-primary/60">{it.event}</p>
                    <p className="mt-5 font-display text-stat font-extrabold tracking-[-0.03em] text-primary tabular-nums">
                      {it.stat}
                    </p>
                    <p className="meta mt-3 text-accent-text">{it.statLabel}</p>
                    <h3 className="mt-6 text-[18px] font-bold text-primary">{it.title}</h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                  >
                    <ArrowUpRight size={19} />
                  </span>
                </LocalizedLink>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        className="!pt-0"
        title={c.ctaTitle}
        description={c.ctaDesc}
        primary={{ to: "/contact", label: c.ctaBtn }}
        secondary={{ to: "/partner", label: all.nav.becomePartner }}
      />
    </SiteLayout>
  );
}
