import { usePublicHotelContent } from "../context/PublicHotelContentContext";

function Footer() {
  const { footerContent, hotel } = usePublicHotelContent();
  return (
    <footer id="footer" className="text-light section-dark">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-12">
            <div className="d-lg-flex align-items-center justify-content-between text-center">
              <div>
                <h3 className="fs-20">Address</h3>
                {footerContent.address[0]}
                <br />
                {footerContent.address[1]}
              </div>

              <div>
                <img src="/images/royale-jazz-logo.png" className="w-200px react-footer-logo" alt={hotel.name} />
                <br />
                <div className="social-icons mb-sm-30 mt-4">
                  {footerContent.socials.map((social) => (
                    <a href="#" key={social} aria-label={social}>
                      <i className={`fa-brands fa-${social}`} />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="fs-20">Contact Us</h3>
                T. {footerContent.phone}
                <br />
                M. {footerContent.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">{`Copyright 2026 - ${hotel.name}`}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
