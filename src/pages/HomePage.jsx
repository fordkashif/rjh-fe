import AboutSection from "../components/sections/AboutSection";
import FacilitiesSection from "../components/sections/FacilitiesSection";
import HeroSection from "../components/sections/HeroSection";
import InstagramSection from "../components/sections/InstagramSection";
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
      <TestimonialsSection />
      <RoomsSection />
      <FacilitiesSection />
      <VideoSection />
      <InstagramSection />
    </main>
  );
}

export default HomePage;
