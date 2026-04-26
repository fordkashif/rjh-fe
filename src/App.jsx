import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const isAboutPage = pathname === "/about";
  const isReservationPage = pathname === "/reservation";
  const isContactPage = pathname === "/contact";
  const isSecondaryPage = isAboutPage || isReservationPage || isContactPage;

  let page = <HomePage />;

  if (isAboutPage) {
    page = <AboutPage />;
  } else if (isReservationPage) {
    page = <ReservationPage />;
  } else if (isContactPage) {
    page = <ContactPage />;
  }

  return (
    <div id="wrapper">
      <a href="#top" id="back-to-top" />

      <Header isSecondaryPage={isSecondaryPage} />

      {page}

      <Footer />
    </div>
  );
}

export default App;
