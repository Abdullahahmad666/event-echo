import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowLeft, ArrowRight } from "lucide-react";

const portfolioData: Record<string, {
  title: string;
  location: string;
  date: string;
  category: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
}> = {
  "romantic-garden-wedding": {
    title: "Romantic Garden Wedding",
    location: "Malibu, California",
    date: "Spring 2024",
    category: "Wedding",
    description: "A breathtaking garden celebration filled with soft blooms, candlelight, and intimate moments. The couple wanted their wedding to feel like stepping into a secret garden, where every corner revealed a new romantic vignette.",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  "modern-gala-evening": {
    title: "Modern Gala Evening",
    location: "Los Angeles, California",
    date: "Winter 2024",
    category: "Corporate",
    description: "An elegant black-tie gala that seamlessly blended corporate sophistication with artistic flair. The evening featured dramatic lighting, contemporary installations, and impeccable attention to every guest experience.",
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  "intimate-anniversary": {
    title: "Intimate Anniversary",
    location: "Santa Barbara, California",
    date: "Fall 2023",
    category: "Celebration",
    description: "A golden anniversary celebration that honored fifty years of love. The intimate gathering brought together three generations of family in a warm, candlelit setting filled with personal touches and cherished memories.",
    heroImage: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  "coastal-retreat-wedding": {
    title: "Coastal Retreat Wedding",
    location: "Big Sur, California",
    date: "Summer 2023",
    category: "Wedding",
    description: "Perched on dramatic cliffs overlooking the Pacific, this wedding embraced the raw beauty of Big Sur. Natural elements, wind-swept florals, and a sense of wild romance defined this unforgettable celebration.",
    heroImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  "enchanted-forest-celebration": {
    title: "Enchanted Forest Celebration",
    location: "Napa Valley, California",
    date: "Spring 2023",
    category: "Birthday",
    description: "A milestone birthday transformed into a magical woodland experience. Guests wandered through candlelit paths, discovered hidden lounges, and celebrated under a canopy of twinkling lights and lush greenery.",
    heroImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
    ],
  },
  "urban-rooftop-soiree": {
    title: "Urban Rooftop Soirée",
    location: "San Francisco, California",
    date: "Fall 2023",
    category: "Corporate",
    description: "A sophisticated corporate celebration with sweeping city views. Modern design met warm hospitality as guests mingled under the stars, surrounded by sleek furniture, ambient lighting, and impeccable service.",
    heroImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop",
    ],
  },
};

const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? portfolioData[id] : null;

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl text-foreground mb-4">Project Not Found</h1>
            <Link to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
              Return to Portfolio
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[70vh] min-h-[600px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary-foreground/80 font-sans text-xs tracking-[0.15em] uppercase mb-6 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
          <p className="animate-fade-in text-primary-foreground/80 font-sans text-xs tracking-[0.3em] uppercase mb-4">
            {project.category} · {project.date}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground animate-fade-in-delay-1 mb-2">
            {project.title}
          </h1>
          <p className="text-primary-foreground/80 animate-fade-in-delay-2">{project.location}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed">
              {project.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-24 lg:pb-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {project.galleryImages.map((image, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                animation="fade-in"
                className={index === 0 ? "md:col-span-2" : ""}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
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
              Inspired by What You See?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Let's create something equally beautiful for your special celebration.
            </p>
            <Link
              to="/inquire"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-sans text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-300"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioDetail;
