import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { WhatsAppIcon, getWhatsAppLink } from "@/components/site/WhatsAppIcon";
import { useLanguage } from "@/hooks/useLanguage";
import { t, type Lang } from "@/translations";
import { cn } from "@/lib/utils";

/**
 * Header — a floating capsule.
 *
 * Over the dark masthead every page opens with, the bar is just type on the
 * image. Once the visitor scrolls, a white capsule forms around it, inset from
 * the viewport edge. Two rules carried over from the previous header, because
 * both fixed real bugs:
 *
 *   1. ONE CLOCK. Surface opacity, height, padding, link colour, logo
 *      cross-fade and CTA all run on `--dur-nav` + ease-out-expo. When they
 *      drifted (500ms vs 200ms), text turned navy while the bar was still
 *      transparent over the hero. The surface is its own layer whose opacity
 *      animates, so it cannot desync from the links.
 *   2. HYSTERESIS. Solid at 48px, transparent again only below 24px, so
 *      resting on the threshold cannot flicker the bar.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();
  const tx = t(lang);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/", label: tx.nav.home },
    { to: "/about", label: tx.nav.about },
    { to: "/services", label: tx.nav.services },
    { to: "/experience", label: tx.nav.experience },
    { to: "/global-network", label: tx.nav.globalNetwork },
    { to: "/contact", label: tx.nav.contact },
  ] as const;

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled((was) => (was ? y > 24 : y > 48));
    };
    const handler = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handler);
    };
  }, []);

  // Escape closes the drawer; the page behind it must not scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Any navigation — including the language switch — closes the drawer.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // The capsule only shows once scrolled, and never over the (ink) drawer.
  const solid = scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "container-x transition-[padding] duration-[var(--dur-nav)] ease-out-expo",
          solid ? "pt-3" : "pt-4 md:pt-6",
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between gap-6 transition-[height,padding] duration-[var(--dur-nav)] ease-out-expo",
            solid ? "h-16 px-3 sm:px-5" : "h-[68px] px-0",
          )}
        >
          {/* Capsule surface — cross-fades in lockstep with the link colours. */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-[20px] border border-white/70 bg-white/[0.9] shadow-[0_1px_2px_rgba(9,26,54,0.06),0_18px_40px_-18px_rgba(9,26,54,0.28)] backdrop-blur-xl transition-opacity duration-[var(--dur-nav)] ease-out-expo",
              solid ? "opacity-100" : "opacity-0",
            )}
          />

          {/* ── Logo ── */}
          <LocalizedLink to="/" className="relative z-10 block h-[54px] w-[79px] shrink-0">
            <img
              src="/logo_white.png"
              alt="JU Fair Global"
              width={79}
              height={54}
              className={cn(
                "absolute inset-0 h-full w-full object-contain object-left transition-all duration-[var(--dur-nav)] ease-out-expo",
                solid
                  ? "pointer-events-none -translate-y-1 opacity-0"
                  : "translate-y-0 opacity-100",
              )}
            />
            <img
              src="/logo_dark.png"
              alt=""
              aria-hidden="true"
              width={79}
              height={54}
              className={cn(
                "absolute inset-0 h-full w-full object-contain object-left transition-all duration-[var(--dur-nav)] ease-out-expo",
                solid ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0",
              )}
            />
          </LocalizedLink>

          {/* ── Desktop nav ── */}
          <nav className="relative z-10 hidden lg:block" aria-label={tx.nav.mainNav}>
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <LocalizedLink
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    activeProps={{ "aria-current": "page" }}
                    // TanStack sets data-status="active" on the current route,
                    // so the active state is pure CSS — no class juggling.
                    className={cn(
                      "group relative inline-flex h-10 items-center rounded-full px-2.5 font-display text-[13.5px] font-medium transition-colors duration-[var(--dur-nav)] ease-out-expo xl:px-3.5",
                      solid
                        ? "text-primary/70 hover:bg-primary/[0.05] hover:text-primary data-[status=active]:text-primary"
                        : "text-white/80 [text-shadow:0_1px_3px_rgba(4,16,31,0.4)] hover:bg-white/10 hover:text-white data-[status=active]:text-white",
                    )}
                  >
                    {n.label}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 scale-0 rounded-full bg-accent transition-transform duration-300 ease-spring group-data-[status=active]:scale-100"
                    />
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Desktop right ── */}
          <div className="relative z-10 hidden items-center gap-3 lg:flex">
            <LanguageToggle
              lang={lang}
              setLang={setLang}
              dark={!solid}
              label={tx.nav.languageSelector}
            />
            <LocalizedLink
              to="/partner"
              className={cn(
                "hidden h-10 items-center gap-2 rounded-full px-5 font-display text-[13.5px] font-semibold transition-all duration-[var(--dur-nav)] ease-out-expo xl:inline-flex",
                "bg-accent text-accent-ink hover:bg-accent-hover hover:shadow-[var(--shadow-btn)]",
              )}
            >
              {tx.nav.becomePartner}
              <ArrowRight size={15} />
            </LocalizedLink>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={tx.nav.menuToggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              "relative z-10 grid h-11 w-11 place-items-center rounded-full transition-colors duration-[var(--dur-nav)] ease-out-expo lg:hidden",
              solid ? "text-primary hover:bg-primary/[0.06]" : "text-white hover:bg-white/10",
            )}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out-expo",
                  open ? "top-[5px] rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-out-expo",
                  open ? "top-[5px] w-5 -rotate-45" : "top-[10px] w-3.5",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ──
          Full-screen ink panel. `inert` when closed so its links are out of
          the tab order and the accessibility tree; visibility (not just
          opacity) so it cannot intercept taps. Enter and exit are plain CSS
          transitions — never tw-animate's animate-out (see CLAUDE.md). */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-ink text-white transition-[opacity,visibility] duration-500 ease-out-expo lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div
          aria-hidden="true"
          className="bg-dots pointer-events-none absolute inset-0 text-white/[0.06] [mask-image:linear-gradient(180deg,#000,transparent_70%)]"
        />
        <nav aria-label={tx.nav.mainNav} className="container-x relative flex-1 pt-28">
          <ul>
            {[...nav, { to: "/partner" as const, label: tx.nav.partner }].map((n, i) => (
              <li
                key={n.to}
                className={cn(
                  "border-b border-white/10 transition-all duration-500 ease-out-expo",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              >
                <LocalizedLink
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{ "aria-current": "page" }}
                  className="group flex items-baseline gap-4 py-4 font-display text-[26px] font-semibold text-white/90 transition-colors hover:text-accent data-[status=active]:text-accent"
                >
                  <span className="meta w-7 text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={cn(
            "container-x relative space-y-6 pb-10 pt-8 transition-all duration-500 ease-out-expo",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
          style={{ transitionDelay: open ? "420ms" : "0ms" }}
        >
          <LocalizedLink to="/partner" className="btn-primary w-full">
            {tx.nav.becomePartner} <ArrowRight size={17} />
          </LocalizedLink>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <LanguageToggle lang={lang} setLang={setLang} dark label={tx.nav.languageSelector} />
            <div className="flex gap-2">
              <a
                href={`mailto:${tx.footer.email}`}
                aria-label={tx.ui.emailUs}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-accent transition-colors hover:bg-white/10"
              >
                <Mail size={18} />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                aria-label={tx.ui.whatsapp}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-accent transition-colors hover:bg-white/10"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/** EN / 中文 segmented control with a sliding thumb. */
function LanguageToggle({
  lang,
  setLang,
  dark,
  label,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  dark: boolean;
  label: string;
}) {
  const options: { id: Lang; text: string }[] = [
    { id: "en", text: "EN" },
    { id: "cn", text: "中文" },
  ];

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "relative grid grid-cols-2 rounded-full border p-1 transition-colors duration-[var(--dur-nav)] ease-out-expo",
        dark ? "border-white/20 bg-white/[0.06]" : "border-primary/10 bg-primary/[0.04]",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full shadow-sm transition-transform duration-300 ease-out-expo",
          dark ? "bg-white" : "bg-primary",
          lang === "cn" && "translate-x-full",
        )}
      />
      {options.map((o) => {
        const active = lang === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setLang(o.id)}
            aria-pressed={active}
            className={cn(
              "relative z-10 h-8 min-w-11 rounded-full px-3 font-display text-[12px] font-semibold tracking-wide transition-colors duration-300",
              active
                ? dark
                  ? "text-primary"
                  : "text-white"
                : dark
                  ? "text-white/70 hover:text-white"
                  : "text-primary/60 hover:text-primary",
            )}
          >
            {o.text}
          </button>
        );
      })}
    </div>
  );
}
