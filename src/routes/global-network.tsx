import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { WorldMap } from "@/components/site/WorldMap";
import { Globe2, Users, Building2, MapPin } from "lucide-react";

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

const regions = {
  Europe: ["Germany", "France", "UK", "Italy", "Spain", "Netherlands", "Poland"],
  "Asia Pacific": ["China", "Japan", "India", "South Korea", "Vietnam", "Thailand", "Australia"],
  "Middle East": ["UAE", "Saudi Arabia", "Qatar", "Turkey", "Egypt"],
  Americas: ["USA", "Canada", "Mexico", "Brazil", "Argentina"],
  Africa: ["South Africa", "Nigeria", "Kenya", "Morocco"],
};

function NetworkPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Worldwide"
        title="Our Global Network"
        subtitle="Local expertise in every major trading region, ensuring targeted and relevant connections."
      />

      {/* ─── 3-COLUMN NETWORK LAYOUT ─── */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <ScrollReveal>
            <div className="mb-16">
              <SectionTitle
                eyebrow="Coverage"
                title="Global Presence"
                description="Our proprietary database spans 40+ countries across every major continent, enabling unmatched access to localized decision-makers."
              />
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left 2 Columns: World Map & Stats */}
            <div className="lg:col-span-2 space-y-8 flex flex-col">
              <ScrollReveal direction="left" className="flex-1">
                <div className="card-elevated bg-[#F7F8FA] border border-border text-primary p-4 md:p-8 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden group">
                  <WorldMap highlighted className="w-full absolute opacity-30 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-50" />

                  {/* Decorative map pin over Europe */}
                  <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-accent rounded-full animate-bounce shadow-[0_0_20px_rgba(245,166,35,0.8)]" />
                  {/* Decorative map pin over Asia */}
                  <div className="absolute top-[40%] right-[20%] w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(245,166,35,0.8)]" />

                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Globe2, t: "40+", d: "Countries" },
                  { icon: Users, t: "3,000+", d: "Verified Buyers" },
                  { icon: Building2, t: "150+", d: "Exhibitions" },
                ].map((c, i) => (
                  <ScrollReveal key={c.t} delay={i * 120} direction="up">
                    <div className="card-elevated text-center h-full p-6 border-transparent hover:border-accent/30 transition-all duration-300">
                      <div className="w-12 h-12 rounded-[12px] bg-accent/15 text-accent grid place-items-center mx-auto mb-4 transition-transform duration-300 hover:-translate-y-1">
                        <c.icon size={22} />
                      </div>
                      <h3 className="text-[32px] font-display font-extrabold text-primary leading-none">{c.t}</h3>
                      <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{c.d}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right 1 Column: Region List */}
            <div className="lg:col-span-1">
              <ScrollReveal direction="right" className="h-full">
                <div className="card-elevated h-full bg-primary text-white border-none shadow-[0_20px_50px_rgba(11,61,145,0.2)] p-8 relative overflow-hidden">

                  {/* Faint background texture */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                  />

                  <h3 className="text-[24px] font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center">
                      <MapPin className="text-accent" size={20} />
                    </div>
                    Active Regions
                  </h3>

                  <div className="space-y-8 relative z-10">
                    {Object.entries(regions).map(([region, countries], i) => (
                      <div key={region} className="group">
                        <h4 className="font-bold text-white text-[15px] mb-4 uppercase tracking-widest border-b border-white/20 pb-2 flex items-center justify-between">
                          {region}
                        </h4>
                        <ul className="grid grid-cols-2 gap-y-3 text-[14px] text-white/75 font-medium">
                          {countries.map((c) => (
                            <li key={c} className="flex items-center gap-2 group-hover:text-white transition-colors duration-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" /> {c}
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
    </SiteLayout>
  );
}
