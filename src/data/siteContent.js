export const navItems = [
  { label: "Home", href: "#section-intro" },
  { label: "Rooms", href: "#section-rooms" },
  { label: "Reservation", href: "#reservation-bar" },
  { label: "Amenities", href: "#section-facilities" },
  { label: "Contact", href: "#footer" },
];

export const hotelConfig = {
  id: "royale-jazz-kingston",
  organizationId: "royale-jazz",
  name: "Royale Jazz Hotel",
  websiteLabel: "Royale Jazz site",
  websiteUrl: "royalejazzhotel.com",
  timezone: "America/Jamaica",
  currency: "USD",
};

export const heroSlides = [
  {
    image: "/images/slider/royale-jazz-hero-1.png",
    title: "Modern Glam In The Heart Of Kingston",
    text: "Royale Jazz Hotel blends modern glam with timeless sophistication at 58 Westminster Ave, placing guests close to the city's dining, culture, and nightlife.",
  },
  {
    image: "/images/slider/royale-jazz-hero-2.png",
    title: "Relaxed Comfort With A Refined Edge",
    text: "From restful in-room essentials to a calm, fruit-filled setting, Royale Jazz Hotel offers a polished stay for leisure guests and busy corporate travellers alike.",
  },
];

export const features = [
  ["Swimming Pool", "/images/svg/swimming-pool-svgrepo-com.svg"],
  ["Fitness Center", "/images/svg/fitness-gym-svgrepo-com.svg"],
  ["Continental Breakfast", "/images/svg/restaurant-svgrepo-com.svg"],
  ["Jetted Tub Jacuzzi", "/images/svg/flower-lotus-thin-svgrepo-com.svg"],
  ["Game Room", "/images/svg/meeting-explain-svgrepo-com.svg"],
  ["Nearby Dining", "/images/svg/restaurant-svgrepo-com.svg"],
].map(([title, icon]) => ({
  title,
  icon,
  text:
    {
      "Swimming Pool": "Unwind in a lush, relaxing pool setting designed for serenity and rejuvenation.",
      "Fitness Center": "Stay on routine with a fitness space described in the hotel brief as open 24 hours.",
      "Continental Breakfast": "Start the day with continental breakfast, with more dining options just minutes away.",
      "Jetted Tub Jacuzzi": "Enjoy a soothing jacuzzi experience created for calm, comfort, and quiet reset.",
      "Game Room": "Step away from screens and spend time connecting over board games.",
      "Nearby Dining": "Guests are within easy reach of nearby restaurants and nightlife options around the city.",
    }[title],
}));

export const roomAmenities = [
  { label: "guests", icon: "/images/icons/guests.png" },
  { label: "size", icon: "/images/icons/size.png" },
  { label: "Connecting Rooms", icon: "/images/icons/door.png" },
  { label: "1 King Bed", icon: "/images/icons/bed.png" },
  { label: "Cable TV", icon: "/images/icons/tv.png" },
  { label: "Shower", icon: "/images/icons/shower.png" },
  { label: "Safebox", icon: "/images/icons/safebox.png" },
  { label: "Free WiFi", icon: "/images/icons/wifi.png" },
  { label: "Work Desk", icon: "/images/icons/desk.png" },
  { label: "Balcony", icon: "/images/icons/balcony.png" },
  { label: "Bathub", icon: "/images/icons/bathub.png" },
  { label: "City View", icon: "/images/icons/city.png" },
];

export const rooms = [
  {
    title: "Comfort Suite",
    code: "comfort-suite",
    price: "$140",
    guests: "2 Guests",
    size: "Oversized Suite",
    image: "/images/room/comfort-suite-homepage.jpg",
    formImage: "/images/form/1.jpg",
    description: "A spacious suite designed for comfort, with a dedicated workspace, sofa seating, and the essentials for a polished Kingston stay.",
    bed: "Suite Layout",
    amenities: ["Free WiFi", "Microwave", "Refrigerator"],
    rateLabel: "Standard Rate",
    rateNote: "USD 140 per night. Pool-view and garden-view options may be available.",
    badge: "13 Available",
    bestFor: "Couples and business travel",
    galleryImages: [
      { image: "/images/room/comfort-suite-homepage.jpg", alt: "Comfort Suite main photo" },
      { image: "/images/form/1.jpg", alt: "Comfort Suite alternate photo" },
    ],
  },
  {
    title: "Double Double Suite",
    code: "double-double-suite",
    price: "$140",
    guests: "3 Guests",
    size: "Oversized Suite",
    image: "/images/room/2.webp",
    formImage: "/images/form/2.jpg",
    description: "A larger suite option for up to three guests, offering the same oversized comfort with workspace, seating, and in-room convenience.",
    bed: "Double Double Layout",
    amenities: ["Free WiFi", "Microwave", "Refrigerator"],
    rateLabel: "Standard Rate",
    rateNote: "USD 140 per night. Pool-view and garden-view options may be available.",
    badge: "3 Available",
    bestFor: "Small groups and longer stays",
    galleryImages: [
      { image: "/images/room/2.webp", alt: "Double Double Suite main photo" },
      { image: "/images/form/2.jpg", alt: "Double Double Suite alternate photo" },
    ],
  },
].map((room) => ({
  ...room,
  detailsHref: "#",
}));

export const testimonials = [];

export const facilityHighlights = [
  {
    image: "/images/nearby/bob-marley-museum.jpg",
    value: "Nearby",
    title: "Bob Marley Museum",
    text: "Visit one of Kingston's best-known cultural landmarks just a short drive from the hotel.",
    category: "Culture",
  },
  {
    image: "/images/nearby/devon-house.jpg",
    value: "Nearby",
    title: "Devon House",
    text: "Explore a classic Kingston destination known for heritage charm, shops, and local food spots.",
    category: "Landmark",
  },
  {
    image: "/images/nearby/half-way-tree.jpg",
    value: "Nearby",
    title: "Half-Way-Tree",
    text: "Stay close to one of the city's busiest commercial areas for shopping, errands, and easy connections.",
    category: "Shopping",
  },
  {
    image: "/images/nearby/di-lot.jpg",
    value: "2 min",
    title: "Di Lot",
    text: "A quick trip away for live music, drinks, and a relaxed restaurant atmosphere.",
    category: "Dining",
  },
  {
    image: "/images/nearby/meca-nightclub.jpg",
    value: "2 min",
    title: "Meca Night Club",
    text: "Enjoy nearby nightlife when you want your evenings to carry the city's energy.",
    category: "Nightlife",
  },
  {
    image: "/images/nearby/marketplace.jpg",
    value: "2 min",
    title: "Market Place",
    text: "Reach a lively mix of restaurants and casual dining options just minutes from the hotel.",
    category: "Restaurants",
  },
  {
    image: "/images/nearby/medical-associates.jpg",
    value: "Nearby",
    title: "Medical Associates Hospital",
    text: "A practical nearby point of access for guests who need to stay close to medical services.",
    category: "Essential",
  },
];

export const galleryImages = Array.from({ length: 8 }, (_, index) => ({
  href: "#",
  image: `/images/gallery-square/${index + 1}.webp`,
}));

export const footerContent = {
  address: ["58 Westminster Ave", "Kingston, Jamaica"],
  phone: "+1-876-589-2424",
  email: "royalejazzhotel@gmail.com",
  socials: [
    "facebook-f",
    "instagram",
  ],
};

export const carouselBreakpoints = {
  0: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  1200: { slidesPerView: 3 },
};
