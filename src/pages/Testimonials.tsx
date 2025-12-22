import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LazyImage } from "@/components/ui/LazyImage";
import Animation from "@/components/ui/Animation";
import ourstory from "../components/assets/ourstory.jpeg";
import { useState } from "react";
import { Play, X } from "lucide-react";
import video1 from "@/components/assets/testimonials/video1.mp4";
import video2 from "@/components/assets/testimonials/video2.mp4";
import video3 from "@/components/assets/testimonials/video3.mp4";

// Testimonial images
import img1 from "../components/assets/testimonials/img1.PNG";
import img2 from "../components/assets/testimonials/img2.PNG";
import img3 from "../components/assets/testimonials/img3.PNG";
import img4 from "../components/assets/testimonials/img4.PNG";
import img5 from "../components/assets/testimonials/img5.PNG";
import img6 from "../components/assets/testimonials/img6.PNG";
import img7 from "../components/assets/testimonials/img7.PNG";
import img8 from "../components/assets/testimonials/img8.PNG";
import img9 from "../components/assets/testimonials/img9.PNG";

const testimonialImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const videoTestimonials = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
    videoUrl: video1,
    title: "Bana & Tareq",
    event: "Wedding Celebration",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
    videoUrl: video2,
    title: "Rifai Family",
    event: "Wedding Celebration",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop",
    videoUrl: video3,
    title: "Zainab's Family",
    event: "Wedding Celebration",
  },
];

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
      "Working with Connecting the Dots was an absolute Outstanding. Their creativity and attention to detail was perfect.",
    author: "The Talha Family",
    event: "1st Anniversary Celebration",
  },
];

const Testimonials = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <LazyImage
            src={ourstory}
            alt="Elegant event design"
            className="w-full h-full object-cover object-center"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-foreground/20" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16">
          <p className="animate-fade-in text-primary-foreground/80 font-sans text-xs tracking-[0.3em] uppercase mb-4">
            Testimonials
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground animate-fade-in-delay-1">
            Our Client's Say
          </h1>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Watch & Listen
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              Video Testimonials
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTestimonials.map((video) => (
              <AnimatedSection
                key={video.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <div
                  className="relative aspect-video overflow-hidden"
                  onClick={() => setActiveVideo(video.videoUrl)}
                >
                  <LazyImage
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-foreground/40 transition-opacity duration-500 group-hover:bg-foreground/60" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary">
                      <Play
                        className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
                  <h3 className="font-serif text-xl text-primary-foreground mb-1">
                    {video.title}
                  </h3>
                  <p className="font-sans text-xs tracking-wide text-primary-foreground/70">
                    {video.event}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Testimonial Images Gallery */}
          <AnimatedSection className="mt-20">
            <div className="text-center mb-12">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Real Feedback
              </p>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground">
                Screenshot Testimonials
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonialImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                >
                  <LazyImage
                    src={image}
                    alt={`Client testimonial ${index + 1}`}
                    className="w-full h-auto object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    containerClassName="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-primary-foreground hover:bg-background/20 transition-colors duration-300"
            onClick={() => setActiveVideo(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Container */}
          <div
            className="mx-4 animate-scale-in flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideo}
              controls
              autoPlay
              className="
          max-h-[80vh]
          w-auto
          max-w-[420px]
          rounded-lg
          shadow-2xl
          object-contain
        "
            />
          </div>
        </div>
      )}

      {/* Written Testimonials Section */}
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
