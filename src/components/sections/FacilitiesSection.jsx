import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MapPin } from "lucide-react";
import { carouselBreakpoints } from "../../data/siteContent";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

function FacilitiesSection() {
  const { facilityHighlights, hotel } = usePublicHotelContent();
  return (
    <section id="section-facilities" className="relative lines-deco">
      <div className="container relative z-2">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="subtitle id-color mb-3">Nearby Places</div>
            <h2>What Is Close To Royale Jazz Hotel</h2>
            <p className="react-nearby-intro mb-0">
              {hotel.nearbyIntro ?? "Stay close to Kingston culture, shopping, dining, nightlife, and everyday essentials from 58 Westminster Ave."}
            </p>
          </div>

          <div className="col-lg-12">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              className="nearby-carousel owl-single-dots"
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              grabCursor
              spaceBetween={24}
              breakpoints={carouselBreakpoints}
            >
              {facilityHighlights.map((item) => (
                <SwiperSlide key={item.title}>
                  <article className="react-nearby-card">
                    <div
                      className="react-nearby-card-image react-bg-cover"
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      <span className="react-nearby-card-category">{item.category}</span>
                    </div>
                    <div className="react-nearby-card-body">
                      <div className="react-nearby-card-topline">
                        <span className="react-nearby-card-distance">{item.value}</span>
                        <span className="react-nearby-card-pin">
                          <MapPin size={14} strokeWidth={2} />
                          Westminster Ave
                        </span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="spacer-single" />
    </section>
  );
}

export default FacilitiesSection;
