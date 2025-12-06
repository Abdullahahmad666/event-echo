import { AnimatedSection } from "../ui/AnimatedSection";

export function IntroSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Our Philosophy
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-relaxed">
              We believe every celebration deserves to be{" "}
              <em className="text-soft-sienna">extraordinary</em>. Our approach combines
              creative vision with meticulous planning to bring your dreams to life.
            </h2>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
