import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
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
            Connecting global buyers with real trade opportunities through world-class exhibitions
            and matchmaking services.
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
            Company
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/about" className="hover:text-accent transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-accent transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link to="/experience" className="hover:text-accent transition-colors">
                Experience
              </Link>
            </li>
            <li>
              <Link to="/partner" className="hover:text-accent transition-colors">
                Partner
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            Support
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            Contact Info
          </h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin size={16} className="shrink-0 mt-0.5 text-accent" /> 1234 Trade Ave, Business
              City
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="shrink-0 mt-0.5 text-accent" /> +1 (555) 123-4567
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="shrink-0 mt-0.5 text-accent" /> info@jufairglobal.com
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/60 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} JU Fair Global. All rights reserved.</span>
          <span>Crafted with precision for international business.</span>
        </div>
      </div>
    </footer>
  );
}
