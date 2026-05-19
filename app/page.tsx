import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyDribbleSection } from "@/components/sections/WhyDribbleSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <WhyDribbleSection />
        <TestimonialsSection />
        <EventsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
