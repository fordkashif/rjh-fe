# Royale Jazz Hotel Text Audit

This document maps the current website text to the information provided in:

- `/Users/abigailsubarney/Downloads/58 Westminster Ave, Royale Jazz Hotel (2) (1).pdf`

## 1. Confirmed Source Content From The PDF

These are the details we can safely use right now.

### Brand / positioning

- Hotel name: `Royale Jazz Hotel`
- Address reference in document title: `58 Westminster Ave`
- Brand tone: modern glam, timeless, refined, sophisticated
- Core description:
  `Royale Jazz Hotel exudes modern glam, infused with a hint of timeless, refined, unpredictable sophistication.`

### Location / nearby places

- Bob Marley Museum
- Half-Way-Tree Shopping Malls
- Devon House
- Di Lot (live music, bar, restaurant) - two minutes away
- Medical Associates Hospital
- Meca Night Club - two minutes away
- Market Place (diversity of restaurants) - two minutes away

### Accommodation summary

- In-room experiences for the modern traveller
- Refrigerator
- Microwave
- Air conditioning
- Sleek work station
- Suitable for busy corporate guests

### Amenities confirmed in the PDF

- Swimming pool
- Fitness center
- Dining / continental breakfast + nearby restaurant options
- Jetted tub jacuzzi
- Game room

### Amenity descriptions from the PDF

- `Swimming Pool`: Unwind in a swimming pool surrounded by lush greenery for rejuvenation and serenity.
- `Fitness Center`: Gym is open 24 hours for a basic fitness routine.
- `Dining`: Continental breakfast is offered; guests can also dine at nearby restaurants within walking distance.
- `Jetted Tub Jacuzzi`: Positioned as a soothing, mood-lifting relaxation experience in a designated room.
- `Game Room`: Board games and in-person socializing are part of the experience.

## 2. Current Text Locations In The Codebase

## Shared content file

Most homepage text is driven from:

- [src/data/siteContent.js](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/data/siteContent.js:1)

Main sections inside that file:

- `heroSlides` at [src/data/siteContent.js](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/data/siteContent.js:9)
- `features` at [src/data/siteContent.js](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/data/siteContent.js:22)
- `rooms` at [src/data/siteContent.js](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/data/siteContent.js:50)
- `testimonials` at [src/data/siteContent.js](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/data/siteContent.js:146)
- `facilityHighlights` at [src/data/siteContent.js](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/data/siteContent.js:152)
- `footerContent` at [src/data/siteContent.js](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/data/siteContent.js:172)

### What needs changing there

- Hero headlines and hero paragraphs still use `Almaris` and `Brooklyn`.
- Feature descriptions are lorem ipsum placeholder text.
- Room names, room pricing, room sizes, room descriptions, rate labels, badges, and positioning are all template content.
- Testimonial quote and author are fake/template content.
- Facility highlight titles and descriptions are placeholder text.
- Footer address, phone, email, and socials are not Royale Jazz details.

## Homepage sections

- Hero wrapper: [src/components/sections/HeroSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/HeroSection.jsx:1)
- About intro section: [src/components/sections/AboutSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/AboutSection.jsx:1)
- Rooms carousel headings: [src/components/sections/RoomsSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/RoomsSection.jsx:1)
- Facilities block headings: [src/components/sections/FacilitiesSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/FacilitiesSection.jsx:1)
- Testimonial slider: [src/components/sections/TestimonialsSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/TestimonialsSection.jsx:1)
- Instagram section: [src/components/sections/InstagramSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/InstagramSection.jsx:1)

### Homepage text issues

- [src/components/sections/AboutSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/AboutSection.jsx:20)
  Uses `Welcome To Almaris`, a generic heading, and an unverified review claim: `4.9 out of 5` and `Based on 25000+ reviews`.
- [src/components/sections/RoomsSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/RoomsSection.jsx:12)
  Section heading has typo `Accomodation` and is still generic.
- [src/components/sections/FacilitiesSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/FacilitiesSection.jsx:9)
  Subtitle says `Rooms & Suites` even though this section is really amenity/facility content; `Our Facilites` is also misspelled.
- [src/components/sections/InstagramSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/InstagramSection.jsx:12)
  Instagram handle is fake template content: `@almaris_hotel_theme`.

## About page

- [src/pages/AboutPage.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/pages/AboutPage.jsx:1)

### What needs changing

- History copy at [src/pages/AboutPage.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/pages/AboutPage.jsx:78)
  Still describes `Almaris` with invented brand history.
- Stats at [src/pages/AboutPage.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/pages/AboutPage.jsx:26)
  `120+ Rooms Available` and `105% Menu Selection` are placeholder/template stats.
- Team section at [src/pages/AboutPage.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/pages/AboutPage.jsx:3)
  Uses fake team members and repeated `Founder & CEO` roles.
- Room facility descriptions at [src/pages/AboutPage.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/pages/AboutPage.jsx:41)
  Uses placeholder filler text.

## Contact page

- [src/pages/ContactPage.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/pages/ContactPage.jsx:1)

### What needs changing

- Brand name references still say `Almaris`.
- Map link and embed use a fake address in Brooklyn:
  [src/pages/ContactPage.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/pages/ContactPage.jsx:43)
  and
  [src/pages/ContactPage.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/pages/ContactPage.jsx:328)
- Arrival/location paragraph should be rewritten around `58 Westminster Ave` and the nearby Kingston destinations listed in the PDF.
- Contact methods depend on `footerContent`, so real phone/email/social links are still needed.

## Reservation page

- [src/pages/ReservationPage.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/pages/ReservationPage.jsx:1)
- [src/components/sections/ReservationSection.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/sections/ReservationSection.jsx:1)

### What needs changing

- Reservation hero still says `Reserve Your Stay at Almaris`.
- Reservation flow copy is usable structurally, but room inventory and pricing are template values pulled from `siteContent.js`.
- Direct-booking claims should be checked before keeping them, especially:
  `Best direct-booking rate shown on site`
  and policy language around cancellation/modification.

## Footer / header brand references

- Footer: [src/components/Footer.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/Footer.jsx:1)
- Header logo alts: [src/components/Header.jsx](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/components/Header.jsx:156)

### What needs changing

- `Almaris` alt text
- Footer copyright brand name
- Social links currently point to `#`

## 3. Content We Can Replace Immediately

These can be updated now using the PDF alone:

- Hotel name: replace `Almaris` with `Royale Jazz Hotel`
- Address reference: replace fake Brooklyn address with `58 Westminster Ave`
- Homepage hero/body positioning copy
- About intro / hotel overview copy
- Amenity list and amenity descriptions:
  swimming pool, fitness center, dining, jetted tub jacuzzi, game room
- Location copy featuring nearby attractions and venues

## 4. Content Still Missing Before Final Text Rewrite

These details are not in the PDF and should be confirmed before we fully rewrite the site.

### Contact details

- Full mailing address line beyond `58 Westminster Ave`
- Parish / city / postal details
- Primary phone number
- Email address
- Social media URLs
- Google Maps link or exact map pin

### Rooms and booking

- Actual room types
- Capacity per room
- Bed types
- Room sizes
- Room photos matched to room names
- Room rates or whether rates should be hidden until inquiry
- Cancellation / modification policy
- Check-in and check-out times

### Trust / proof points

- Whether there are real guest testimonials available
- Whether any review score/count should be shown
- Whether there are any awards, ratings, or affiliations

### About page details

- Real hotel history or founding story
- Whether the team section should exist at all
- If the team section stays: real names, titles, and photos
- Any real stats worth highlighting
  for example: number of rooms, years in operation, distance to major attractions

### Amenities and services

- Whether continental breakfast is included or optional
- Whether the fitness center is truly 24 hours
- Whether the jacuzzi is private, shared, indoor, or outdoor
- Whether the game room should mention specific games
- Any additional amenities not mentioned in the PDF
  for example: Wi-Fi, parking, airport transfer, laundry, event space, security

## 5. Recommended Rewrite Order

1. Update the shared content source in [src/data/siteContent.js](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/data/siteContent.js:1).
2. Rewrite the homepage section headings and intro copy.
3. Rewrite the About page with a factual hotel overview instead of an invented history.
4. Replace Contact page address/map/contact placeholders with real Royale Jazz details.
5. Decide whether to keep or remove:
   team section, testimonials, Instagram, review stats, room pricing.

## 6. Suggested Next Working Pass

In the next pass, we can do one of two things:

- `Option A`: replace all clearly wrong brand/placeholders now and leave marked placeholders where information is missing.
- `Option B`: first trim/remove unsupported sections like fake testimonials, team members, and fake review counts before rewriting the rest.

My recommendation is `Option B`, because it keeps us from publishing invented hotel facts while we wait for the missing details.
