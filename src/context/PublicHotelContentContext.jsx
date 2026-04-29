import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchPublicHotelContent } from "../lib/publicHotelService";

const DEFAULT_HOTEL_ID = import.meta.env.VITE_PUBLIC_HOTEL_ID ?? "royale-jazz-kingston";

const EMPTY_HOTEL = {
  id: DEFAULT_HOTEL_ID,
  organizationId: "",
  name: "",
  websiteLabel: "",
  websiteUrl: "",
  timezone: "",
  currency: "USD",
  address: [],
  phone: "",
  email: "",
  socials: [],
  aboutHeading: "",
  aboutSubheading: "",
  nearbyIntro: "",
  contactHeroHeading: "",
  contactHeroText: "",
  contactIntro: "",
  contactLocationText: "",
  mapEmbedUrl: "",
  mapDirectionsUrl: "",
  aboutPageHeading: "",
  aboutPageIntro: "",
  aboutPageBody: "",
  aboutPageRoomFacilitiesHeading: "",
  homeCtaEyebrow: "",
  homeCtaHeading: "",
  homeCtaBody: "",
  homeCtaPoints: [],
  homeCtaImageUrl: "",
};

const EMPTY_FOOTER = {
  address: [],
  phone: "",
  email: "",
  socials: [],
};

const PublicHotelContentContext = createContext(null);

export function PublicHotelContentProvider({ children }) {
  const [hotel, setHotel] = useState(EMPTY_HOTEL);
  const [rooms, setRooms] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [features, setFeatures] = useState([]);
  const [facilityHighlights, setFacilityHighlights] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [aboutStats, setAboutStats] = useState([]);
  const [aboutFacilityItems, setAboutFacilityItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [footerContent, setFooterContent] = useState(EMPTY_FOOTER);
  const [loadState, setLoadState] = useState({ status: "idle", error: "" });

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      setLoadState({ status: "loading", error: "" });

      try {
        const content = await fetchPublicHotelContent(DEFAULT_HOTEL_ID);
        if (!isMounted) {
          return;
        }

        setHotel(content.hotel);
        setRooms(content.rooms ?? []);
        setHeroSlides(content.heroSlides ?? []);
        setFeatures(content.features ?? []);
        setFacilityHighlights(content.facilityHighlights ?? []);
        setGalleryImages(content.galleryImages ?? []);
        setAboutStats(content.aboutStats ?? []);
        setAboutFacilityItems(content.aboutFacilityItems ?? []);
        setTestimonials(content.testimonials ?? []);
        setFooterContent(content.footerContent ?? EMPTY_FOOTER);
        setLoadState({ status: "ready", error: "" });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setHotel(EMPTY_HOTEL);
        setRooms([]);
        setHeroSlides([]);
        setFeatures([]);
        setFacilityHighlights([]);
        setGalleryImages([]);
        setAboutStats([]);
        setAboutFacilityItems([]);
        setTestimonials([]);
        setFooterContent(EMPTY_FOOTER);
        setLoadState({
          status: "error",
          error: error?.message ?? "Failed to load hotel content.",
        });
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      hotel,
      rooms,
      heroSlides,
      features,
      facilityHighlights,
      galleryImages,
      aboutStats,
      aboutFacilityItems,
      testimonials,
      footerContent,
      loadState,
    }),
    [aboutFacilityItems, aboutStats, facilityHighlights, features, footerContent, galleryImages, heroSlides, hotel, rooms, testimonials, loadState],
  );

  return <PublicHotelContentContext.Provider value={value}>{children}</PublicHotelContentContext.Provider>;
}

export function usePublicHotelContent() {
  const context = useContext(PublicHotelContentContext);

  if (!context) {
    throw new Error("usePublicHotelContent must be used within a PublicHotelContentProvider");
  }

  return context;
}
