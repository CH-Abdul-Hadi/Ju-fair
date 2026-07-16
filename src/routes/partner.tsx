import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Globe2, Building2, Users, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner With Us — JU Fair Global" },
      {
        name: "description",
        content:
          "Join our network of international representatives, exhibition organizers, and exhibitors.",
      },
      { property: "og:title", content: "Partner — JU Fair Global" },
      { property: "og:description", content: "Become a partner and grow internationally." },
      { property: "og:url", content: "/partner" },
    ],
    links: [{ rel: "canonical", href: "/partner" }],
  }),
  component: PartnerPage,
});

const tracks = [
  {
    icon: Globe2,
    title: "International Representatives",
    desc: "Represent JU Fair Global in your local market.",
  },
  {
    icon: Building2,
    title: "Exhibition Organizers",
    desc: "Fill your show floor and buyer aisles.",
  },
  { icon: Users, title: "Exhibitors", desc: "Access qualified buyers ready to trade." },
];

function PartnerPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Grow Together"
        title="Partner"
        subtitle="Three ways to collaborate with JU Fair Global — pick the one that fits your business."
      />

      {/* Tracks */}
      <section className="section-pad">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {tracks.map((t) => (
            <div key={t.title} className="card-elevated text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground grid place-items-center mx-auto mb-4">
                <t.icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-primary">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <SectionTitle eyebrow="Why Partner" title="Benefits" />
          <div className="grid gap-6 md:grid-cols-2 mt-10">
            {[
              {
                t: "Representatives",
                items: [
                  "Recurring commission structure",
                  "Marketing & sales support",
                  "Exclusive territory rights",
                  "Training and enablement",
                ],
              },
              {
                t: "Organizers",
                items: [
                  "Access to global buyer database",
                  "International sales representation",
                  "Matchmaking platform included",
                  "Full reporting and analytics",
                ],
              },
              {
                t: "Exhibitors",
                items: [
                  "Verified buyer leads",
                  "Pre-scheduled meetings",
                  "Concierge follow-up",
                  "ROI-driven engagements",
                ],
              },
              {
                t: "All Partners",
                items: [
                  "Long-term collaboration",
                  "Transparent processes",
                  "Global brand exposure",
                  "Dedicated account manager",
                ],
              },
            ].map((b) => (
              <div key={b.t} className="card-elevated">
                <h3 className="text-lg font-semibold text-primary">{b.t}</h3>
                <ul className="mt-4 space-y-2">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-accent shrink-0 mt-1" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container-x">
          <div className="rounded-2xl bg-primary text-primary-foreground p-12 text-center shadow-xl">
            <h2 className="text-white text-3xl font-bold">Ready to Partner With Us?</h2>
            <p className="mt-3 text-white/85 max-w-2xl mx-auto">
              Apply now and our team will be in touch within 48 hours.
            </p>
            <Link to="/contact" className="btn-primary mt-6 inline-flex">
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
