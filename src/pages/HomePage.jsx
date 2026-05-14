import AboutSection from "../components/sections/AboutSection";
import FacilitiesSection from "../components/sections/FacilitiesSection";
import HeroSection from "../components/sections/HeroSection";
import PropertyGallerySection from "../components/sections/PropertyGallerySection";
import ReservationBar from "../components/sections/ReservationBar";
import RoomsSection from "../components/sections/RoomsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import VideoSection from "../components/sections/VideoSection";

function HomePage() {
  return (
    <main className="no-bottom no-top" id="content">
      <div id="top" />
      <HeroSection />
      <ReservationBar />
      <PropertyGallerySection
        sectionClassName="relative react-home-gallery-section"
        variant="home"
      />
      <AboutSection />
      <RoomsSection />
      <FacilitiesSection />
      <VideoSection />
      <TestimonialsSection />
    </main>
  );
}

export default HomePage;
