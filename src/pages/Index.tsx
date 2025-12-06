import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { PreviewSection } from "@/components/sections/PreviewSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <IntroSection />
      <PreviewSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;