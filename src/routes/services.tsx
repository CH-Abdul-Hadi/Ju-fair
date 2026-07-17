import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Users, Handshake, Headphones, Building2, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — JU Fair Global" },
      {
        name: "description",
        content:
          "Buyer recruitment, matchmaking, buyer support and exhibition sales representation.",
      },
      { property: "og:title", content: "Services — JU Fair Global" },
      {
        property: "og:description",
        content: "Complete services for international exhibitors and organizers.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Users,
    title: "Buyer Recruitment",
    desc: "Reach qualified international buyers matched to your product and industry.",
    points: ["Targeted database access", "Multi-channel outreach", "Verified attendance"],
  },
  {
    icon: Handshake,
    title: "Matchmaking",
    desc: "Curated 1:1 meetings with pre-qualified buyers during your event.",
    points: ["Pre-scheduled meetings", "Buyer profiling", "Meeting reports"],
  },
  {
    icon: Headphones,
    title: "Buyer Support",
    desc: "End-to-end support ensuring buyers attend, engage and convert.",
    points: ["Concierge service", "Travel coordination", "Follow-up tracking"],
  },
  {
    icon: Building2,
    title: "Exhibition Sales",
    desc: "Global sales representation to fill your show floor with quality exhibitors.",
    points: ["International sales team", "Local market presence", "Full sales reporting"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="What We Do"
        title="Buyer Recruitment & Beyond"
        subtitle="Comprehensive services for exhibitors, organizers and international trade shows."
      />

      <section className="section-pad">
        <div className="container-x space-y-10">
          {services.map((s, i) => (
            /* Alternate slide direction per service row */
            <ScrollReveal key={s.title} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl bg-accent/15 text-accent grid place-items-center mb-4">
                    <s.icon size={26} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm">
                        <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-primary mt-6 inline-flex">
                    Get Started <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={`card-elevated bg-surface ${i % 2 ? "lg:order-1" : ""}`}>
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary to-primary-dark grid place-items-center">
                    <s.icon className="text-accent" size={64} />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="rounded-lg bg-background border border-border p-3 text-center"
                      >
                        <div className="text-accent font-display font-bold text-xl">0{n}</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                          Step
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
