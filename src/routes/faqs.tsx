import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CtaBand } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/faqs", search),
  head: () => seoHead("/faqs", "en"),
  component: FaqsPage,
});

const groupId = (i: number) => `topic-${i + 1}`;

export function FaqsPage() {
  const { lang } = useLanguage();
  const all = t(lang);
  const tx = all.faqs;

  return (
    <SiteLayout>
      <PageHero eyebrow={tx.hero.eyebrow} title={tx.hero.title} subtitle={tx.hero.subtitle} />

      <section className="section-pad bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ─── TOPIC INDEX ─── */}
          <nav aria-label={all.ui.topics} className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">{all.ui.topics}</p>
              <ol className="overflow-hidden rounded-[24px] border border-border bg-card shadow-card">
                {tx.groups.map((g, i) => (
                  <li key={g.title} className={i > 0 ? "border-t border-border" : undefined}>
                    <a
                      href={`#${groupId(i)}`}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface"
                    >
                      <span className="meta text-accent-text">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-[15.5px] font-semibold text-primary">
                        {g.title}
                      </span>
                      <span className="meta text-[11px] text-muted-foreground">
                        {g.items.length} {all.ui.questions}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* ─── QUESTIONS ─── */}
          <div className="space-y-16 lg:col-span-8">
            {tx.groups.map((group, gi) => (
              <div key={group.title} id={groupId(gi)} className="scroll-mt-32">
                <ScrollReveal>
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-[15px] font-bold tabular-nums text-accent-text"
                    >
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-title font-extrabold text-primary">{group.title}</h2>
                  </div>
                </ScrollReveal>

                <div className="mt-8 border-t border-primary/10">
                  {group.items.map((item, i) => (
                    <ScrollReveal key={item.q} delay={i * 50}>
                      {/* Native <details>: answers stay in the DOM for
                          crawlers, keyboard and screen-reader behaviour is
                          the browser's, and no exit animation is needed —
                          this build of tw-animate-css cannot do one. */}
                      <details className="group border-b border-primary/10 open:bg-card">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-1 py-6 transition-colors duration-300 group-open:px-6 hover:text-primary [&::-webkit-details-marker]:hidden">
                          <span className="min-w-0 font-display text-[17px] font-semibold leading-snug text-primary">
                            {item.q}
                          </span>
                          <span
                            aria-hidden="true"
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/15 text-primary transition-all duration-500 ease-out-expo group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-accent-ink"
                          >
                            <Plus size={17} />
                          </span>
                        </summary>
                        <div className="px-6 pb-7">
                          <p className="max-w-[64ch] text-[16px] leading-[1.7] text-muted-foreground">
                            {item.a}
                          </p>
                        </div>
                      </details>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        className="!pt-0"
        title={tx.cta.title}
        description={tx.cta.desc}
        primary={{ to: "/contact", label: tx.cta.btn }}
      />
    </SiteLayout>
  );
}
