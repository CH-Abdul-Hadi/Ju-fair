import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { WorldMap } from "@/components/site/WorldMap";
import { Globe2, Users, Building2 } from "lucide-react";

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
        title="Global Network"
        subtitle="Local expertise in every major trading region."
      />

      {/* World Map */}
      <section className="section-pad">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle eyebrow="Coverage" title="World Map" />
          </ScrollReveal>
          <ScrollReveal delay={150} className="mt-10">
            <div className="card-elevated bg-surface text-primary/40">
              <WorldMap highlighted className="w-full" />
              <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm">
                {Object.keys(regions).map((r) => (
                  <span key={r} className="flex items-center gap-2 text-foreground">
                    <span className="w-3 h-3 rounded-full bg-accent inline-block" /> {r}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Country List */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle eyebrow="Where We Operate" title="Country List" />
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {Object.entries(regions).map(([region, countries], i) => (
              <ScrollReveal key={region} delay={i * 100}>
                <div className="card-elevated h-full">
                  <h3 className="font-semibold text-primary text-lg mb-3">{region}</h3>
                  <ul className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
                    {countries.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Globe2,    t: "40+ Countries", d: "Coverage across every continent." },
              { icon: Users,     t: "3000+ Buyers",  d: "Verified international decision-makers." },
              { icon: Building2, t: "150+ Shows",    d: "Exhibitions supported per year." },
            ].map((c, i) => (
              <ScrollReveal key={c.t} delay={i * 120}>
                <div className="card-elevated group text-center h-full">
                  <div className="w-14 h-14 rounded-full bg-accent/15 text-accent grid place-items-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/25">
                    <c.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{c.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
