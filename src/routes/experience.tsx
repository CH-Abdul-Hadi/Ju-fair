import { createFileRoute } from "@tanstack/react-router";
import { type ElementType } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { TrendingUp, Users, Award, Globe2 } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience & Portfolio — JU Fair Global" },
      {
        name: "description",
        content:
          "Exhibitions we support, case studies and results across international trade shows.",
      },
      { property: "og:title", content: "Experience — JU Fair Global" },
      { property: "og:description", content: "Case studies, exhibitions and results." },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: ExperiencePage,
});

const gallery = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1560523159-4a9692d222f9?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=600&q=70",
];

/** Animated results stat — counts up on scroll */
function ResultStat({
  icon: Icon,
  n,
  label,
  target,
  prefix = "",
  suffix = "+",
}: {
  icon: ElementType;
  n: string;
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const count = useCountUp(target, 1800, visible);
  return (
    <div ref={ref} className="text-center">
      <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground grid place-items-center mx-auto mb-3">
        <Icon size={24} />
      </div>
      <div className="text-3xl font-bold font-display text-white">
        {visible ? `${prefix}${count.toLocaleString()}${suffix}` : n}
      </div>
      <div className="text-sm text-white/70 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function ExperiencePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Portfolio"
        title="Exhibitions"
        subtitle="A snapshot of the shows and organizers we proudly support around the world."
      />

      {/* Partner Exhibitions */}
      <section className="section-pad">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle eyebrow="Our Partners" title="Partner Exhibitions" />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              "Canton Fair",
              "CIIE",
              "Gulfood",
              "Hannover Messe",
              "Ambiente",
              "IFA",
              "Bauma",
              "MEDICA",
            ].map((n, i) => (
              <ScrollReveal key={n} delay={i * 60}>
                <div className="card-elevated group grid place-items-center h-24 text-primary font-display font-bold text-lg border-t-4 border-t-accent hover:border-t-primary transition-all duration-300">
                  <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent group-hover:from-accent group-hover:to-accent transition-all duration-300">
                    {n}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle eyebrow="Moments" title="Image Gallery" />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {gallery.map((src, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <img
                  src={src}
                  alt={`Exhibition ${i + 1}`}
                  loading="lazy"
                  className="rounded-xl object-cover w-full h-56 shadow-md hover:scale-[1.02] transition-transform"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-pad">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle eyebrow="Success Stories" title="Case Studies" />
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            {[
              {
                title: "Automotive Expo 2024",
                desc: "Recruited 850+ international buyers across 32 countries.",
                stat: "+240% ROI",
              },
              {
                title: "Food & Beverage Show",
                desc: "Delivered 1,200 pre-scheduled B2B meetings.",
                stat: "$12M Deals",
              },
              {
                title: "Tech Innovation Summit",
                desc: "Filled 95% of exhibitor slots via global sales team.",
                stat: "40+ Countries",
              },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 120}>
                <div className="card-elevated h-full">
                  <div className="text-accent font-display font-bold text-2xl">{c.stat}</div>
                  <h3 className="mt-2 text-lg font-semibold text-primary">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Results — animated counters */}
      <section className="section-pad bg-primary text-primary-foreground">
        <div className="container-x">
          <ScrollReveal>
            <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
              Results / Achievements
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-4 mt-10">
            <ResultStat icon={Users}     n="3,000+" label="Qualified Buyers"  target={3000} />
            <ResultStat icon={Globe2}    n="40+"    label="Countries"          target={40} />
            <ResultStat icon={Award}     n="150+"   label="Exhibitions"        target={150} />
            <ResultStat icon={TrendingUp}n="$1B+"   label="Trade Facilitated"  target={1} prefix="$" suffix="B+" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
