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
import { isSupabaseConfigured, supabase } from "./supabaseClient";

function formatPrice(amount, currency = "USD") {
  if (!Number.isFinite(Number(amount))) {
    return "$0";
  }

  const symbol = currency === "USD" ? "$" : `${currency} `;
  return `${symbol}${Number(amount)}`;
}

function buildRoomPresentationIndex() {
  return new Map(
    fallbackRooms.map((room) => [
      room.code ?? room.title.toLowerCase().replace(/\s+/g, "-"),
      room,
    ]),
  );
}

function mapHotelRow(hotelRow) {
  return {
    ...fallbackHotelConfig,
    id: hotelRow.id,
    organizationId: hotelRow.organization_id,
    name: hotelRow.name,
    websiteLabel: hotelRow.website_label ?? fallbackHotelConfig.websiteLabel,
    websiteUrl: hotelRow.website_url ?? fallbackHotelConfig.websiteUrl,
    timezone: hotelRow.timezone ?? fallbackHotelConfig.timezone,
    currency: hotelRow.currency ?? fallbackHotelConfig.currency,
    address: [
      hotelRow.address_line_1 ?? fallbackFooterContent.address[0],
      hotelRow.address_line_2 ?? fallbackFooterContent.address[1],
    ],
    phone: hotelRow.contact_phone ?? fallbackFooterContent.phone,
    email: hotelRow.contact_email ?? fallbackFooterContent.email,
    socials: Array.isArray(hotelRow.social_handles) ? hotelRow.social_handles : fallbackFooterContent.socials,
    aboutHeading: hotelRow.about_heading ?? "Refined Comfort, Modern Style, And A Relaxed Kingston Setting",
    aboutSubheading: hotelRow.about_subheading ?? "Close to city attractions, dining, and nightlife.",
    nearbyIntro: hotelRow.nearby_intro ?? "Stay close to Kingston culture, shopping, dining, nightlife, and everyday essentials from 58 Westminster Ave.",
    contactHeroHeading: hotelRow.contact_hero_heading ?? "Contact Royale Jazz Hotel",
    contactHeroText: hotelRow.contact_hero_text ?? "Whether you are planning a stay, updating an existing reservation, or simply need help before arrival, our team is here to make the next step easy.",
    contactIntro: hotelRow.contact_intro ?? "Use the form for detailed requests, or contact the hotel directly if you need a faster answer about your stay.",
    contactLocationText: hotelRow.contact_location_text ?? "Royale Jazz Hotel places guests close to Kingston highlights including Devon House, the Bob Marley Museum, Half-Way-Tree, and nearby dining and nightlife options just minutes away.",
    mapEmbedUrl: hotelRow.map_embed_url ?? "https://www.google.com/maps?q=58+Westminster+Ave+Kingston+Jamaica&output=embed",
    mapDirectionsUrl: hotelRow.map_directions_url ?? "https://maps.google.com/?q=58+Westminster+Ave+Kingston+Jamaica",
    aboutPageHeading: hotelRow.about_page_heading ?? "About Royale Jazz Hotel",
    aboutPageIntro: hotelRow.about_page_intro ?? "Royale Jazz Hotel is presented as a modern glam destination with a timeless, refined personality. Set within a relaxing, fruit-filled backdrop, it offers a stay that feels polished while keeping guests close to the energy of the city.",
    aboutPageBody: hotelRow.about_page_body ?? "The hotel is positioned for both leisure and corporate travel, with in-room essentials like air conditioning, refrigerator, microwave, and a sleek work station to support a comfortable, practical experience.",
    aboutPageRoomFacilitiesHeading: hotelRow.about_page_room_facilities_heading ?? "Room Facilities",
    homeCtaEyebrow: hotelRow.home_cta_eyebrow ?? "Direct Booking",
    homeCtaHeading: hotelRow.home_cta_heading ?? "Stay Close To Kingston's Best",
    homeCtaBody: hotelRow.home_cta_body ?? "Book directly with Royale Jazz Hotel for spacious suites, a relaxed setting, and easy access to the city's dining, culture, shopping, and nightlife.",
    homeCtaPoints: Array.isArray(hotelRow.home_cta_points) ? hotelRow.home_cta_points : ["Comfort Suite and Double Double Suite", "USD 140 per night", "Pool and garden view options"],
    homeCtaImageUrl: hotelRow.home_cta_image_url ?? "/images/slider/royale-jazz-hero-2.png",
  };
}

function buildRoomAvailabilityIndex(roomRows) {
  return roomRows.reduce((index, roomRow) => {
    const current = index.get(roomRow.room_type_id) ?? { total: 0, available: 0 };
    current.total += 1;

    if (roomRow.status === "available") {
      current.available += 1;
    }

    index.set(roomRow.room_type_id, current);
    return index;
  }, new Map());
}

function buildAvailabilityBadge(availability) {
  if (!availability || availability.total === 0) {
    return "On Request";
  }

  if (availability.available <= 0) {
    return "Currently Full";
  }

  return `${availability.available} Available`;
}

function buildRoomTypeGalleryIndex(imageRows) {
  return imageRows.reduce((index, imageRow) => {
    const current = index.get(imageRow.room_type_id) ?? [];
    current.push({
      image: imageRow.image_url,
      alt: imageRow.alt_text ?? "Room gallery image",
    });
    index.set(imageRow.room_type_id, current);
    return index;
  }, new Map());
}

function mapRoomTypeRows(roomTypeRows, roomRows, roomTypeGalleryRows, hotel) {
  const roomPresentationIndex = buildRoomPresentationIndex();
  const roomAvailabilityIndex = buildRoomAvailabilityIndex(roomRows);
  const roomTypeGalleryIndex = buildRoomTypeGalleryIndex(roomTypeGalleryRows);

  return roomTypeRows.map((roomTypeRow) => {
    const fallbackRoom = roomPresentationIndex.get(roomTypeRow.code) ?? {};
    const guestCount = roomTypeRow.max_adults + roomTypeRow.max_children;
    const availability = roomAvailabilityIndex.get(roomTypeRow.id);

    return {
      ...fallbackRoom,
      code: roomTypeRow.code,
      title: roomTypeRow.title,
      price: formatPrice(roomTypeRow.base_rate, hotel.currency),
      guests: `${guestCount} Guest${guestCount === 1 ? "" : "s"}`,
      description: roomTypeRow.description ?? fallbackRoom.description,
      amenities: Array.isArray(roomTypeRow.amenities) ? roomTypeRow.amenities : fallbackRoom.amenities ?? [],
      rateLabel: roomTypeRow.rate_label ?? fallbackRoom.rateLabel ?? "Standard Rate",
      rateNote: roomTypeRow.rate_note ?? fallbackRoom.rateNote ?? `${hotel.currency} ${roomTypeRow.base_rate} per night.`,
      badge: buildAvailabilityBadge(availability),
      bestFor: roomTypeRow.best_for ?? fallbackRoom.bestFor ?? "Direct booking",
      bed: roomTypeRow.bed_label ?? fallbackRoom.bed ?? "Suite Layout",
      size: roomTypeRow.size_label ?? fallbackRoom.size ?? "Suite",
      formImage: roomTypeRow.form_image_url ?? fallbackRoom.formImage,
      image: roomTypeRow.image_url ?? fallbackRoom.image,
      galleryImages:
        roomTypeGalleryIndex.get(roomTypeRow.id) ??
        fallbackRoom.galleryImages ??
        [
          {
            image: roomTypeRow.image_url ?? fallbackRoom.image,
            alt: `${roomTypeRow.title} photo`,
          },
        ].filter((item) => item.image),
      detailsHref: fallbackRoom.detailsHref ?? "#",
    };
  });
}

function mapHeroSlides(slideRows) {
  return slideRows.map((slideRow) => ({
    image: slideRow.image_url,
    title: slideRow.title,
    text: slideRow.text,
  }));
}

function mapFeatureItems(featureRows) {
  return featureRows.map((featureRow) => ({
    title: featureRow.title,
    text: featureRow.text,
    icon: featureRow.icon_url,
  }));
}

function mapNearbyHighlights(highlightRows) {
  return highlightRows.map((highlightRow) => ({
    image: highlightRow.image_url,
    value: highlightRow.distance_label,
    title: highlightRow.title,
    text: highlightRow.text,
    category: highlightRow.category,
  }));
}

function mapGalleryImages(imageRows) {
  return imageRows.map((imageRow) => ({
    href: imageRow.href ?? "#",
    image: imageRow.image_url,
    alt: imageRow.alt_text ?? "Hotel gallery image",
  }));
}

function mapAboutStats(statRows) {
  return statRows.map((statRow) => ({
    image: statRow.image_url,
    value: statRow.value,
    label: statRow.label,
    className: statRow.class_name,
  }));
}

function mapAboutFacilityItems(itemRows) {
  return itemRows.map((itemRow) => ({
    title: itemRow.title,
    text: itemRow.text,
    icon: itemRow.icon_url,
  }));
}

function mapTestimonials(testimonialRows) {
  return testimonialRows.map((testimonialRow) => ({
    quote: testimonialRow.quote,
    author: testimonialRow.author,
  }));
}

export async function fetchPublicHotelContent(hotelId) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      source: "fallback",
      hotel: fallbackHotelConfig,
      rooms: fallbackRooms,
      heroSlides: fallbackHeroSlides,
      features: fallbackFeatures,
      facilityHighlights: fallbackFacilityHighlights,
      galleryImages: fallbackGalleryImages,
      testimonials: fallbackTestimonials,
      footerContent: fallbackFooterContent,
    };
  }

  const [{ data: hotelRow, error: hotelError }, { data: roomTypeRows, error: roomTypeError }, { data: roomRows, error: roomError }, { data: roomTypeGalleryRows, error: roomTypeGalleryError }, { data: heroSlideRows, error: heroSlideError }, { data: featureRows, error: featureError }, { data: nearbyRows, error: nearbyError }, { data: galleryRows, error: galleryError }, { data: aboutStatRows, error: aboutStatError }, { data: aboutFacilityRows, error: aboutFacilityError }, { data: testimonialRows, error: testimonialError }] = await Promise.all([
    supabase.from("hotels").select("*").eq("id", hotelId).single(),
    supabase.from("room_types").select("*").eq("hotel_id", hotelId).eq("is_active", true).order("display_order", { ascending: true }).order("base_rate", { ascending: true }),
    supabase.from("rooms").select("id, room_type_id, status").eq("hotel_id", hotelId),
    supabase.from("room_type_gallery_images").select("*").eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("hotel_hero_slides").select("*").eq("hotel_id", hotelId).eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("hotel_feature_items").select("*").eq("hotel_id", hotelId).eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("hotel_nearby_highlights").select("*").eq("hotel_id", hotelId).eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("hotel_gallery_images").select("*").eq("hotel_id", hotelId).eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("hotel_about_stats").select("*").eq("hotel_id", hotelId).eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("hotel_about_facility_items").select("*").eq("hotel_id", hotelId).eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("hotel_testimonials").select("*").eq("hotel_id", hotelId).eq("is_active", true).order("display_order", { ascending: true }),
  ]);

  if (hotelError || roomTypeError || roomError || roomTypeGalleryError || heroSlideError || featureError || nearbyError || galleryError || aboutStatError || aboutFacilityError || testimonialError) {
    throw hotelError || roomTypeError || roomError || roomTypeGalleryError || heroSlideError || featureError || nearbyError || galleryError || aboutStatError || aboutFacilityError || testimonialError;
  }

  const hotel = mapHotelRow(hotelRow);
  const filteredRoomTypeGalleryRows = (roomTypeGalleryRows ?? []).filter((imageRow) =>
    roomTypeRows?.some((roomType) => roomType.id === imageRow.room_type_id),
  );
  const rooms = mapRoomTypeRows(roomTypeRows, roomRows ?? [], filteredRoomTypeGalleryRows, hotel);
  const heroSlides = mapHeroSlides(heroSlideRows ?? []);
  const features = mapFeatureItems(featureRows ?? []);
  const facilityHighlights = mapNearbyHighlights(nearbyRows ?? []);
  const galleryImages = mapGalleryImages(galleryRows ?? []);
  const aboutStats = mapAboutStats(aboutStatRows ?? []);
  const aboutFacilityItems = mapAboutFacilityItems(aboutFacilityRows ?? []);
  const testimonials = mapTestimonials(testimonialRows ?? []);

  return {
    source: "supabase",
    hotel,
    rooms: rooms.length > 0 ? rooms : fallbackRooms,
    heroSlides: heroSlides.length > 0 ? heroSlides : fallbackHeroSlides,
    features: features.length > 0 ? features : fallbackFeatures,
    facilityHighlights: facilityHighlights.length > 0 ? facilityHighlights : fallbackFacilityHighlights,
    galleryImages: galleryImages.length > 0 ? galleryImages : fallbackGalleryImages,
    aboutStats,
    aboutFacilityItems,
    testimonials: testimonials.length > 0 ? testimonials : fallbackTestimonials,
    footerContent: {
      address: hotel.address,
      phone: hotel.phone,
      email: hotel.email,
      socials: hotel.socials,
    },
  };
}
