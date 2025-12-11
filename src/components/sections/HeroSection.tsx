import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
          alt="Elegant wedding reception with floral arrangements"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="animate-fade-in text-primary-foreground/90 font-sans text-xs tracking-[0.3em] uppercase mb-6">
          Luxury Event Planning
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[1.1] tracking-wide animate-fade-in-delay-1">
          Connecting Moments
          <br />
          <em className="font-light">Into Memories</em>
        </h1>
        <p className="mt-8 text-primary-foreground/80 font-sans text-base md:text-lg max-w-xl mx-auto animate-fade-in-delay-2">
          We craft bespoke celebrations that reflect your unique story with timeless elegance and impeccable detail.
        </p>
        <Link
          to="/inquire"
          className="inline-flex items-center gap-3 mt-10 px-8 py-4 border border-primary-foreground/60 text-primary-foreground font-sans text-xs tracking-[0.2em] uppercase hover:bg-primary-foreground hover:text-foreground transition-all duration-300 animate-fade-in-delay-3"
        >
          Start Planning
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-16 bg-primary-foreground/40" />
      </div>
    </section>
  );
}
