import { useState } from "react";
import RoomPhotoLightbox from "../components/RoomPhotoLightbox";
import { usePublicHotelContent } from "../context/PublicHotelContentContext";

const ABOUT_PAGE_GALLERY_IMAGES = [
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

function AboutPage() {
  const { hotel, aboutStats } = usePublicHotelContent();
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const statOne = aboutStats[0] ?? {
    image: "/images/background/testimonials-hotel-exterior.jpg",
    value: "2 min",
    label: "To Dining & Nightlife",
    className: "bg-color-2",
  };
  const statTwo = aboutStats[1] ?? {
    image: "/images/features/fitness-center.jpg",
    value: "24 hrs",
    label: "Fitness Access In Brief",
    className: "bg-color",
  };

  const aboutPageGalleryImages = ABOUT_PAGE_GALLERY_IMAGES;

  const openGalleryAtIndex = (index) => {
    setActiveGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <main className="no-bottom no-top" id="content">
      <div id="top" />

      <section id="subheader" className="relative text-light react-subheader">
        <img
          src="/images/background/interior-page-hero.jpg"
          className="react-subheader-image"
          alt="Royale Jazz Hotel exterior"
        />
        <div className="container relative z-index-1000">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h1>About Us</h1>
              <ul className="crumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <li className="active">About Us</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="de-overlay react-page-hero-overlay" />
      </section>

      <section className="relative">
        <div className="container">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="subtitle mb-3">Welcome</div>
              <h2>{hotel.aboutPageHeading ?? "About Royale Jazz Hotel"}</h2>
              <p>{hotel.aboutPageIntro}</p>
              <p className="mb-0">{hotel.aboutPageBody}</p>
            </div>

            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-6">
                  <img src={statOne.image} className="img-fluid mb-4" alt={statOne.label} />
                  <div className="text-center">
                    <div className={`${statOne.className} text-light p-4`}>
                      <div className="de_count">
                        <h2 className="mb-0">{statOne.value}</h2>
                        <span>{statOne.label}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="spacer-single sm-hide" />
                  <div className="text-center">
                    <div className={`${statTwo.className} text-light p-4`}>
                      <div className="de_count">
                        <h2 className="mb-0">{statTwo.value}</h2>
                        <span>{statTwo.label}</span>
                      </div>
                    </div>
                  </div>
                  <img src={statTwo.image} className="img-fluid mt-4" alt={statTwo.label} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container relative z-2">
          <div className="react-about-gallery-wrap">
            <div className="react-about-gallery-head text-center">
              <div className="subtitle mb-2">Gallery</div>
              <h2 className="mb-3">Inside Royale Jazz Hotel</h2>
              <p className="mb-0">
                A broader look around the property, from arrival spaces to leisure areas and suites.
              </p>
            </div>

            <div className="react-about-gallery-grid">
              {aboutPageGalleryImages.map((image, index) => (
                <button
                  type="button"
                  key={`${image.image}-${index}`}
                  className="react-about-gallery-tile"
                  onClick={() => openGalleryAtIndex(index)}
                  aria-label={`Open gallery photo ${index + 1}`}
                >
                  <span
                    className="react-about-gallery-tile-image react-bg-cover"
                    style={{ backgroundImage: `url(${image.image})` }}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RoomPhotoLightbox
        images={aboutPageGalleryImages}
        activeIndex={activeGalleryIndex}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelect={setActiveGalleryIndex}
        title={`${hotel.name || "Royale Jazz Hotel"} Gallery`}
      />
    </main>
  );
}

export default AboutPage;
