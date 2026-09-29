import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { RevealGroup, RevealItem, useRevealGroup } from "@/components/site/RevealGroup";
import { Tilt } from "@/components/site/Tilt";
import { SectionDivider } from "@/components/site/SectionDivider";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { Target, Eye, Shield, Users, Sparkles, CheckCircle2, Globe2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/about", search),
  head: () => seoHead("/about", "en"),
  component: AboutPage,
});

const valueIcons = [Sparkles, Shield, Globe2, Target];

/**
 * The timeline's connecting rail. Scales out from the left when the enclosing
 * RevealGroup becomes visible, so the line appears to be drawn rather than
 * simply switched on. Desktop only — on mobile the events stack vertically and
 * there is no horizontal run to connect.
 */
function TimelineRail() {
  const visible = useRevealGroup();
  return (
    <div
      aria-hidden="true"
      className={`hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] origin-left border-t-2 border-dashed bg-white/20 transition-transform duration-[1200ms] ease-out-expo ${
        visible ? "scale-x-100" : "scale-x-0"
      }`}
    />
  );
}

export function AboutPage() {
  const { lang } = useLanguage();
  const tx = t(lang).about;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
      />

      {/* ─── COMPANY STORY ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x grid gap-16 lg:grid-cols-2 items-center">
          <ScrollReveal direction="left">
            <div>
              <SectionTitle
                eyebrow={tx.story.eyebrow}
                title={tx.story.title}
                align="left"
              />
              <div className="mt-8 space-y-5 text-[17px] text-muted-foreground leading-[1.7]">
                <p>{tx.story.p1}</p>
                <p>{tx.story.p2}</p>
                {tx.story.missionStatement && (
                  <div className="mt-6 border-l-4 border-accent pl-4 py-2 italic bg-surface/50 rounded-r-lg font-medium text-primary">
                    "{tx.story.missionStatement}"
                  </div>
                )}
              </div>
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tx.story.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-accent-text" />
                    <span className="font-semibold text-primary text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -inset-4 bg-primary/5 rounded-[24px] transform -rotate-3 transition-transform duration-500 hover:rotate-0" />
              <img
                src="/Expo/expo2.jpeg"
                alt="JU Fair Global team hosting international delegates at a trade exhibition"
                width={900}
                height={450}
                loading="lazy"
                decoding="async"
                className="relative rounded-[18px] shadow-[0_20px_50px_rgba(11,61,145,0.15)] object-cover w-full h-[450px]"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="var(--color-surface)" to="var(--color-surface-sunken)" />

      {/* ─── MISSION & VISION ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.mission.eyebrow}
              title={tx.mission.title}
              description={tx.mission.description}
            />
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-2 mt-16">
            {tx.mission.cards.map((card, i) => {
              const Icon = i === 0 ? Target : Eye;
              return (
                <ScrollReveal key={card.title} delay={i * 150} direction="up">
                  <div className="card-elevated group p-10 h-full bg-white relative overflow-hidden">
                    {/* Decorative faint icon in background */}
                    <Icon size={160} className="absolute -bottom-10 -right-10 text-primary/[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/[0.05]" />

                    <div className="relative z-10">
                      <div className="icon-chip mb-6">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-[24px] font-bold text-primary">{card.title}</h3>
                      <p className="mt-4 text-[16px] text-muted-foreground leading-[1.7]">{card.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle variant="split" eyebrow={tx.values.eyebrow} title={tx.values.title} />
          </ScrollReveal>
          <RevealGroup className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-16">
            {tx.values.items.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <RevealItem key={v.title} index={i} step={100} direction="up">
                  <Tilt className="group">
                  <div className="card-elevated text-center p-10 h-full border-transparent hover:border-accent/30">
                    <div className="icon-chip mx-auto mb-6 !rounded-full">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-[20px] font-bold text-primary">{v.title}</h3>
                    <p className="mt-3 text-[15px] text-muted-foreground leading-[1.6]">{v.desc}</p>
                  </div>
                  </Tilt>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ─── HORIZONTAL TIMELINE ─── */}
      <section className="section-pad bg-primary text-white overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="container-x relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <p className="eyebrow-light inline-block">{tx.timeline.eyebrow}</p>
              <h2 className="text-title font-bold text-white mt-2">{tx.timeline.title}</h2>
              <p className="mt-4 text-lede text-white/70 max-w-2xl mx-auto">{tx.timeline.subtitle}</p>
              <div className="mt-5 h-1 w-12 rounded-full bg-accent mx-auto" />
            </div>
          </ScrollReveal>

          <RevealGroup className="mt-20 relative" threshold={0.2}>
            {/* The rail draws itself from the same trigger that cascades the
                year nodes, so the line always arrives just ahead of them
                instead of each running an independent observer. */}
            <TimelineRail />

            <div className="grid gap-12 md:gap-6 md:grid-cols-4 relative z-10">
              {tx.timeline.events.map((e, i) => (
                <RevealItem key={e.year} index={i} step={150} direction="up">
                  <div className="text-center group">
                    <div className="w-14 h-14 rounded-full bg-primary border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,.2)] text-accent font-bold text-[18px] grid place-items-center mx-auto relative transition-transform duration-300 ease-out-soft group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_rgba(245,166,35,.4)] group-hover:bg-white">
                      {e.year}
                    </div>
                    <h3 className="mt-6 text-[20px] font-bold text-white">{e.t}</h3>
                    <p className="mt-3 text-[15px] text-white/70 leading-[1.6] px-2">{e.d}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>
    </SiteLayout>
  );
}
