import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  BedDouble,
  CalendarDays,
  CircleHelp,
  Mail,
  Phone,
  ShieldCheck,
  SquareDashedBottom,
  Users,
  Wallet,
  Search,
} from "lucide-react";
import DateRangeField, {
  rangeToSearchParams,
} from "../DateRangeField";
import ReservationCounter from "../ReservationCounter";
import RoomPhotoLightbox from "../RoomPhotoLightbox";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";
import {
  buildBookingSummary,
  buildRoomQuote,
  createInitialBookingSearchState,
  createInitialGuestDetails,
  getStayLabel,
  getBookingNights,
  roomMatchesBookingSearch,
} from "../../lib/booking";
import {
  buildAvailabilitySearchPayload,
  buildReservationPayload,
} from "../../lib/bookingApi";
import { fetchRoomTypeAvailability, submitReservationRequest } from "../../lib/reservationsService";

const directBookingPerks = [
  "Best direct-booking rate shown on site",
  "Flexible modification before final confirmation",
  "Direct contact with the hotel team",
];

const bookingPolicies = [
  "Rates shown are estimated for your selected stay and room count.",
  "Taxes and fees are estimated here and confirmed before final checkout.",
  "Cancellation timing depends on the selected rate and will be confirmed with your booking details.",
];

function ReservationSection() {
  const { hotel: hotelConfig, footerContent, loadState, rooms } = usePublicHotelContent();
  const [searchState, setSearchState] = useState(() =>
    createInitialBookingSearchState(
      typeof window === "undefined" ? undefined : new URLSearchParams(window.location.search),
    ),
  );
  const [guestState, setGuestState] = useState(createInitialGuestDetails);
  const [selectedRoomTitle, setSelectedRoomTitle] = useState(null);
  const [bookingStep, setBookingStep] = useState("details");
  const [reservationConfirmation, setReservationConfirmation] = useState(null);
  const [submitState, setSubmitState] = useState({ status: "idle", error: "" });
  const [availabilityState, setAvailabilityState] = useState({
    status: "idle",
    inventoryByRoomTypeCode: {},
    error: "",
  });
  const [lightboxState, setLightboxState] = useState({
    roomTitle: null,
    activeIndex: 0,
  });

  const nights = useMemo(() => getBookingNights(searchState.range), [searchState.range]);
  const stayLabel = getStayLabel(nights);

  useEffect(() => {
    let isActive = true;

    async function loadAvailability() {
      setAvailabilityState((current) => ({
        ...current,
        status: "loading",
        error: "",
      }));

      try {
        const nextAvailability = await fetchRoomTypeAvailability({
          hotelId: hotelConfig.id,
          rooms,
          searchState,
        });

        if (!isActive) {
          return;
        }

        setAvailabilityState({
          status: "ready",
          inventoryByRoomTypeCode: nextAvailability.inventoryByRoomTypeCode,
          error: "",
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        setAvailabilityState({
          status: "error",
          inventoryByRoomTypeCode: {},
          error: error?.message ?? "We couldn't refresh availability right now.",
        });
      }
    }

    loadAvailability();

    return () => {
      isActive = false;
    };
  }, [hotelConfig.id, rooms, searchState]);

  const roomsWithAvailability = useMemo(
    () =>
      rooms.map((room) => {
        const inventory = availabilityState.inventoryByRoomTypeCode[room.code];

        if (!inventory) {
          return room;
        }

        return {
          ...room,
          availableRoomCount: inventory.availableRoomCount,
          reservedRoomCount: inventory.reservedCount,
          totalInventory: inventory.totalInventory,
          badge:
            inventory.totalInventory === 0
              ? "On Request"
              : inventory.availableRoomCount > 0
                ? `${inventory.availableRoomCount} Available`
                : "Currently Full",
        };
      }),
    [availabilityState.inventoryByRoomTypeCode, rooms],
  );

  const availableRooms = useMemo(
    () => roomsWithAvailability.filter((room) => roomMatchesBookingSearch(room, searchState)),
    [roomsWithAvailability, searchState],
  );

  const selectedRoom = useMemo(
    () => availableRooms.find((room) => room.title === selectedRoomTitle) ?? null,
    [availableRooms, selectedRoomTitle],
  );
  const selectedRoomSummary = useMemo(
    () => (selectedRoom ? buildBookingSummary({ room: selectedRoom, searchState, nights }) : null),
    [selectedRoom, searchState, nights],
  );
  const mobileActionLabel = availableRooms.length === 0
    ? "Update Search"
    : !selectedRoom
      ? "Choose a Room"
    : bookingStep === "confirmed"
      ? "View Request"
      : "Complete Details";

  useEffect(() => {
    if (selectedRoomTitle && !availableRooms.some((room) => room.title === selectedRoomTitle)) {
      setSelectedRoomTitle(null);
      setBookingStep("details");
    }
  }, [availableRooms, selectedRoomTitle]);

  const updateSearchField = (field, value) => {
    setSearchState((current) => ({ ...current, [field]: value }));
    setBookingStep("details");
  };

  const updateGuestField = (field, value) => {
    setGuestState((current) => ({ ...current, [field]: value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();

    buildAvailabilitySearchPayload({ hotel: hotelConfig, searchState });

    const nextQuery = new URLSearchParams({
      ...rangeToSearchParams(searchState.range),
      adults: String(searchState.adults),
      children: String(searchState.children),
      rooms: String(searchState.roomCount),
    });

    window.history.replaceState({}, "", `${window.location.pathname}?${nextQuery.toString()}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedRoom) {
      return;
    }

    setSubmitState({ status: "submitting", error: "" });

    try {
      const reservationPayload = buildReservationPayload({
        hotel: hotelConfig,
        room: selectedRoom,
        searchState,
        guestState,
      });

      const confirmation = await submitReservationRequest(reservationPayload);
      setReservationConfirmation(confirmation);
      setBookingStep("confirmed");
      setSubmitState({ status: "submitted", error: "" });
    } catch (error) {
      setSubmitState({
        status: "error",
        error: error?.message ?? "Your reservation request could not be sent just now. Please try again.",
      });
    }
  };

  const handleMobileAction = () => {
    const targetId = availableRooms.length === 0 ? "section_form" : !selectedRoom ? "booking-results" : "booking-summary";
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectedRoomQuote = selectedRoom ? buildRoomQuote(selectedRoom, nights, searchState.roomCount) : null;
  const selectedRoomGallery = selectedRoom?.galleryImages?.length
    ? selectedRoom.galleryImages
    : selectedRoom
      ? [{ image: selectedRoom.image, alt: `${selectedRoom.title} photo` }].filter((item) => item.image)
      : [];
  const activeLightboxRoom = useMemo(
    () => roomsWithAvailability.find((room) => room.title === lightboxState.roomTitle) ?? null,
    [lightboxState.roomTitle, roomsWithAvailability],
  );
  const activeLightboxImages = activeLightboxRoom?.galleryImages?.length
    ? activeLightboxRoom.galleryImages
    : activeLightboxRoom
      ? [{ image: activeLightboxRoom.image, alt: `${activeLightboxRoom.title} photo` }].filter(
        (item) => item.image,
      )
      : [];
  const detailsStepClassName = selectedRoom
    ? "react-booking-step is-active"
    : "react-booking-step";
  const confirmationStepClassName = bookingStep === "confirmed"
    ? "react-booking-step is-active"
    : "react-booking-step";
  const resultsCountLabel = `${availableRooms.length} stay${availableRooms.length === 1 ? "" : "s"} available`;

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
      <section id="section_form" className="relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="alert alert-info mb-0">Preparing your booking options...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loadState.status === "error") {
    return (
      <section id="section_form" className="relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="alert alert-warning mb-0">
                <strong>Online booking is temporarily unavailable.</strong>
                <div className="mt-2">{loadState.error || "Please try again in a moment or contact the hotel directly."}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (rooms.length === 0) {
    return (
      <section id="section_form" className="relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="alert alert-secondary mb-0">
                Online reservations will be available here shortly. For immediate help, please contact the hotel directly.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section_form" className="relative">
      <div className="container">
        <div className="row g-4">
          {availabilityState.status === "error" ? (
            <div className="col-lg-12">
              <div className="alert alert-warning">
                {availabilityState.error || "Availability could not be refreshed just now. Please try again."}
              </div>
            </div>
          ) : null}
          <div className="col-lg-12 react-booking-search-priority">
            <div className="react-booking-search-wrap">
              <div className="subtitle id-color mb-3">Direct Booking</div>
              <h2 className="mb-3">Reserve Your Stay</h2>
              <p className="react-booking-results-note mb-4">
                Search your dates first, then compare the available room options before sending
                your reservation request.
              </p>

              <form className="react-booking-search-grid" onSubmit={handleSearch}>
                <div className="react-booking-search-cell react-booking-search-date">
                  <DateRangeField
                    value={searchState.range}
                    onChange={(value) => updateSearchField("range", value)}
                    triggerClassName="react-date-trigger react-date-trigger-dark form-control no-border text-center"
                  />
                </div>

                <ReservationCounter
                  label="Adult"
                  value={searchState.adults}
                  minimum={1}
                  onChange={(value) => updateSearchField("adults", value)}
                />
                <ReservationCounter
                  label="Children"
                  value={searchState.children}
                  onChange={(value) => updateSearchField("children", value)}
                />
                <ReservationCounter
                  label="Room"
                  value={searchState.roomCount}
                  minimum={1}
                  onChange={(value) => updateSearchField("roomCount", value)}
                />

                <div className="react-booking-search-action">
                  <button type="submit" className="btn-main">
                    Check Availability
                  </button>
                </div>
              </form>

              <div className="react-booking-search-summary">
                {`${format(searchState.range.from, "MMM dd")} - ${format(searchState.range.to, "MMM dd")} | ${stayLabel} | ${searchState.adults} adult${
                  searchState.adults === 1 ? "" : "s"
                }${searchState.children ? ` | ${searchState.children} child${searchState.children === 1 ? "" : "ren"}` : ""} | ${searchState.roomCount} room${
                  searchState.roomCount === 1 ? "" : "s"
                }`}
              </div>
            </div>
          </div>

          <div className="col-lg-8" id="booking-results">
            <div id="booking_form_title" className="react-booking-results-head">
              <div>
                <div className="subtitle id-color mb-3">Search Results</div>
                <h2 className="mb-2">Available Stays</h2>
                <p className="react-booking-results-note mb-0">
                  Compare room types, rate terms, and estimated totals before continuing to guest
                  details.
                </p>
              </div>

              <div className="react-booking-results-meta">
                <span className="react-booking-results-count">{resultsCountLabel}</span>
                <div className="react-booking-results-chips">
                  <span>{stayLabel}</span>
                  <span>{`${searchState.adults} adult${searchState.adults === 1 ? "" : "s"}${searchState.children ? `, ${searchState.children} child${searchState.children === 1 ? "" : "ren"}` : ""}`}</span>
                  <span>{`${searchState.roomCount} room${searchState.roomCount === 1 ? "" : "s"}`}</span>
                </div>
              </div>
            </div>

            <div className="react-room-results">
              {selectedRoom ? (
                <div className="react-booking-selection-banner">
                  <div>
                    <span className="react-booking-selection-label">Selected stay</span>
                    <strong>{selectedRoom.title}</strong>
                    <p className="mb-0">
                      {`${selectedRoomSummary?.roomRateLabelText} | Estimated total $${selectedRoomQuote?.estimatedTotal ?? 0}`}
                    </p>
                  </div>
                  <a href="#booking-summary" className="btn-main btn-line">
                    Continue
                  </a>
                </div>
              ) : null}

              {availableRooms.length === 0 ? (
                <article className="react-room-empty-state">
                  <div className="react-room-empty-icon">
                    <Search size={26} strokeWidth={2} />
                  </div>
                  <h3>No stays matched these dates.</h3>
                  <p>
                    Try adjusting your dates or guest count, or contact the hotel team directly for help finding the best option.
                  </p>
                  <div className="react-booking-contact-row">
                    <a href={`tel:${footerContent.phone.replace(/\s+/g, "")}`}>
                      <Phone size={15} strokeWidth={2} />
                      {footerContent.phone}
                    </a>
                    <a href={`mailto:${footerContent.email}`}>
                      <Mail size={15} strokeWidth={2} />
                      {footerContent.email}
                    </a>
                  </div>
                </article>
              ) : availableRooms.map((room) => {
                const roomQuote = buildRoomQuote(room, nights, searchState.roomCount);
                const isSelected = selectedRoom?.title === room.title;

                return (
                  <article
                    className={isSelected ? "react-room-card is-selected" : "react-room-card"}
                    key={room.title}
                  >
                    <div className="react-room-card-image">
                      <button
                        type="button"
                        className="react-room-gallery-trigger"
                        aria-label={`Open ${room.title} gallery`}
                        onClick={() => openGallery(room)}
                      >
                        <img src={room.image} alt={room.title} />
                      </button>
                      <div className="react-room-image-badge">{room.badge}</div>
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

                    <div className="react-room-card-body">
                      <div className="react-room-card-topline">
                        <span className="react-room-rate-label">{room.rateLabel}</span>
                        <span className="react-room-bestfor">{room.bestFor}</span>
                      </div>

                      <h3>{room.title}</h3>
                      <p className="react-room-description">{room.description}</p>

                      <div className="react-room-meta">
                        <span>
                          <Users size={16} strokeWidth={1.9} />
                          {room.guests}
                        </span>
                        <span>
                          <BedDouble size={16} strokeWidth={1.9} />
                          {room.bed}
                        </span>
                        <span>
                          <SquareDashedBottom size={16} strokeWidth={1.9} />
                          {room.size}
                        </span>
                      </div>

                      <div className="react-room-amenities">
                        {room.amenities.map((amenity) => (
                          <span className="react-room-amenity" key={amenity}>
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="react-room-rate-note">{room.rateNote}</div>
                    </div>

                    <div className="react-room-card-price">
                      <div className="react-room-price-card">
                        <div className="react-room-price-topline">Direct booking rate</div>
                        <div className="react-room-nightly">
                          <strong>{room.price}</strong>
                          <span>/ night</span>
                        </div>
                        <div className="react-room-total">
                          {`${stayLabel}${searchState.roomCount > 1 ? `, ${searchState.roomCount} rooms` : ""} subtotal: $${roomQuote.subtotal}`}
                        </div>
                        <div className="react-room-price-subline">{`Estimated taxes & fees: $${roomQuote.taxes}`}</div>
                        <div className="react-room-estimated-total">{`Estimated total: $${roomQuote.estimatedTotal}`}</div>
                      </div>

                      <div className="react-room-trust-list">
                        <span>
                          <BadgeCheck size={15} strokeWidth={2} />
                          Direct hotel support included
                        </span>
                        <span>
                          <ShieldCheck size={15} strokeWidth={2} />
                          {room.rateNote}
                        </span>
                        <span>
                          <CalendarDays size={15} strokeWidth={2} />
                          Flexible before final confirmation
                        </span>
                      </div>
                      <button
                        type="button"
                        className={isSelected ? "btn-main btn-line" : "btn-main"}
                        onClick={() => {
                          setSelectedRoomTitle(room.title);
                          setBookingStep("details");
                        }}
                      >
                        {isSelected ? "Selected" : "Select Room"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="col-lg-4" id="booking-summary">
            <div className="react-booking-sidecard">
              <div className="subtitle id-color mb-2">{selectedRoom ? "Reservation Steps" : "Next Step"}</div>
              <h3>{selectedRoom ? "Complete Your Booking Request" : "Choose a Room First"}</h3>

              {selectedRoom ? (
                <>
                  <div className="react-booking-stepper">
                    <div className="react-booking-step is-active">
                      <span>1</span>
                      <strong>Select room</strong>
                    </div>
                    <div className={detailsStepClassName}>
                      <span>2</span>
                      <strong>Guest details</strong>
                    </div>
                    <div className={confirmationStepClassName}>
                      <span>3</span>
                      <strong>Confirmation</strong>
                    </div>
                  </div>

                  <div className="react-booking-selected-room">
                    <button
                      type="button"
                      className="react-room-gallery-trigger react-booking-selected-room-image"
                      aria-label={`Open ${selectedRoom.title} gallery`}
                      onClick={() => openGallery(selectedRoom)}
                    >
                      <img src={selectedRoom.formImage} alt={selectedRoom.title} />
                    </button>
                    <div>
                      <strong>{selectedRoom.title}</strong>
                      <span>{`${stayLabel} stay${searchState.roomCount > 1 ? ` | ${selectedRoomSummary?.roomCountLabel}` : ""}`}</span>
                    </div>
                  </div>

                  {selectedRoomGallery.length > 0 ? (
                    <div className="react-booking-policy-panel">
                      <div className="subtitle id-color mb-2">Room Photo Gallery</div>
                      <button
                        type="button"
                        className="react-room-gallery-inline-button"
                        onClick={() => openGallery(selectedRoom)}
                      >
                        Browse all photos
                      </button>
                      <div className="row g-2">
                        {selectedRoomGallery.map((galleryImage, index) => (
                          <div className="col-6" key={`${selectedRoom.code}-selected-gallery-${index}`}>
                            <button
                              type="button"
                              className="react-room-gallery-thumb-button"
                              onClick={() => openGallery(selectedRoom, index)}
                            >
                              <img
                                src={galleryImage.image}
                                alt={galleryImage.alt ?? `${selectedRoom.title} photo ${index + 1}`}
                                style={{ width: "100%", borderRadius: 12, objectFit: "cover", aspectRatio: "1 / 1" }}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="react-booking-summary-block">
                    <div className="react-booking-summary-row">
                      <span>Stay dates</span>
                      <strong>{selectedRoomSummary?.stayDatesLabel}</strong>
                    </div>
                    <div className="react-booking-summary-row">
                      <span>Rooms</span>
                      <strong>{selectedRoomSummary?.roomCountLabel}</strong>
                    </div>
                    <div className="react-booking-summary-row">
                      <span>Guests</span>
                      <strong>{selectedRoomSummary?.guestLabel}</strong>
                    </div>
                    <div className="react-booking-summary-row">
                      <span>Room rate</span>
                      <strong>{selectedRoomSummary?.roomRateLabelText}</strong>
                    </div>
                    <div className="react-booking-summary-row">
                      <span>Stay subtotal</span>
                      <strong>{`$${selectedRoomSummary?.staySubtotal ?? 0}`}</strong>
                    </div>
                    <div className="react-booking-summary-row">
                      <span>Taxes & fees</span>
                      <strong>{`$${selectedRoomSummary?.taxesAndFees ?? 0}`}</strong>
                    </div>
                    <div className="react-booking-summary-row is-total">
                      <span>Estimated total</span>
                      <strong>{`$${selectedRoomSummary?.estimatedTotal ?? 0}`}</strong>
                    </div>
                  </div>

                  <div className="react-booking-trust-panel">
                    <div className="react-booking-trust-item">
                      <ShieldCheck size={16} strokeWidth={2} />
                      <span>{selectedRoom.rateNote}</span>
                    </div>
                    <div className="react-booking-trust-item">
                      <Wallet size={16} strokeWidth={2} />
                      <span>Final payment timing will be confirmed before checkout is completed.</span>
                    </div>
                    <div className="react-booking-trust-item">
                      <Phone size={16} strokeWidth={2} />
                      <span>{`Need help booking? Call ${footerContent.phone}`}</span>
                    </div>
                  </div>

                  <div className="react-booking-policy-panel">
                    <div className="subtitle id-color mb-2">Direct Booking Support</div>
                    <div className="react-booking-policy-list">
                      {directBookingPerks.map((perk) => (
                        <div className="react-booking-policy-item" key={perk}>
                          <BadgeCheck size={16} strokeWidth={2} />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="react-booking-policy-panel">
                    <div className="subtitle id-color mb-2">Booking Policies</div>
                    <div className="react-booking-policy-list">
                      {bookingPolicies.map((policy) => (
                        <div className="react-booking-policy-item" key={policy}>
                          <CircleHelp size={16} strokeWidth={2} />
                          <span>{policy}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {bookingStep === "confirmed" ? (
                    <div className="react-booking-confirmation">
                      <div className="react-booking-confirmation-mark">
                        <ShieldCheck size={28} strokeWidth={2.2} />
                      </div>
                      <div className="subtitle id-color mb-2">Request Received</div>
                      <h4>Your reservation request has been received.</h4>
                      <p>
                        We will review availability for your selected stay and contact you shortly
                        with confirmation details and next payment steps.
                      </p>

                      <div className="react-booking-confirmation-list">
                        <div className="react-booking-confirmation-item">
                          <strong>Request reference</strong>
                          <span>{reservationConfirmation?.requestReference}</span>
                        </div>
                        <div className="react-booking-confirmation-item">
                          <strong>Selected room</strong>
                          <span>{reservationConfirmation?.roomTitle ?? selectedRoom.title}</span>
                        </div>
                        <div className="react-booking-confirmation-item">
                          <strong>Guest</strong>
                          <span>{reservationConfirmation?.guestName ?? guestState.name}</span>
                        </div>
                        <div className="react-booking-confirmation-item">
                          <strong>Contact</strong>
                          <span>{reservationConfirmation?.guestEmail ?? guestState.email}</span>
                        </div>
                        <div className="react-booking-confirmation-item">
                          <strong>Hotel</strong>
                          <span>{hotelConfig.name}</span>
                        </div>
                      </div>

                      <div className="react-booking-confirmation-actions">
                        <button
                          type="button"
                          className="btn-main btn-line"
                          onClick={() => setBookingStep("details")}
                        >
                          Edit Guest Details
                        </button>
                        <a className="btn-main btn-line" href={`tel:${footerContent.phone.replace(/\s+/g, "")}`}>
                          Call Hotel
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="subtitle id-color mb-2">Guest Details</div>
                      <p className="react-booking-step-note">
                        Share your details and the hotel team will guide you through the next step for this stay.
                      </p>

                      <form id="contact_form" className="form-border react-booking-guest-form" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Your Name"
                          value={guestState.name}
                          onChange={(event) => updateGuestField("name", event.target.value)}
                          required
                        />

                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Your Email"
                          value={guestState.email}
                          onChange={(event) => updateGuestField("email", event.target.value)}
                          required
                        />

                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          className="form-control"
                          placeholder="Your Phone"
                          value={guestState.phone}
                          onChange={(event) => updateGuestField("phone", event.target.value)}
                          required
                        />

                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          placeholder="Special requests"
                          value={guestState.message}
                          onChange={(event) => updateGuestField("message", event.target.value)}
                        />

                        <div className="react-booking-policy-note">
                          Your request will be reviewed by the hotel team before the stay is finalized.
                        </div>

                        {submitState.status === "error" ? (
                          <div className="alert alert-danger mb-4" role="alert">
                            {submitState.error}
                          </div>
                        ) : null}

                        <div className="react-booking-contact-row">
                          <a href={`tel:${footerContent.phone.replace(/\s+/g, "")}`}>
                            <Phone size={15} strokeWidth={2} />
                            {footerContent.phone}
                          </a>
                          <a href={`mailto:${footerContent.email}`}>
                            <Mail size={15} strokeWidth={2} />
                            {footerContent.email}
                          </a>
                        </div>

                        <input
                          type="submit"
                          id="send_message"
                          value={submitState.status === "submitting" ? "Submitting Request..." : "Continue Reservation"}
                          className="btn-main"
                          disabled={submitState.status === "submitting"}
                        />
                      </form>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p className="mb-3">
                    {availableRooms.length === 0
                      ? "Update your search to view available stays and continue."
                      : "Choose your preferred stay to continue with guest details."}
                  </p>
                  <div className="react-booking-contact-row mb-0">
                    <a href={`tel:${footerContent.phone.replace(/\s+/g, "")}`}>
                      <Phone size={15} strokeWidth={2} />
                      {footerContent.phone}
                    </a>
                    <a href={`mailto:${footerContent.email}`}>
                      <Mail size={15} strokeWidth={2} />
                      {footerContent.email}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="react-booking-mobile-bar">
        <div className="react-booking-mobile-bar-text">
          {selectedRoom ? (
            <>
              <strong>{selectedRoom.title}</strong>
              <span>{`Estimated total $${selectedRoomQuote?.estimatedTotal ?? 0}`}</span>
            </>
          ) : (
            <>
              <strong>
                {availableRooms.length === 0
                  ? "No stays found"
                  : `${availableRooms.length} stay${availableRooms.length === 1 ? "" : "s"} available`}
              </strong>
              <span>
                {availableRooms.length === 0
                  ? "Adjust dates or guests to continue"
                  : "Review room options to continue"}
              </span>
            </>
          )}
        </div>
        <button type="button" className="btn-main" onClick={handleMobileAction}>
          {mobileActionLabel}
        </button>
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

export default ReservationSection;
