import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LazyImage } from "@/components/ui/LazyImage";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import about from "../components/assets/aboutus1.jpeg";
import ourstory from "../components/assets/ourstory.jpeg";
import aboutpage from "../components/assets/about.jpeg";

const teamMembers = [
  {
    name: "Samina Hashmi",
    title: "Founder & Creative Director",
    bio: "A proud mother of four and a blessed grandmother, Samina holds a Master’s degree in Public Administration and brings over a decade of experience in wedding decoration and event planning. With a refined aesthetic and a heartfelt attention to detail, Samina believes every event tells a story. Energetic, passionate, and purpose-driven, she transforms ideas into beautifully curated moments that reflect each client’s unique journey. Deeply grateful for every blessing, she continues to serve with sincerity and vision — Alhamdulillah.",
    image: about,
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[60vh] min-h-[350px] md:min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <LazyImage
            src={ourstory}
            alt="Elegant event design"
            containerClassName="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-foreground/20" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16">
          <p className="animate-fade-in text-primary-foreground/80 font-sans text-xs tracking-[0.3em] uppercase mb-4">
            About Us
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground animate-fade-in-delay-1">
            Our Story
          </h1>
        </div>
      </section>


{/* Team Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              The Team
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              Meet the Face Behind the Magic
            </h2>
          </AnimatedSection>

          {teamMembers.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 150}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image – LEFT */}
                <div className="relative aspect-[3/4] overflow-hidden w-full">
                  <LazyImage
                    src={member.image}
                    alt={member.name}
                    containerClassName="absolute inset-0 w-full h-full"
                    className="transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Text – RIGHT */}
                <div>
                  <h3 className="font-serif text-3xl text-foreground mb-2">
                    {member.name}
                  </h3>

                  <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                    {member.title}
                  </p>

                  <p className="text-muted-foreground text-base leading-relaxed max-w-prose">
                    {member.bio}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>


      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              What Guides Us
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                title: "Elegance",
                desc: "Timeless sophistication in every detail we design.",
              },
              {
                title: "Intention",
                desc: "Every choice serves a purpose in your celebration.",
              },
              {
                title: "Excellence",
                desc: "Uncompromising quality from concept to execution.",
              },
            ].map((value, index) => (
              <AnimatedSection
                key={value.title}
                delay={index * 150}
                className="text-center"
              >
                <h3 className="font-serif text-2xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection animation="slide-left">
              <div className="relative aspect-[4/5] overflow-hidden">
                <LazyImage
                  src={aboutpage}
                  alt="Team at work"
                  containerClassName="absolute inset-0 w-full h-full"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-right" delay={200}>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Est. 2012
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 leading-tight">
                Crafting Celebrations with <em>Heart & Soul</em>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Founded with a passion for creating meaningful moments,
                  Elegant Events has grown from a small boutique studio to one
                  of the most sought-after event planning companies in the
                  region.
                </p>
                <p>
                  We believe that every celebration is a reflection of the
                  people it honors. Our approach is deeply personal—we take the
                  time to understand your story, your style, and your vision
                  before bringing it to life with meticulous attention to
                  detail.
                </p>
                <p>
                  From intimate gatherings to grand galas, we treat each event
                  as a unique canvas, blending creativity with flawless
                  execution to create experiences that resonate long after the
                  last guest has departed.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Let's Create Together
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              We'd love to hear about your upcoming celebration and explore how
              we can bring your vision to life.
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

export default About;
