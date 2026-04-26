import StarRating from "../StarRating";
import ParallaxMaskImage from "../ParallaxMaskImage";
import { features } from "../../data/siteContent";

function AboutSection() {
  return (
    <section id="section-about" className="relative lines-deco">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 sm-hide">
            <div className="relative react-about-image-block">
              <div className="abs top-0 w-100">
                <ParallaxMaskImage src="/images/misc/2.webp" alt="Hotel lobby" />
              </div>
            </div>
          </div>

          <div className="col-lg-4 text-center">
            <div>
              <div className="subtitle id-color mb-3">Welcome To Almaris</div>
              <h2>Exceptional Hospitality and Unmatched Relaxation at Almaris</h2>

              <div className="text-center">
                <h4 className="fw-bold mb-1">4.9 out of 5</h4>
                <div className="de-rating-ext fs-18">
                  <StarRating />
                </div>
                <span className="d-block fs-14 mb-0">Based on 25000+ reviews</span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 sm-hide">
            <div className="relative react-about-image-block">
              <div className="abs top-0 w-100">
                <ParallaxMaskImage src="/images/misc/3.webp" alt="Hotel dining" />
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
