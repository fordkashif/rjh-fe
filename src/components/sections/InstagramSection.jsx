import { usePublicHotelContent } from "../../context/PublicHotelContentContext";

function InstagramSection() {
  const { galleryImages } = usePublicHotelContent();
  const firstRow = galleryImages.slice(0, 4);
  const secondRow = galleryImages.slice(4, 8);

  return (
    <section id="instagram-section" className="bg-light relative pt50 no-bottom">
      <div className="container relative z-2">
        <div className="row g-4">
          <div className="col-lg-8 offset-lg-2 mb-4 text-center">
            <div className="subtitle id-color mb-3">Gallery</div>
            <h2>Moments At Royale Jazz Hotel</h2>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-md-6">
            <div className="row g-0">
              {firstRow.map((item) => (
                <div className="col-3" key={item.image}>
                  <a href={item.href} className="d-block hover relative overflow-hidden text-light">
                    <img src={item.image} className="w-100 hover-scale-1-1" alt={item.alt ?? "Instagram post"} />
                    <div className="abs abs-centered fs-24 text-white hover-op-0">
                      <i className="fa-brands fa-instagram" />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <div className="row g-0">
              {secondRow.map((item) => (
                <div className="col-3" key={item.image}>
                  <a href={item.href} className="d-block hover relative overflow-hidden text-light">
                    <img src={item.image} className="w-100 hover-scale-1-1" alt={item.alt ?? "Instagram post"} />
                    <div className="abs abs-centered fs-24 text-white hover-op-0">
                      <i className="fa-brands fa-instagram" />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstagramSection;
