import { usePublicHotelContent } from "../context/PublicHotelContentContext";

function AboutPage() {
  const { hotel, aboutStats, aboutFacilityItems } = usePublicHotelContent();
  const statOne = aboutStats[0] ?? {
    image: "/images/misc/7.webp",
    value: "2 min",
    label: "To Dining & Nightlife",
    className: "bg-color-2",
  };
  const statTwo = aboutStats[1] ?? {
    image: "/images/misc/8.webp",
    value: "24 hrs",
    label: "Fitness Access In Brief",
    className: "bg-color",
  };
  const facilities =
    aboutFacilityItems.length > 0
      ? aboutFacilityItems
      : [
          {
            title: "Air Conditioning",
            icon: "/images/icons/shower.png",
            text: "Rooms are described with modern cooling for a comfortable stay.",
          },
          {
            title: "Work Station",
            icon: "/images/icons/desk.png",
            text: "A sleek work station supports business travel and focused work sessions.",
          },
          {
            title: "Refrigerator",
            icon: "/images/icons/safebox.png",
            text: "In-room refrigeration adds convenience for longer stays and day-to-day comfort.",
          },
          {
            title: "Microwave",
            icon: "/images/icons/tv.png",
            text: "Selected rooms include a microwave for added flexibility during your stay.",
          },
        ];
  return (
    <main className="no-bottom no-top" id="content">
      <div id="top" />

      <section id="subheader" className="relative text-light react-subheader">
        <img
          src="/images/background/3.webp"
          className="react-subheader-image"
          alt="Royale Jazz Hotel exterior"
        />
        <div className="container relative z-index-1000">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h1>About Us</h1>
              <ul className="crumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <li className="active">About Us</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="de-overlay" />
      </section>

      <section className="relative">
        <div className="container">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="subtitle mb-3">Welcome</div>
              <h2>{hotel.aboutPageHeading ?? "About Royale Jazz Hotel"}</h2>
              <p>{hotel.aboutPageIntro}</p>
              <p className="mb-0">{hotel.aboutPageBody}</p>
            </div>

            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-6">
                  <img src={statOne.image} className="img-fluid mb-4" alt={statOne.label} />
                  <div className="text-center">
                    <div className={`${statOne.className} text-light p-4`}>
                      <div className="de_count">
                        <h2 className="mb-0">{statOne.value}</h2>
                        <span>{statOne.label}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="spacer-single sm-hide" />
                  <div className="text-center">
                    <div className={`${statTwo.className} text-light p-4`}>
                      <div className="de_count">
                        <h2 className="mb-0">{statTwo.value}</h2>
                        <span>{statTwo.label}</span>
                      </div>
                    </div>
                  </div>
                  <img src={statTwo.image} className="img-fluid mt-4" alt={statTwo.label} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container relative z-2">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="ms-lg-4">
                <div className="subtitle mb-3">Rooms & Suites</div>
                <h2 className="mb-5">{hotel.aboutPageRoomFacilitiesHeading ?? "Room Facilities"}</h2>

                <div className="row g-3">
                  {facilities.map((item) => (
                    <div className="col-lg-6" key={item.title}>
                      <div className="mb-4 relative">
                        <img src={item.icon} className="w-50px absolute" alt="" />
                        <div className="pl-70">
                          <h5>{item.title}</h5>
                          <p className="mb-0">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-6">
                  <div className="relative">
                    <img src="/images/misc/9.webp" className="img-fluid" alt="Royale Jazz Hotel room interior" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="spacer-single sm-hide" />
                  <div className="relative">
                    <img src="/images/misc/10.webp" className="img-fluid" alt="Royale Jazz Hotel lobby interior" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
