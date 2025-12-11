import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "../ui/AnimatedSection";
import about from "../assets/about.jpeg";
import services from "../assets/services.jpeg";
import portfolio from "../assets/portfolio.jpeg";

const previews = [
  {
    title: "About",
    subtitle: "Our Story",
    description: "Discover the passion and expertise behind every event we create.",
    image: about,
    href: "/about",
  },
  {
    title: "Services",
    subtitle: "What We Do",
    description: "From intimate gatherings to grand celebrations, we offer complete event solutions.",
    image: services,
    href: "/services",
  },
  {
    title: "Portfolio",
    subtitle: "Our Work",
    description: "Explore our collection of beautifully crafted events and celebrations.",
    image: portfolio,
    href: "/portfolio",
  },
];

export function PreviewSection() {
  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {previews.map((preview, index) => (
            <AnimatedSection key={preview.title} delay={index * 150}>
              <Link to={preview.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src={preview.image}
                    alt={preview.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-300" />
                </div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  {preview.subtitle}
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-3">
                  {preview.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {preview.description}
                </p>
                <span className="inline-flex items-center gap-2 text-foreground font-sans text-xs tracking-[0.15em] uppercase group-hover:gap-3 transition-all duration-300">
                  Explore
                  <ArrowRight size={14} />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
