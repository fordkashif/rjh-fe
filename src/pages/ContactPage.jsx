import { useMemo, useState } from "react";
import {
  CalendarClock,
  Clock3,
  Mail,
  MapPin,
  MessageSquareMore,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { footerContent } from "../data/siteContent";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "Reservation Help",
  message: "",
};

const supportCards = [
  {
    icon: Phone,
    eyebrow: "Call The Hotel",
    title: "Front Desk & Reservations",
    detail: footerContent.phone,
    href: `tel:${footerContent.phone.replace(/\s+/g, "")}`,
    note: "Best for same-day questions, arrival timing, and booking support.",
  },
  {
    icon: Mail,
    eyebrow: "Email Support",
    title: "Guest Services",
    detail: footerContent.email,
    href: `mailto:${footerContent.email}`,
    note: "Best for follow-up questions, written requests, and special arrangements.",
  },
  {
    icon: MapPin,
    eyebrow: "Visit Us",
    title: "Hotel Address",
    detail: footerContent.address.join(", "),
    href: "https://maps.google.com/?q=742+Evergreen+Terrace+Brooklyn,+NY+11201",
    note: "Open directions in your preferred maps app before arrival.",
  },
];

const supportLanes = [
  {
    icon: CalendarClock,
    title: "Reservation Help",
    text: "Questions about dates, room options, rate terms, and direct-booking support.",
  },
  {
    icon: MessageSquareMore,
    title: "Existing Booking",
    text: "Need to update an arrival detail, special request, or guest information for a current stay.",
  },
  {
    icon: ShieldCheck,
    title: "Group & Event Inquiries",
    text: "For larger stays, hosted gatherings, or planning support beyond a standard reservation.",
  },
];

function ContactPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const locationLabel = useMemo(() => footerContent.address.join(", "), []);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="no-bottom no-top" id="content">
      <div id="top" />

      <section id="subheader" className="relative text-light react-subheader react-secondary-hero react-contact-hero">
        <img
          src="/images/background/3.webp"
          className="react-subheader-image"
          alt="Contact Almaris"
        />
        <div className="container relative z-index-1000">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-9 text-center">
              <div className="react-secondary-hero-content react-contact-hero-content">
                <div className="subtitle id-color mb-3">Guest Support</div>
                <h1>Contact Almaris</h1>
                <p className="react-secondary-hero-lead react-contact-hero-lead">
                  Whether you are planning a stay, updating an existing reservation, or simply need
                  help before arrival, our team is here to make the next step easy.
                </p>

                <div className="react-secondary-hero-pills react-contact-hero-pills">
                  <span>Reservation assistance</span>
                  <span>Direct hotel response</span>
                  <span>Location and arrival help</span>
                </div>

                <ul className="crumb">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li className="active">Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="de-overlay" />
      </section>

      <section className="relative react-secondary-page-section">
        <div className="container">
          <div className="row g-4 mb-4">
            {supportLanes.map((lane) => {
              const Icon = lane.icon;

              return (
                <div className="col-lg-4" key={lane.title}>
                  <div className="react-contact-lane react-secondary-info-card">
                    <div className="react-contact-lane-icon">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <h3>{lane.title}</h3>
                    <p>{lane.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row g-4 align-items-start">
            <div className="col-lg-5">
              <div className="react-contact-side react-secondary-surface">
                <div className="subtitle id-color mb-3">Reach Us Directly</div>
                <h2 className="mb-3">We keep contact simple.</h2>
                <p className="react-contact-intro">
                  Use the form for detailed requests, or contact the hotel directly if you need a
                  faster answer about your stay.
                </p>

                <div className="react-contact-card-list">
                  {supportCards.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a className="react-contact-card" href={item.href} key={item.title} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                        <div className="react-contact-card-icon">
                          <Icon size={20} strokeWidth={2} />
                        </div>
                        <div>
                          <span className="react-contact-card-eyebrow">{item.eyebrow}</span>
                          <strong>{item.title}</strong>
                          <div className="react-contact-card-detail">{item.detail}</div>
                          <p>{item.note}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="react-contact-hours">
                  <div className="react-contact-hours-title">
                    <Clock3 size={18} strokeWidth={2} />
                    <strong>Support and Response</strong>
                  </div>
                  <div className="react-contact-hours-grid">
                    <div>
                      <span>Phone</span>
                      <strong>Daily, 24/7 front desk</strong>
                    </div>
                    <div>
                      <span>Email</span>
                      <strong>Replies typically within one business day</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="react-contact-form-panel react-secondary-surface">
                <div className="subtitle id-color mb-3">Send A Message</div>
                <h2 className="mb-3">Tell us how we can help.</h2>
                <p className="react-contact-form-note">
                  Share the key details and our team will follow up with the right next step for
                  your request.
                </p>

                {submitted ? (
                  <div className="react-contact-success">
                    <div className="react-contact-success-mark">
                      <ShieldCheck size={26} strokeWidth={2.2} />
                    </div>
                    <h3>Message received.</h3>
                    <p>
                      Thanks for reaching out. A member of the Almaris team will review your
                      request and contact you using the details you provided.
                    </p>
                    <div className="react-contact-success-grid">
                      <div>
                        <span>Topic</span>
                        <strong>{formData.subject}</strong>
                      </div>
                      <div>
                        <span>Replying to</span>
                        <strong>{formData.email}</strong>
                      </div>
                    </div>
                    <div className="react-booking-contact-row mb-0">
                      <a href={`tel:${footerContent.phone.replace(/\s+/g, "")}`}>
                        <Phone size={15} strokeWidth={2} />
                        {footerContent.phone}
                      </a>
                      <a href={`mailto:${footerContent.email}`}>
                        <Mail size={15} strokeWidth={2} />
                        {footerContent.email}
                      </a>
                    </div>
                  </div>
                ) : (
                  <form
                    name="contactForm"
                    id="contact_form"
                    className="react-contact-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="row g-3">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(event) => updateField("name", event.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(event) => updateField("email", event.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          className="form-control"
                          placeholder="Your Phone"
                          value={formData.phone}
                          onChange={(event) => updateField("phone", event.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <select
                          name="subject"
                          id="subject"
                          className="form-control"
                          value={formData.subject}
                          onChange={(event) => updateField("subject", event.target.value)}
                        >
                          <option>Reservation Help</option>
                          <option>Existing Booking</option>
                          <option>Group or Event Inquiry</option>
                          <option>Arrival Assistance</option>
                          <option>General Question</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          placeholder="How can we help?"
                          value={formData.message}
                          onChange={(event) => updateField("message", event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="react-contact-form-footer">
                      <div className="react-contact-form-assurance">
                        We will use your details only to respond to your inquiry and help with your
                        stay.
                      </div>
                      <input type="submit" id="send_message" value="Send Message" className="btn-main" />
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative react-secondary-page-section">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <div className="react-contact-map-wrap">
                <iframe
                  title="Almaris location"
                  src="https://www.google.com/maps?q=742+Evergreen+Terrace+Brooklyn,+NY+11201&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="react-contact-location-panel react-secondary-surface">
                <div className="subtitle id-color mb-3">Location</div>
                <h2 className="mb-3">Plan your arrival with confidence.</h2>
                <p>
                  Almaris is positioned for easy access to the city while still giving guests a
                  quieter place to settle in, arrive well, and start their stay smoothly.
                </p>

                <div className="react-contact-location-list">
                  <div className="react-contact-location-item">
                    <span>Address</span>
                    <strong>{locationLabel}</strong>
                  </div>
                  <div className="react-contact-location-item">
                    <span>Check-in support</span>
                    <strong>Call ahead for arrival questions or same-day assistance</strong>
                  </div>
                  <div className="react-contact-location-item">
                    <span>Directions</span>
                    <strong>
                      <a href="https://maps.google.com/?q=742+Evergreen+Terrace+Brooklyn,+NY+11201" target="_blank" rel="noreferrer">
                        Open in Google Maps
                      </a>
                    </strong>
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

export default ContactPage;
