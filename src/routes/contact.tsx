import { createFileRoute } from "@tanstack/react-router";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { RouteArc } from "@/components/site/RouteArc";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { HQ_COORDS } from "@/lib/media";
import { redirectLegacyLang } from "@/lib/langRedirect";
import {
  Mail,
  MapPin,
  Send,
  Facebook,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { WhatsAppIcon, getWhatsAppLink } from "@/components/site/WhatsAppIcon";
import { ContactMap } from "@/components/site/ContactMap";

export const Route = createFileRoute("/contact")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/contact", search),
  head: () => seoHead("/contact", "en"),
  component: ContactPage,
});

/** Cap on the message field — also what the live counter counts against. */
const MESSAGE_MAX = 1200;

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

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const { lang } = useLanguage();
  const tx = t(lang).contact;

  return (
    <SiteLayout>
      <PageHero eyebrow={tx.hero.eyebrow} title={tx.hero.title} subtitle={tx.hero.subtitle} />

      <section className="section-pad bg-surface-sunken">
        <div className="container-x grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ─── DIRECT LINES ───
              Every line is now actionable: the phone opens WhatsApp and the
              address below it is a real mailto, where both used to be plain
              text. Sticky on desktop, so the details stay in view while the
              visitor fills the form. */}
          <div className="lg:sticky lg:top-28 lg:col-span-4">
            <aside className="relative isolate overflow-hidden rounded-[28px] bg-ink p-7 text-white shadow-panel md:p-8">
              <div
                aria-hidden="true"
                className="bg-dots absolute inset-0 -z-10 text-white/[0.06] [mask-image:linear-gradient(180deg,#000,transparent_75%)]"
              />
              <RouteArc className="absolute -right-32 -top-20 -z-10 w-[360px] text-white opacity-40" />

              <h2 className="text-heading font-bold text-white">{tx.sidebar.contactInfo}</h2>

              <ul className="mt-7 space-y-3">
                <li className="flex gap-4 rounded-2xl border border-white/10 p-4">
                  <span className="icon-chip-invert !h-11 !w-11 !rounded-xl">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <div className="meta text-[11px] text-white/50">{tx.sidebar.hq}</div>
                    <div className="mt-1 font-display text-[16px] font-semibold">
                      {tx.sidebar.address}
                    </div>
                    <div className="meta mt-1 text-[10.5px] text-white/40">{HQ_COORDS}</div>
                  </div>
                </li>
                <li>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex gap-4 rounded-2xl border border-white/10 p-4 transition-colors hover:border-accent/50 hover:bg-white/[0.05]"
                  >
                    <span className="icon-chip-invert !h-11 !w-11 !rounded-xl">
                      <WhatsAppIcon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="meta text-[11px] text-white/50">{tx.sidebar.phone}</div>
                      <div className="mt-1 font-display text-[16px] font-semibold tabular-nums">
                        {tx.sidebar.phoneValue}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="self-center text-white/40 transition-all group-hover:rotate-45 group-hover:text-accent"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${tx.sidebar.emailValue}`}
                    className="group flex gap-4 rounded-2xl border border-white/10 p-4 transition-colors hover:border-accent/50 hover:bg-white/[0.05]"
                  >
                    <span className="icon-chip-invert !h-11 !w-11 !rounded-xl">
                      <Mail size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="meta text-[11px] text-white/50">
                        {tx.sidebar.emailSupport}
                      </div>
                      <div className="mt-1 truncate font-display text-[16px] font-semibold">
                        {tx.sidebar.emailValue}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="self-center text-white/40 transition-all group-hover:rotate-45 group-hover:text-accent"
                    />
                  </a>
                </li>
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <h3 className="meta text-white/55">{tx.sidebar.connectWith}</h3>
                <ul className="mt-4 flex gap-3">
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
            </aside>
          </div>

          {/* ─── FORM ─── */}
          <div className="space-y-6 lg:col-span-8">
            <ScrollReveal>
              <div className="rounded-[28px] border border-border bg-card p-6 shadow-card sm:p-10 md:p-12">
                {sent ? (
                  <div className="mx-auto max-w-md py-10 text-center animate-fade-in">
                    <div className="mx-auto mb-7 grid h-20 w-20 place-items-center rounded-full bg-accent text-accent-ink shadow-[var(--shadow-btn-hover)]">
                      {/* Drawn rather than bounced — a checkmark that writes
                          itself reads as confirmation, not as an alert. */}
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" pathLength={1} className="check-draw" />
                      </svg>
                    </div>
                    <h2 className="text-title font-extrabold text-primary">
                      {tx.form.success.title}
                    </h2>
                    <p className="mt-4 text-[16px] leading-[1.6] text-muted-foreground">
                      {tx.form.success.desc}
                    </p>
                    <div className="mt-9 flex flex-wrap justify-center gap-3">
                      <LocalizedLink to="/services" className="btn-outline">
                        {tx.form.success.btnServices}
                      </LocalizedLink>
                      <LocalizedLink to="/" className="btn-primary">
                        {tx.form.success.btnHome}
                      </LocalizedLink>
                    </div>
                  </div>
                ) : (
                  <ContactForm tx={tx} onSuccess={() => setSent(true)} />
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="overflow-hidden rounded-[28px] border border-border bg-card p-2 shadow-card">
                <ContactMap
                  latitude={31.23}
                  longitude={121.47}
                  locationName="JU Fair Global"
                  zoom={15}
                  title={tx.sidebar.mapTitle}
                  className="block h-[340px] w-full rounded-[22px] border-0 md:h-[420px]"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ContactForm — sends data to Web3Forms API
   API key is read from VITE_WEB3FORMS_KEY in the .env file.
───────────────────────────────────────────────────────────────── */
function ContactForm({
  tx,
  onSuccess,
}: {
  tx: ReturnType<typeof t>["contact"];
  onSuccess: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // API key from .env (VITE_ prefix makes it available in the browser bundle)
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY ?? "");

    // Makes emails easy to identify in Gmail
    formData.append("from_name", "JU Fair Global — Contact Form");
    formData.append("subject", "New Inquiry via JU Fair Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (json.success) {
        onSuccess();
      } else {
        setError(json.message ?? "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
        <div>
          <h2 className="text-title font-extrabold text-primary">{tx.form.title}</h2>
          <p className="mt-3 max-w-[48ch] text-[16px] text-muted-foreground">{tx.form.subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Honeypot field — Web3Forms uses this to silently reject bot submissions */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />

        <Field label={tx.form.fields.name} name="name" autoComplete="name" required />
        <Field label={tx.form.fields.company} name="company" autoComplete="organization" required />
        <Field label={tx.form.fields.country} name="country" autoComplete="country-name" required />
        <Field
          label={tx.form.fields.email}
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Field label={tx.form.fields.phone} name="phone" type="tel" autoComplete="tel" />

        {/* Service — radio pills instead of a dropdown: five short options
            are faster to scan and tap than to open a select for. Same
            `service` field name and values, so submissions are unchanged. */}
        <fieldset className="md:col-span-2">
          <legend className="mb-3 block font-display text-[14px] font-semibold text-primary">
            {tx.form.services.label}
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {tx.form.services.options.map((opt: string, i: number) => (
              <label key={opt} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="service"
                  value={opt}
                  defaultChecked={i === 0}
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                />
                <span className="flex h-11 items-center gap-2 rounded-full border-[1.5px] border-border bg-surface px-4 font-display text-[14px] font-medium text-primary/80 transition-all duration-300 hover:border-primary/30 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent [&>svg]:hidden peer-checked:[&>svg]:block">
                  <Check size={14} strokeWidth={3} className="text-accent" />
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="md:col-span-2">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <label
              htmlFor="message"
              className="block font-display text-[14px] font-semibold text-primary"
            >
              {tx.form.fields.message} <span className="text-accent-text">*</span>
            </label>
            {/* Colour set inline: in the browser a swapped Tailwind colour
                class kept computing the previous value, while driving the
                custom property directly is unambiguous. */}
            <span
              aria-hidden="true"
              className="text-[12px] font-semibold tabular-nums transition-colors duration-200"
              style={{
                color:
                  messageLength > MESSAGE_MAX * 0.9
                    ? "var(--color-accent-text)"
                    : "color-mix(in oklab, var(--color-muted-foreground) 70%, transparent)",
              }}
            >
              {messageLength} / {MESSAGE_MAX}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={MESSAGE_MAX}
            onChange={(event) => setMessageLength(event.currentTarget.value.length)}
            className="field field-input resize-none py-4"
            placeholder={tx.form.fields.messagePlaceholder}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="md:col-span-2 rounded-[14px] border border-destructive/25 bg-destructive/[0.05] px-4 py-3 text-[14px] font-medium text-destructive"
          >
            {error}
          </p>
        )}

        <div className="flex justify-end border-t border-border pt-6 md:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full !min-h-14 !px-9 !text-[16px] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {submitting ? tx.form.sending : tx.form.submit}
            <Send size={17} />
          </button>
        </div>
      </form>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-display text-[14px] font-semibold text-primary"
      >
        {label} {required && <span className="text-accent-text">*</span>}
      </label>
      {/* `field-input` hooks up the :user-invalid styling in styles.css —
          the field only turns red once the visitor has actually touched it. */}
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="field field-input"
      />
    </div>
  );
}
