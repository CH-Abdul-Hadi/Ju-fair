import { createFileRoute } from "@tanstack/react-router";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { SiteLayout, PageHero, CtaBand } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { RevealGroup, RevealItem } from "@/components/site/RevealGroup";
import { Photo } from "@/components/site/Photo";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { MEDIA } from "@/lib/media";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { cn } from "@/lib/utils";
import { Globe2, Building2, Users, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partner")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/partner", search),
  head: () => seoHead("/partner", "en"),
  component: PartnerPage,
});

const trackIcons = [Globe2, Building2, Users];

export function PartnerPage() {
  const { lang } = useLanguage();
  const all = t(lang);
  const tx = all.partner;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
        image={MEDIA.deal}
      />

      {/* ─── PARTNERSHIP TRACKS ───
          Three columns of one ruled panel rather than three floating cards:
          they are alternatives, and sitting side by side in one frame makes
          that comparison explicit. Ordinals give structure without ranking
          the tracks — no "most popular" claim is made. */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="01"
              eyebrow={tx.models.eyebrow}
              title={tx.models.title}
              description={tx.models.description}
            />
          </ScrollReveal>

          <RevealGroup className="mt-14">
            <ul className="grid overflow-hidden rounded-[32px] border border-border bg-card shadow-card lg:grid-cols-3">
              {tx.models.items.map((track, i) => {
                const Icon = trackIcons[i];
                return (
                  <RevealItem
                    key={track.title}
                    as="li"
                    index={i}
                    step={120}
                    className={cn(
                      "group relative flex flex-col p-8 transition-colors duration-500 ease-out-expo hover:bg-surface md:p-10",
                      i > 0 && "border-t border-border lg:border-l lg:border-t-0",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                    />
                    <div className="flex items-start justify-between">
                      <div className="icon-chip !h-14 !w-14 !rounded-2xl">
                        <Icon size={26} />
                      </div>
                      <span
                        aria-hidden="true"
                        className="stroke-type font-display text-[72px] font-extrabold leading-[0.8] text-primary/20 transition-colors duration-500 group-hover:text-accent"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-12 text-title font-extrabold text-primary lg:min-h-[2.3em]">
                      {track.title}
                    </h3>
                    <p className="mt-4 flex-1 text-[16px] leading-[1.65] text-muted-foreground">
                      {track.desc}
                    </p>
                    <LocalizedLink to="/contact" className="btn-outline mt-10 self-start">
                      {tx.models.applyNow}
                      <span className="sr-only"> — {track.title}</span>
                      <ArrowRight size={16} />
                    </LocalizedLink>
                  </RevealItem>
                );
              })}
            </ul>
          </RevealGroup>
        </div>
      </section>

      {/* ─── BENEFITS ─── navy band beside a tall photograph. */}
      <section className="section-pad-lg relative isolate overflow-hidden bg-primary text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-dark) 55%, var(--color-ink))",
          }}
        />
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 text-white/[0.05]" />
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="relative h-[360px] overflow-hidden rounded-[28px] shadow-panel sm:h-[460px] lg:sticky lg:top-32 lg:h-[620px]">
              <div className="sd-drift h-full w-full">
                <Photo
                  file={MEDIA.evening}
                  alt="Buyers hosted at an evening networking reception"
                  sizes="(min-width: 1024px) 40vw, 92vw"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
              />
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7">
            <ScrollReveal>
              <SectionTitle
                align="left"
                tone="dark"
                index="02"
                eyebrow={tx.benefits.eyebrow}
                title={tx.benefits.title}
                description={tx.benefits.description}
              />
            </ScrollReveal>
            <div className="mt-12 space-y-4">
              {tx.benefits.items.map((b, i) => (
                <ScrollReveal key={b.t} delay={i * 110}>
                  <article className="group rounded-[24px] border border-white/10 bg-white/[0.04] p-6 transition-colors duration-500 hover:border-accent/40 hover:bg-white/[0.07] md:p-8">
                    <div className="flex items-center gap-4">
                      <span className="meta text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-heading font-bold text-white">{b.t}</h3>
                    </div>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
                      {b.items.map((it) => (
                        <li key={it} className="flex gap-3 text-[15px] leading-snug text-white/80">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={tx.cta.title}
        description={tx.cta.desc}
        primary={{ to: "/contact", label: tx.cta.btn }}
        secondary={{ to: "/faqs", label: all.footer.links.faqs }}
      />
    </SiteLayout>
  );
}
