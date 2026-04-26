import ReservationSection from "../components/sections/ReservationSection";

function ReservationPage() {
  return (
    <main className="no-bottom no-top" id="content">
      <div id="top" />

      <section id="subheader" className="relative text-light react-subheader react-secondary-hero react-reservation-hero">
        <img
          src="/images/background/3.webp"
          className="react-subheader-image"
          alt="Almaris reservation"
        />
        <div className="container relative z-index-1000">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-9 text-center">
              <div className="react-secondary-hero-content react-reservation-hero-content">
                <div className="subtitle id-color mb-3">Direct Booking</div>
                <h1>Reserve Your Stay at Almaris</h1>
                <p className="react-secondary-hero-lead react-reservation-hero-lead">
                  Search your dates, compare room types, and send your reservation request with
                  clear pricing, direct support, and the details you need to book with confidence.
                </p>

                <div className="react-secondary-hero-pills react-reservation-hero-pills">
                  <span>Best rate shown on site</span>
                  <span>Flexible room options</span>
                  <span>Direct hotel support</span>
                </div>

                <ul className="crumb">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li className="active">Reservation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="de-overlay" />
      </section>

      <ReservationSection />
    </main>
  );
}

export default ReservationPage;
