import { createFileRoute } from "@tanstack/react-router";
import { type ElementType } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { TrendingUp, Users, Award, Globe2, ArrowUpRight } from "lucide-react";

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
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=600&h=800&q=70",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&h=400&q=70",
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&h=900&q=70",
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
    <div ref={ref} className="text-center group">
      <div className="w-16 h-16 rounded-full bg-white/10 text-accent grid place-items-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary">
        <Icon size={28} />
      </div>
      <div className="text-[36px] font-bold font-display text-white">
        {visible ? `${prefix}${count.toLocaleString()}${suffix}` : n}
      </div>
      <div className="text-[14px] text-white/70 uppercase tracking-[0.1em] mt-1 font-semibold">{label}</div>
    </div>
  );
}

function ExperiencePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Portfolio"
        title="Our Experience"
        subtitle="A snapshot of the premium shows and organizers we proudly support around the world."
      />

      {/* ─── RESULTS / ACHIEVEMENTS ─── */}
      <section className="section-pad bg-primary text-primary-foreground relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="container-x relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <p className="eyebrow inline-block">Impact</p>
              <h2 className="text-[38px] font-bold text-white leading-[1.2] mt-2">Measurable Results</h2>
              <div className="mt-5 h-1 w-12 rounded-full bg-accent mx-auto" />
            </div>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-4 mt-16">
            <ResultStat icon={Users}      n="3,000+" label="Qualified Buyers"  target={3000} />
            <ResultStat icon={Globe2}     n="40+"    label="Countries"         target={40} />
            <ResultStat icon={Award}      n="150+"   label="Exhibitions"       target={150} />
            <ResultStat icon={TrendingUp} n="$1B+"   label="Trade Facilitated" target={1} prefix="$" suffix="B+" />
          </div>
        </div>
      </section>

      {/* ─── PARTNER EXHIBITIONS ─── */}
      <section className="section-pad bg-[#FAFAFA]">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle 
              eyebrow="Our Partners" 
              title="Exhibitions We Support" 
              description="Trusted by the world's leading trade shows across multiple industry verticals."
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
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
              <ScrollReveal key={n} delay={i * 60} direction="up">
                <div className="bg-white rounded-[16px] shadow-sm border border-border/50 group grid place-items-center h-28 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <span className="font-display font-bold text-[20px] text-primary group-hover:text-accent transition-colors duration-300 text-center px-4">
                    {n}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SVG Separator */}
      <div className="h-16 bg-[#FAFAFA]" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)", backgroundColor: "white" }} />

      {/* ─── CASE STUDIES ─── */}
      <section className="section-pad bg-white -mt-16 pt-32">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle eyebrow="Success Stories" title="Case Studies" />
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3 mt-16">
            {[
              {
                title: "Automotive Expo 2024",
                desc: "Recruited 850+ international buyers across 32 countries through targeted digital matchmaking.",
                stat: "+240%",
                label: "ROI Increase"
              },
              {
                title: "Food & Beverage Show",
                desc: "Delivered 1,200 pre-scheduled B2B meetings, resulting in record-breaking on-site contracts.",
                stat: "$12M",
                label: "Deals Facilitated"
              },
              {
                title: "Tech Innovation Summit",
                desc: "Filled 95% of exhibitor slots via our global sales team acting as official international reps.",
                stat: "95%",
                label: "Capacity Reached"
              },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 120} direction="up">
                <div className="card-elevated h-full border-t-4 border-t-accent hover:border-t-primary">
                  <div className="flex items-end gap-3 mb-4">
                    <div className="font-display font-extrabold text-[40px] text-primary leading-none">{c.stat}</div>
                    <div className="text-[14px] text-accent font-bold uppercase tracking-wide pb-1">{c.label}</div>
                  </div>
                  <h3 className="mt-4 text-[22px] font-bold text-primary">{c.title}</h3>
                  <p className="mt-3 text-[16px] text-muted-foreground leading-[1.6]">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MASONRY GALLERY ─── */}
      <section className="section-pad bg-[#FAFAFA]">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle 
              eyebrow="Moments" 
              title="Image Gallery" 
              description="Highlights from our global events and bustling trade floors."
            />
          </ScrollReveal>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mt-16 space-y-6">
            {gallery.map((src, i) => (
              <ScrollReveal key={i} delay={i * 80} direction="up">
                <div className="relative group rounded-[16px] overflow-hidden break-inside-avoid shadow-sm cursor-pointer">
                  <img
                    src={src}
                    alt={`Exhibition ${i + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-[18px] translate-y-4 transition-transform duration-300 group-hover:translate-y-0">Global Trade Expo</h3>
                    <div className="flex items-center gap-2 mt-2 text-accent text-[14px] font-semibold opacity-0 translate-y-4 transition-all duration-300 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                      
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
