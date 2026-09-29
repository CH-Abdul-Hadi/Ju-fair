import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip link — the first tab stop on every page. Without it a keyboard
          visitor has to tab through the logo, six nav items, the language
          toggle and the CTA before reaching content, on every navigation.
          Visually hidden until focused. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {t(lang).nav.skipToContent}
      </a>

      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(245,166,35,0.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0, transparent 40%)",
        }}
      />
      <div className="container-x relative py-16 sm:py-24 md:py-32 text-center">
        {eyebrow && <p className="eyebrow-light inline-block">{eyebrow}</p>}
        <h1 className="text-white text-display font-extrabold max-w-3xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lede text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
