import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { SiteLayout, PageHero, CtaBand } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { MagneticArea } from "@/components/site/MagneticArea";
import { Photo } from "@/components/site/Photo";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { MEDIA } from "@/lib/media";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { cn } from "@/lib/utils";
import {
  Users,
  Handshake,
  Headphones,
  Building2,
  Check,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/services", search),
  head: () => seoHead("/services", "en"),
  component: ServicesPage,
});

const serviceIcons = [Users, Handshake, Headphones, Building2];

// Matched to each service, in the order of translations.services.items. The
// alt text is English by design: these two stock-style frames have no caption
// in the translation object, and the expo ones reuse the gallery captions.
const serviceImages = [
  { file: MEDIA.expo4, captionIndex: 3 },
  { file: MEDIA.deal, alt: "Two partners closing a deal after a matchmaking meeting" },
  { file: MEDIA.evening, alt: "Buyers hosted at an evening networking reception" },
  { file: MEDIA.expo1, captionIndex: 0 },
] as const;

const SERVICE_IMAGE_SIZES = "(min-width: 1024px) 46vw, 92vw";

/** Stable anchor ids, so the tab bar and deep links agree. */
const SERVICE_IDS = ["buyer-recruitment", "matchmaking", "buyer-support", "exhibition-sales"];

/** Which service block is currently in the reading zone. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      // A thin band a third of the way down the viewport: whichever block
      // crosses it is the one being read.
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

export function ServicesPage() {
  const { lang } = useLanguage();
  const all = t(lang);
  const tx = all.services;
  const captions = all.experience.gallery.captions;
  const active = useActiveSection(SERVICE_IDS);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
        image={MEDIA.expo2}
      />

      {/* The switcher is sticky inside this wrapper only, so it leaves with
          the four services instead of riding over the closing CTA. */}
      <div className="relative">
        <nav
          aria-label={all.ui.servicesNav}
          className="sticky top-[84px] z-30 border-b border-border bg-surface/85 backdrop-blur-xl"
        >
          <div className="container-x">
            <ol className="-mx-1 flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tx.items.map((s, i) => {
                const id = SERVICE_IDS[i];
                const isActive = active === id;
                return (
                  <li key={id} className="shrink-0">
                    <a
                      href={`#${id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex h-11 items-center gap-2.5 rounded-full px-4 font-display text-[14px] font-semibold transition-colors duration-300",
                        isActive
                          ? "bg-primary text-white"
                          : "text-primary/65 hover:bg-primary/[0.06] hover:text-primary",
                      )}
                    >
                      <span
                        className={cn(
                          "meta text-[11px]",
                          isActive ? "text-accent" : "text-primary/40",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>

        {tx.items.map((s, i) => {
          const isEven = i % 2 === 0;
          const Icon = serviceIcons[i];
          const img = serviceImages[i];
          const alt = "captionIndex" in img ? captions[img.captionIndex] : img.alt;
          return (
            <section
              key={s.title}
              id={SERVICE_IDS[i]}
              aria-labelledby={`${SERVICE_IDS[i]}-title`}
              className={cn(
                "section-pad scroll-mt-40",
                isEven ? "bg-surface" : "bg-surface-sunken",
              )}
            >
              <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
                {/* Text — the taller column, scrolling past the pinned image. */}
                <ScrollReveal className={cn("lg:col-span-6", isEven ? "lg:order-1" : "lg:order-2")}>
                  <div className="flex items-end gap-5">
                    <span
                      aria-hidden="true"
                      className="stroke-type font-display text-[clamp(5rem,3.5rem+6vw,9rem)] font-extrabold leading-[0.8] text-primary/25"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="icon-chip mb-1 !h-14 !w-14 !rounded-2xl">
                      <Icon size={26} />
                    </div>
                  </div>

                  <h2
                    id={`${SERVICE_IDS[i]}-title`}
                    className="mt-10 text-section font-extrabold text-primary"
                  >
                    {s.title}
                  </h2>
                  <p className="mt-6 text-lede text-muted-foreground">{s.desc}</p>

                  <ul className="mt-10 border-t border-primary/10">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="group flex items-start gap-4 border-b border-primary/10 py-4"
                      >
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-300 ease-spring group-hover:scale-110">
                          <Check size={14} strokeWidth={3} />
                        </span>
                        <span className="text-[16px] font-medium leading-snug text-foreground">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <MagneticArea className="mt-10">
                    <LocalizedLink to="/contact" className="btn-primary">
                      {s.cta} <ArrowRight size={17} />
                    </LocalizedLink>
                  </MagneticArea>
                </ScrollReveal>

                {/* Image — pinned while the text scrolls. Deliberately NOT
                    inside a ScrollReveal: a transformed ancestor would make
                    the sticky offset resolve against the wrong box. */}
                <div
                  className={cn(
                    "lg:sticky lg:top-40 lg:col-span-6",
                    isEven ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-panel lg:aspect-[4/5]">
                    <div className="sd-drift h-full w-full">
                      <Photo file={img.file} alt={alt} sizes={SERVICE_IMAGE_SIZES} />
                    </div>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                    />
                    <div className="glass-dark absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl p-4 text-white sm:right-auto sm:p-5">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <div className="meta text-[11px] text-white/65">{s.floatingLabel}</div>
                        <div className="font-display text-[17px] font-bold">{s.floatingValue}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CtaBand
        title={all.partner.cta.title}
        description={all.partner.cta.desc}
        primary={{ to: "/contact", label: all.contact.hero.title }}
        secondary={{ to: "/partner", label: all.nav.becomePartner }}
      />
    </SiteLayout>
  );
}
