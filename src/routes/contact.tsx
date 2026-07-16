import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle2,
} from "lucide-react";

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
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="We respond within one business day."
      />

      <section className="section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2 card-elevated">
            {sent ? (
              <div className="py-6 text-center max-w-md mx-auto animate-fade-in">
                <div className="w-16 h-16 bg-accent/15 text-accent rounded-full grid place-items-center mx-auto mb-4 border border-accent/35">
                  <CheckCircle2 size={36} className="animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Thank you for contacting JU Fair Global. Our international trade team will review
                  your message and get back to you within one business day.
                </p>
                <div className="flex justify-center gap-3">
                  <Link to="/services" className="btn-outline py-2 px-4 text-xs font-semibold">
                    Our Services
                  </Link>
                  <Link to="/" className="btn-primary py-2 px-4 text-xs font-semibold">
                    Back Home
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-primary mb-6">Send us a message</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="grid gap-4 md:grid-cols-2"
                >
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Company" name="company" />
                  <Field label="Phone" name="phone" />
                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="btn-primary cursor-pointer">
                      <Send size={16} /> Send Message
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="card-elevated">
              <h3 className="font-semibold text-primary mb-4">Contact Info</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                  1234 Trade Ave, Business City, 10001
                </li>
                <li className="flex gap-3">
                  <Phone size={18} className="text-accent shrink-0 mt-0.5" />
                  +1 (555) 123-4567
                </li>
                <li className="flex gap-3">
                  <Mail size={18} className="text-accent shrink-0 mt-0.5" />
                  info@jufairglobal.com
                </li>
              </ul>
            </div>
            <div className="card-elevated">
              <h3 className="font-semibold text-primary mb-4">Social Media</h3>
              <div className="flex gap-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((I, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social"
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center hover:bg-accent transition-colors"
                  >
                    <I size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="container-x mt-12">
          <div className="card-elevated p-0 overflow-hidden">
            <iframe
              title="Office location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.96%2C40.75&layer=mapnik"
              className="w-full h-96 border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
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
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
