import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { WorldMap, GLOBAL_HUBS, HubMarker } from "@/components/site/WorldMap";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { Globe2, Users, Building2, MapPin, Radio, Sparkles } from "lucide-react";

export const Route = createFileRoute("/global-network")({
  head: () => ({
    meta: [
      { title: "Global Network — JU Fair Global" },
      {
        name: "description",
        content: "Our worldwide presence spanning 40+ countries across every region.",
      },
      { property: "og:title", content: "Global Network — JU Fair Global" },
      { property: "og:description", content: "Presence in 40+ countries." },
      { property: "og:url", content: "/global-network" },
    ],
    links: [{ rel: "canonical", href: "/global-network" }],
  }),
  component: NetworkPage,
});

const statIcons = [Globe2, Users, Building2];

function NetworkPage() {
  const { lang } = useLanguage();
  const tx = t(lang).globalNetwork;
  const [selectedHub, setSelectedHub] = useState<HubMarker | null>(null);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
      />

      {/* ─── 3-COLUMN NETWORK LAYOUT ─── */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <ScrollReveal>
            <div className="mb-16">
              <SectionTitle
                eyebrow={tx.coverage.eyebrow}
                title={tx.coverage.title}
                description={tx.coverage.description}
              />
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Redesigned Interactive World Map & Stats */}
            <div className="lg:col-span-2 space-y-8 flex flex-col">
              <ScrollReveal direction="left" className="flex-1">
                <div className="card-elevated bg-gradient-to-br from-[#0B1D3A] via-[#0B3D91] to-[#041226] text-white border border-primary/30 p-6 md:p-8 h-full min-h-[480px] flex flex-col justify-between relative overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(11,61,145,0.25)]">
                  
                  {/* Map Header Overlay */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent animate-ping" />
                      <span className="text-[12px] font-extrabold tracking-widest text-accent uppercase flex items-center gap-1.5">
                        <Radio size={14} className="animate-pulse" /> Live Global Trade Corridor
                      </span>
                    </div>

                    {/* Interactive Hub Filter Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => setSelectedHub(null)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                          !selectedHub
                            ? "bg-accent text-white shadow-md"
                            : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                        }`}
                      >
                        All Hubs
                      </button>
                      {GLOBAL_HUBS.map((hub) => (
                        <button
                          key={hub.id}
                          onClick={() => setSelectedHub(hub)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                            selectedHub?.id === hub.id
                              ? "bg-accent text-white shadow-md"
                              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                          }`}
                        >
                          {hub.isHQ ? "⭐ HQ" : hub.region}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Vector Network Map */}
                  <div className="relative z-10 my-4 flex-1 flex items-center justify-center">
                    <WorldMap
                      highlighted
                      activeHubId={selectedHub?.id}
                      onSelectHub={(hub) => setSelectedHub(hub)}
                      className="w-full text-white/40"
                    />
                  </div>

                  {/* Map Footer Info / Legend */}
                  <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[12px] text-white/70 gap-3">
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#FFD700] ring-4 ring-[#FFD700]/30" />
                        <strong className="text-white">Shanghai HQ</strong>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                        Regional Hub
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-0.5 bg-gradient-to-r from-accent to-blue-400 rounded-full" />
                        Trade Corridor
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-accent font-semibold">
                      <Sparkles size={14} /> Hover node for hub insights
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tx.stats.map((c, i) => {
                  const Icon = statIcons[i];
                  return (
                    <ScrollReveal key={c.t} delay={i * 120} direction="up">
                      <div className="card-elevated text-center h-full p-6 border-transparent hover:border-accent/30 transition-all duration-300">
                        <div className="w-12 h-12 rounded-[12px] bg-accent/15 text-accent grid place-items-center mx-auto mb-4 transition-transform duration-300 hover:-translate-y-1">
                          <Icon size={22} />
                        </div>
                        <h3 className="text-[32px] font-display font-extrabold text-primary leading-none">{c.t}</h3>
                        <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{c.d}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>

            {/* Right 1 Column: Region List */}
            <div className="lg:col-span-1">
              <ScrollReveal direction="right">
                <div className="card-elevated bg-primary text-white border-none shadow-[0_20px_50px_rgba(11,61,145,0.2)] p-8 relative overflow-hidden">
                  {/* Faint background texture */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                  />

                  <h3 className="text-[24px] font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center">
                      <MapPin className="text-accent" size={20} />
                    </div>
                    {tx.activeRegions}
                  </h3>

                  <div className="space-y-8 relative z-10">
                    {Object.entries(tx.regions).map(([region, countries]) => (
                      <div key={region} className="group">
                        <h4 className="font-bold text-white text-[15px] mb-4 uppercase tracking-widest border-b border-white/20 pb-2 flex items-center justify-between">
                          {region}
                        </h4>
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-3 text-[14px] text-white/75 font-medium">
                          {(countries as readonly string[]).map((c) => (
                            <li key={c} className="flex items-start gap-2 min-w-0 group-hover:text-white transition-colors duration-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                              <span className="min-w-0 break-words leading-snug">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORKING MODEL ─── */}
      <section className="section-pad bg-[#FAFAFA]">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.model.eyebrow}
              title={tx.model.title}
              description={tx.model.description}
            />
          </ScrollReveal>
          <div className="mt-12 max-w-2xl mx-auto">
            <ol className="space-y-4">
              {tx.model.steps.map((step, i) => (
                <ScrollReveal key={step} delay={i * 80} direction="up">
                  <li className="flex items-center gap-4 bg-white p-5 rounded-xl border border-border shadow-sm">
                    <div className="w-9 h-9 rounded-full bg-accent/15 grid place-items-center shrink-0 font-bold text-accent text-[15px]">
                      {i + 1}
                    </div>
                    <span className="text-[15px] font-medium text-foreground">{step}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
