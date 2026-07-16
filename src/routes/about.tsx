import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Target, Eye, Heart, Shield, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — JU Fair Global" },
      {
        name: "description",
        content: "Our story, mission, vision and core values driving international trade success.",
      },
      { property: "og:title", content: "About JU Fair Global" },
      { property: "og:description", content: "Our story, mission and values." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="Company"
        subtitle="A trusted partner for global trade, matchmaking and exhibitions since 1990."
      />

      {/* Company Story */}
      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <SectionTitle eyebrow="Our Journey" title="Company Story" align="left" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              JU Fair Global was founded to bridge international manufacturers and qualified buyers.
              Over three decades we have built a proprietary database, a global sales force, and a
              matchmaking practice serving organizers in every industry vertical.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Today we operate across 40+ countries, delivering measurable ROI through targeted
              buyer recruitment and exhibition sales representation.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=70"
            alt="Team collaboration"
            loading="lazy"
            className="rounded-2xl shadow-xl object-cover w-full h-96"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <SectionTitle title="Mission & Vision" />
          <div className="grid gap-6 md:grid-cols-2 mt-10">
            <div className="card-elevated">
              <div className="w-12 h-12 rounded-lg bg-accent/15 text-accent grid place-items-center mb-4">
                <Target size={22} />
              </div>
              <h3 className="text-xl font-semibold text-primary">Our Mission</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                To connect exhibitors with the right buyers through data-driven matchmaking and
                international representation that delivers measurable results.
              </p>
            </div>
            <div className="card-elevated">
              <div className="w-12 h-12 rounded-lg bg-accent/15 text-accent grid place-items-center mb-4">
                <Eye size={22} />
              </div>
              <h3 className="text-xl font-semibold text-primary">Our Vision</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                To be the world's most trusted partner for international trade exhibitions and buyer
                matchmaking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-pad">
        <div className="container-x">
          <SectionTitle eyebrow="What Guides Us" title="Core Values" />
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            {[
              {
                icon: Shield,
                title: "Integrity",
                desc: "Transparent processes and honest reporting.",
              },
              {
                icon: Users,
                title: "Partnership",
                desc: "Long-term collaboration over short-term gains.",
              },
              {
                icon: Sparkles,
                title: "Excellence",
                desc: "Elevated standards in every engagement.",
              },
              { icon: Heart, title: "Client First", desc: "Your ROI is our measure of success." },
              {
                icon: Target,
                title: "Precision",
                desc: "Data-driven targeting for qualified leads.",
              },
              { icon: Eye, title: "Insight", desc: "Deep market knowledge across verticals." },
            ].map((v) => (
              <div key={v.title} className="card-elevated text-center">
                <div className="w-14 h-14 rounded-full bg-accent/15 text-accent grid place-items-center mx-auto mb-4">
                  <v.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <SectionTitle eyebrow="Milestones" title="Timeline" />
          <div className="mt-12 max-w-3xl mx-auto relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
            {[
              {
                year: "1990",
                t: "Founded",
                d: "JU Fair Global established as an international representation firm.",
              },
              { year: "2000", t: "Global Expansion", d: "Opened offices across Europe and Asia." },
              {
                year: "2010",
                t: "Digital Matchmaking",
                d: "Launched proprietary buyer-matching platform.",
              },
              {
                year: "2020",
                t: "40+ Countries",
                d: "Reached full global coverage with 3000+ active buyers.",
              },
            ].map((e, i) => (
              <div
                key={e.year}
                className="relative md:grid md:grid-cols-2 md:gap-10 mb-10 items-center"
              >
                {/* Central line connector dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background z-10 hidden md:block" />

                <div className={`${i % 2 ? "md:order-2 md:text-left" : "md:text-right"}`}>
                  <div className="text-accent font-display font-bold text-2xl">{e.year}</div>
                </div>
                <div className={`card-elevated ${i % 2 ? "md:order-1" : ""}`}>
                  <h3 className="text-lg font-semibold text-primary">{e.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
