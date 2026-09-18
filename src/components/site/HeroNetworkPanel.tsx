/**
 * HeroNetworkPanel.tsx — the hero's right-hand visual.
 *
 * The hero grid declares `lg:grid-cols-[55%_45%]`; this fills the 45% column
 * that was previously empty, turning dead space into the page's proof point.
 *
 * Every string rendered here comes from the existing translation object
 * (`globalNetwork.regions`, `globalNetwork.stats`, `globalNetwork.activeRegions`,
 * `contact.sidebar.hq`, `footer.address`) — so the panel is fully bilingual
 * without introducing a single new translation key, and the counts stay in sync
 * with the /global-network page automatically.
 *
 * Hidden below `lg`, which is exactly where the empty column existed.
 */

import { MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { HeroGlobe } from "@/components/site/HeroGlobe";

export function HeroNetworkPanel() {
  const { lang } = useLanguage();
  const tx = t(lang);
  const regions = Object.entries(tx.globalNetwork.regions) as [string, readonly string[]][];

  return (
    <div className="relative mt-14 lg:mt-0">
      {/* Soft gold bloom behind the card — adds depth against the hero photo
          without another DOM layer competing for contrast. */}
      <div
        className="absolute -inset-6 rounded-[32px] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(245,166,35,0.22) 0, transparent 62%)",
        }}
        aria-hidden="true"
      />

      <div
        // pb-16 reserves room for the floating HQ chip, which sits at
        // -bottom-5 and was otherwise covering the stats row's labels.
        className="hero-animate relative rounded-[22px] p-0 lg:border lg:border-white/15 lg:bg-white/[0.07] lg:p-7 lg:pb-16 lg:shadow-[0_28px_70px_rgba(0,0,0,0.4)] lg:backdrop-blur-xl"
        style={{ animationDelay: "420ms" }}
      >
        {/* ── Header ── */}
        <div className="hidden lg:flex items-center gap-2.5 pb-4 border-b border-white/10">
          <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-accent" />
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">
            {tx.globalNetwork.activeRegions}
          </span>
        </div>

        {/* ── Globe ── */}
        <div className="hero-animate mx-auto max-w-[280px] px-1 pt-2 sm:max-w-[340px] lg:max-w-none" style={{ animationDelay: "560ms" }}>
          <HeroGlobe />
        </div>

        {/* ── Region chips ──
            The full country breakdown lives on /global-network; here the
            region names alone label what the globe's markers represent, and
            keep the panel meaningful in both languages. */}
        <ul className="hidden lg:flex flex-wrap justify-center gap-1.5 pb-4 pt-1">
          {regions.map(([region, countries], i) => (
            <li
              key={region}
              className="hero-animate flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] py-1 pl-2.5 pr-2 text-[11px] font-semibold text-white/80"
              style={{ animationDelay: `${700 + i * 70}ms` }}
            >
              {region}
              <span className="rounded-full bg-accent/20 px-1.5 text-[10px] font-extrabold text-accent tabular-nums">
                {countries.length}
              </span>
            </li>
          ))}
        </ul>

        {/* ── Stats footer ── */}
        <div className="hidden lg:grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
          {tx.globalNetwork.stats.map((s, i) => (
            <div
              key={s.d}
              className="hero-animate text-center"
              style={{ animationDelay: `${900 + i * 90}ms` }}
            >
              <div className="text-[19px] font-extrabold text-white leading-none">{s.t}</div>
              <div className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/50 leading-tight">
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Floating HQ chip — overlaps the card's lower-left corner to break
             the rectangle and add a second depth plane. ── */}
      <div
        className="hero-animate absolute -bottom-5 -left-5 hidden lg:flex items-center gap-3 rounded-2xl bg-primary-dark/95 backdrop-blur-md border border-white/10 pl-3 pr-4 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
        style={{ animationDelay: "1080ms" }}
      >
        <span className="grid place-items-center w-8 h-8 rounded-full bg-accent/15 shrink-0">
          <MapPin size={15} className="text-accent" />
        </span>
        <span className="leading-tight">
          <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
            {tx.contact.sidebar.hq}
          </span>
          <span className="block text-[13px] font-semibold text-white">{tx.footer.address}</span>
        </span>
      </div>
    </div>
  );
}
