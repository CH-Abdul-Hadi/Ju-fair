import { LocalizedLink } from "@/components/site/LocalizedLink";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";

type Section = { h: string; p: readonly string[] };

/**
 * Shared shell for /privacy and /terms.
 *
 * Both documents are the same shape — a hero, a "last updated" line, then
 * numbered prose sections — so they share one renderer. Passing the resolved
 * `doc` in rather than a key keeps the two routes' `head()` calls independent.
 */
export function LegalDocument({
  doc,
}: {
  doc: { hero: { eyebrow: string; title: string; subtitle: string }; sections: readonly Section[] };
}) {
  const { lang } = useLanguage();
  const legal = t(lang).legal;
  const nav = t(lang).nav;

  return (
    <SiteLayout>
      <PageHero eyebrow={doc.hero.eyebrow} title={doc.hero.title} subtitle={doc.hero.subtitle} />

      <section className="section-pad bg-surface">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="card-elevated">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {legal.updated}:{" "}
                  <time dateTime="2026-09-18" className="text-accent-text">
                    {legal.updatedDate}
                  </time>
                </p>

                <div className="mt-10 space-y-10">
                  {doc.sections.map((section, i) => (
                    <div key={section.h}>
                      <h2 className="flex gap-3 text-[19px] font-display font-bold text-primary">
                        <span aria-hidden="true" className="text-accent-text tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">{section.h}</span>
                      </h2>
                      <div className="mt-3 space-y-3 pl-0 sm:pl-9">
                        {section.p.map((para) => (
                          <p
                            key={para}
                            className="text-[15px] leading-relaxed text-muted-foreground"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 border-t border-border pt-7">
                  <LocalizedLink to="/" className="btn-outline inline-flex">
                    {nav.home}
                  </LocalizedLink>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
