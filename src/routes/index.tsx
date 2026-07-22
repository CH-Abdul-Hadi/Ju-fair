import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { WorldMap } from "@/components/site/WorldMap";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
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
  Target,
  Star,
  User,
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

const trustLogos = [
  { name: "JU Fair Global", src: "/favicon.png" },
  { name: "JU Fair Global", src: "/favicon.png" },
  { name: "JU Fair Global", src: "/favicon.png" },
  { name: "JU Fair Global", src: "/favicon.png" },
  { name: "JU Fair Global", src: "/favicon.png" },
];

const serviceIcons = [Handshake, Building2, LineChart];
const stepIcons = [Search, Target, MessageSquare, Rocket];

function Home() {
  const { lang } = useLanguage();
  const tx = t(lang).home;

  return (
    <SiteLayout>
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-primary/50" />

        <div className="container-x relative grid lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-center pt-28 pb-16 sm:py-32 z-10">
          {/* LEFT: Content */}
          <div>
            <span className="hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-accent text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm border border-white/10" style={{ animationDelay: "0ms" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {tx.hero.badge}
            </span>

            <h1 className="hero-animate text-[28px] sm:text-[36px] lg:text-[56px] font-extrabold text-white leading-[1.1] max-w-xl drop-shadow-lg" style={{ animationDelay: "120ms" }}>
              {tx.hero.headline}{" "}
              <span className="text-accent">{tx.hero.headlineAccent}</span>
            </h1>

            <p className="hero-animate mt-6 text-[18px] text-white/80 leading-[1.6] max-w-md" style={{ animationDelay: "260ms" }}>
              {tx.hero.description}
            </p>

            <div className="hero-animate mt-10 flex flex-wrap gap-4" style={{ animationDelay: "380ms" }}>
              <Link to="/partner" search={(p) => ({ ...p })} className="btn-primary shadow-[0_0_24px_rgba(245,166,35,0.4)] hover:shadow-[0_0_32px_rgba(245,166,35,0.6)]">
                {tx.hero.btnPartner} <ArrowRight size={16} className="ml-1" />
              </Link>
              <Link to="/services" search={(p) => ({ ...p })} className="btn-outline !border-white/40 !text-white hover:!bg-white/15 backdrop-blur-sm">
                {tx.hero.btnExplore}
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-animate mt-10 grid grid-cols-3 gap-3 sm:gap-6" style={{ animationDelay: "500ms" }}>
              {tx.hero.stats.map((s) => (
                <div key={s.label} className="text-center py-3 px-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="text-[24px] font-extrabold text-white">{s.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-accent uppercase tracking-wider font-bold mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave separator */}
        <div className="absolute bottom-0 inset-x-0 z-10">
          <svg viewBox="0 0 1440 60" fill="white" preserveAspectRatio="none" className="w-full h-[60px] block">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>


      {/* ─── SERVICES ─── */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.services.eyebrow}
              title={tx.services.title}
              description={tx.services.description}
            />
          </ScrollReveal>

          <div className="mt-16">
            {/* Featured Card */}
            <ScrollReveal direction="up" delay={100}>
              <div className="rounded-[18px] bg-gradient-to-r from-primary to-primary-dark p-10 lg:p-12 grid lg:grid-cols-2 gap-12 items-center mb-8 shadow-xl">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-accent/20 grid place-items-center mb-6">
                    <Users size={32} className="text-accent" />
                  </div>
                  <h3 className="text-[28px] font-bold text-white leading-tight">{tx.services.featured.title}</h3>
                  <p className="mt-4 text-[17px] text-white/75 leading-[1.6]">
                    {tx.services.featured.desc}
                  </p>
                  <Link to="/services" search={(p) => ({ ...p })} className="mt-8 inline-flex items-center gap-2 text-accent font-semibold text-[15px] hover:gap-3 transition-all duration-200">
                    {tx.services.featured.link} <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tx.services.featured.points.map((s) => (
                    <div key={s} className="rounded-xl bg-white/10 p-5 text-white font-semibold flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-[14px] leading-snug">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Supporting Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {tx.services.cards.map((s, i) => {
                const Icon = serviceIcons[i];
                return (
                  <ScrollReveal key={s.title} delay={200 + (i * 100)}>
                    <div className="card-elevated group h-full">
                      <div className="w-12 h-12 rounded-[10px] bg-accent/12 grid place-items-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/20">
                        <Icon size={22} className="text-accent" />
                      </div>
                      <h3 className="text-[20px] font-semibold text-primary">{s.title}</h3>
                      <p className="mt-3 text-[16px] text-muted-foreground leading-[1.6]">{s.desc}</p>
                      <Link to="/services" search={(p) => ({ ...p })} className="mt-6 inline-flex items-center gap-1.5 text-accent text-[14px] font-semibold hover:gap-2.5 transition-all duration-200">
                        {tx.services.readMore} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Diagonal cut separator */}
      <div className="h-20 bg-white" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)", backgroundColor: "#FAFAFA" }} />

      {/* ─── WHY CHOOSE US ─── */}
      <section className="section-pad bg-[#FAFAFA] -mt-20 pt-32">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-center">
          <ScrollReveal direction="left">
            <div>
              <SectionTitle
                eyebrow={tx.whyChoose.eyebrow}
                title={tx.whyChoose.title}
                align="left"
                description={tx.whyChoose.description}
              />
              <ul className="mt-10 space-y-4">
                {tx.whyChoose.items.map((item, i) => (
                  <ScrollReveal key={item.label} delay={i * 80}>
                    <li className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-black/[0.03]">
                      <div className="w-8 h-8 rounded-full bg-accent/15 grid place-items-center shrink-0">
                        <CheckCircle2 size={16} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-primary text-[16px]">{item.label}</div>
                        <div className="text-[14px] text-muted-foreground mt-1">{item.desc}</div>
                      </div>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <div className="overflow-hidden grid grid-cols-2 gap-4">
              {[
                "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=70",
                "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=70",
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=70",
                "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=70",
              ].map((src, i) => (
                <div key={i} className={`rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,.12)] ${i % 2 ? "sm:translate-y-8" : ""}`}>
                  <img src={src} alt="Business meeting" loading="lazy" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SVG Wave separator (Gray to White) */}
      <div className="relative h-16 overflow-hidden -mb-1 bg-[#FAFAFA]">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full" fill="white">
          <path d="M0,0 C480,64 960,64 1440,0 L1440,64 L0,64 Z" />
        </svg>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.howItWorks.eyebrow}
              title={tx.howItWorks.title}
              description={tx.howItWorks.description}
            />
          </ScrollReveal>
          <div className="mt-16 grid gap-8 md:grid-cols-4 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-border border-dashed border-t-2" />

            {tx.howItWorks.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <ScrollReveal key={s.title} delay={i * 150} direction="up">
                  <div className="relative text-center group bg-white">
                    <div className="w-20 h-20 rounded-full bg-surface border-[6px] border-white text-primary grid place-items-center mx-auto shadow-sm relative z-10 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(245,166,35,.2)] group-hover:text-accent">
                      <Icon size={28} />
                    </div>
                    <div className="mt-6 text-[12px] font-bold text-accent tracking-[0.2em] uppercase">Step 0{i + 1}</div>
                    <h3 className="mt-2 text-[20px] font-bold text-primary">{s.title}</h3>
                    <p className="mt-3 text-[15px] text-muted-foreground leading-[1.6] px-4">{s.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SVG Wave separator (White to Light Gray) */}
      <div className="relative h-16 overflow-hidden -mb-1 bg-white">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full" fill="#F7F8FA">
          <path d="M0,0 C480,64 960,64 1440,0 L1440,64 L0,64 Z" />
        </svg>
      </div>

      {/* ─── TRUST & TESTIMONIALS ─── */}
      <section className="section-pad bg-[#F7F8FA]">
        <div className="container-x">
          <ScrollReveal>
            <SectionTitle
              eyebrow={tx.trust.eyebrow}
              title={tx.trust.title}
              description={tx.trust.description}
            />
          </ScrollReveal>

          {/* Logo Carousel */}
          <ScrollReveal delay={200} direction="up">
            <div className="mt-16 overflow-hidden relative before:absolute before:inset-y-0 before:left-0 before:w-32 before:bg-gradient-to-r before:from-[#F7F8FA] before:z-10 after:absolute after:inset-y-0 after:right-0 after:w-32 after:bg-gradient-to-l after:from-[#F7F8FA] after:z-10">
              <style>{`
                @keyframes logo-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .logo-track {
                  display: flex;
                  width: max-content;
                  animation: logo-scroll 30s linear infinite;
                }
                .logo-track:hover { animation-play-state: paused; }
              `}</style>
              <div className="logo-track">
                {[...trustLogos, ...trustLogos, ...trustLogos].map((logo, i) => (
                  <div key={i} className="flex items-center justify-center w-64 h-16 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                    <img src={logo.src} alt={logo.name} className="h-10 object-contain" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {tx.testimonials.map((testimonial, i) => (
              <ScrollReveal key={i} delay={i * 150} direction="up">
                <div className="card-elevated flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-[16px] text-foreground leading-[1.7] italic flex-1">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-black/[0.04]">
                    <div className="w-12 h-12 rounded-full bg-primary/5 grid place-items-center shrink-0">
                      <User size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-primary">{testimonial.name}</div>
                      <div className="text-[13px] text-muted-foreground mt-0.5">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER CTA ─── */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <ScrollReveal>
            <div className="rounded-[24px] bg-gradient-to-r from-primary to-primary-dark text-primary-foreground p-8 sm:p-12 md:p-16 text-center shadow-[0_20px_60px_rgba(11,61,145,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 text-white pointer-events-none">
                <WorldMap className="w-full h-full scale-125 origin-center" />
              </div>
              <div className="relative z-10">
                <Award className="mx-auto text-accent mb-6" size={48} />
                <h2 className="text-white text-[32px] md:text-[44px] font-extrabold leading-[1.2]">
                  {tx.cta.title}
                </h2>
                <p className="mt-6 text-white/80 max-w-2xl mx-auto text-[18px] leading-[1.6]">
                  {tx.cta.description}
                </p>
                <Link to="/partner" search={(p) => ({ ...p })} className="btn-primary mt-10 inline-flex !h-14 !px-8 !text-[16px]">
                  {tx.cta.btn} <ArrowRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
