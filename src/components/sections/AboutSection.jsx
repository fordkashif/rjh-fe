import StarRating from "../StarRating";
import ParallaxMaskImage from "../ParallaxMaskImage";
import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

function AboutSection() {
  const { features, hotel } = usePublicHotelContent();
  return (
    <section id="section-about" className="relative lines-deco">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 sm-hide">
            <div className="relative react-about-image-block">
              <div className="abs top-0 w-100">
                <ParallaxMaskImage src="/images/misc/royale-jazz-about-left-square.jpg" alt="Royale Jazz Hotel dining area" />
              </div>
            </div>
          </div>

          <div className="col-lg-4 text-center">
            <div>
              <div className="subtitle id-color mb-3">Welcome To Royale Jazz Hotel</div>
              <h2>{hotel.aboutHeading ?? "Refined Comfort, Modern Style, And A Relaxed Kingston Setting"}</h2>

              <div className="text-center">
                <h4 className="fw-bold mb-1">Thoughtful Stays</h4>
                <div className="de-rating-ext fs-18 mb-2">
                  <StarRating />
                </div>
                <span className="d-block fs-14 mb-0">
                  {hotel.aboutSubheading ?? "Close to city attractions, dining, and nightlife."}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 sm-hide">
            <div className="relative react-about-image-block">
              <div className="abs top-0 w-100">
                <ParallaxMaskImage src="/images/misc/royale-jazz-about-right-square.jpg" alt="Royale Jazz Hotel lounge area" />
              </div>
            </div>
          </div>
        </div>

        <div className="spacer-double" />

        <div className="row g-4 relative z-2">
          {features.map((feature) => (
            <div className="col-lg-4 col-md-6" key={feature.title}>
              <div className="relative p-4 bg-white border-grey">
                <span className="abs top-= w-70px p-3 rounded-up-100 bg-color d-block">
                  <img src={feature.icon} className="w-100" alt="" />
                </span>
                <div className="pl-90">
                  <h4>{feature.title}</h4>
                  <p className="mb-0">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
