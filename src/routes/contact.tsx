import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import {
  Mail,
  MapPin,
  Send,
  Facebook,
  Linkedin,
  Instagram,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon, getWhatsAppLink } from "@/components/site/WhatsAppIcon";
import { ContactMap } from "@/components/site/ContactMap";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — JU Fair Global" },
      {
        name: "description",
        content: "Get in touch with JU Fair Global for buyer recruitment and exhibition services.",
      },
      { property: "og:title", content: "Contact — JU Fair Global" },
      { property: "og:description", content: "Reach our team for global trade opportunities." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const { lang } = useLanguage();
  const tx = t(lang).contact;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={tx.hero.eyebrow}
        title={tx.hero.title}
        subtitle={tx.hero.subtitle}
      />

      <section className="section-pad bg-[#FAFAFA]">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* ─── 70% LEFT COLUMN (FORM + MAP) ─── */}
            <div className="lg:col-span-8 space-y-8">

              {/* Form Card */}
              <ScrollReveal direction="left">
                <div className="card-elevated bg-white border-none shadow-[0_12px_40px_rgba(0,0,0,0.05)] p-8 md:p-12">
                  {sent ? (
                    <div className="py-12 text-center max-w-md mx-auto animate-fade-in">
                      <div className="w-20 h-20 bg-accent/15 text-accent rounded-full grid place-items-center mx-auto mb-6 border border-accent/20">
                        <CheckCircle2 size={40} className="animate-bounce" />
                      </div>
                      <h3 className="text-[28px] font-bold text-primary mb-3">{tx.form.success.title}</h3>
                      <p className="text-[16px] text-muted-foreground leading-[1.6] mb-8">
                        {tx.form.success.desc}
                      </p>
                      <div className="flex justify-center gap-4">
                        <Link to="/services" search={(p) => ({ ...p })} className="btn-outline">
                          {tx.form.success.btnServices}
                        </Link>
                        <Link to="/" search={(p) => ({ ...p })} className="btn-primary">
                          {tx.form.success.btnHome}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <ContactForm tx={tx} onSuccess={() => setSent(true)} />
                  )}
                </div>
              </ScrollReveal>

              {/* Map Card — Dynamic Map Provider (AMap if API key available, Google Maps as fallback) */}
              <ScrollReveal direction="up" delay={200}>
                <div className="card-elevated p-2 overflow-hidden bg-white border-none shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
                  <ContactMap latitude={31.23} longitude={121.47} locationName="JU Fair Global" zoom={15} />
                </div>
              </ScrollReveal>
            </div>

            {/* ─── 30% RIGHT COLUMN (STICKY SIDEBAR) ─── */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">

              <ScrollReveal direction="right" delay={100}>
                <div className="card-elevated bg-primary text-white border-none shadow-[0_12px_30px_rgba(11,61,145,0.15)] p-8 relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                  />
                  <h3 className="font-bold text-[20px] text-white mb-6 relative z-10">{tx.sidebar.contactInfo}</h3>
                  <ul className="space-y-6 text-[15px] text-white/80 relative z-10">
                    <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center shrink-0">
                        <MapPin size={18} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">{tx.sidebar.hq}</div>
                        {tx.sidebar.address}
                      </div>
                    </li>
                    <li>
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="flex gap-4 group hover:opacity-90 transition-opacity cursor-pointer"
                        title="Chat with us on WhatsApp"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                          <WhatsAppIcon size={18} className="text-accent group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1 group-hover:text-accent transition-colors">{tx.sidebar.phone}</div>
                          <span className="text-white/80 group-hover:text-white underline decoration-white/30 underline-offset-4 group-hover:decoration-accent transition-colors">{tx.sidebar.phoneValue}</span>
                        </div>
                      </a>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center shrink-0">
                        <Mail size={18} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">{tx.sidebar.emailSupport}</div>
                        {tx.sidebar.emailValue}
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={200}>
                <div className="card-elevated bg-white border-none shadow-sm p-8 text-center">
                  <h3 className="font-bold text-[18px] text-primary mb-5">{tx.sidebar.connectWith}</h3>
                  <div className="flex justify-center gap-4">
                    {[
                      { icon: Facebook,       href: "https://www.facebook.com/share/1BdSxmw4wg/" },
                      { icon: Instagram,      href: "https://www.instagram.com/jufair_global?igsh=cmhnNHV1Y3RtajZm" },
                      { icon: Linkedin,       href: "https://www.linkedin.com/company/ju-global-private-limited/" },
                      { icon: WhatsAppIcon,   href: getWhatsAppLink() },
                    ].map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="social"
                        className="w-12 h-12 rounded-full bg-surface text-primary grid place-items-center hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      >
                        <s.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

            </div>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tx: any;
  onSuccess: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // API key from .env (VITE_ prefix makes it available in the browser bundle)
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY ?? "");

    // Makes emails easy to identify in Gmail
    formData.append("from_name", "JU Fair Global — Contact Form");
    formData.append("subject",   "New Inquiry via JU Fair Website");

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
      <h2 className="text-[32px] font-bold text-primary mb-2">{tx.form.title}</h2>
      <p className="text-muted-foreground mb-8 text-[16px]">{tx.form.subtitle}</p>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        {/* Honeypot field — Web3Forms uses this to silently reject bot submissions */}
        <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" />

        <Field label={tx.form.fields.name}    name="name"    required />
        <Field label={tx.form.fields.company} name="company" required />
        <Field label={tx.form.fields.country} name="country" required />
        <Field label={tx.form.fields.email}   name="email"   type="email" required />
        <Field label={tx.form.fields.phone}   name="phone" />

        {/* Interested Service Dropdown */}
        <div>
          <label htmlFor="service" className="block text-[14px] font-bold text-primary mb-2">
            {tx.form.services.label}
          </label>
          <select
            id="service"
            name="service"
            className="w-full h-[52px] rounded-[12px] border-2 border-border/80 bg-background px-4 text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230B3D91' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "16px",
            }}
          >
            {tx.form.services.options.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 mt-2">
          <label htmlFor="message" className="block text-[14px] font-bold text-primary mb-2">
            {tx.form.fields.message} <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded-[12px] border-2 border-border/80 bg-background px-4 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-none"
            placeholder={tx.form.fields.messagePlaceholder}
          />
        </div>

        {/* Inline error message */}
        {error && (
          <p className="md:col-span-2 text-red-600 text-[14px] font-medium bg-red-50 border border-red-200 rounded-[10px] px-4 py-3">
            ⚠️ {error}
          </p>
        )}

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full md:w-auto !h-14 !px-10 !text-[16px] cursor-pointer group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
            {submitting ? "Sending…" : tx.form.submit}
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[14px] font-bold text-primary mb-2">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full h-[52px] rounded-[12px] border-2 border-border/80 bg-background px-4 text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
      />
    </div>
  );
}
