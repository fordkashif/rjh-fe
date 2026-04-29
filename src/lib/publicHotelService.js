import { isSupabaseConfigured, supabase } from "./supabaseClient";

function requireConfiguredPublicClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Hotel details are temporarily unavailable. Please try again shortly.");
  }
}

function formatPrice(amount, currency = "USD") {
  if (!Number.isFinite(Number(amount))) {
    return "$0";
  }

  const symbol = currency === "USD" ? "$" : `${currency} `;
  return `${symbol}${Number(amount)}`;
}

function mapHotelRow(hotelRow) {
  return {
    id: hotelRow.id,
    organizationId: hotelRow.organization_id,
    name: hotelRow.name ?? "",
    websiteLabel: hotelRow.website_label ?? "",
    websiteUrl: hotelRow.website_url ?? "",
    timezone: hotelRow.timezone ?? "",
    currency: hotelRow.currency ?? "USD",
    address: [hotelRow.address_line_1, hotelRow.address_line_2].filter(Boolean),
    phone: hotelRow.contact_phone ?? "",
    email: hotelRow.contact_email ?? "",
    socials: Array.isArray(hotelRow.social_handles) ? hotelRow.social_handles : [],
    aboutHeading: hotelRow.about_heading ?? "",
    aboutSubheading: hotelRow.about_subheading ?? "",
    nearbyIntro: hotelRow.nearby_intro ?? "",
    contactHeroHeading: hotelRow.contact_hero_heading ?? "",
    contactHeroText: hotelRow.contact_hero_text ?? "",
    contactIntro: hotelRow.contact_intro ?? "",
    contactLocationText: hotelRow.contact_location_text ?? "",
    mapEmbedUrl: hotelRow.map_embed_url ?? "",
    mapDirectionsUrl: hotelRow.map_directions_url ?? "",
    aboutPageHeading: hotelRow.about_page_heading ?? "",
    aboutPageIntro: hotelRow.about_page_intro ?? "",
    aboutPageBody: hotelRow.about_page_body ?? "",
    aboutPageRoomFacilitiesHeading: hotelRow.about_page_room_facilities_heading ?? "",
    homeCtaEyebrow: hotelRow.home_cta_eyebrow ?? "",
    homeCtaHeading: hotelRow.home_cta_heading ?? "",
    homeCtaBody: hotelRow.home_cta_body ?? "",
    homeCtaPoints: Array.isArray(hotelRow.home_cta_points) ? hotelRow.home_cta_points : [],
    homeCtaImageUrl: hotelRow.home_cta_image_url ?? "",
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
  const roomAvailabilityIndex = buildRoomAvailabilityIndex(roomRows);
  const roomTypeGalleryIndex = buildRoomTypeGalleryIndex(roomTypeGalleryRows);

  return roomTypeRows.map((roomTypeRow) => {
    const guestCount = Number(roomTypeRow.max_adults ?? 0) + Number(roomTypeRow.max_children ?? 0);
    const availability = roomAvailabilityIndex.get(roomTypeRow.id);
    const galleryImages = roomTypeGalleryIndex.get(roomTypeRow.id) ?? [];
    const primaryImage = roomTypeRow.image_url ?? roomTypeRow.form_image_url ?? galleryImages[0]?.image ?? "";

    return {
      code: roomTypeRow.code,
      title: roomTypeRow.title ?? roomTypeRow.code,
      price: formatPrice(roomTypeRow.base_rate, hotel.currency),
      guests: `${guestCount || 1} Guest${guestCount === 1 ? "" : "s"}`,
      description: roomTypeRow.description ?? "",
      amenities: Array.isArray(roomTypeRow.amenities) ? roomTypeRow.amenities : [],
      rateLabel: roomTypeRow.rate_label ?? "Standard Rate",
      rateNote: roomTypeRow.rate_note ?? `${hotel.currency} ${roomTypeRow.base_rate ?? 0} per night.`,
      badge: buildAvailabilityBadge(availability),
      bestFor: roomTypeRow.best_for ?? "",
      bed: roomTypeRow.bed_label ?? "",
      size: roomTypeRow.size_label ?? "",
      formImage: roomTypeRow.form_image_url ?? primaryImage,
      image: primaryImage,
      galleryImages: galleryImages.length
        ? galleryImages
        : [{ image: primaryImage, alt: `${roomTypeRow.title ?? roomTypeRow.code} photo` }].filter((item) => item.image),
      detailsHref: "#",
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
  requireConfiguredPublicClient();

  const [
    { data: hotelRow, error: hotelError },
    { data: roomTypeRows, error: roomTypeError },
    { data: roomRows, error: roomError },
    { data: roomTypeGalleryRows, error: roomTypeGalleryError },
    { data: heroSlideRows, error: heroSlideError },
    { data: featureRows, error: featureError },
    { data: nearbyRows, error: nearbyError },
    { data: galleryRows, error: galleryError },
    { data: aboutStatRows, error: aboutStatError },
    { data: aboutFacilityRows, error: aboutFacilityError },
    { data: testimonialRows, error: testimonialError },
  ] = await Promise.all([
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

  return {
    hotel,
    rooms: mapRoomTypeRows(roomTypeRows ?? [], roomRows ?? [], filteredRoomTypeGalleryRows, hotel),
    heroSlides: mapHeroSlides(heroSlideRows ?? []),
    features: mapFeatureItems(featureRows ?? []),
    facilityHighlights: mapNearbyHighlights(nearbyRows ?? []),
    galleryImages: mapGalleryImages(galleryRows ?? []),
    aboutStats: mapAboutStats(aboutStatRows ?? []),
    aboutFacilityItems: mapAboutFacilityItems(aboutFacilityRows ?? []),
    testimonials: mapTestimonials(testimonialRows ?? []),
    footerContent: {
      address: hotel.address,
      phone: hotel.phone,
      email: hotel.email,
      socials: hotel.socials,
    },
  };
}
