import { LocalizedLink } from "@/components/site/LocalizedLink";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();
  const tx = t(lang).nav;

  // Nav links — "Become Our Partner" removed here; it lives as the CTA button
  const nav = [
    { to: "/", label: tx.home },
    { to: "/about", label: tx.about },
    { to: "/services", label: tx.services },
    { to: "/experience", label: tx.experience },
    { to: "/global-network", label: tx.globalNetwork },
    { to: "/contact", label: tx.contact },
  ] as const;

  // Hysteresis: solidify at 48px, but don't go transparent again until 24px.
  // A single threshold makes the bar flicker when the visitor hovers right on
  // it — every tiny scroll re-triggers a 280ms cross-fade. The dead band
  // between the two values removes that entirely.
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled((was) => (was ? y > 24 : y > 48));
    };
    const handler = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };
    read(); // initialise on mount
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handler);
    };
  }, []);

  // Escape closes the mobile drawer — expected behaviour for any overlay menu,
  // and the only way out for keyboard users who opened it without a pointer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isTransparent = !scrolled && !open;

  return (
    <header
      // The header's own transition is height only. The white surface is a
      // separate layer below (see the div right after this), so its opacity
      // and the link colours can share ONE duration and ONE curve.
      //
      // Before: the background faded over 500ms while link colours swapped
      // over 200ms. Text therefore reached navy while the bar was still
      // largely transparent over the dark hero — and went white while the bar
      // was still white on the way back up. That mismatch was the visible
      // "text conflict" on scroll.
      className={[
        "fixed top-0 inset-x-0 z-50 transition-[height] duration-[var(--dur-nav)] ease-out-expo",
        isTransparent ? "h-[88px]" : "h-[72px]",
      ].join(" ")}
    >
      {/* Solid surface layer — cross-fades in lockstep with the link colours. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b border-slate-200/70 bg-white/95 shadow-[0_4px_24px_rgba(11,29,58,0.07)] backdrop-blur-md transition-opacity duration-[var(--dur-nav)] ease-out-expo ${
          isTransparent ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* container-x (not a wider bespoke width) so the logo and CTA line up
          exactly with every page's content column. */}
      <div className="container-x relative z-10 flex items-center justify-between h-full">

        {/* ── Logo ── */}
        <LocalizedLink
          to="/"
         
          className="relative flex items-center shrink-0"
          style={{ width: "140px", height: "48px" }}
        >
          {/* logo_white.png — shown on transparent/hero state */}
          <img
            src="/logo_white.png"
            alt="JU Fair Global"
            width={140}
            height={48}
            className={`absolute inset-0 h-full w-full object-contain object-left transition-all duration-[var(--dur-nav)] ease-out-expo ${
              isTransparent
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }`}
          />
          {/* logo_dark.png — shown on scrolled/solid state */}
          <img
            src="/logo_dark.png"
            alt="JU Fair Global"
            width={140}
            height={48}
            className={`absolute inset-0 h-full w-full object-contain object-left transition-all duration-[var(--dur-nav)] ease-out-expo ${
              !isTransparent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          />
        </LocalizedLink>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden lg:flex items-center gap-1" aria-label={tx.mainNav}>
          {nav.map((n) => (
            <LocalizedLink
              key={n.to}
              to={n.to}
             
              className={`
                relative px-3 py-2 text-[13px] font-medium tracking-wide rounded-md
                transition-colors duration-[var(--dur-nav)] ease-out-expo
                after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                after:h-[2px] after:w-0 after:rounded-full
                after:transition-[width] after:duration-300
                hover:after:w-6
                ${
                  isTransparent
                    ? "text-white/85 [text-shadow:0_1px_3px_rgba(4,16,31,0.45)] hover:text-white hover:bg-white/10 after:bg-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 after:bg-primary"
                }
              `}
              activeProps={{
                className: isTransparent
                  ? "text-white font-semibold after:!w-6"
                  : "text-primary font-semibold after:!w-6",
                // The active item was styled but never announced — a screen
                // reader had no way to know which page it was on.
                "aria-current": "page",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </LocalizedLink>
          ))}
        </nav>

        {/* ── Desktop Right: Language + CTA ── */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <LanguageToggle
            lang={lang}
            setLang={setLang}
            isTransparent={isTransparent}
            languageSelectorLabel={tx.languageSelector}
          />
          <LocalizedLink
            to="/partner"
           
            className={`
              inline-flex items-center justify-center
              h-[38px] px-5 rounded-lg
              text-[13px] font-semibold tracking-wide
              transition-all duration-[var(--dur-nav)] ease-out-expo
              ${
                isTransparent
                  ? "bg-accent text-accent-ink hover:bg-accent-hover shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                  : "bg-primary text-white hover:bg-primary/90 shadow-sm"
              }
            `}
          >
            {tx.becomePartner}
          </LocalizedLink>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className={`lg:hidden relative z-10 p-2.5 rounded-lg transition-colors duration-[var(--dur-nav)] ease-out-expo ${
            isTransparent
              ? "text-white hover:bg-white/10"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          onClick={() => setOpen(!open)}
          aria-label={tx.menuToggle}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Drawer ──
          `inert` when closed: the panel was only hidden with opacity and
          pointer-events, so its six links and the CTA stayed in the tab order.
          A keyboard visitor on a phone tabbed through seven invisible controls
          after the hamburger. inert removes them from the accessibility tree
          and from focus entirely, and React 19 supports it natively. */}
      <div
        inert={!open}
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl
          transition-all duration-300 ease-in-out origin-top overflow-hidden
          ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
        `}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {nav.map((n) => (
            <LocalizedLink
              key={n.to}
              to={n.to}
             
              onClick={() => setOpen(false)}
              className="py-3 px-4 text-[15px] font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
              activeProps={{
                className: "text-primary bg-primary/5 font-semibold",
                "aria-current": "page",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </LocalizedLink>
          ))}
          <div className="mt-3 pt-4 border-t border-slate-100 flex flex-col gap-3 px-2">
            <LocalizedLink
              to="/partner"
             
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center h-12 rounded-xl bg-primary text-white text-[15px] font-semibold transition-opacity hover:opacity-90"
            >
              {tx.becomePartner}
            </LocalizedLink>
            <div className="flex justify-center pt-1">
              <LanguageToggle
                lang={lang}
                setLang={setLang}
                isTransparent={false}
                languageSelectorLabel={tx.languageSelector}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function LanguageToggle({
  lang,
  setLang,
  isTransparent,
  languageSelectorLabel,
}: {
  lang: "en" | "cn";
  setLang: (l: "en" | "cn") => void;
  isTransparent: boolean;
  languageSelectorLabel: string;
}) {
  const containerClass = isTransparent
    ? "border-white/20 bg-white/8"
    : "border-slate-200 bg-slate-50/80";

  const activeClass = "bg-primary text-white font-semibold shadow-sm";
  const inactiveClass = isTransparent
    ? "text-white/65 hover:text-white hover:bg-white/10"
    : "text-slate-500 hover:text-slate-800 hover:bg-white";

  return (
    <div
      className={`flex items-center rounded-lg border overflow-hidden p-0.5 transition-colors ${containerClass}`}
      role="group"
      aria-label={languageSelectorLabel}
    >
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase rounded-[5px] transition-all duration-200 cursor-pointer ${
          lang === "en" ? activeClass : inactiveClass
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("cn")}
        className={`px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase rounded-[5px] transition-all duration-200 cursor-pointer ${
          lang === "cn" ? activeClass : inactiveClass
        }`}
        aria-pressed={lang === "cn"}
      >
        中文
      </button>
    </div>
  );
}
