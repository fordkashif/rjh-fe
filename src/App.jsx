import Footer from "./components/Footer";
import Header from "./components/Header";
import { PublicHotelContentProvider } from "./context/PublicHotelContentContext";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import RoomsPage from "./pages/RoomsPage";

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const isAboutPage = pathname === "/about";
  const isRoomsPage = pathname === "/rooms";
  const isReservationPage = pathname === "/reservation";
  const isContactPage = pathname === "/contact";
  const isSecondaryPage = isAboutPage || isRoomsPage || isReservationPage || isContactPage;

  let page = <HomePage />;

  if (isAboutPage) {
    page = <AboutPage />;
  } else if (isRoomsPage) {
    page = <RoomsPage />;
  } else if (isReservationPage) {
    page = <ReservationPage />;
  } else if (isContactPage) {
    page = <ContactPage />;
  }

  return (
    <PublicHotelContentProvider>
      <div id="wrapper">
        <a href="#top" id="back-to-top" />

        <Header isSecondaryPage={isSecondaryPage} />

        {page}

        <Footer />
      </div>
    </PublicHotelContentProvider>
  );
}

export default App;
