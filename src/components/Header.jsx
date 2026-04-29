import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePublicHotelContent } from "../context/PublicHotelContentContext";

const roomsMenuItems = [
  { label: "All Rooms Default", href: "/#section-rooms" },
  { label: "All Rooms Style 2", href: "/#section-rooms" },
  { label: "All Rooms Style 3", href: "/#section-rooms" },
  { label: "Single Room", href: "/#section-rooms" },
  { label: "Single Room Style 2", href: "/#section-rooms" },
];

const featuredRooms = [
  {
    label: "Best Seller",
    title: "Deluxe Room",
    href: "/#section-rooms",
    image: "/images/form/2.jpg",
  },
  {
    label: "Best Seller",
    title: "Family Suite",
    href: "/#section-rooms",
    image: "/images/form/4.jpg",
  },
  {
    label: "Featured",
    title: "Presidential Suite",
    href: "/#section-rooms",
    image: "/images/form/6.jpg",
  },
];

const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Accommodations", href: "/#section-rooms" },
  { label: "Reservation", href: "/reservation" },
  { label: "Contact", href: "/contact" },
];

function Header({ isSecondaryPage = false }) {
  const { footerContent, hotel } = usePublicHotelContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState("top");
  const [isMobileMenu, setIsMobileMenu] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 992 : false,
  );
  const [mobileMenuOffset, setMobileMenuOffset] = useState(86);
  const headerRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const syncHeaderState = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setHeaderState("top");
      } else if (currentScrollY > lastScrollY) {
        setHeaderState("hidden");
        setMenuOpen(false);
      } else {
        setHeaderState("sticky");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", syncHeaderState, { passive: true });
    syncHeaderState();

    return () => {
      window.removeEventListener("scroll", syncHeaderState);
    };
  }, []);

  useEffect(() => {
    const syncViewport = () => {
      const nextIsMobileMenu = window.innerWidth <= 992;
      setIsMobileMenu(nextIsMobileMenu);

      if (!nextIsMobileMenu) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", syncViewport, { passive: true });
    syncViewport();

    return () => {
      window.removeEventListener("resize", syncViewport);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenu) {
      document.body.classList.remove("react-mobile-menu-open");
      return;
    }

    if (menuOpen) {
      document.body.classList.add("react-mobile-menu-open");
    } else {
      document.body.classList.remove("react-mobile-menu-open");
    }

    return () => {
      document.body.classList.remove("react-mobile-menu-open");
    };
  }, [isMobileMenu, menuOpen]);

  useEffect(() => {
    if (!isMobileMenu) {
      return undefined;
    }

    const syncMobileMenuOffset = () => {
      const headerBounds = headerRef.current?.getBoundingClientRect();
      if (!headerBounds) {
        return;
      }

      const nextOffset = Math.max(0, Math.round(headerBounds.bottom));
      setMobileMenuOffset(nextOffset);
    };

    syncMobileMenuOffset();
    window.addEventListener("resize", syncMobileMenuOffset, { passive: true });
    window.addEventListener("scroll", syncMobileMenuOffset, { passive: true });

    return () => {
      window.removeEventListener("resize", syncMobileMenuOffset);
      window.removeEventListener("scroll", syncMobileMenuOffset);
    };
  }, [headerState, isMobileMenu, isSecondaryPage, menuOpen]);

  const headerClassName = [
    "has-topbar",
    "react-site-header",
    isMobileMenu ? "header-mobile" : null,
    headerState === "top" ? "transparent" : "smaller header-dark",
    !isMobileMenu ? (headerState === "hidden" ? "react-header-hidden" : "react-header-visible") : null,
    isSecondaryPage ? "react-site-header-secondary" : null,
    menuOpen ? "react-menu-open" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const mobileMenuPortal =
    isMobileMenu && typeof document !== "undefined"
      ? createPortal(
          <>
            <div
              className={menuOpen ? "react-mobile-menu-backdrop is-open" : "react-mobile-menu-backdrop"}
              onClick={closeMenu}
            />
            <div
              className={menuOpen ? "react-mobile-menu-drawer is-open" : "react-mobile-menu-drawer"}
              style={{
                top: `${mobileMenuOffset}px`,
              }}
            >
              <nav aria-label="Mobile navigation">
                <ul className="react-mobile-menu-list">
                  {mobileNavItems.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} onClick={closeMenu}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <header ref={headerRef} className={headerClassName}>
        {isSecondaryPage ? (
          <div id="topbar" className="text-light react-secondary-topbar">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex justify-content-between xs-hide">
                    <div className="header-widget d-flex">
                      <div className="topbar-widget">
                        <a href="/about">
                          <i className="icofont-location-pin" />
                          {footerContent.address.join(" ")}
                        </a>
                      </div>
                      <div className="topbar-widget">
                        <a href={`tel:${footerContent.phone.replace(/\s+/g, "")}`}>
                          <i className="icofont-phone" />
                          {footerContent.phone}
                        </a>
                      </div>
                      <div className="topbar-widget">
                        <a href={`mailto:${footerContent.email}`}>
                          <i className="icofont-envelope" />
                          {footerContent.email}
                        </a>
                      </div>
                    </div>

                    <div className="social-icons">
                      {footerContent.socials.map((social) => (
                        <a href="#" key={social} aria-label={social}>
                          <i className={`fa-brands fa-${social} fa-lg`} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        ) : null}

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex sm-pt10">
                <div className="de-flex-col">
                  <div id="logo">
                      <a href="/" onClick={closeMenu}>
                      <img className="logo-main react-site-logo" src="/images/royale-jazz-logo.png" alt={hotel.name} />
                      <img className="logo-scroll react-site-logo react-site-logo-scroll" src="/images/royale-jazz-logo.png" alt={hotel.name} />
                      <img className="logo-mobile react-site-logo" src="/images/royale-jazz-logo.png" alt={hotel.name} />
                    </a>
                  </div>
                </div>

                <div className="de-flex-col header-col-mid">
                  <ul id="mainmenu">
                    <li>
                      <a className="menu-item" href="/" onClick={closeMenu}>
                        Home
                      </a>
                    </li>

                    <li>
                      <a className="menu-item" href="/about" onClick={closeMenu}>
                        About Us
                      </a>
                    </li>

                    <li className="has-child">
                      <a className="menu-item" href="/#section-rooms" onClick={closeMenu}>
                        Accommodations
                      </a>
                      <ul className="mega">
                        <li>
        <div className="container">
                            <div className="sb-menu p-4">
                              <div className="row g-3">
                                <div className="col-lg-3">
                                  <h4>Rooms</h4>
                                  <ul className="no-bg">
                                    {roomsMenuItems.map((item) => (
                                      <li key={item.label}>
                                        <a href={item.href} onClick={closeMenu}>
                                          {item.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {featuredRooms.map((room) => (
                                  <div className="col-lg-3 text-center" key={room.title}>
                                    <div className="relative hover text-center overflow-hidden soft-shadow rounded-5px">
                                      <a href={room.href} onClick={closeMenu}>
                                        <div className="d-label">{room.label}</div>
                                        <img
                                          src={room.image}
                                          className="w-100 relative hover-scale-1-1"
                                          alt={room.title}
                                        />
                                      </a>

                                      <div className="abs w-100 h-100 start-0 top-0 hover-bg-color" />
                                    </div>
                                    <h5 className="mt-2 mb-0">{room.title}</h5>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a className="menu-item" href="/reservation" onClick={closeMenu}>
                        Reservation
                      </a>
                    </li>

                    <li>
                      <a className="menu-item" href="/contact" onClick={closeMenu}>
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="de-flex-col">
                  <div className="menu_side_area">
                    <a href="/reservation" className="btn-main btn-line" onClick={closeMenu}>
                      Reservation
                    </a>
                    <button
                      type="button"
                      id="menu-btn"
                      className={menuOpen ? "open react-menu-btn" : "react-menu-btn"}
                      onClick={() => setMenuOpen((current) => !current)}
                      aria-label="Toggle menu"
                      aria-expanded={menuOpen}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setMenuOpen((current) => !current);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {mobileMenuPortal}
    </>
  );
}

export default Header;
