import { roomAmenities } from "../data/siteContent";

const teamMembers = [
  {
    name: "Jeffery Mussman",
    role: "Founder & CEO",
    image: "/images/team/1.webp",
  },
  {
    name: "Sophia Jenkins",
    role: "Founder & CEO",
    image: "/images/team/2.webp",
  },
  {
    name: "Ethan Reynolds",
    role: "Founder & CEO",
    image: "/images/team/3.webp",
  },
  {
    name: "Noah Anderson",
    role: "Founder & CEO",
    image: "/images/team/4.webp",
  },
];

const aboutStats = [
  {
    image: "/images/misc/7.webp",
    value: "120+",
    label: "Rooms Available",
    className: "bg-color-2",
  },
  {
    image: "/images/misc/8.webp",
    value: "105%",
    label: "Menu Selection",
    className: "bg-color",
  },
];

const facilityItems = roomAmenities.slice(4, 10).map((item) => ({
  title: item.label,
  icon: item.icon,
  text: "Sunt dolor aliquip consectetur laborum incididunt tempor.",
}));

function AboutPage() {
  return (
    <main className="no-bottom no-top" id="content">
      <div id="top" />

      <section id="subheader" className="relative text-light react-subheader">
        <img
          src="/images/background/3.webp"
          className="react-subheader-image"
          alt="Almaris exterior"
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
              <h2>History of Our Hotel</h2>
              <p>
                Almaris was shaped around a simple idea: city stays should feel calm, warm, and
                memorable from the moment you arrive. Over time, that idea grew into a hotel
                experience focused on generous rooms, attentive service, and spaces that balance
                modern comfort with a relaxed sense of place.
              </p>
              <p className="mb-0">
                Today, we continue building on that foundation with thoughtful hospitality,
                welcoming shared spaces, and details that make business trips, weekend escapes, and
                longer stays feel equally well cared for.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-6">
                  <img src={aboutStats[0].image} className="img-fluid mb-4" alt={aboutStats[0].label} />
                  <div className="text-center">
                    <div className={`${aboutStats[0].className} text-light p-4`}>
                      <div className="de_count">
                        <h2 className="mb-0">{aboutStats[0].value}</h2>
                        <span>{aboutStats[0].label}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="spacer-single sm-hide" />
                  <div className="text-center">
                    <div className={`${aboutStats[1].className} text-light p-4`}>
                      <div className="de_count">
                        <h2 className="mb-0">{aboutStats[1].value}</h2>
                        <span>{aboutStats[1].label}</span>
                      </div>
                    </div>
                  </div>
                  <img src={aboutStats[1].image} className="img-fluid mt-4" alt={aboutStats[1].label} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-12 text-center">
              <div className="subtitle mb-3">Behind the Scene</div>
              <h2 className="mb-0">Our Team</h2>
            </div>

            {teamMembers.map((member) => (
              <div className="col-lg-3 col-md-6" key={member.name}>
                <img src={member.image} className="img-fluid" alt={member.name} />
                <div className="p-3 text-center">
                  <h4 className="mb-0">{member.name}</h4>
                  <p className="mb-0">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container relative z-2">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="ms-lg-4">
                <div className="subtitle mb-3">Rooms & Suites</div>
                <h2 className="mb-5">Room Facilities</h2>

                <div className="row g-3">
                  {facilityItems.map((item) => (
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
                    <img src="/images/misc/9.webp" className="img-fluid" alt="Almaris room interior" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="spacer-single sm-hide" />
                  <div className="relative">
                    <img src="/images/misc/10.webp" className="img-fluid" alt="Almaris lobby interior" />
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
