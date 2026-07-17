import { Link } from "@tanstack/react-router";
import { useState } from "react";
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
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-display font-bold text-sm">
            JU
          </div>
          <span className="font-display font-bold text-primary tracking-tight">
            JU FAIR <span className="text-accent">GLOBAL</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors relative
                         after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent after:rounded-full
                         after:transition-[width] after:duration-300 hover:after:w-full"
              activeProps={{
                className:
                  "text-primary font-semibold after:w-full after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:rounded-full",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/partner" className="hidden lg:inline-flex btn-primary">
          Become Partner
        </Link>
        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container-x py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-foreground"
                activeProps={{ className: "text-primary font-semibold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/partner" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Become Partner
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
