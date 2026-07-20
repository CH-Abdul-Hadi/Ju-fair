import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
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

const trackIcons = [Globe2, Building2, Users];

function PartnerPage() {
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
      <section className="section-pad bg-white">
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
                  <div className="card-elevated group flex flex-col h-full border border-border hover:border-accent/30 p-10 bg-white">
                    <div className="w-16 h-16 rounded-[14px] bg-primary/5 text-primary grid place-items-center mb-8 transition-transform duration-300 group-hover:-translate-y-2 group-hover:bg-accent/15 group-hover:text-accent group-hover:shadow-sm">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-[22px] font-bold text-primary">{track.title}</h3>
                    <p className="mt-4 text-[15px] text-muted-foreground leading-[1.6] flex-1">{track.desc}</p>

                    <Link to="/contact" search={(p) => ({ ...p })} className="mt-8 inline-flex items-center gap-1.5 text-accent text-[14px] font-semibold hover:gap-2.5 transition-all duration-200">
                      {tx.models.applyNow} <ArrowRight size={14} />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS (SINGLE COLUMN ROWS) ─── */}
      <section className="section-pad bg-[#FAFAFA]">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.benefits.eyebrow}
              title={tx.benefits.title}
              description={tx.benefits.description}
            />
          </ScrollReveal>

          <div className="mt-16 max-w-4xl mx-auto space-y-6">
            {tx.benefits.items.map((b, i) => (
              <ScrollReveal key={b.t} delay={i * 100} direction="up">
                <div className="card-elevated p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center bg-white border-none shadow-sm">
                  <div className="md:w-1/3 shrink-0">
                    <h3 className="text-[22px] font-bold text-primary leading-tight">{b.t}</h3>
                  </div>
                  <div className="md:w-2/3">
                    <ul className="space-y-4">
                      {b.items.map((it) => (
                        <li key={it} className="flex gap-4 text-[15px] font-medium text-foreground">
                          <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
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
      <section className="section-pad bg-white">
        <div className="container-x">
          <ScrollReveal>
            <div className="rounded-[24px] bg-gradient-to-r from-primary to-primary-dark text-white p-12 md:p-16 text-center shadow-[0_20px_50px_rgba(11,61,145,0.15)] relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              />
              <div className="relative z-10">
                <h2 className="text-[32px] md:text-[40px] font-bold">{tx.cta.title}</h2>
                <p className="mt-4 text-[18px] text-white/80 max-w-2xl mx-auto leading-[1.6]">
                  {tx.cta.desc}
                </p>
                <Link to="/contact" search={(p) => ({ ...p })} className="btn-primary mt-10 inline-flex !h-14 !px-8 !text-[16px]">
                  {tx.cta.btn} <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
