import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Linkedin,
  Instagram,
  MessageCircle,
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
        subtitle="We respond to all partnership and recruitment inquiries within one business day."
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
                      <h3 className="text-[28px] font-bold text-primary mb-3">Message Sent!</h3>
                      <p className="text-[16px] text-muted-foreground leading-[1.6] mb-8">
                        Thank you for contacting JU Fair Global. Our international trade team will review
                        your message and get back to you within one business day.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Link to="/services" className="btn-outline">
                          Our Services
                        </Link>
                        <Link to="/" className="btn-primary">
                          Back Home
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-[32px] font-bold text-primary mb-2">Send us a message</h2>
                      <p className="text-muted-foreground mb-8 text-[16px]">Fill out the form below and our partnership team will reach out to you.</p>
                      
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setSent(true);
                        }}
                        className="grid gap-6 md:grid-cols-2"
                      >
                        <Field label="Full Name"    name="name"    required />
                        <Field label="Business Email"   name="email"   type="email" required />
                        <Field label="Company Name" name="company" />
                        <Field label="Phone Number"   name="phone" />
                        
                        <div className="md:col-span-2 mt-2">
                          <label htmlFor="message" className="block text-[14px] font-bold text-primary mb-2">
                            How can we help? <span className="text-accent">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            className="w-full rounded-[12px] border-2 border-border/80 bg-background px-4 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-none"
                            placeholder="Tell us about your exhibition or buyer recruitment needs..."
                          />
                        </div>
                        
                        <div className="md:col-span-2 mt-4">
                          <button type="submit" className="btn-primary w-full md:w-auto !h-14 !px-10 !text-[16px] cursor-pointer group">
                            <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /> 
                            Send Message
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </ScrollReveal>

              {/* Map Card */}
              <ScrollReveal direction="up" delay={200}>
                <div className="card-elevated p-2 overflow-hidden bg-white border-none shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
                  <iframe
                    title="Office location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.96%2C40.75&layer=mapnik"
                    className="w-full h-80 rounded-[12px] border-0"
                    loading="lazy"
                  />
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
                  <h3 className="font-bold text-[20px] text-white mb-6 relative z-10">Contact Info</h3>
                  <ul className="space-y-6 text-[15px] text-white/80 relative z-10">
                    <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center shrink-0">
                        <MapPin size={18} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Global Headquarters</div>
                        1234 Trade Ave, Business City, 10001
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center shrink-0">
                        <Phone size={18} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Phone</div>
                        +1 (555) 123-4567
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center shrink-0">
                        <Mail size={18} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Email Support</div>
                        info@jufairglobal.com
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={200}>
                <div className="card-elevated bg-white border-none shadow-sm p-8 text-center">
                  <h3 className="font-bold text-[18px] text-primary mb-5">Connect With Us</h3>
                  <div className="flex justify-center gap-4">
                    {[
                      { icon: Facebook, href: "https://www.facebook.com/share/1BdSxmw4wg/" },
                      { icon: Instagram, href: "https://www.instagram.com/jufair_global?igsh=cmhnNHV1Y3RtajZm" },
                      { icon: Linkedin, href: "https://www.linkedin.com/company/ju-global-private-limited/" },
                      { icon: MessageCircle, href: "https://wa.me/8618916909892" },
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
