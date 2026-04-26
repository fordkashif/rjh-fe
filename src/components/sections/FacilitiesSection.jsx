import { facilityHighlights } from "../../data/siteContent";

function FacilitiesSection() {
  return (
    <section id="section-facilities" className="relative lines-deco">
      <div className="container relative z-2">
        <div className="row g-4">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="subtitle id-color mb-3">Rooms & Suites</div>
            <h2>Our Facilites</h2>
          </div>

          {facilityHighlights.map((item) => (
            <div className="col-md-6" key={item.title}>
              <div className="relative">
                <img src={item.image} className="img-fluid" alt={item.title} />
                <div className="bg-color text-light p-4 start-10 mx-4 mt-70">
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-5 text-center">
                      <div className="de_count fs-15">
                        <h3 className="fs-60">{item.value}</h3>
                        {item.title}
                      </div>
                    </div>

                    <div className="col-lg-7">
                      <p className="no-bottom">{item.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="spacer-single" />
    </section>
  );
}

export default FacilitiesSection;
