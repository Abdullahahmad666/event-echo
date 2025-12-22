import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LazyImage } from "@/components/ui/LazyImage";
import { ArrowLeft, ArrowRight } from "lucide-react";
import img12 from "@/components/assets/mehendi/img12.jpg"
import img1 from "@/components/assets/mehendi/img1.jpg"
import img2 from "@/components/assets/mehendi/img2.jpg"
import img3 from "@/components/assets/mehendi/mehendi1.jpg"
import img4 from "@/components/assets/mehendi/mehendi2.jpg"
import img6 from "@/components/assets/mehendi/img6.jpg"
import img7 from "@/components/assets/mehendi/img7.jpg"
import img8 from "@/components/assets/mehendi/img8.jpg"
import img9 from "@/components/assets/mehendi/img9.jpg"
import bimg1 from "@/components/assets/barat/img5.jpg"
import bimg2 from "@/components/assets/barat/img3.jpg"
import bimg3 from "@/components/assets/barat/img4.jpg"
import portfolio from "@/components/assets/portfolio.jpeg";
import bimg7 from "@/components/assets/barat/img7.jpg"
import wimg1 from "@/components/assets/walima/img14.jpg"
import wimg2 from "@/components/assets/walima/img2.jpg"
import wimg3 from "@/components/assets/walima/img3.jpg"
import wimg4 from "@/components/assets/walima/img4.jpg"
import wimg5 from "@/components/assets/walima/img5.jpg"
import wimg6 from "@/components/assets/walima/img6.jpg"
import wimg7 from "@/components/assets/walima/img7.jpg"
import wimg8 from "@/components/assets/walima/img8.jpg"
import wimg9 from "@/components/assets/walima/img9.jpg"
import wimg10 from "@/components/assets/walima/img10.jpg"
import wimg11 from "@/components/assets/walima/img11.jpg"
import wimg12 from "@/components/assets/walima/img12.jpg"
import wimg13 from "@/components/assets/walima/img13.jpg"
import wimg14 from "@/components/assets/walima/img15.jpg"





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
    title: "Mehendi/Mayo/Dholki",
    location: "Milton Ontario, Canada",
    date: "Spring 2024",
    category: "Wedding",
    description: "A vibrant pre-wedding celebration filled with lush florals, warm lights, and joyful rhythms. The family envisioned a Mehendi and Dholki that felt intimate yet festive, where every corner reflected color, tradition, and moments of togetherness wrapped in music and laughter.",
    heroImage: img12,
    galleryImages: [
      img12,
      img1,
      img2,
      img3,
      img4,
      img6,
      img7,
      img8,
      img9,
    ],
  },
  "modern-gala-evening": {
    title: "Nikkah Ceremony",
    location: "Milton Ontario, Canada",
    date: "Winter 2024",
    category: "Wedding",
    description: "An intimate Nikkah ceremony defined by timeless elegance and spiritual serenity. Soft florals, gentle lighting, and thoughtful details created a sacred atmosphere, where tradition and beauty came together to honor a meaningful union.",
    heroImage: bimg1,
    galleryImages: [
      bimg1,
      bimg2,
      bimg3,
      portfolio,
      bimg7,
     
    ],
  },
  
  "coastal-retreat-wedding": {
    title: "Wedding/Baraat Ceremony",
    location: "Milton Ontario, Canada",
    date: "Summer 2025",
    category: "Wedding",
    description: "A grand wedding celebration marked by the energy of the Baraat and the joy of togetherness. Rich florals, glowing lights, and traditional details set the stage as family and friends gathered to celebrate a union filled with love, heritage, and unforgettable moments.",
    heroImage: wimg1,
    galleryImages: [
      wimg1,
      wimg2,
      wimg3,
      wimg4,
      wimg5,
      wimg6,
      wimg7,
      wimg8,
      wimg9,
      wimg10,
      wimg11,
      wimg12,
      wimg13,
      wimg14,
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
      <section className="relative h-[50vh] md:h-[70vh] min-h-[350px] md:min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <LazyImage
            src={project.heroImage}
            alt={project.title}
            containerClassName="absolute inset-0 w-full h-full"
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
                  <LazyImage
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    containerClassName="absolute inset-0 w-full h-full"
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
