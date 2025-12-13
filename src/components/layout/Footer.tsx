import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary py-20 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <Link to="/" className="font-serif text-3xl tracking-wider text-foreground">
              Decor by Connecting the Dotss..
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Creating unforgettable celebrations with meticulous attention to detail and timeless elegance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold mb-6 text-foreground">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/about", label: "About Us" },
                {href: "/testimonials", label: "Testimonials" },
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/inquire", label: "Get in Touch" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold mb-6 text-foreground">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:saminatanveer@hotmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Mail size={16} />
                saminatanveer@hotmail.com
              </a>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone size={16} />
                +19052999442
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin size={16} />
                Milton Ontario, Canada
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Instagram size={16} />
                @connectingthedots
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-xs tracking-wide">
            © {new Date().getFullYear()} Decor by Connecting the Dotss.. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
