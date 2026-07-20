import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
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

const serviceIcons = [Users, Handshake, Headphones, Building2];
const serviceImages = [
  "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
];

function ServicesPage() {
  const { lang } = useLanguage();
  const tx = t(lang).services;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
      />

      {tx.items.map((s, i) => {
        const isEven = i % 2 === 0;
        const Icon = serviceIcons[i];
        return (
          <section key={s.title} className={`section-pad ${isEven ? "bg-white" : "bg-[#FAFAFA]"}`}>
            <div className="container-x">
              <ScrollReveal direction={isEven ? "left" : "right"}>
                <div className="grid gap-12 lg:grid-cols-2 items-center">

                  {/* Text Content */}
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <div className="w-16 h-16 rounded-[14px] bg-accent/15 text-accent grid place-items-center mb-6">
                      <Icon size={32} />
                    </div>
                    <h2 className="text-[32px] md:text-[40px] font-bold text-primary leading-[1.2]">{s.title}</h2>
                    <div className="mt-5 h-1 w-12 rounded-full bg-accent" />

                    <p className="mt-6 text-[17px] text-muted-foreground leading-[1.7]">
                      {s.desc}
                    </p>

                    <ul className="mt-8 space-y-4">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-border shadow-sm">
                          <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                          <span className="text-[15px] font-semibold text-primary">{p}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact" search={(p) => ({ ...p })} className="btn-primary mt-10 inline-flex">
                      {s.cta} <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>

                  {/* Image/Visual Content */}
                  <div className={`relative ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className={`absolute -inset-4 bg-primary/5 rounded-[24px] transform transition-transform duration-500 hover:rotate-0 ${isEven ? "rotate-3" : "-rotate-3"}`} />
                    <img
                      src={serviceImages[i]}
                      alt={s.title}
                      loading="lazy"
                      className="relative rounded-[20px] shadow-[0_20px_50px_rgba(11,61,145,0.12)] object-cover w-full h-[400px] md:h-[500px]"
                    />

                    {/* Floating Info Card */}
                    <div className={`absolute -bottom-8 ${isEven ? "-left-8" : "-right-8"} hidden md:block bg-white p-6 rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-border`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 grid place-items-center">
                          <CheckCircle2 className="text-primary" size={24} />
                        </div>
                        <div>
                          <div className="text-[12px] uppercase tracking-wider text-muted-foreground font-bold">{s.floatingLabel}</div>
                          <div className="text-[16px] font-bold text-primary">{s.floatingValue}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      })}
    </SiteLayout>
  );
}
