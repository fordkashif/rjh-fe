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
      <AboutSection />
      <RoomsSection />
      <FacilitiesSection />
      <PropertyGallerySection
        sectionClassName="relative react-home-gallery-section"
        subtitle="Photo Gallery"
        title="A Closer Look At Royale Jazz Hotel"
        text="Walk through the atmosphere before you book, from arrival moments and shared spaces to the details that shape the stay."
        variant="home"
      />
      <VideoSection />
      <TestimonialsSection />
    </main>
  );
}

export default HomePage;
