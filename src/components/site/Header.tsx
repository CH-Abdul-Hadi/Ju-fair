import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/experience", label: "Experience" },
  { to: "/global-network", label: "Global Network" },
  { to: "/partner", label: "Partner" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler(); // Initialize
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isTransparent = !scrolled && !open;

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isTransparent
          ? "h-[80px] bg-transparent"
          : "h-[72px] bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,.08)] border-b border-border",
      ].join(" ")}
    >
      <div className="container-x flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-lg grid place-items-center font-display font-bold text-sm transition-colors ${isTransparent ? "bg-white text-primary" : "bg-primary text-white"
              }`}
          >
            JU
          </div>
          <span
            className={`font-display font-bold tracking-tight transition-colors ${isTransparent ? "text-white" : "text-primary"
              }`}
          >
            JU FAIR <span className="text-accent">GLOBAL</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm font-medium transition-colors relative
                         after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent after:rounded-full
                         after:transition-[width] after:duration-300 hover:after:w-full ${isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-foreground hover:text-primary"
                }`}
              activeProps={{
                className: `font-semibold after:w-full after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:rounded-full ${isTransparent ? "text-white" : "text-primary"
                  }`,
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/partner" className="btn-primary ml-1">
            Become Partner
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 transition-colors ${isTransparent ? "text-white" : "text-primary"
            }`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-border shadow-lg">
          <div className="container-x py-4 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-[16px] font-medium text-foreground border-b border-border/50 last:border-0"
                activeProps={{ className: "text-primary font-semibold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-6">
              <Link
                to="/partner"
                onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Become Partner
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
