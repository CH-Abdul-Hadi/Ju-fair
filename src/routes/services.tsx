import { createFileRoute } from "@tanstack/react-router";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { MagneticArea } from "@/components/site/MagneticArea";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { Users, Handshake, Headphones, Building2, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/services", search),
  head: () => seoHead("/services", "en"),
  component: ServicesPage,
});

const serviceIcons = [Users, Handshake, Headphones, Building2];

// Locally served, and matched to each service rather than generic office stock.
// Order follows translations.services.items.
// `base` drives the WebP srcset; `src` is the fallback for browsers without
// WebP support.
const serviceImages = [
  {
    base: "/Expo/expo2",
    src: "/Expo/expo2.jpeg",
    alt: "International buyers with event badges meeting exhibitors on the show floor",
  },
  {
    base: "/images/business-deal",
    src: "/images/business-deal.webp",
    alt: "Two partners closing a deal after a matchmaking meeting",
  },
  {
    base: "/images/networking-evening",
    src: "/images/networking-evening.webp",
    alt: "Buyers hosted at an evening networking reception",
  },
  {
    base: "/Expo/expo1",
    src: "/Expo/expo1.jpeg",
    alt: "National pavilion stand built for an international exhibition",
  },
];

/** One image per row, half the content column on desktop. */
const SERVICE_IMAGE_SIZES = "(min-width: 768px) 45vw, 92vw";

export function ServicesPage() {
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
          <section key={s.title} className={`section-pad ${isEven ? "bg-surface" : "bg-surface-sunken"}`}>
            <div className="container-x">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

                {/* Text Content — the taller column, so it scrolls past the
                    pinned image below. */}
                <ScrollReveal
                  direction={isEven ? "left" : "right"}
                  className={isEven ? "lg:order-1" : "lg:order-2"}
                >
                  <div>
                    <div className="icon-chip mb-6 !h-16 !w-16 !rounded-2xl">
                      <Icon size={30} />
                    </div>
                    <h2 className="text-section font-bold text-primary">{s.title}</h2>
                    <div className="mt-5 h-1 w-12 rounded-full bg-accent" />

                    <p className="mt-6 text-[17px] text-muted-foreground leading-[1.7]">
                      {s.desc}
                    </p>

                    <ul className="mt-8 space-y-4">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-border shadow-sm">
                          <CheckCircle2 size={20} className="text-accent-text shrink-0 mt-0.5" />
                          <span className="text-[15px] font-semibold text-primary">{p}</span>
                        </li>
                      ))}
                    </ul>

                    <MagneticArea className="mt-10">
                      <LocalizedLink to="/contact" className="btn-primary inline-flex">
                        {s.cta} <ArrowRight size={16} className="ml-1" />
                      </LocalizedLink>
                    </MagneticArea>
                  </div>
                </ScrollReveal>

                {/* Image — pinned while the text column scrolls past it.
                    lg:top-28 clears the fixed header. Deliberately NOT wrapped
                    in ScrollReveal: a transformed ancestor would make the
                    sticky offset resolve against the wrong box. */}
                <div
                  className={`relative lg:sticky lg:top-28 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                    <div className={`absolute -inset-4 bg-primary/5 rounded-[24px] transform transition-transform duration-500 hover:rotate-0 ${isEven ? "rotate-3" : "-rotate-3"}`} />
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${serviceImages[i].base}-600.webp 600w, ${serviceImages[i].base}-1200.webp 1200w`}
                        sizes={SERVICE_IMAGE_SIZES}
                      />
                      <img
                        src={serviceImages[i].src}
                        alt={serviceImages[i].alt}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="relative rounded-[20px] shadow-[0_20px_50px_rgba(11,61,145,0.12)] object-cover w-full h-[240px] sm:h-[340px] md:h-[500px]"
                      />
                    </picture>

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
            </div>
          </section>
        );
      })}
    </SiteLayout>
  );
}
