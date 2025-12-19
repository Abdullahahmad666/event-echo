import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Animation from "@/components/ui/Animation";
import ourstory from "../components/assets/ourstory.jpeg";
import { useState } from "react";
import { Play, X } from "lucide-react";
import video1 from "@/components/assets/testimonials/video1.mp4";
import video2 from "@/components/assets/testimonials/video2.mp4";
import video3 from "@/components/assets/testimonials/video3.mp4";


const videoTestimonials = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
    videoUrl: video1,
    title: "Sarah & James",
    event: "Wedding Celebration",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
    videoUrl: video2,
    title: "The Martinez Family",
    event: "Wedding Celebration",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop",
    videoUrl: video3,
    title: "Emily & David",
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
      "Working with Connecting the Dots was an absolute Outstanding. Their creativity and attention to detail exceeded all our expectations.",
    author: "The Talha Family",
    event: "1st Anniversary Celebration",
  },
];

const Testimonials = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={ourstory}
            alt="Elegant event design"
            className="w-full h-full object-cover"
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
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/40 transition-opacity duration-500 group-hover:bg-foreground/60" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary">
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" />
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
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-primary-foreground hover:bg-background/20 transition-colors duration-300"
            onClick={() => setActiveVideo(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="w-full max-w-4xl mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full rounded-lg shadow-2xl"
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