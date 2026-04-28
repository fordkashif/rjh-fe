import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  features as fallbackFeatures,
  facilityHighlights as fallbackFacilityHighlights,
  footerContent as fallbackFooterContent,
  galleryImages as fallbackGalleryImages,
  heroSlides as fallbackHeroSlides,
  hotelConfig as fallbackHotelConfig,
  rooms as fallbackRooms,
  testimonials as fallbackTestimonials,
} from "../data/siteContent";
import { fetchPublicHotelContent } from "../lib/publicHotelService";

const PublicHotelContentContext = createContext(null);

export function PublicHotelContentProvider({ children }) {
  const [hotel, setHotel] = useState(fallbackHotelConfig);
  const [rooms, setRooms] = useState(fallbackRooms);
  const [heroSlides, setHeroSlides] = useState(fallbackHeroSlides);
  const [features, setFeatures] = useState(fallbackFeatures);
  const [facilityHighlights, setFacilityHighlights] = useState(fallbackFacilityHighlights);
  const [galleryImages, setGalleryImages] = useState(fallbackGalleryImages);
  const [aboutStats, setAboutStats] = useState([]);
  const [aboutFacilityItems, setAboutFacilityItems] = useState([]);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [footerContent, setFooterContent] = useState(fallbackFooterContent);
  const [loadState, setLoadState] = useState({ status: "idle", error: "", source: "fallback" });

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      setLoadState({ status: "loading", error: "", source: "fallback" });

      try {
        const content = await fetchPublicHotelContent(fallbackHotelConfig.id);
        if (!isMounted) {
          return;
        }

        setHotel(content.hotel);
        setRooms(content.rooms);
        setHeroSlides(content.heroSlides);
        setFeatures(content.features);
        setFacilityHighlights(content.facilityHighlights);
        setGalleryImages(content.galleryImages);
        setAboutStats(content.aboutStats ?? []);
        setAboutFacilityItems(content.aboutFacilityItems ?? []);
        setTestimonials(content.testimonials ?? fallbackTestimonials);
        setFooterContent(content.footerContent);
        setLoadState({ status: "ready", error: "", source: content.source });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setHotel(fallbackHotelConfig);
        setRooms(fallbackRooms);
        setHeroSlides(fallbackHeroSlides);
        setFeatures(fallbackFeatures);
        setFacilityHighlights(fallbackFacilityHighlights);
        setGalleryImages(fallbackGalleryImages);
        setAboutStats([]);
        setAboutFacilityItems([]);
        setTestimonials(fallbackTestimonials);
        setFooterContent(fallbackFooterContent);
        setLoadState({
          status: "error",
          error: error?.message ?? "Failed to load hotel content.",
          source: "fallback",
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
