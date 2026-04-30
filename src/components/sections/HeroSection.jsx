import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import StarRating from "../StarRating";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

function HeroSection() {
  const { heroSlides } = usePublicHotelContent();
  return (
    <section
      id="section-intro"
      className="section-dark text-light no-top no-bottom position-relative overflow-hidden z-1000"
    >
      <div className="v-center">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          className="hero-swiper"
          loop
          speed={1200}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, type: "fraction" }}
          navigation
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div
                className="swiper-inner react-bg-cover"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="sw-caption z-1000">
                  <div className="container">
                    <div className="row g-4 align-items-center">
                      <div className="spacer-double" />
                      <div className="col-lg-8 offset-lg-2 text-center">
                        <div className="spacer-single" />
                        <div className="sw-text-wrapper">
                          <div className="slider-extra mb-3">
                            <StarRating />
                          </div>
                          <h1 className="slider-title mb-4">{slide.title}</h1>
                          <p className="col-lg-8 offset-lg-2 slider-teaser px-4 mb-0">
                            {slide.text}
                          </p>
                          <div className="spacer-30" />
                          <a className="btn-main mb10 mb-3" href="/rooms">
                            Discover Rooms
                          </a>
                        </div>
                      </div>
                      <div className="spacer-single" />
                    </div>
                  </div>
                </div>

                <div className="abs abs-centered w-40">
                  <div className="box-slider-decor" />
                </div>
                <div className="sw-overlay op-2" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default HeroSection;
