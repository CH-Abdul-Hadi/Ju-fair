import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { WorldMap } from "@/components/site/WorldMap";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import {
  Users,
  Handshake,
  Building2,
  LineChart,
  CheckCircle2,
  Search,
  MessageSquare,
  Rocket,
  ArrowRight,
  Award,
  Globe2,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JU Fair Global — Connecting Global Buyers with Real Trade Opportunities" },
      {
        name: "description",
        content:
          "International exhibition and matchmaking services connecting buyers, exhibitors and organizers worldwide.",
      },
      { property: "og:title", content: "JU Fair Global" },
      {
        property: "og:description",
        content: "Connecting global buyers with real trade opportunities.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Home,
});

/** Animated stat card — counts up when it enters the viewport */
function StatCard({ n, label, target, prefix = "", suffix = "+" }: {
  n: string;
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const count = useCountUp(target, 1800, visible);
  return (
    <div ref={ref} className="card-elevated text-center py-6">
      <div className="text-2xl md:text-3xl font-bold text-primary font-display">
        {visible ? `${prefix}${count.toLocaleString()}${suffix}` : n}
      </div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}

function Home() {
  return (
    <SiteLayout>
      {/* HERO — above-fold elements use CSS animation, not scroll reveal */}
      <section className="relative bg-gradient-to-b from-secondary to-background overflow-hidden">
        <div className="absolute inset-0 text-primary/20">
          <WorldMap className="w-full h-full" />
        </div>
        <div className="container-x relative py-24 md:py-32 text-center">
          <span
            className="hero-animate inline-block text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4"
            style={{ animationDelay: "0ms" }}
          >
            International Trade Partner
          </span>
          <h1
            className="hero-animate text-4xl md:text-6xl font-bold text-primary max-w-4xl mx-auto leading-tight"
            style={{ animationDelay: "120ms" }}
          >
            Connecting Global Buyers with{" "}
            <span className="text-accent">Real Trade Opportunities</span>
          </h1>
          <p
            className="hero-animate mt-6 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
            style={{ animationDelay: "260ms" }}
          >
            We help exhibitors, organizers and international representatives meet qualified buyers
            across 40+ countries through targeted matchmaking and events.
          </p>
          <div
            className="hero-animate mt-8 flex flex-wrap gap-4 justify-center"
            style={{ animationDelay: "400ms" }}
          >
            <Link to="/partner" className="btn-primary">
              Become Our Partner <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn-outline">
              Request Buyer Recruitment
            </Link>
          </div>

          {/* Trust stats — scroll-triggered counters */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Trust Stats
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard n="3000+" label="Buyers"     target={3000} />
              <StatCard n="$1M+"  label="Deals"      target={1}    prefix="$" suffix="M+" />
              <StatCard n="100+"  label="Exhibitors" target={100} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle eyebrow="What We Offer" title="Services" />
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10">
            {[
              {
                icon: Users,
                title: "International Buyer Recruitment",
                desc: "Qualified buyer sourcing across 40+ markets.",
              },
              {
                icon: Handshake,
                title: "Business Matchmaking",
                desc: "Curated 1:1 meetings for real trade outcomes.",
              },
              {
                icon: Building2,
                title: "Exhibition Sales Representation",
                desc: "Global sales force for your show.",
              },
              {
                icon: LineChart,
                title: "Buyer Knowledge Services",
                desc: "Insights and data to convert leads faster.",
              },
            ].map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 100}>
                <div className="card-elevated group h-full">
                  <div className="w-12 h-12 rounded-[var(--radius-icon)] bg-accent/15 text-accent grid place-items-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/25">
                    <s.icon size={22} />
                  </div>
                  <h3 className="text-base font-semibold text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-pad bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-center">
          <ScrollReveal direction="left">
            <div>
              <SectionTitle eyebrow="Advantages" title="Why Choose Us" align="left" />
              <ul className="mt-8 space-y-4">
                {[
                  "Vast network of qualified international buyers",
                  "Proven matchmaking framework with measurable ROI",
                  "Dedicated account managers across regions",
                  "Transparent reporting and lead validation",
                ].map((t, i) => (
                  <ScrollReveal key={t} delay={i * 80}>
                    <li className="flex gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} />
                      <span className="text-sm text-foreground">{t}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {[
                "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=70",
                "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=70",
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=70",
                "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=70",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Business meeting"
                  loading="lazy"
                  className={`rounded-2xl object-cover h-40 w-full shadow-md ${i % 2 ? "translate-y-6" : ""}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GLOBAL NETWORK MAP */}
      <section className="section-pad bg-primary text-primary-foreground">
        <div className="container-x text-center">
          <ScrollReveal>
            <h2 className="text-white text-3xl md:text-4xl font-bold">Global Network Map</h2>
            <p className="mt-3 text-white/80 max-w-2xl mx-auto text-sm md:text-base">
              Present in 40+ countries, connecting buyers, exhibitors and organizers on every
              continent.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150} className="mt-10 text-white/70">
            <WorldMap highlighted className="w-full max-w-4xl mx-auto" />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <Link to="/global-network" className="btn-primary mt-8">
              Explore Network
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle eyebrow="Process" title="How It Works" />
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-4 relative">
            {[
              { icon: Search,       title: "Discovery",  desc: "We study your show or product." },
              { icon: Target,       title: "Targeting",  desc: "Buyers matched to your niche." },
              { icon: MessageSquare,title: "Engagement", desc: "Curated outreach & meetings." },
              { icon: Rocket,       title: "Results",    desc: "Reporting and follow-ups." },
            ].map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 150}>
                <div className="relative text-center group">
                  <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground grid place-items-center mx-auto shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <s.icon size={24} />
                  </div>
                  <div className="mt-4 text-xs font-semibold text-accent">STEP 0{i + 1}</div>
                  <h3 className="mt-1 text-base font-semibold text-primary">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="pb-20">
        <div className="container-x">
          <ScrollReveal>
            <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-primary-foreground p-10 md:p-14 text-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 text-white">
                <WorldMap className="w-full h-full" />
              </div>
              <div className="relative">
                <Award className="mx-auto text-accent mb-4" size={36} />
                <h2 className="text-white text-2xl md:text-3xl font-bold">
                  Partner with JU Fair Global
                </h2>
                <p className="mt-3 text-white/85 max-w-2xl mx-auto text-sm md:text-base">
                  Join our network of international representatives and organizers. Grow your business
                  with our qualified buyer database.
                </p>
                <Link to="/partner" className="btn-primary mt-6 inline-flex">
                  Apply Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
