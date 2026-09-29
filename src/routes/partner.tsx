import { createFileRoute } from "@tanstack/react-router";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Tilt } from "@/components/site/Tilt";
import { MagneticArea } from "@/components/site/MagneticArea";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { Globe2, Building2, Users, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partner")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/partner", search),
  head: () => seoHead("/partner", "en"),
  component: PartnerPage,
});

const trackIcons = [Globe2, Building2, Users];

export function PartnerPage() {
  const { lang } = useLanguage();
  const tx = t(lang).partner;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
      />

      {/* ─── PARTNERSHIP MODELS ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <div className="text-center mb-16">
              <SectionTitle
                eyebrow={tx.models.eyebrow}
                title={tx.models.title}
                description={tx.models.description}
              />
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {tx.models.items.map((track, i) => {
              const Icon = trackIcons[i];
              return (
                <ScrollReveal key={track.title} delay={i * 120} direction="up">
                  <Tilt className="group">
                  <div className="card-elevated relative flex flex-col h-full overflow-hidden border border-border hover:border-accent/30 p-10 bg-white">
                    {/* Ordinal — structure without asserting a ranking. */}
                    <span
                      aria-hidden="true"
                      className="absolute right-7 top-7 font-display text-[40px] font-extrabold leading-none text-primary/[0.06] transition-colors duration-300 group-hover:text-accent/20"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="icon-chip mb-8 !h-16 !w-16 !rounded-2xl">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-[22px] font-bold text-primary md:min-h-[2.4em]">{track.title}</h3>
                    <p className="mt-4 text-[15px] text-muted-foreground leading-[1.6] flex-1">{track.desc}</p>

                    <LocalizedLink to="/contact" className="mt-8 inline-flex items-center gap-1.5 text-accent-text text-[14px] font-semibold hover:gap-2.5 transition-all duration-200">
                      {tx.models.applyNow} <ArrowRight size={14} />
                    </LocalizedLink>
                  </div>
                  </Tilt>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS (SINGLE COLUMN ROWS) ─── */}
      <section className="section-pad bg-surface-sunken">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              variant="split"
              eyebrow={tx.benefits.eyebrow}
              title={tx.benefits.title}
              description={tx.benefits.description}
            />
          </ScrollReveal>

          <div className="mt-16 max-w-4xl mx-auto space-y-6">
            {tx.benefits.items.map((b, i) => (
              <ScrollReveal key={b.t} delay={i * 100} direction="up">
                <div className="card-elevated p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                  <div className="md:w-1/3 shrink-0">
                    <h3 className="text-[22px] font-bold text-primary leading-tight">{b.t}</h3>
                  </div>
                  <div className="md:w-2/3">
                    <ul className="space-y-4">
                      {b.items.map((it) => (
                        <li key={it} className="flex gap-4 text-[15px] font-medium text-foreground">
                          <CheckCircle2 size={20} className="text-accent-text shrink-0 mt-0.5" />
                          <span className="leading-snug">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad bg-surface">
        <div className="container-x">
          <ScrollReveal>
            <div className="rounded-[24px] bg-gradient-to-r from-primary to-primary-dark text-white p-12 md:p-16 text-center shadow-[0_20px_50px_rgba(11,61,145,0.15)] relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              />
              <div className="relative z-10">
                <h2 className="text-section font-bold text-white">{tx.cta.title}</h2>
                <p className="mt-4 text-lede text-white/80 max-w-2xl mx-auto">
                  {tx.cta.desc}
                </p>
                <MagneticArea className="mt-10">
                  <LocalizedLink to="/contact" className="btn-primary inline-flex !h-14 !px-8 !text-[16px]">
                    {tx.cta.btn} <ArrowRight size={18} className="ml-2" />
                  </LocalizedLink>
                </MagneticArea>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
