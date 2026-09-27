import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CtaBand } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { RevealGroup, RevealItem, useRevealGroup } from "@/components/site/RevealGroup";
import { Photo } from "@/components/site/Photo";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { HQ_COORDS, MEDIA } from "@/lib/media";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { cn } from "@/lib/utils";
import { Target, Eye, Shield, Sparkles, Globe2, Quote, MapPin } from "lucide-react";

export const Route = createFileRoute("/about")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/about", search),
  head: () => seoHead("/about", "en"),
  component: AboutPage,
});

const valueIcons = [Sparkles, Shield, Globe2, Target];

/**
 * The timeline rail. Draws from the same RevealGroup trigger that cascades the
 * year nodes, so the line always arrives just ahead of them.
 */
function TimelineRail() {
  const visible = useRevealGroup();
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[7px] hidden h-px bg-white/15 md:block"
      >
        <div
          className={cn(
            "h-full origin-left bg-accent transition-transform duration-[1600ms] ease-out-expo",
            visible ? "scale-x-100" : "scale-x-0",
          )}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[7px] top-2 w-px bg-white/15 md:hidden"
      >
        <div
          className={cn(
            "h-full origin-top bg-accent transition-transform duration-[1600ms] ease-out-expo",
            visible ? "scale-y-100" : "scale-y-0",
          )}
        />
      </div>
    </>
  );
}

export function AboutPage() {
  const { lang } = useLanguage();
  const all = t(lang);
  const tx = all.about;
  const captions = all.experience.gallery.captions;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
        image={MEDIA.expo1}
      />

      {/* ─── COMPANY STORY ───
          Editorial spread: the mission statement is the headline of the
          section, set as a pull quote; the two paragraphs and four facts
          support it from the wider column. */}
      <section className="section-pad-lg bg-surface">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <ScrollReveal className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionTitle
                  align="left"
                  index="01"
                  eyebrow={tx.story.eyebrow}
                  title={tx.story.title}
                />
                {tx.story.missionStatement && (
                  <figure className="relative mt-12 rounded-[24px] bg-primary p-8 text-white shadow-panel">
                    <Quote aria-hidden="true" size={36} className="text-accent" />
                    <blockquote className="mt-5 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)] font-semibold leading-[1.35]">
                      {tx.story.missionStatement}
                    </blockquote>
                    <figcaption className="meta mt-6 text-white/55">JU FAIR GLOBAL</figcaption>
                  </figure>
                )}
              </div>
            </ScrollReveal>

            <div className="lg:col-span-7">
              <ScrollReveal delay={120}>
                <p className="font-display text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-medium leading-[1.5] text-primary">
                  {tx.story.p1}
                </p>
                <p className="mt-6 text-lede text-muted-foreground">{tx.story.p2}</p>
              </ScrollReveal>

              <ul className="mt-12 grid overflow-hidden rounded-[24px] border border-border bg-card sm:grid-cols-2">
                {tx.story.highlights.map((item, i) => (
                  <ScrollReveal
                    key={item}
                    as="li"
                    delay={i * 80}
                    className={cn(
                      "flex items-center gap-4 p-6",
                      i > 0 && "border-t border-border",
                      i === 1 && "sm:border-t-0",
                      i % 2 === 1 && "sm:border-l",
                    )}
                  >
                    <span className="font-display text-[13px] font-bold tabular-nums text-accent-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[17px] font-semibold text-primary">
                      {item}
                    </span>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </div>

          {/* Wide photograph that opens up as it arrives. */}
          <ScrollReveal className="mt-20 lg:mt-28">
            <div className="sd-unveil relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-panel sm:aspect-[21/9]">
              <div className="sd-drift h-full w-full">
                <Photo
                  file={MEDIA.expo2}
                  alt={captions[1]}
                  sizes="(min-width: 1280px) 1200px, 100vw"
                />
              </div>
              <div className="glass-dark absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-5 py-4 text-white sm:bottom-8 sm:left-8">
                <MapPin size={18} className="text-accent" />
                <div>
                  <div className="font-display text-[15px] font-semibold">{all.ui.hq}</div>
                  <div className="meta mt-0.5 text-[11px] text-white/60">{HQ_COORDS}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── two opposed panels, navy and white. */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="02"
              eyebrow={tx.mission.eyebrow}
              title={tx.mission.title}
              description={tx.mission.description}
            />
          </ScrollReveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {tx.mission.cards.map((card, i) => {
              const Icon = i === 0 ? Target : Eye;
              const dark = i === 0;
              return (
                <ScrollReveal key={card.title} delay={i * 140}>
                  <article
                    className={cn(
                      "group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-[28px] p-8 md:p-12",
                      dark
                        ? "bg-primary text-white shadow-panel"
                        : "card-elevated !rounded-[28px] md:!p-12",
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      size={220}
                      strokeWidth={1}
                      className={cn(
                        "absolute -bottom-12 -right-12 transition-transform duration-700 ease-out-expo group-hover:-rotate-6 group-hover:scale-105",
                        dark ? "text-white/[0.06]" : "text-primary/[0.05]",
                      )}
                    />
                    <div className="relative flex items-center justify-between">
                      <div className={dark ? "icon-chip-invert" : "icon-chip"}>
                        <Icon size={22} />
                      </div>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "font-display text-[64px] font-extrabold leading-none stroke-type",
                          dark ? "text-white/25" : "text-primary/20",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="relative mt-16">
                      <h3
                        className={cn(
                          "text-title font-extrabold",
                          dark ? "text-white" : "text-primary",
                        )}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-5 max-w-[40ch] text-lede",
                          dark ? "text-white/75" : "text-muted-foreground",
                        )}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── one ruled panel; each cell floods navy on hover. */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="03"
              eyebrow={tx.values.eyebrow}
              title={tx.values.title}
            />
          </ScrollReveal>
          <RevealGroup className="mt-14">
            <ul className="grid overflow-hidden rounded-[28px] border border-border bg-card shadow-card sm:grid-cols-2 lg:grid-cols-4">
              {tx.values.items.map((v, i) => {
                const Icon = valueIcons[i];
                return (
                  <RevealItem
                    key={v.title}
                    as="li"
                    index={i}
                    step={100}
                    className={cn(
                      "group relative flex min-h-[300px] flex-col justify-between p-8 transition-colors duration-500 ease-out-expo hover:bg-primary",
                      i > 0 && "border-t border-border sm:border-t-0",
                      i === 2 && "sm:border-t lg:border-t-0",
                      i === 3 && "sm:border-t lg:border-t-0",
                      i % 2 === 1 && "sm:border-l",
                      i === 2 && "lg:border-l",
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="icon-chip">
                        <Icon size={22} />
                      </div>
                      <span
                        aria-hidden="true"
                        className="meta text-primary/35 transition-colors duration-500 group-hover:text-white/45"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-12">
                      <h3 className="text-heading font-bold text-primary transition-colors duration-500 group-hover:text-white">
                        {v.title}
                      </h3>
                      <p className="mt-3 text-[15.5px] leading-[1.6] text-muted-foreground transition-colors duration-500 group-hover:text-white/75">
                        {v.desc}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </ul>
          </RevealGroup>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="section-pad-lg relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 text-white/[0.05]" />
        <div
          aria-hidden="true"
          className="absolute -left-40 top-0 -z-10 h-[34rem] w-[34rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 60%, transparent), transparent 65%)",
          }}
        />
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              tone="dark"
              index="04"
              eyebrow={tx.timeline.eyebrow}
              title={tx.timeline.title}
              description={tx.timeline.subtitle}
            />
          </ScrollReveal>

          <RevealGroup className="relative mt-16 md:mt-24" threshold={0.2}>
            <TimelineRail />
            <ol className="relative grid gap-12 pl-10 md:grid-cols-4 md:gap-8 md:pl-0">
              {tx.timeline.events.map((e, i) => (
                <RevealItem
                  key={e.year}
                  as="li"
                  index={i}
                  step={160}
                  className="group relative md:pt-12"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-10 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-ink transition-colors duration-300 group-hover:bg-accent md:left-0 md:top-0"
                  />
                  <p className="font-display text-[clamp(2.5rem,2rem+1.8vw,3.5rem)] font-extrabold leading-none tabular-nums text-accent">
                    {e.year}
                  </p>
                  <h3 className="mt-4 text-heading font-bold text-white md:mt-6">{e.t}</h3>
                  <p className="mt-3 max-w-[32ch] text-[16px] leading-[1.6] text-white/65">{e.d}</p>
                </RevealItem>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title={all.home.cta.title}
        description={all.home.cta.description}
        primary={{ to: "/partner", label: all.home.cta.btn }}
        secondary={{ to: "/contact", label: all.nav.contact }}
      />
    </SiteLayout>
  );
}
