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
      <div className="container-x relative py-20 md:py-28 text-center">
        {eyebrow && (
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
            {eyebrow}
          </span>
        )}
        <h1 className="text-white text-4xl md:text-5xl font-bold max-w-3xl mx-auto">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-white/80 max-w-2xl mx-auto text-base md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
