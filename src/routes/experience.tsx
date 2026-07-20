import { createFileRoute } from "@tanstack/react-router";
import { type ElementType } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
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

const statIcons = [Users, Globe2, Award, TrendingUp];
const statTargets = [3000, 3, 5, 1];
const statSuffixes = ["+", "", "", "M+"];
const statPrefixes = ["", "", "", "$"];

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
  const { lang } = useLanguage();
  const tx = t(lang).experience;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
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
              <p className="eyebrow inline-block">{tx.results.eyebrow}</p>
              <h2 className="text-[38px] font-bold text-white leading-[1.2] mt-2">{tx.results.title}</h2>
              <div className="mt-5 h-1 w-12 rounded-full bg-accent mx-auto" />
            </div>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-4 mt-16">
            {tx.results.stats.map((s, i) => (
              <ResultStat
                key={s.label}
                icon={statIcons[i]}
                n={s.n}
                label={s.label}
                target={statTargets[i]}
                prefix={statPrefixes[i]}
                suffix={statSuffixes[i]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER EXHIBITIONS ─── */}
      <section className="section-pad bg-[#FAFAFA]">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.exhibitions.eyebrow}
              title={tx.exhibitions.title}
              description={tx.exhibitions.description}
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {tx.exhibitions.names.map((n, i) => (
              <ScrollReveal key={n} delay={i * 60} direction="up">
                <div className="bg-white rounded-[16px] shadow-sm border border-border/50 group grid place-items-center h-28 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <span className="font-display font-bold text-[16px] text-primary group-hover:text-accent transition-colors duration-300 text-center px-4">
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
            <SectionTitle eyebrow={tx.caseStudies.eyebrow} title={tx.caseStudies.title} />
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3 mt-16">
            {tx.caseStudies.items.map((c, i) => (
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

      {/* ─── INDUSTRIES SERVED ─── */}
      <section className="section-pad bg-[#FAFAFA]">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.industries.eyebrow}
              title={tx.industries.title}
              description={tx.industries.description}
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {tx.industries.items.map((item, i) => (
              <ScrollReveal key={item} delay={i * 60} direction="up">
                <div className="bg-white rounded-[16px] shadow-sm border border-border/50 group grid place-items-center h-24 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 px-4 text-center">
                  <span className="font-semibold text-[15px] text-primary group-hover:text-accent transition-colors duration-300">
                    {item}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MASONRY GALLERY ─── */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.gallery.eyebrow}
              title={tx.gallery.title}
              description={tx.gallery.description}
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
                    <h3 className="text-white font-bold text-[18px] translate-y-4 transition-transform duration-300 group-hover:translate-y-0">{tx.gallery.overlay}</h3>
                    <div className="flex items-center gap-2 mt-2 text-accent text-[14px] font-semibold opacity-0 translate-y-4 transition-all duration-300 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                      <ArrowUpRight size={16} />
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
