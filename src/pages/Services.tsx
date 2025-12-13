import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ourservicesimg from "../components/assets/ourservices.jpeg";

const services = [
  {
    title: "Full-Service Planning",
    subtitle: "Complete Event Management",
    description: "From the initial concept to the final farewell, we handle every aspect of your event. Our comprehensive planning service includes vendor coordination, timeline management, budget oversight, and on-site execution—allowing you to fully enjoy your celebration.",
    features: ["Venue selection & booking", "Vendor sourcing & management", "Budget planning & tracking", "Timeline coordination", "Day-of execution"],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    reverse: false,
  },
  {
    title: "Event Management",
    subtitle: "Seamless Coordination",
    description: "Already have your vision planned but need expert hands to bring it together? Our event management service ensures flawless execution on the day of your event. We coordinate vendors, manage timelines, and handle any unexpected challenges.",
    features: ["Vendor coordination", "Timeline management", "Guest management", "On-site troubleshooting", "Post-event wrap-up"],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    reverse: true,
  },
  {
    title: "Design & Styling",
    subtitle: "Visual Storytelling",
    description: "Transform your space into an immersive experience. Our design team creates cohesive visual narratives through thoughtful color palettes, textures, lighting, and bespoke details that reflect your unique style and story.",
    features: ["Concept development", "Color & theme design", "Floral & decor styling", "Tablescape design", "Lighting design"],
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070&auto=format&fit=crop",
    reverse: false,
  },
];

const processSteps = [
  { step: "01", title: "Discovery", description: "We begin with an in-depth consultation to understand your vision, preferences, and goals." },
  { step: "02", title: "Design", description: "Our team develops a comprehensive concept, including mood boards, layouts, and vendor recommendations." },
  { step: "03", title: "Planning", description: "We handle all logistics, contracts, and coordination to bring your vision to life." },
  { step: "04", title: "Execution", description: "On the day, we manage every detail so you can be fully present in your celebration." },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={ourservicesimg}
            alt="Elegant event setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-foreground/20" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16">
          <p className="animate-fade-in text-primary-foreground/80 font-sans text-xs tracking-[0.3em] uppercase mb-4">
            What We Do
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground animate-fade-in-delay-1">
            Our Services
          </h1>
        </div>
      </section>

      {/* Services List */}
      {services.map((service, index) => (
        <section key={service.title} className={`py-24 lg:py-32 ${index % 2 === 0 ? 'bg-background' : 'bg-secondary'}`}>
          <div className="container mx-auto px-6 lg:px-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${service.reverse ? 'lg:flex-row-reverse' : ''}`}>
              <AnimatedSection animation={service.reverse ? "slide-right" : "slide-left"} className={service.reverse ? "lg:order-2" : ""}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full aspect-[4/5] object-cover"
                />
              </AnimatedSection>
              <AnimatedSection animation={service.reverse ? "slide-left" : "slide-right"} delay={200} className={service.reverse ? "lg:order-1" : ""}>
                <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  {service.subtitle}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                  {service.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground text-sm">
                      <span className="w-1.5 h-1.5 bg-soft-sienna rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              How We Work
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              Our Process
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 150}>
                <div className="text-center">
                  <span className="font-serif text-5xl text-soft-sienna/50 mb-4 block">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-2xl text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop"
            alt="Celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
              Ready to Begin?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-10">
              Let's discuss your vision and create something truly unforgettable together.
            </p>
            <Link
              to="/inquire"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-foreground text-foreground font-sans text-xs tracking-[0.2em] uppercase hover:bg-primary-foreground/90 transition-all duration-300"
            >
              Start Your Journey
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
