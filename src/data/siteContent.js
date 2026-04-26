export const navItems = [
  { label: "Home", href: "#section-intro" },
  { label: "Rooms", href: "#section-rooms" },
  { label: "Reservation", href: "#reservation-bar" },
  { label: "Facilities", href: "#section-facilities" },
  { label: "Contact", href: "#footer" },
];

export const heroSlides = [
  {
    image: "/images/slider/1.jpg",
    title: "Where Every Stay is Extraordinary",
    text: "Discover the perfect blend of luxury, comfort, and convenience at Almaris. Nestled in the heart of Brooklyn, our hotel is your gateway to an unforgettable experience.",
  },
  {
    image: "/images/slider/2.jpg",
    title: "Experience Hospitality Like Never Before",
    text: "Discover the perfect blend of luxury, comfort, and convenience at Almaris. Nestled in the heart of Brooklyn, our hotel is your gateway to an unforgettable experience.",
  },
];

export const features = [
  ["Restaurant", "/images/svg/restaurant-svgrepo-com.svg"],
  ["Swimming Pool", "/images/svg/swimming-pool-svgrepo-com.svg"],
  ["Fitness Center", "/images/svg/fitness-gym-svgrepo-com.svg"],
  ["Spa & Massage", "/images/svg/flower-lotus-thin-svgrepo-com.svg"],
  ["Meeting Room", "/images/svg/meeting-explain-svgrepo-com.svg"],
  ["Laundry Service", "/images/svg/laundry-machine-svgrepo-com.svg"],
].map(([title, icon]) => ({
  title,
  icon,
  text: "Do dolore laboris commodo amet cillum qui voluptate velit occaecat adipisicing laboris est minim.",
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
    title: "Standard Room",
    price: "$129",
    guests: "2 Guests",
    size: "30 ft",
    image: "/images/room/1.webp",
    formImage: "/images/form/1.jpg",
    description: "A calm, well-appointed stay with essential comforts for quick city breaks.",
    bed: "1 King Bed",
    amenities: ["Cable TV", "Free WiFi", "Work Desk"],
    rateLabel: "Flexible Rate",
    rateNote: "Free cancellation up to 48 hours before arrival.",
    badge: "Recommended",
    bestFor: "Quick city stays",
  },
  {
    title: "Deluxe Room",
    price: "$129",
    guests: "2 Guests",
    size: "35 ft",
    image: "/images/room/2.webp",
    formImage: "/images/form/2.jpg",
    description: "A brighter, more spacious room with a refined finish and added lounge comfort.",
    bed: "1 King Bed",
    amenities: ["Cable TV", "Safebox", "Free WiFi"],
    rateLabel: "Best Available",
    rateNote: "Pay at property. Breakfast can be added during booking.",
    badge: "Popular",
    bestFor: "Couples",
  },
  {
    title: "Premier Room",
    price: "$139",
    guests: "2 Guests",
    size: "35 ft",
    image: "/images/room/3.webp",
    formImage: "/images/form/3.jpg",
    description: "An elevated stay with added privacy, polished details, and city-facing comfort.",
    bed: "1 King Bed",
    amenities: ["Cable TV", "City View", "Safebox"],
    rateLabel: "Flexible Rate",
    rateNote: "Free cancellation up to 72 hours before arrival.",
    badge: "City View",
    bestFor: "Business travel",
  },
  {
    title: "Family Suite",
    price: "$149",
    guests: "4 Guests",
    size: "60 ft",
    image: "/images/room/4.webp",
    formImage: "/images/form/4.jpg",
    description: "Designed for longer stays and family travel with more room to spread out.",
    bed: "2 Queen Beds",
    amenities: ["Free WiFi", "Work Desk", "Balcony"],
    rateLabel: "Family Offer",
    rateNote: "Includes extra space for family stays and flexible modification.",
    badge: "Family Pick",
    bestFor: "Families",
  },
  {
    title: "Luxury Suite",
    price: "$179",
    guests: "4 Guests",
    size: "60 ft",
    image: "/images/room/5.webp",
    formImage: "/images/form/5.jpg",
    description: "A richer suite experience with premium finishes and a more spacious layout.",
    bed: "1 King Bed",
    amenities: ["Balcony", "Safebox", "City View"],
    rateLabel: "Suite Saver",
    rateNote: "Special direct-booking rate with limited availability.",
    badge: "Suite Upgrade",
    bestFor: "Longer stays",
  },
  {
    title: "Presidential Suite",
    price: "$199",
    guests: "4 Guests",
    size: "60 ft",
    image: "/images/room/6.webp",
    formImage: "/images/form/6.jpg",
    description: "Our most elevated stay, tailored for guests who want space, privacy, and polish.",
    bed: "1 King Bed",
    amenities: ["City View", "Balcony", "Work Desk"],
    rateLabel: "Signature Stay",
    rateNote: "Priority room class with concierge-level support after booking.",
    badge: "Top Tier",
    bestFor: "Special occasions",
  },
].map((room) => ({
  ...room,
  detailsHref: "#",
}));

export const testimonials = Array.from({ length: 4 }, () => ({
  quote:
    "Experience unparalleled luxury and personalized service at Almaris Hotel, where every stay is a journey into sophistication, comfort, and unforgettable memories.",
  author: "Donette Fondren",
}));

export const facilityHighlights = [
  {
    image: "/images/misc/7.webp",
    value: "120+",
    title: "Rooms Available",
    text: "Officia ullamco quis sunt adipisicing occaecat eiusmod ea ea velit deserunt.",
  },
  {
    image: "/images/misc/8.webp",
    value: "105+",
    title: "Menu Selection",
    text: "Officia ullamco quis sunt adipisicing occaecat eiusmod ea ea velit deserunt.",
  },
];

export const galleryImages = Array.from({ length: 8 }, (_, index) => ({
  href: "#",
  image: `/images/gallery-square/${index + 1}.webp`,
}));

export const footerContent = {
  address: ["742 Evergreen Terrace", "Brooklyn, NY 11201"],
  phone: "+929 333 9296",
  email: "contact@almaris.com",
  socials: [
    "facebook-f",
    "instagram",
    "twitter",
    "youtube",
  ],
};

export const carouselBreakpoints = {
  0: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  1200: { slidesPerView: 3 },
};
