import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Animation from "@/components/ui/Animation";

const testimonials = [
  {
    quote:
      "They transformed our vision into a breathtaking reality. Every detail was perfect, and our guests are still talking about it months later.",
    author: "Sarah & Michael",
    event: "Wedding at The Grand Estate",
  },
  {
    quote:
      "Working with Connecting the Dots was an absolute dream. Their creativity and attention to detail exceeded all our expectations.",
    author: "The Anderson Family",
    event: "50th Anniversary Celebration",
  },
  {
    quote:
      "Working with Connecting the Dots was an absolute Outstanding. Their creativity and attention to detail exceeded all our expectations.",
    author: "The Talha Family",
    event: "1st Anniversary Celebration",
  },
];

const Testimonials= () =>  {
  return (
    <Layout>
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Heading */}
        <AnimatedSection className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Kind Words
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            What Our Clients Say
          </h2>
        </AnimatedSection>

        {/* Continuous marquee animation */}
        <Animation duration={25}>
          <div className="flex items-center gap-24 whitespace-nowrap">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="inline-block w-[350px] shrink-0 text-center whitespace-normal"
              >
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
              </div>
            ))}

            {/* Duplicate for infinite scrolling */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`dup-${index}`}
                className="inline-block w-[350px] shrink-0 text-center whitespace-normal"
              >
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
              </div>
            ))}
          </div>
        </Animation>
      </div>
    </section>
    </Layout>
  );
};
export default Testimonials;