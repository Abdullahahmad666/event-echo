import { AnimatedSection } from "../ui/AnimatedSection";
import Animation from "../ui/Animation";

const testimonials = [
  {
    quote: "They transformed our vision into a breathtaking reality. Every detail was perfect, and our guests are still talking about it months later.",
    author: "Sarah & Michael",
    event: "Wedding at The Grand Estate",
  },
  {
    quote: "Working with Elegant Events was an absolute dream. Their creativity and attention to detail exceeded all our expectations.",
    author: "The Anderson Family",
    event: "50th Anniversary Celebration",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Kind Words
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            What Our Clients Say
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Animation key={index} delay={index * 200}>
              <blockquote className="text-center">
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed italic mb-8">
                  "{testimonial.quote}"
                </p>
                <footer>
                  <cite className="not-italic">
                    <span className="block font-sans text-sm tracking-wide text-foreground font-medium">
                      {testimonial.author}
                    </span>
                    <span className="block font-sans text-xs tracking-wide text-muted-foreground mt-1">
                      {testimonial.event}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </Animation>
          ))}
        </div>
      </div>
    </section>
  );
}
