import { useEffect, useMemo, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import StarRating from "../StarRating";
import ParallaxMaskImage from "../ParallaxMaskImage";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

function AboutSection() {
  const { features, hotel } = usePublicHotelContent();
  const [flippedCard, setFlippedCard] = useState(null);
  const autoplayResumeTimeoutRef = useRef(null);
  const featureCards = useMemo(
    () =>
      features.map((feature, index) => ({
        ...feature,
        sizeClass: `react-feature-photo-card-size-${(index % 6) + 1}`,
        offsetClass: `react-feature-photo-card-offset-${(index % 6) + 1}`,
      })),
    [features],
  );

  function scheduleAutoplayResume(swiper) {
    if (!swiper?.autoplay || swiper.destroyed) {
      return;
    }

    window.clearTimeout(autoplayResumeTimeoutRef.current);
    autoplayResumeTimeoutRef.current = window.setTimeout(() => {
      if (!swiper.destroyed) {
        swiper.autoplay.start();
      }
    }, 160);
  }

  function toggleCard(index) {
    setFlippedCard((current) => (current === index ? null : index));
  }

  useEffect(() => () => window.clearTimeout(autoplayResumeTimeoutRef.current), []);

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
          <Swiper
            modules={[Autoplay]}
            className="react-feature-swiper"
            loop
            speed={900}
            grabCursor
            watchSlidesProgress
            autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: true }}
            breakpoints={{
              0: { slidesPerView: 1.18, spaceBetween: 12 },
              576: { slidesPerView: 1.65, spaceBetween: 14 },
              768: { slidesPerView: 2.15, spaceBetween: 16 },
              992: { slidesPerView: 3.2, spaceBetween: 18 },
              1200: { slidesPerView: 4.1, spaceBetween: 18 },
            }}
            onTouchStart={() => setFlippedCard(null)}
            onTap={scheduleAutoplayResume}
            onClick={scheduleAutoplayResume}
            onTouchEnd={scheduleAutoplayResume}
            onSlideChange={() => setFlippedCard(null)}
            onSlideChangeTransitionEnd={scheduleAutoplayResume}
          >
            {featureCards.map((feature, index) => (
              <SwiperSlide key={`${feature.title}-${index}`}>
                <button
                  type="button"
                  className={`react-feature-photo-card ${feature.sizeClass} ${feature.offsetClass} ${
                    flippedCard === index ? "is-flipped" : ""
                  }`}
                  onClick={() => toggleCard(index)}
                  aria-pressed={flippedCard === index}
                  aria-label={`Show details for ${feature.title}`}
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
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
