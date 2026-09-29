import { createFileRoute } from "@tanstack/react-router";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { ChevronDown, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/faqs", search),
  head: () => seoHead("/faqs", "en"),
  component: FaqsPage,
});

export function FaqsPage() {
  const { lang } = useLanguage();
  const tx = t(lang).faqs;

  return (
    <SiteLayout>
      <PageHero eyebrow={tx.hero.eyebrow} title={tx.hero.title} subtitle={tx.hero.subtitle} />

      {/* ─── ACCORDION GROUPS ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <div className="mx-auto max-w-3xl space-y-14">
            {tx.groups.map((group, gi) => (
              <div key={group.title}>
                <ScrollReveal>
                  <h2 className="text-title font-display font-extrabold text-primary">
                    {group.title}
                  </h2>
                  <div className="mt-4 mb-8 h-1 w-16 rounded-full bg-accent" />
                </ScrollReveal>

                <div className="space-y-4">
                  {group.items.map((item, i) => (
                    <ScrollReveal key={item.q} delay={i * 60} direction="up">
                      {/*
                        Native <details> rather than a JS accordion, for three
                        reasons: the answer text is in the DOM for crawlers even
                        while collapsed, keyboard and screen-reader behaviour is
                        the browser's rather than ours to re-implement, and it
                        needs no exit animation — which this build of
                        tw-animate-css cannot do (see CLAUDE.md).
                      */}
                      <details className="group card-elevated !p-0 overflow-hidden">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[16px] font-bold text-primary transition-colors duration-[var(--dur-fast)] hover:text-accent-text [&::-webkit-details-marker]:hidden">
                          <span className="min-w-0">{item.q}</span>
                          <ChevronDown
                            size={20}
                            aria-hidden="true"
                            className="shrink-0 text-accent-text transition-transform duration-[var(--dur-base)] ease-out-soft group-open:rotate-180"
                          />
                        </summary>
                        <div className="border-t border-border px-6 pb-6 pt-5">
                          <p className="text-[15px] leading-relaxed text-muted-foreground">
                            {item.a}
                          </p>
                        </div>
                      </details>
                    </ScrollReveal>
                  ))}
                </div>

                {/* A hairline between groups, but not after the last one. */}
                {gi < tx.groups.length - 1 && (
                  <div className="mt-14 h-px w-full bg-border" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <div className="card-elevated mx-auto max-w-2xl text-center">
              <div className="icon-chip mx-auto mb-5">
                <MessageSquare size={22} />
              </div>
              <h2 className="text-heading font-display font-extrabold text-primary">
                {tx.cta.title}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {tx.cta.desc}
              </p>
              <LocalizedLink
                to="/contact"
               
                className="btn-primary mt-7 inline-flex"
              >
                {tx.cta.btn}
              </LocalizedLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
