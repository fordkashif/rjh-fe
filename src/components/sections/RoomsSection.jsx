import { useMemo, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselNav from "../CarouselNav";
import RoomPhotoLightbox from "../RoomPhotoLightbox";
import { carouselBreakpoints } from "../../data/siteContent";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

function RoomsSection() {
  const { loadState, rooms } = usePublicHotelContent();
  const isLaunchLayout = rooms.length <= 2;
  const [lightboxState, setLightboxState] = useState({
    roomTitle: null,
    activeIndex: 0,
  });
  const activeLightboxRoom = useMemo(
    () => rooms.find((room) => room.title === lightboxState.roomTitle) ?? null,
    [lightboxState.roomTitle, rooms],
  );
  const activeLightboxImages = activeLightboxRoom?.galleryImages?.length
    ? activeLightboxRoom.galleryImages
    : activeLightboxRoom
      ? [{ image: activeLightboxRoom.image, alt: `${activeLightboxRoom.title} photo` }].filter(
        (item) => item.image,
      )
      : [];

  const openGallery = (room, index = 0) => {
    if (!room) {
      return;
    }

    setLightboxState({
      roomTitle: room.title,
      activeIndex: index,
    });
  };

  if (loadState.status === "loading") {
    return (
      <section id="section-rooms" className="relative bg-light lines-deco">
        <div className="container relative z-2">
          <div className="alert alert-info mb-0">A closer look at our rooms is on the way.</div>
        </div>
      </section>
    );
  }

  if (loadState.status === "error") {
    return (
      <section id="section-rooms" className="relative bg-light lines-deco">
        <div className="container relative z-2">
          <div className="alert alert-warning mb-0">
            {loadState.error || "Our room details are taking a little longer than usual to load."}
          </div>
        </div>
      </section>
    );
  }

  if (rooms.length === 0) {
    return (
      <section id="section-rooms" className="relative bg-light lines-deco">
        <div className="container relative z-2">
          <div className="row g-4">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="subtitle id-color mb-3">Accommodation</div>
              <h2>Room Types Coming Soon</h2>
              <p className="mb-0">
                We are preparing the room collection for online viewing. Please check back soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-rooms" className="relative bg-light lines-deco">
      <div className="container relative z-2">
        <div className="row g-4">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="subtitle id-color mb-3">Accommodation</div>
            <h2>Stay Options At Royale Jazz Hotel</h2>
            <p className="react-room-launch-intro mb-0">
              Launching with two suite options designed for comfort, convenience, and easy direct
              booking.
            </p>
          </div>

          {isLaunchLayout ? (
            <div className="col-lg-12">
              <div className="react-room-launch-grid">
                {rooms.map((room) => (
                  <article className="react-room-launch-card" key={room.title}>
                    <div className="react-room-launch-image-wrap">
                      <button
                        type="button"
                        className="react-room-gallery-trigger"
                        aria-label={`Open ${room.title} gallery`}
                        onClick={() => openGallery(room)}
                      >
                        <img src={room.image} className="react-room-launch-image" alt={room.title} />
                      </button>
                      <div className="react-room-launch-badge">{room.badge}</div>
                      {room.galleryImages?.length > 0 ? (
                        <button
                          type="button"
                          className="react-room-gallery-pill"
                          onClick={() => openGallery(room)}
                        >
                          {`${room.galleryImages.length} photos`}
                        </button>
                      ) : null}
                    </div>

                    <div className="react-room-launch-body">
                      <div className="react-room-launch-topline">
                        <span className="react-room-launch-rate">{room.rateLabel}</span>
                        <span className="react-room-launch-bestfor">{room.bestFor}</span>
                      </div>

                      <div className="react-room-launch-heading">
                        <h3>{room.title}</h3>
                        <div className="react-room-launch-price">
                          <span>From</span>
                          <strong>{room.price}</strong>
                          <small>per night</small>
                        </div>
                      </div>

                      <div className="react-room-launch-meta">
                        <span>{room.guests}</span>
                        <span>{room.size}</span>
                        <span>{room.bed}</span>
                      </div>

                      <p>{room.description}</p>

                      <div className="react-room-launch-amenities">
                        {room.amenities.map((amenity) => (
                          <span key={amenity}>{amenity}</span>
                        ))}
                      </div>

                      <div className="react-room-launch-footer">
                        <div className="react-room-launch-note">{room.rateNote}</div>
                        <div className="react-room-launch-actions">
                          <button type="button" className="btn-main btn-line" onClick={() => openGallery(room)}>
                            View Gallery
                          </button>
                          <a className="btn-main" href="/reservation">
                            Reserve This Room
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
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
                          <button
                            type="button"
                            className="react-room-gallery-trigger react-room-gallery-trigger-rounded"
                            aria-label={`Open ${room.title} gallery`}
                            onClick={() => openGallery(room)}
                          >
                            <img src={room.image} className="w-100 rounded-up-100" alt={room.title} />
                          </button>
                          <div className="abs hover-op-1 z-4 hover-mt-40 abs-centered">
                            <div className="fs-14">From</div>
                            <h3 className="fs-40 lh-1 mb-4">{room.price}</h3>
                            <div className="react-room-carousel-actions">
                              <button type="button" className="btn-line" onClick={() => openGallery(room)}>
                                View Gallery
                              </button>
                              <a className="btn-line" href={room.detailsHref}>
                                View Details
                              </a>
                            </div>
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
          )}
        </div>
      </div>

      <RoomPhotoLightbox
        images={activeLightboxImages}
        activeIndex={lightboxState.activeIndex}
        isOpen={Boolean(activeLightboxRoom)}
        onClose={() => setLightboxState({ roomTitle: null, activeIndex: 0 })}
        onSelect={(index) => setLightboxState((current) => ({ ...current, activeIndex: index }))}
        title={activeLightboxRoom?.title ?? "Room photos"}
      />
    </section>
  );
}

export default RoomsSection;
