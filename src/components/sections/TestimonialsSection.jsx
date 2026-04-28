import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

function TestimonialsSection() {
  const { testimonials } = usePublicHotelContent();

  if (!testimonials.length) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden text-light section-dark react-bg-cover react-parallax"
      style={{ backgroundImage: "url(/images/background/1.webp)" }}
    >
      <div className="abs abs-centered w-30">
        <div className="box-slider-decor" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <Swiper
              modules={[Autoplay, Pagination]}
              className="owl-single-dots"
              loop
              autoplay={{ delay: 4500 }}
              pagination={{ clickable: true }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={`${testimonial.author}-${index}`}>
                  <div className="item">
                    <i className="icofont-quote-left id-color fs-40 mb-4" />
                    <h3 className="mb-4 fs-36">{testimonial.quote}</h3>
                    <span>{testimonial.author}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
