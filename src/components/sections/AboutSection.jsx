import StarRating from "../StarRating";
import ParallaxMaskImage from "../ParallaxMaskImage";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

function AboutSection() {
  const { features, hotel } = usePublicHotelContent();
  const carouselFeatures = [...features, ...features];

  return (
    <section id="section-about" className="relative lines-deco">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 sm-hide">
            <div className="relative react-about-image-block">
              <div className="abs top-0 w-100">
                <ParallaxMaskImage src="/images/misc/royale-jazz-about-left-square.jpg" alt="Royale Jazz Hotel dining area" />
              </div>
            </div>
          </div>

          <div className="col-lg-4 text-center">
            <div>
              <div className="subtitle id-color mb-3">Welcome To Royale Jazz Hotel</div>
              <h2>{hotel.aboutHeading ?? "Refined Comfort, Modern Style, And A Relaxed Kingston Setting"}</h2>

              <div className="text-center">
                <h4 className="fw-bold mb-1">Thoughtful Stays</h4>
                <div className="de-rating-ext fs-18 mb-2">
                  <StarRating />
                </div>
                <span className="d-block fs-14 mb-0">
                  {hotel.aboutSubheading ?? "Close to city attractions, dining, and nightlife."}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 sm-hide">
            <div className="relative react-about-image-block">
              <div className="abs top-0 w-100">
                <ParallaxMaskImage src="/images/misc/royale-jazz-about-right-square.jpg" alt="Royale Jazz Hotel lounge area" />
              </div>
            </div>
          </div>
        </div>

        <div className="spacer-double" />

        <div className="react-feature-carousel" aria-label="Royale Jazz Hotel amenities">
          <div className="react-feature-carousel-track">
            {carouselFeatures.map((feature, index) => (
              <div
                className={`react-feature-photo-card react-feature-photo-card-size-${(index % 6) + 1}`}
                key={`${feature.title}-${index}`}
              >
                <div className="react-feature-photo-card-inner">
                  <div className="react-feature-photo-card-face react-feature-photo-card-front">
                    <div
                      className={`react-feature-photo-card-image react-bg-cover react-feature-photo-card-image-${
                        (index % 6) + 1
                      }`}
                      style={{ backgroundImage: `url(${feature.image ?? feature.icon})` }}
                      aria-hidden="true"
                    />
                    <div className="react-feature-photo-card-front-label">{feature.title}</div>
                  </div>
                  <div className="react-feature-photo-card-face react-feature-photo-card-back">
                    <div className="react-feature-photo-card-body">
                      <h4>{feature.title}</h4>
                      <p className="mb-0">{feature.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
