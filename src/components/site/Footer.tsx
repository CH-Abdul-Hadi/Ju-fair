import { ArrowRight, ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { WhatsAppIcon, getWhatsAppLink } from "@/components/site/WhatsAppIcon";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { HQ_COORDS } from "@/lib/media";
import type { RoutePath } from "@/lib/paths";

// Each link is named after its platform — eight links all labelled "social"
// gave screen-reader users an unusable list of identical entries.
const SOCIALS = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/ju-global-private-limited/",
    name: "LinkedIn",
  },
  { icon: Facebook, href: "https://www.facebook.com/share/1BdSxmw4wg/", name: "Facebook" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/jufair_global?igsh=cmhnNHV1Y3RtajZm",
    name: "Instagram",
  },
  { icon: WhatsAppIcon, href: getWhatsAppLink(), name: "WhatsApp" },
];

export function Footer() {
  const { lang } = useLanguage();
  const tx = t(lang);
  const f = tx.footer;

  // The slogan is three short sentences; set one per line it becomes the
  // footer's headline. Splits on the Latin or the ideographic full stop.
  const slogan = f.tagline.split(/(?<=[.。])\s*/).filter(Boolean);

  const columns: { title: string; links: { to: RoutePath; label: string }[] }[] = [
    {
      title: f.company,
      links: [
        { to: "/about", label: f.links.about },
        { to: "/services", label: f.links.services },
        { to: "/experience", label: f.links.experience },
        { to: "/global-network", label: tx.nav.globalNetwork },
        { to: "/partner", label: f.links.partner },
      ],
    },
    {
      title: f.support,
      links: [
        { to: "/contact", label: f.links.contact },
        { to: "/faqs", label: f.links.faqs },
        { to: "/privacy", label: f.links.privacy },
        { to: "/terms", label: f.links.terms },
      ],
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="bg-dots absolute inset-0 -z-10 text-white/[0.05] [mask-image:linear-gradient(180deg,#000,transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-48 -top-48 -z-10 h-[40rem] w-[40rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 55%, transparent), transparent 65%)",
        }}
      />

      {/* ─── STATEMENT ─── */}
      <div className="container-x grid gap-12 border-b border-white/10 pb-16 pt-20 md:pt-24 lg:grid-cols-12 lg:items-end">
        {/* A paragraph, not a heading: this repeats on every page and would
            otherwise add the same heading to every document outline. */}
        <p className="font-display text-title font-bold text-white lg:col-span-7">
          {slogan.map((line, i) => (
            <span key={line} className={i === slogan.length - 1 ? "block text-accent" : "block"}>
              {line}
            </span>
          ))}
        </p>

        <div className="space-y-3 lg:col-span-5">
          <a
            href={`mailto:${f.email}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-accent/50 hover:bg-white/[0.06]"
          >
            <span className="flex min-w-0 items-center gap-4">
              <Mail size={18} className="shrink-0 text-accent" />
              <span className="truncate font-display text-[17px] font-semibold">{f.email}</span>
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-accent"
            />
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-accent/50 hover:bg-white/[0.06]"
          >
            <span className="flex items-center gap-4">
              <WhatsAppIcon size={18} className="shrink-0 text-accent" />
              <span className="font-display text-[17px] font-semibold tabular-nums">{f.phone}</span>
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-accent"
            />
          </a>
        </div>
      </div>

      {/* ─── DIRECTORY ─── */}
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-5">
          <img
            src="/logo_white.png"
            alt="JU Fair Global"
            width={140}
            height={56}
            loading="lazy"
            className="h-14 w-auto object-contain"
          />
          <p className="mt-6 flex items-center gap-2 text-[15px] text-white/65">
            <MapPin size={16} className="text-accent" /> {f.address}
          </p>
          <ul className="mt-8 flex gap-3">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-accent-ink"
                >
                  <s.icon size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="lg:col-span-3">
            {/* h2 is correct here: the footer is a sibling of <main>, not a
                subsection of the page's last heading. */}
            <h2 className="meta text-accent">{col.title}</h2>
            <ul className="mt-6 space-y-1">
              {col.links.map((l) => (
                <li key={l.to}>
                  <LocalizedLink
                    to={l.to}
                    className="group inline-flex min-h-10 items-center text-[15px] text-white/75 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 ease-out-expo group-hover:mr-2 group-hover:w-4" />
                    {l.label}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ─── WORDMARK ─── */}
      <div aria-hidden="true" className="container-x select-none overflow-hidden">
        <p className="stroke-type whitespace-nowrap text-center font-display text-[min(10.2vw,8.25rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-white/[0.16]">
          JU FAIR GLOBAL
        </p>
      </div>

      {/* ─── BASELINE ─── */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {f.copyright}
          </span>
          <span className="meta hidden text-white/40 lg:inline">{HQ_COORDS}</span>
          <div className="flex items-center justify-between gap-6">
            <span>{f.crafted}</span>
            <a
              href="#main"
              className="group inline-flex items-center gap-2 font-display font-semibold text-white/80 transition-colors hover:text-accent"
            >
              {tx.ui.backToTop}
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-transform duration-300 ease-spring group-hover:-translate-y-1">
                <ArrowUp size={15} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
