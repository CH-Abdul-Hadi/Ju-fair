import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-white text-primary grid place-items-center font-display font-bold text-sm">
              JU
            </div>
            <span className="font-display font-bold">
              JU FAIR <span className="text-accent">GLOBAL</span>
            </span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            Connecting global buyers with real trade opportunities through world-class exhibitions
            and matchmaking services.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Twitter, Linkedin, Instagram].map((I, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent grid place-items-center transition-colors"
                aria-label="social"
              >
                <I size={16} />
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
              <Link to="/about" className="hover:text-accent">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-accent">
                Services
              </Link>
            </li>
            <li>
              <Link to="/experience" className="hover:text-accent">
                Experience
              </Link>
            </li>
            <li>
              <Link to="/partner" className="hover:text-accent">
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
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-accent">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent">
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
