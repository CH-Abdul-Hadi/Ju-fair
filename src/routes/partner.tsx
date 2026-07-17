import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
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
    desc: "Represent JU Fair Global in your local market. Earn recurring commissions while providing your clients access to premium global trade shows.",
  },
  {
    icon: Building2,
    title: "Exhibition Organizers",
    desc: "Partner with us to fill your show floor and buyer aisles. We act as your official international sales and recruitment arm.",
  },
  { 
    icon: Users, 
    title: "Exhibitors & Brands", 
    desc: "Secure premium placement and guaranteed buyer meetings at the world's leading trade shows through our VIP exhibitor program." 
  },
];

function PartnerPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Grow Together"
        title="Partner With Us"
        subtitle="Three distinct partnership models tailored to accelerate your international business growth."
      />

      {/* ─── PARTNERSHIP MODELS ─── */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <ScrollReveal>
            <div className="text-center mb-16">
              <SectionTitle 
                eyebrow="Pathways" 
                title="How to Collaborate" 
                description="Choose the partnership track that aligns with your business goals."
              />
            </div>
          </ScrollReveal>
          
          <div className="grid gap-8 md:grid-cols-3">
            {tracks.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 120} direction="up">
                <div className="card-elevated group flex flex-col h-full border border-border hover:border-accent/30 p-10 bg-white">
                  <div className="w-16 h-16 rounded-[14px] bg-primary/5 text-primary grid place-items-center mb-8 transition-transform duration-300 group-hover:-translate-y-2 group-hover:bg-accent/15 group-hover:text-accent group-hover:shadow-sm">
                    <t.icon size={28} />
                  </div>
                  <h3 className="text-[22px] font-bold text-primary">{t.title}</h3>
                  <p className="mt-4 text-[15px] text-muted-foreground leading-[1.6] flex-1">{t.desc}</p>
                  
                  <Link to="/contact" className="mt-8 inline-flex items-center gap-1.5 text-accent text-[14px] font-semibold hover:gap-2.5 transition-all duration-200">
                    Apply Now <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS (SINGLE COLUMN ROWS) ─── */}
      <section className="section-pad bg-[#FAFAFA]">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle 
              eyebrow="Why Partner" 
              title="Partnership Benefits" 
              description="What you can expect when you join the JU Fair Global network."
            />
          </ScrollReveal>
          
          <div className="mt-16 max-w-4xl mx-auto space-y-6">
            {[
              {
                t: "For Representatives",
                items: [
                  "Highly competitive, recurring commission structures.",
                  "Comprehensive marketing & sales enablement support.",
                  "Exclusive territory rights for top performers.",
                ],
              },
              {
                t: "For Organizers",
                items: [
                  "Direct access to our 3,000+ global buyer database.",
                  "Full-service international sales representation.",
                  "Proprietary B2B matchmaking platform included.",
                ],
              },
              {
                t: "For Exhibitors",
                items: [
                  "Verified, highly qualified buyer leads.",
                  "Pre-scheduled 1:1 meetings on the show floor.",
                  "VIP concierge service and ROI-driven reporting.",
                ],
              },
            ].map((b, i) => (
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
                <h2 className="text-[32px] md:text-[40px] font-bold">Ready to Partner With Us?</h2>
                <p className="mt-4 text-[18px] text-white/80 max-w-2xl mx-auto leading-[1.6]">
                  Submit your application today. Our partnership team reviews all inquiries and will be in touch within 48 hours to discuss next steps.
                </p>
                <Link to="/contact" className="btn-primary mt-10 inline-flex !h-14 !px-8 !text-[16px]">
                  Submit Application <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
