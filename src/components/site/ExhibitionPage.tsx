import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { CheckCircle2, ArrowRight, Globe2 } from "lucide-react";

/**
 * Shared shell for the per-exhibition landing pages.
 *
 * All three share a structure, but none shares its substance: each carries its
 * own figure, its own service emphasis and its own buyer profile, taken from a
 * documented engagement. That distinction is the whole reason only three of the
 * seven exhibitions have a page — see `EXHIBITION_ROUTES` in `src/lib/paths.ts`.
 *
 * `index` selects from `translations.exhibitions.items`, zipped positionally
 * against `EXHIBITION_ROUTES`.
 */
export function ExhibitionPage({ index }: { index: number }) {
  const { lang } = useLanguage();
  const tx = t(lang).exhibitions;
  const item = tx.items[index];
  const c = tx.common;

  return (
    <SiteLayout>
      <PageHero eyebrow={c.eyebrow} title={item.title} subtitle={item.subtitle} />

      {/* ─── RESULT ───
          The figure leads. It is the one thing on this page a prospect cannot
          get from a competitor's service description, and it matches the case
          study on /experience so the two corroborate each other. */}
      <section className="bg-surface pb-20 md:pb-28">
        <div className="container-x">
          <ScrollReveal>
            <div className="relative z-20 -mt-14 rounded-[26px] border border-border bg-card px-6 py-10 shadow-panel md:-mt-20 md:px-12 md:py-14">
              <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 md:items-center">
                <div className="text-center md:text-left">
                  <p className="eyebrow">{c.resultTitle}</p>
                  <p className="mt-3 font-display text-stat font-extrabold text-primary tabular-nums">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-text">
                    {item.statLabel}
                  </p>
                </div>
                <p className="border-t border-border pt-6 text-[16px] leading-[1.75] text-muted-foreground md:border-l md:border-t-0 md:pl-12 md:pt-0">
                  {item.summary}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── APPROACH ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            {/* No eyebrow here, for two reasons. It would only repeat the event
                name already in the H1 and the hero — and `eyebrow` is
                `--accent-text`, which is 4.81:1 on white but only **4.21:1** on
                `bg-surface-sunken`, under the 4.5 minimum for 12px bold. That
                token is safe on cards and on `bg-surface`; it is not safe on
                the sunken band. */}
            <SectionTitle title={c.approachTitle} align="left" />
          </ScrollReveal>

          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {item.approach.map((point, i) => (
              <ScrollReveal
                key={point}
                delay={i * 80}
                as="li"
                className="flex items-start gap-4 rounded-xl border border-black/[0.03] bg-white p-5 shadow-sm"
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-text">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-[15px] leading-relaxed text-foreground">{point}</span>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── REACH ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <div className="card-elevated mx-auto max-w-3xl">
              <div className="icon-chip mb-5">
                <Globe2 size={22} />
              </div>
              <h2 className="text-heading font-display font-extrabold text-primary">
                {c.reachTitle}
              </h2>
              <p className="mt-4 text-[16px] leading-[1.75] text-muted-foreground">{item.reach}</p>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-7">
                <LocalizedLink to="/services" className="btn-outline inline-flex">
                  {c.servicesLink}
                </LocalizedLink>
                <LocalizedLink to="/experience" className="btn-ghost inline-flex">
                  {c.experienceLink}
                </LocalizedLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <div className="card-elevated mx-auto max-w-2xl text-center">
              <h2 className="text-heading font-display font-extrabold text-primary">
                {c.ctaTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                {c.ctaDesc}
              </p>
              <LocalizedLink to="/contact" className="btn-primary mt-7 inline-flex">
                {c.ctaBtn} <ArrowRight size={16} className="ml-1" />
              </LocalizedLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
