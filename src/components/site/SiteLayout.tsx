import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
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
      <div className="container-x relative py-24 md:py-32 text-center">
        {eyebrow && (
          <p className="eyebrow inline-block">{eyebrow}</p>
        )}
        <h1 className="text-white text-[40px] md:text-[48px] font-extrabold max-w-3xl mx-auto leading-[1.1]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-[18px] text-white/80 max-w-2xl mx-auto leading-[1.6]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
