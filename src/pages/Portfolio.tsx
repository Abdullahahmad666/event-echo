import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LazyImage } from "@/components/ui/LazyImage";
import { Link } from "react-router-dom";
import img5 from "@/components/assets/mehendi/img5.jpg"
import img6 from "@/components/assets/barat/img5.jpg"
import img9 from "@/components/assets/walima/img9.jpg"

const portfolioItems = [
  {
    id: "romantic-garden-wedding",
    title: "Mehendi/Mayo/Dholki",
    location: "Milton Ontario, Canada",
    date: "Spring 2024",
    category: "Wedding",
    image: img5,
  },
  {
    id: "modern-gala-evening",
    title: "Nikkah Ceremony",
    location: "Milton Ontario, Canada",
    date: "Winter 2024",
    category: "Wedding",
    image: img6,
  },
  {
    id: "coastal-retreat-wedding",
    title: "Wedding/Baraat Ceremony",
    location: "Milton Ontario, Canada",
    date: "Summer 2023",
    category: "Wedding",
    image: img9,
  },
  
];

const Portfolio = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <LazyImage
            src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop"
            alt="Portfolio showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-foreground/20" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16">
          <p className="animate-fade-in text-primary-foreground/80 font-sans text-xs tracking-[0.3em] uppercase mb-4">
            Our Work
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground animate-fade-in-delay-1">
            Portfolio
          </h1>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Each event we design is a unique reflection of our clients' stories. Explore our collection of celebrations, from intimate gatherings to grand affairs.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {portfolioItems.map((item, index) => (
              <AnimatedSection key={item.id} delay={index * 100} animation="scale-in">
                <Link to={`/portfolio/${item.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans text-xs tracking-[0.2em] uppercase text-primary-foreground border border-primary-foreground px-6 py-3">
                        View Project
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    {item.category} · {item.date}
                  </p>
                  <h3 className="font-serif text-xl lg:text-2xl text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.location}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Let's Create Your Story
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Ready to see your celebration featured in our portfolio? We'd love to hear about your vision.
            </p>
            <Link
              to="/inquire"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-sans text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-300"
            >
              Start Planning
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
