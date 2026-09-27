import { ArrowLeft, CalendarDays } from "lucide-react";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";

type Section = { h: string; p: readonly string[] };

const sectionId = (i: number) => `section-${i + 1}`;

/**
 * Shared shell for /privacy and /terms.
 *
 * Both documents are the same shape — a hero, a "last updated" line, then
 * numbered prose sections — so they share one renderer. Long legal text is
 * read by jumping, so a sticky table of contents sits beside it on desktop.
 */
export function LegalDocument({
  doc,
}: {
  doc: { hero: { eyebrow: string; title: string; subtitle: string }; sections: readonly Section[] };
}) {
  const { lang } = useLanguage();
  const all = t(lang);
  const legal = all.legal;

  return (
    <SiteLayout>
      <PageHero eyebrow={doc.hero.eyebrow} title={doc.hero.title} subtitle={doc.hero.subtitle} />

      <section className="section-pad bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-32">
              <p className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-[14px] text-muted-foreground shadow-xs">
                <CalendarDays size={17} className="text-accent-text" />
                <span>
                  {legal.updated}:{" "}
                  <time dateTime="2026-09-18" className="font-semibold text-primary">
                    {legal.updatedDate}
                  </time>
                </span>
              </p>
              <nav aria-label={all.ui.contents} className="hidden lg:block">
                <p className="eyebrow">{all.ui.contents}</p>
                <ol className="space-y-0.5 border-l border-border">
                  {doc.sections.map((s, i) => (
                    <li key={s.h}>
                      <a
                        href={`#${sectionId(i)}`}
                        className="-ml-px flex gap-3 border-l-2 border-transparent py-2 pl-4 text-[14px] text-muted-foreground transition-colors hover:border-accent hover:text-primary"
                      >
                        <span className="meta pt-px text-[11px] text-primary/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.h}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <ScrollReveal className="lg:col-span-8">
            <article className="rounded-[28px] border border-border bg-card p-6 shadow-card sm:p-10 md:p-12">
              <div className="space-y-12">
                {doc.sections.map((section, i) => (
                  <div key={section.h} id={sectionId(i)} className="scroll-mt-32">
                    <h2 className="flex gap-4 text-[clamp(1.25rem,1.15rem+0.45vw,1.5rem)] font-bold text-primary">
                      <span aria-hidden="true" className="tabular-nums text-accent-text">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">{section.h}</span>
                    </h2>
                    <div className="mt-4 space-y-4 sm:pl-11">
                      {section.p.map((para) => (
                        <p key={para} className="text-[16px] leading-[1.75] text-muted-foreground">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14 border-t border-border pt-8">
                <LocalizedLink to="/" className="btn-outline">
                  <ArrowLeft size={16} /> {all.nav.home}
                </LocalizedLink>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
