import { AnimatedSection } from "../ui/AnimatedSection";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.jpeg";

const galleryImages = [
  {
    src: image1,
    alt: "Elegant floral arrangement",
    className: "col-span-2 row-span-2",
  },
  {
    src: image2,
    alt: "Wedding table setting",
    className: "col-span-1",
  },
  {
    src: image3,
    alt: "Outdoor ceremony setup",
    className: "col-span-1",
  },
  {
    src: image4,
    alt: "Celebration decor",
    className: "col-span-1 row-span-2",
  },
  {
    src: image5,
    alt: "Intimate dinner party",
    className: "col-span-2",
  },
  {
    src: image6,
    alt: "Intimate dinner party",
    className: "col-span-2",
  },
];

export function GallerySection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Featured Work
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            A Glimpse of Our Celebrations
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <AnimatedSection
              key={index}
              delay={index * 100}
              animation="scale-in"
              className={image.className}
            >
              <div className="relative h-full min-h-[200px] md:min-h-[250px] overflow-hidden group cursor-pointer">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
