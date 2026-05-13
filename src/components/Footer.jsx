import { usePublicHotelContent } from "../context/PublicHotelContentContext";

import { Mail, Phone } from "lucide-react";

function Footer() {
  const { footerContent, hotel } = usePublicHotelContent();
  const phoneNumbers = footerContent.phones?.length ? footerContent.phones : [footerContent.phone].filter(Boolean);

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
              </div>

              <div>
                <h3 className="fs-20">Contact Us</h3>
                {phoneNumbers.map((phoneNumber, index) => (
                  <div className="react-footer-contact-line" key={phoneNumber}>
                    <Phone size={15} strokeWidth={2} />
                    <a href={`tel:${phoneNumber.replace(/\D+/g, "")}`}>
                      {index === 0 ? `Landline: ${phoneNumber}` : `Mobile: ${phoneNumber}`}
                    </a>
                  </div>
                ))}
                <div className="react-footer-contact-line">
                  <Mail size={15} strokeWidth={2} />
                  <a href={`mailto:${footerContent.email}`}>{footerContent.email}</a>
                </div>
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
