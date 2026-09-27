import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero, CtaBand } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { RevealGroup, RevealItem } from "@/components/site/RevealGroup";
import { WorldMap } from "@/components/site/WorldMap";
import { GLOBAL_HUBS, type HubId, type HubMarker } from "@/lib/hubs";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { MEDIA } from "@/lib/media";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { cn } from "@/lib/utils";
import { MousePointerClick, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/global-network")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/global-network", search),
  head: () => seoHead("/global-network", "en"),
  component: NetworkPage,
});

/** "Title: description" → both halves. Handles the Chinese full-width colon. */
function splitStep(step: string) {
  const m = step.match(/^([^:：]+)[:：]\s*(.*)$/);
  return m ? { title: m[1], desc: m[2] } : { title: step, desc: "" };
}

export function NetworkPage() {
  const { lang } = useLanguage();
  const all = t(lang);
  const tx = all.globalNetwork;
  const [selected, setSelected] = useState<HubMarker | null>(null);

  const regions = Object.entries(tx.regions) as [string, readonly string[]][];
  const tagLabels = Object.fromEntries(
    GLOBAL_HUBS.map((h) => [h.id, h.isHQ ? tx.map.hq : tx.hubs[h.id].region]),
  ) as Record<HubId, string>;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
        image={MEDIA.hero}
      />

      {/* ─── COVERAGE — map + hub directory ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="01"
              eyebrow={tx.coverage.eyebrow}
              title={tx.coverage.title}
              description={tx.coverage.description}
            />
          </ScrollReveal>

          <ScrollReveal className="mt-14">
            <div className="grid gap-3 rounded-[32px] bg-ink p-3 shadow-panel lg:grid-cols-12">
              {/* Map */}
              <div className="relative min-w-0 overflow-hidden rounded-[24px] bg-ink lg:col-span-8">
                <div className="absolute left-4 top-4 z-20 flex items-center gap-2.5 rounded-full bg-ink/70 px-4 py-2 ring-1 ring-white/10 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-accent pulse-ring" />
                    <span className="relative h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="meta text-[11px] text-accent">{tx.map.liveCorridor}</span>
                </div>
                <WorldMap activeHubId={selected?.id} onSelectHub={setSelected} labels={tagLabels} />
              </div>

              {/* Hub directory — the accessible control for the map. */}
              <div className="flex min-w-0 flex-col rounded-[24px] bg-white/[0.04] p-5 text-white ring-1 ring-white/[0.06] md:p-6 lg:col-span-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="meta text-white/60">{all.ui.hubDirectory}</h3>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-pressed={!selected}
                    className={cn(
                      "inline-flex h-9 items-center gap-2 rounded-full px-3.5 font-display text-[12px] font-semibold transition-colors",
                      selected
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-accent text-accent-ink",
                    )}
                  >
                    <RotateCcw size={13} /> {tx.map.allHubs}
                  </button>
                </div>

                <ul className="mt-5 flex-1 space-y-1.5">
                  {GLOBAL_HUBS.map((hub) => {
                    const h = tx.hubs[hub.id];
                    const on = selected?.id === hub.id;
                    return (
                      <li key={hub.id}>
                        <button
                          type="button"
                          onClick={() => setSelected(on ? null : hub)}
                          aria-pressed={on}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors duration-300",
                            on ? "bg-accent text-accent-ink" : "hover:bg-white/[0.07]",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "shrink-0 rounded-full",
                              hub.isHQ ? "h-3 w-3 ring-4" : "h-2 w-2",
                              on ? "bg-accent-ink ring-accent-ink/20" : "bg-accent ring-accent/25",
                            )}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-[14px] font-semibold">
                              {h.label}
                            </span>
                            <span
                              className={cn(
                                "meta mt-0.5 block text-[10.5px]",
                                on ? "text-accent-ink/70" : "text-white/45",
                              )}
                            >
                              {hub.isHQ ? tx.map.globalHq : h.region}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "shrink-0 text-right font-display text-[12.5px] font-semibold tabular-nums",
                              on ? "text-accent-ink" : "text-accent",
                            )}
                          >
                            {h.buyers.split(" ")[0]}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Detail line for the selection, announced politely. */}
                <p
                  aria-live="polite"
                  className="mt-4 min-h-[2.75rem] border-t border-white/10 pt-4 text-[13.5px] text-white/70"
                >
                  {selected ? (
                    <>
                      <strong className="font-semibold text-white">
                        {tx.hubs[selected.id].label}
                      </strong>{" "}
                      · {tx.hubs[selected.id].buyers}
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <MousePointerClick size={14} className="text-accent" /> {tx.map.hint}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Headline figures */}
          <RevealGroup className="mt-5 grid overflow-hidden rounded-[28px] border border-border bg-card shadow-card sm:grid-cols-3">
            {tx.stats.map((c, i) => (
              <RevealItem
                key={c.d}
                index={i}
                step={110}
                className={cn(
                  "p-8 md:p-10",
                  i > 0 && "border-t border-border sm:border-l sm:border-t-0",
                )}
              >
                <p className="font-display text-stat font-extrabold tracking-[-0.03em] text-primary tabular-nums">
                  {c.t}
                </p>
                <p className="meta mt-3 text-muted-foreground">{c.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─── ACTIVE REGIONS ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              index="02"
              eyebrow={tx.coverage.eyebrow}
              title={tx.activeRegions}
            />
          </ScrollReveal>
          <RevealGroup className="mt-14">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {regions.map(([region, countries], i) => (
                <RevealItem key={region} as="li" index={i} step={100}>
                  <article className="group card-elevated flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[56px] font-extrabold leading-none tracking-[-0.04em] text-primary tabular-nums">
                        {String(countries.length).padStart(2, "0")}
                      </span>
                      <span className="meta mt-2 text-muted-foreground">{all.ui.countries}</span>
                    </div>
                    <h3 className="mt-8 border-t border-border pt-6 text-heading font-bold text-primary">
                      {region}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {countries.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-3 text-[15px] text-foreground/85"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          <span className="min-w-0">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </section>

      {/* ─── WORKING MODEL ─── sticky intro left, a drawn rail of steps right. */}
      <section className="section-pad bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ScrollReveal className="lg:sticky lg:top-32">
              <SectionTitle
                align="left"
                index="03"
                eyebrow={tx.model.eyebrow}
                title={tx.model.title}
                description={tx.model.description}
              />
            </ScrollReveal>
          </div>
          <ol className="relative lg:col-span-7">
            <span aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-border">
              <span className="sd-grow block h-full w-full bg-accent" />
            </span>
            {tx.model.steps.map((step, i) => {
              const { title, desc } = splitStep(step);
              return (
                <ScrollReveal
                  key={step}
                  as="li"
                  delay={i * 70}
                  className="group relative flex gap-6 pb-10 last:pb-0"
                >
                  <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-card font-display text-[15px] font-bold tabular-nums text-primary shadow-card transition-all duration-500 ease-spring group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="card-elevated flex-1 !p-6">
                    <h3 className="text-[19px] font-bold text-primary">{title}</h3>
                    {desc && (
                      <p className="mt-2 text-[16px] leading-[1.6] text-muted-foreground">{desc}</p>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>
      </section>

      <CtaBand
        className="bg-surface-sunken"
        title={all.home.cta.title}
        description={all.home.cta.description}
        primary={{ to: "/partner", label: all.home.cta.btn }}
        secondary={{ to: "/contact", label: all.nav.contact }}
      />
    </SiteLayout>
  );
}
