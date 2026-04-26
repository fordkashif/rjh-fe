import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselNav from "../CarouselNav";
import { carouselBreakpoints, rooms } from "../../data/siteContent";

function RoomsSection() {
  return (
    <section id="section-rooms" className="relative bg-light lines-deco">
      <div className="container-fluid relative z-2">
        <div className="row g-4">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="subtitle id-color mb-3">Elegant</div>
            <h2>Accomodation</h2>
          </div>

          <div className="col-lg-12">
            <div className="owl-custom-nav menu-float px-5">
              <Swiper
                modules={[Navigation]}
                className="room-carousel"
                navigation={{
                  nextEl: ".room-carousel-next",
                  prevEl: ".room-carousel-prev",
                }}
                spaceBetween={24}
                breakpoints={carouselBreakpoints}
              >
                {rooms.map((room) => (
                  <SwiperSlide key={room.title}>
                    <div className="item">
                      <div className="hover relative text-light text-center">
                        <img src={room.image} className="w-100 rounded-up-100" alt={room.title} />
                        <div className="abs hover-op-1 z-4 hover-mt-40 abs-centered">
                          <div className="fs-14">From</div>
                          <h3 className="fs-40 lh-1 mb-4">{room.price}</h3>
                          <a className="btn-line" href={room.detailsHref}>
                            View Details
                          </a>
                        </div>
                        <div className="abs bg-color z-2 top-0 w-100 h-100 hover-op-1 rounded-up-100" />
                        <div className="abs z-2 bottom-0 mb-3 w-100 text-center hover-op-0">
                          <h3 className="mb-0">{room.title}</h3>
                          <div className="text-center fs-14">
                            <span className="mx-2">{room.guests}</span>
                            <span className="mx-2">{room.size}</span>
                          </div>
                        </div>
                        <div className="gradient-trans-color-bottom abs w-100 h-40 bottom-0" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <CarouselNav
                className=""
                previousClassName="room-carousel-prev"
                nextClassName="room-carousel-next"
                previousLabel="Previous rooms"
                nextLabel="Next rooms"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoomsSection;
