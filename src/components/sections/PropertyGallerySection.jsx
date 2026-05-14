import { useState } from "react";
import RoomPhotoLightbox from "../RoomPhotoLightbox";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

const PROPERTY_GALLERY_IMAGES = [
  {
    image: "/images/background/testimonials-hotel-exterior.jpg",
    alt: "Royale Jazz Hotel exterior",
  },
  {
    image: "/images/background/interior-page-hero.jpg",
    alt: "Royale Jazz Hotel lobby seating",
  },
  {
    image: "/images/misc/royale-jazz-about-left-square.jpg",
    alt: "Royale Jazz Hotel entrance",
  },
  {
    image: "/images/misc/royale-jazz-about-right-square.jpg",
    alt: "Royale Jazz Hotel hallway",
  },
  {
    image: "/images/misc/royale-jazz-staircase-gallery.jpg",
    alt: "Royale Jazz Hotel staircase",
  },
  {
    image: "/images/features/swimming-pool.jpg",
    alt: "Royale Jazz Hotel swimming pool",
  },
  {
    image: "/images/features/fitness-center.jpg",
    alt: "Royale Jazz Hotel fitness center",
  },
  {
    image: "/images/features/jacuzzi.jpg",
    alt: "Royale Jazz Hotel jacuzzi",
  },
  {
    image: "/images/features/game-room.jpg",
    alt: "Royale Jazz Hotel game room",
  },
  {
    image: "/images/room/comfort-suite-homepage.jpg",
    alt: "Royale Jazz Hotel comfort suite",
  },
  {
    image: "/images/room/double-double-suite/bedroom.jpg",
    alt: "Royale Jazz Hotel double double suite",
  },
];

function PropertyGallerySection({
  sectionClassName = "relative",
  subtitle = "Gallery",
  title = "Inside Royale Jazz Hotel",
  text = "A broader look around the property, from arrival spaces to leisure areas and suites.",
  variant = "about",
}) {
  const { hotel } = usePublicHotelContent();
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const isHomeVariant = variant === "home";

  const openGalleryAtIndex = (index) => {
    setActiveGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <section className={sectionClassName}>
      <div className="container relative z-2">
        {isHomeVariant ? (
          <div className="react-home-floating-gallery" aria-label="Royale Jazz Hotel gallery">
            <div className="react-home-floating-gallery-track">
              {[...PROPERTY_GALLERY_IMAGES, ...PROPERTY_GALLERY_IMAGES].map((image, index) => (
                <button
                  type="button"
                  key={`${image.image}-floating-${index}`}
                  className="react-home-floating-gallery-card"
                  onClick={() => openGalleryAtIndex(index % PROPERTY_GALLERY_IMAGES.length)}
                  aria-label={`Open ${image.alt}`}
                >
                  <img src={image.image} alt={image.alt} className="react-home-floating-gallery-image" />
                </button>
              ))}
            </div>
            <div className="react-home-floating-gallery-fade is-left" />
            <div className="react-home-floating-gallery-fade is-right" />
          </div>
        ) : (
          <div className="react-about-gallery-wrap">
            <div className="react-about-gallery-head text-center">
              <div className="subtitle mb-2">{subtitle}</div>
              <h2 className="mb-3">{title}</h2>
              <p className="mb-0">{text}</p>
            </div>

            <div className="react-about-gallery-grid">
              {PROPERTY_GALLERY_IMAGES.map((image, index) => (
                <button
                  type="button"
                  key={`${image.image}-${index}`}
                  className="react-about-gallery-tile"
                  onClick={() => openGalleryAtIndex(index)}
                  aria-label={`Open gallery photo ${index + 1}`}
                >
                  <img
                    src={image.image}
                    alt={image.alt}
                    className="react-about-gallery-tile-image"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <RoomPhotoLightbox
        images={PROPERTY_GALLERY_IMAGES}
        activeIndex={activeGalleryIndex}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelect={setActiveGalleryIndex}
        title={`${hotel.name || "Royale Jazz Hotel"} Gallery`}
      />
    </section>
  );
}

export default PropertyGallerySection;
