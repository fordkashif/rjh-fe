import { useMemo } from "react";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

function VideoSection() {
  const { hotel, rooms } = usePublicHotelContent();
  const roomTitles = useMemo(() => rooms.map((room) => room.title).filter(Boolean), [rooms]);
  const lowestRate = useMemo(() => {
    const parsedRates = rooms
      .map((room) => Number.parseFloat(String(room.price).replace(/[^0-9.]/g, "")))
      .filter((value) => Number.isFinite(value));

    if (!parsedRates.length) {
      return null;
    }

    return Math.min(...parsedRates);
  }, [rooms]);

  return (
    <section className="react-home-cta-section section-dark" aria-label="Reserve your stay">
      <div className="container relative z-2">
        <div className="react-home-cta-panel">
          <div
            className="react-home-cta-image react-bg-cover"
            style={{ backgroundImage: `url(${hotel.homeCtaImageUrl ?? "/images/slider/royale-jazz-hero-2.png"})` }}
          />

          <div className="react-home-cta-content">
            <div className="subtitle id-color mb-3">{hotel.homeCtaEyebrow ?? "Direct Booking"}</div>
            <h2>{hotel.homeCtaHeading ?? "Stay Close To Kingston's Best"}</h2>
            <p>
              {hotel.homeCtaBody ?? "Book directly with Royale Jazz Hotel for spacious suites, a relaxed setting, and easy access to the city's dining, culture, shopping, and nightlife."}
            </p>

            <div className="react-home-cta-points">
              {(hotel.homeCtaPoints?.length ? hotel.homeCtaPoints : [
                roomTitles.join(" and "),
                lowestRate ? `${hotel.currency ?? "USD"} ${lowestRate} per night` : null,
                "Pool and garden view options",
              ]).filter(Boolean).map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>

            <div className="react-home-cta-actions">
              <a className="btn-main" href="/reservation">
                Reserve Your Stay
              </a>
              <a className="btn-line" href="/contact">
                Contact The Hotel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
