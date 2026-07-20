import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";

export function Footer() {
  const { lang } = useLanguage();
  const tx = t(lang).footer;

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/share/1BdSxmw4wg/" },
    { icon: Instagram, href: "https://www.instagram.com/jufair_global?igsh=cmhnNHV1Y3RtajZm" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/ju-global-private-limited/" },
    { icon: MessageCircle, href: "https://wa.me/8618916909892" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="mb-4">
            <img
              src="/favicon.png"
              alt="JU Fair Global Logo"
              className="h-16 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            {tx.tagline}
          </p>
          <div className="flex gap-4 mt-7">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent grid place-items-center transition-all duration-200 hover:scale-110"
                aria-label="social"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-accent font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            {tx.company}
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/about" search={(p) => ({ ...p })} className="hover:text-accent transition-colors">
                {tx.links.about}
              </Link>
            </li>
            <li>
              <Link to="/services" search={(p) => ({ ...p })} className="hover:text-accent transition-colors">
                {tx.links.services}
              </Link>
            </li>
            <li>
              <Link to="/experience" search={(p) => ({ ...p })} className="hover:text-accent transition-colors">
                {tx.links.experience}
              </Link>
            </li>
            <li>
              <Link to="/partner" search={(p) => ({ ...p })} className="hover:text-accent transition-colors">
                {tx.links.partner}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            {tx.support}
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/contact" search={(p) => ({ ...p })} className="hover:text-accent transition-colors">
                {tx.links.contact}
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                {tx.links.faqs}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                {tx.links.privacy}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                {tx.links.terms}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            {tx.contactInfo}
          </h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin size={16} className="shrink-0 mt-0.5 text-accent" /> {tx.address}
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="shrink-0 mt-0.5 text-accent" /> {tx.phone}
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
