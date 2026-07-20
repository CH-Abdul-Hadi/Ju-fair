import { Link } from "@tanstack/react-router";
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler(); // Initialize on mount
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isTransparent = !scrolled && !open;

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out",
        isTransparent
          ? "h-[88px] bg-transparent"
          : "h-[72px] bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-slate-200/60",
      ].join(" ")}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 xl:px-14 flex items-center justify-between h-full">

        {/* ── Logo ── */}
        <Link
          to="/"
          search={(p) => ({ ...p })}
          className="relative flex items-center shrink-0"
          style={{ width: "160px", height: "48px" }}
        >
          {/* logo_white.png — shown on transparent/hero state */}
          <img
            src="/logo_white.png"
            alt="JU Fair Global"
            className={`absolute inset-0 h-full w-full object-contain object-left transition-all duration-500 ease-in-out ${
              isTransparent
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }`}
          />
          {/* favicon.png — shown on scrolled/solid state */}
          <img
            src="/favicon.png"
            alt="JU Fair Global"
            className={`absolute inset-0 h-full w-full object-contain object-left transition-all duration-500 ease-in-out ${
              !isTransparent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          />
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              search={(prev) => ({ ...prev })}
              className={`
                relative px-4 py-2 text-[13px] font-medium tracking-wide rounded-md
                transition-colors duration-200
                after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                after:h-[2px] after:w-0 after:rounded-full
                after:transition-[width] after:duration-300
                hover:after:w-6
                ${
                  isTransparent
                    ? "text-white/75 hover:text-white hover:bg-white/8 after:bg-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 after:bg-primary"
                }
              `}
              activeProps={{
                className: isTransparent
                  ? "text-white font-semibold after:!w-6"
                  : "text-primary font-semibold after:!w-6",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop Right: Language + CTA ── */}
        <div className="hidden xl:flex items-center gap-5 shrink-0">
          <LanguageToggle lang={lang} setLang={setLang} isTransparent={isTransparent} />
          <Link
            to="/partner"
            search={(prev) => ({ ...prev })}
            className={`
              inline-flex items-center justify-center
              h-[38px] px-5 rounded-lg
              text-[13px] font-semibold tracking-wide
              transition-all duration-300
              ${
                isTransparent
                  ? "bg-accent text-white hover:bg-accent/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                  : "bg-primary text-white hover:bg-primary/90 shadow-sm"
              }
            `}
          >
            {tx.becomePartner}
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className={`xl:hidden p-2.5 rounded-lg transition-colors ${
            isTransparent
              ? "text-white hover:bg-white/10"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={`xl:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl
          transition-all duration-300 ease-in-out origin-top overflow-hidden
          ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
        `}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              search={(prev) => ({ ...prev })}
              onClick={() => setOpen(false)}
              className="py-3 px-4 text-[15px] font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
              activeProps={{ className: "text-primary bg-primary/5 font-semibold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-3 pt-4 border-t border-slate-100 flex flex-col gap-3 px-2">
            <Link
              to="/partner"
              search={(prev) => ({ ...prev })}
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center h-12 rounded-xl bg-primary text-white text-[15px] font-semibold transition-opacity hover:opacity-90"
            >
              {tx.becomePartner}
            </Link>
            <div className="flex justify-center pt-1">
              <LanguageToggle lang={lang} setLang={setLang} isTransparent={false} />
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
}: {
  lang: "en" | "cn";
  setLang: (l: "en" | "cn") => void;
  isTransparent: boolean;
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
      aria-label="Language selector"
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
