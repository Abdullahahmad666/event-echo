import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "../ui/AnimatedSection";

export function CTASection() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop"
          alt="Elegant event setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-relaxed max-w-3xl mx-auto">
            Ready to Create Something <em>Extraordinary</em>?
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <p className="mt-6 text-primary-foreground/80 font-sans text-base md:text-lg max-w-xl mx-auto">
            Let's discuss your vision and bring your dream celebration to life.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={400}>
          <Link
            to="/inquire"
            className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-primary-foreground text-foreground font-sans text-xs tracking-[0.2em] uppercase hover:bg-primary-foreground/90 transition-all duration-300"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
