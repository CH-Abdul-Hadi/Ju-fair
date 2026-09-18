import { LocalizedLink } from "@/components/site/LocalizedLink";
import { Facebook, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { WhatsAppIcon, getWhatsAppLink } from "@/components/site/WhatsAppIcon";

export function Footer() {
  const { lang } = useLanguage();
  const tx = t(lang).footer;

  // Each link is named after its platform. Eight links all labelled "social"
  // gave screen-reader users an unusable list of identical entries.
  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/share/1BdSxmw4wg/", name: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/jufair_global?igsh=cmhnNHV1Y3RtajZm", name: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/ju-global-private-limited/", name: "LinkedIn" },
    { icon: WhatsAppIcon, href: getWhatsAppLink(), name: "WhatsApp" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="mb-4">
            <img
              src="/logo_dark.png"
              alt="JU Fair Global"
              width={93}
              height={64}
              className="h-16 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            {tx.tagline}
          </p>
          <div className="flex gap-4 mt-7">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent grid place-items-center transition-all duration-200 hover:scale-110"
                aria-label={s.name}
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          {/* h3, not h4. Every page ends with an <h2> section before the
              footer, so <h4> here skipped a level and broke the outline. */}
          <h3 className="text-accent font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            {tx.company}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <LocalizedLink to="/about" className="hover:text-accent transition-colors">
                {tx.links.about}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/services" className="hover:text-accent transition-colors">
                {tx.links.services}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/experience" className="hover:text-accent transition-colors">
                {tx.links.experience}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/partner" className="hover:text-accent transition-colors">
                {tx.links.partner}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-accent font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            {tx.support}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <LocalizedLink to="/contact" className="hover:text-accent transition-colors">
                {tx.links.contact}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/faqs"
               
                className="hover:text-accent transition-colors"
              >
                {tx.links.faqs}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/privacy"
               
                className="hover:text-accent transition-colors"
              >
                {tx.links.privacy}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/terms"
               
                className="hover:text-accent transition-colors"
              >
                {tx.links.terms}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-accent font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            {tx.contactInfo}
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin size={16} className="shrink-0 mt-0.5 text-accent" /> {tx.address}
            </li>
            <li className="flex gap-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent transition-colors cursor-pointer group"
                title="Chat with us on WhatsApp"
              >
                <WhatsAppIcon size={16} className="shrink-0 text-accent group-hover:scale-110 transition-transform" />
                <span>{tx.phone}</span>
              </a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="shrink-0 mt-0.5 text-accent" /> {tx.email}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/60 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {tx.copyright}</span>
          <span>{tx.crafted}</span>
        </div>
      </div>
    </footer>
  );
}
