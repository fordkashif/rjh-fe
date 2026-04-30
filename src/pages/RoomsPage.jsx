import RoomsSection from "../components/sections/RoomsSection";
import { usePublicHotelContent } from "../context/PublicHotelContentContext";

function RoomsPage() {
  const { hotel } = usePublicHotelContent();

  return (
    <main className="no-bottom no-top" id="content">
      <div id="top" />

      <section id="subheader" className="relative text-light react-subheader react-secondary-hero react-rooms-hero">
        <img
          src="/images/background/3.webp"
          className="react-subheader-image"
          alt="Royale Jazz Hotel accommodations"
        />
        <div className="container relative z-index-1000">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-9 text-center">
              <div className="react-secondary-hero-content react-rooms-hero-content">
                <div className="subtitle id-color mb-3">Accommodation</div>
                <h1>Rooms & Suites at {hotel.name || "Royale Jazz Hotel"}</h1>
                <p className="react-secondary-hero-lead react-rooms-hero-lead">
                  Explore the stay options designed for comfort, direct booking convenience, and a relaxed Kingston experience.
                </p>

                <div className="react-secondary-hero-pills react-rooms-hero-pills">
                  <span>Suite options</span>
                  <span>Direct booking support</span>
                  <span>Room details in one place</span>
                </div>

                <ul className="crumb">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li className="active">Accommodation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="de-overlay" />
      </section>

      <RoomsSection />

      <section className="relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="react-rooms-cta text-center">
                <div className="subtitle id-color mb-3">Need Help Choosing?</div>
                <h2>Let the hotel team guide your stay.</h2>
                <p>
                  If you want help comparing room options, planning dates, or confirming the best fit for your trip, send a direct reservation request and the team will follow up with you.
                </p>
                <div className="react-rooms-cta-actions">
                  <a className="btn-main" href="/reservation">
                    Reserve Your Stay
                  </a>
                  <a className="btn-main btn-line" href="/contact">
                    Contact The Hotel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RoomsPage;
