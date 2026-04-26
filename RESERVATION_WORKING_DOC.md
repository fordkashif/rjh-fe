# Almaris Reservation UX Working Document

## Document Status
- Owner: Codex + user
- Project area: Reservation, booking, contact, supporting navigation
- Status: Active working document
- Last updated: 2026-04-24

## Purpose
This document is the working source of truth for improving the Almaris booking experience.

We are using it to:
- align on what "better reservation UX" means
- capture current state and known issues
- define the target booking flow
- break the work into waves
- log decisions and tradeoffs
- record completion notes as each wave lands

This is not just a brainstorm doc. It is meant to guide implementation.

## Project Context
We currently have:
- a React/Vite rebuild of the Almaris site
- standalone React pages for `/about`, `/reservation`, and `/contact`
- a homepage reservation bar
- a reservation page that currently behaves more like a booking inquiry form than a true booking flow

We also have reference HTML templates from the original Almaris package:
- `Almaris HTML/about.html`
- `Almaris HTML/reservation.html`
- `Almaris HTML/contact.html`

Recent completed work already in code:
- `About Us` moved out of the old `Pages` dropdown into the top-level nav
- standalone `/about` page created
- standalone `/reservation` and `/contact` pages created
- secondary-page header now includes the top row and matches homepage sticky behavior more closely
- `News` removed from the nav

## Primary Goal
Turn reservation from a static form experience into a clearer, more modern hotel booking flow that feels credible, easy, and conversion-oriented.

## Secondary Goals
- Keep the experience aligned with the Almaris visual language
- Reuse existing components where sensible
- Avoid overbuilding fake booking logic that feels misleading
- Keep the implementation extensible for future real availability and payment integration

## What "Good" Looks Like
A strong Almaris reservation experience should:
- let users search availability quickly
- separate search, room selection, and guest details into clearer steps
- show room choices with useful booking information
- reduce uncertainty with policies and trust cues
- work smoothly on mobile and desktop
- feel like a hotel booking experience, not a generic contact form

## Research Summary
### Practical takeaways from hotel booking UX
Based on current hotel/travel UX patterns and research:

1. Booking should be the primary action.
   Baymard notes many accommodation sites underperform when booking is not prominent.

2. Search should come before guest details.
   Strong flows ask for:
   - destination or property context
   - dates
   - guests
   - rooms
   Then they show room/rate options before asking for personal details.

3. Users need room and rate clarity early.
   Important information includes:
   - nightly rate
   - total stay cost
   - occupancy
   - bed type
   - cancellation/refund terms
   - included features

4. Trust and reassurance matter.
   Good booking flows surface:
   - direct booking cues
   - cancellation language
   - contact/help
   - credible review signals

5. Users should be able to handle common booking needs without friction.
   Hilton's direct booking support and confirmed connecting rooms are good examples of solving common guest needs directly.

## Current State Assessment
### What is working
- We now have dedicated reservation and contact pages
- The reservation page already has a functioning client-side React form
- We have existing room data in `src/data/siteContent.js`
- The homepage has a reservation entry point
- Visual styling foundation already exists in the CSS package

### What is weak right now
- Reservation still acts like a single long inquiry form
- Users do not get a real "availability/results" step
- Room choice is a dropdown, not a room-comparison experience
- Pricing is too light and not decision-oriented
- Guest details are requested too early
- Booking trust cues are minimal
- Contact and reservation pages exist, but the booking UX is not yet a proper funnel

### Current UX Problems
1. No explicit step progression
2. Weak price communication
3. No rate plan differentiation
4. No clear room comparison surface
5. No sticky mobile action strategy
6. No booking reassurance block near decision points
7. Limited policy visibility

## Product Direction
We should shift from:
- form-first booking inquiry

to:
- search -> results -> selection -> guest details -> confirmation

## Proposed Target Flow
### Step 1: Search Availability
Entry points:
- homepage reservation bar
- `/reservation` page hero/search section

Required inputs:
- check-in date
- check-out date
- adults
- children
- rooms

Optional inputs:
- promo code
- special rate code

Primary CTA:
- `Check Availability`

### Step 2: Show Available Rooms
This should become the core of the reservation page.

Room cards should include:
- room image
- room title
- short description
- occupancy
- size
- bed type if known
- 4-6 key amenities
- nightly rate
- estimated total stay
- rate type label:
  - free cancellation
  - non-refundable
  - breakfast included
  - pay at property
- primary CTA:
  - `Select`

Optional secondary content:
- compare room features
- best-for tags like:
  - couples
  - families
  - extended stay

### Step 3: Guest Details
Only after room selection.

Collect:
- full name
- email
- phone
- optional special requests
- estimated arrival time if useful

Potential future fields:
- billing info
- payment/deposit info
- loyalty/membership code

### Step 4: Confirmation
Show:
- reservation summary
- selected room
- dates
- guests
- nightly and total price
- cancellation summary
- contact help
- confirmation state or next-step message

## Recommended UX Improvements
### A. Reservation Homepage Bar
Upgrade the homepage bar into a true booking launcher.

Recommended changes:
- convert it from a decorative bar into a compact search module
- include both check-in and check-out display
- include rooms as a first-class field, not just adults/children
- send users to `/reservation` with query params or equivalent local state

### B. Reservation Results Experience
This is the biggest gap and should be the main build focus.

Instead of:
- room dropdown

We should have:
- room list/cards
- pricing and policy display
- direct room selection

### C. Trust and Confidence Layer
Add near the booking CTA:
- secure booking note
- best rate/direct booking note if appropriate
- cancellation summary
- phone support link
- third-party review/reputation references if we want to add them later

### D. Mobile Booking UX
Must support:
- compact search summary
- easy date editing
- sticky bottom CTA on results pages
- clear tap targets for quantity adjustments

### E. Policy Clarity
Each selectable room/rate should make clear:
- whether it is refundable
- when payment happens
- if taxes/fees are included or estimated

## Scope Boundaries
### In scope for this effort
- UX restructuring
- booking flow layout
- room results UI
- better pricing/policy display
- route/page behavior
- improved CTA logic
- mobile layout improvements

### Out of scope for now
- real backend inventory
- live payment processing
- real reservation confirmation emails
- third-party CRS/PMS integration
- production-grade promo/rate engine

We can still design for those future integrations now.

## Implementation Strategy
We should build this in waves so each step leaves the site in a usable state.

## Wave Plan
### Wave 0: Working Baseline and Planning
Goal:
- finalize the plan and establish the working doc

Deliverables:
- this document
- agreed target flow
- agreed success criteria

Status:
- In progress

Completion notes:
- Working doc created
- Initial architecture and UX direction captured

### Wave 1: Reservation Architecture Reset
Goal:
- make `/reservation` behave like a booking search/results page rather than a generic form page

Tasks:
- define reservation page state model
- support search inputs at the top of `/reservation`
- pass homepage reservation search into reservation page
- separate search state from guest details state
- make room selection a dedicated section

Success criteria:
- user can arrive on `/reservation` and immediately understand the booking flow
- room selection is no longer hidden in a dropdown

Status:
- Completed

Completion notes:
- `/reservation` now begins with an editable availability search instead of dropping users directly into a long booking form
- homepage reservation bar now passes booking context into `/reservation` with query params for:
  - `checkIn`
  - `checkOut`
  - `adults`
  - `children`
  - `rooms`
- room selection is now visible as in-page result cards instead of a single room dropdown
- guest details are now gated behind room selection, which gives the flow clearer step separation
- reservation page state is now split across:
  - search state
  - selected room state
  - guest details state
- `DateRangeField` was refactored to support controlled usage so the same date selection logic can power both homepage search and reservation search
- room content data was expanded to support:
  - descriptions
  - bed information
  - amenity chips
  - rate labels
  - rate notes

Wave 1 follow-up notes:
- room cards are now structurally correct, but still need stronger hotel-style polish and rate hierarchy
- booking summary can become more robust in later waves

### Wave 2: Room Results and Rate Cards
Goal:
- build the actual room selection experience

Tasks:
- create room result cards
- show nightly price and stay estimate
- show key amenities
- show occupancy and room basics
- add rate labels and booking CTA
- add selected-room summary state

Success criteria:
- room comparison is visually easy
- users can select a room with confidence

Status:
- Completed

Completion notes:
- room result cards were upgraded to be more comparison-friendly and more hotel-like in presentation
- room content now includes:
  - booking badges
  - best-for labels
  - clearer metadata for guests, bed type, and room size
- rate presentation now includes:
  - nightly rate
  - stay subtotal
  - estimated taxes and fees
  - estimated total
- room cards now surface stronger trust/support cues directly in the comparison area
- selected booking summary was improved to include:
  - stay dates
  - guest count
  - room rate
  - subtotal
  - taxes and fees
  - estimated total
- summary panel now does more real decision support instead of just echoing the selected room

Wave 2 follow-up notes:
- room comparison is much stronger now, but filter/sort tooling is still deferred
- summary and trust content are good enough for momentum, but can still become more refined in future waves

### Wave 3: Guest Details and Booking Summary
Goal:
- move personal details into a separate follow-up step

Tasks:
- build guest details form below or after room selection
- add booking summary sidebar or summary panel
- display selected room, dates, guests, pricing, and policy summary
- refine success/confirmation state

Success criteria:
- guest info is requested after room choice
- summary is visible and trustworthy

Status:
- Completed

Completion notes:
- guest-details step now behaves more like an actual stage in the booking flow rather than just a form bolted onto the summary
- a reservation stepper was added to make progress clearer:
  - select room
  - guest details
  - confirmation
- inline success handling was replaced with a more deliberate confirmation state inside the booking summary panel
- confirmation now echoes key guest and room details back to the user so the result feels more intentional
- users can return from confirmation to edit guest details without losing the selected room

Wave 3 follow-up notes:
- confirmation is stronger now, but still remains within the same page instead of a dedicated final confirmation screen
- there is room to make the submission outcome feel even more premium in later waves

### Wave 4: Trust, Policies, and Conversion Support
Goal:
- reduce hesitation at the point of booking

Tasks:
- add cancellation/refund messaging
- add direct-booking reassurance
- add support/contact cues
- add credible review link strategy if desired
- add policy microcopy around submission

Success criteria:
- booking page feels more like a hotel commerce experience than a lead form

Status:
- Completed

Completion notes:
- trust and reassurance cues were strengthened across room comparison, booking summary, guest details, and confirmation
- room cards now surface stronger direct-booking language instead of relying only on basic rate notes
- support/contact cues were added near the guest-details step and confirmation state
- dedicated direct-booking support and booking policy panels were added to the booking summary column
- policy language now does a better job clarifying:
  - estimated pricing
  - estimated taxes and fees
  - cancellation confirmation timing
  - payment confirmation timing

Wave 4 follow-up notes:
- trust messaging is meaningfully stronger now, but still text-heavy in places
- third-party review/reputation signals are still a future option rather than part of this wave

### Wave 5: Mobile and UX Polish
Goal:
- make the entire flow feel clean and efficient on smaller screens

Tasks:
- mobile sticky CTA for results and/or summary
- compact room cards
- improve counter and date interaction on mobile
- reduce scrolling friction
- tighten spacing and hierarchy

Success criteria:
- booking remains easy on mobile
- no critical layout collisions or awkward long-form friction

Status:
- Completed

Completion notes:
- mobile sticky booking action was added so the primary next step stays reachable while scrolling on small screens
- reservation page now has mobile anchor targets for:
  - room results
  - booking summary
- mobile layout was tightened for:
  - room cards
  - summary rows
  - confirmation actions
  - search layout
  - contact/support links
- booking actions now behave more like thumb-reachable controls on smaller screens

Wave 5 follow-up notes:
- mobile behavior is meaningfully better now, but still not fully validated against real device screenshots
- a later verification pass with visual testing would still be valuable

### Wave 6: Integration Readiness
Goal:
- leave the code ready for future real booking integrations

Tasks:
- normalize search state shape
- normalize selected-room shape
- define placeholders for backend handoff
- document what would plug into PMS/CRS/payment later

Success criteria:
- future engineering work can integrate real availability without rewriting the UX layer

Status:
- Completed

Completion notes:
- booking search, quote, and summary logic was extracted into a dedicated helper module:
  - [src/lib/booking.js](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/lib/booking.js:1)
- the reservation page now relies on clearer normalized booking shapes instead of mixing UI and business logic in one component
- future backend integration seams are now explicitly documented in:
  - [src/lib/BOOKING_INTEGRATION_NOTES.md](/Users/abigailsubarney/Downloads/Almaris/Almaris%20HTML/src/lib/BOOKING_INTEGRATION_NOTES.md:1)
- date-range state creation and search-param parsing now share normalized booking helpers, reducing duplication
- the reservation flow is now better prepared for:
  - real availability search
  - real pricing/tax replacement
  - real reservation submit handling
  - real confirmation payloads

Wave 6 follow-up notes:
- the UI is now structurally ready for backend integration, but no live API work was added in this wave
- future PMS/CRS/payment work should adapt into the normalized client-side shapes rather than reshaping the UI around raw transport payloads

### Post-Wave QA and Polish Pass
Goal:
- catch the rough edges that become obvious only after the full six-wave flow is in place

Status:
- Completed

Completion notes:
- corrected pricing calculations so reservation totals now reflect the selected room count instead of pricing only a single room
- removed the implicit auto-selection of the first available room so the room-selection step behaves honestly and predictably
- added a clear empty-results state with direct contact options when a search returns no matching stays
- tightened booking-step behavior so the summary panel better reflects room selection versus confirmation state
- clarified the booking summary with an explicit room-count row and room-count-aware pricing labels

## Detailed Requirements
### Functional Requirements
- homepage reservation bar must launch reservation flow
- reservation page must support editing search inputs
- room options must be selectable in-page
- guest form must be completed after room selection
- contact page must remain independently usable
- nav links must point to real pages

### UX Requirements
- booking CTA must be visually primary
- reservation flow must be understandable without explanation text walls
- room pricing must be legible and prominent
- cancellation/payment messaging must be scannable
- mobile layout must support thumb-friendly interaction

### Content Requirements
- room descriptions should be short and decision-helpful
- trust copy should be concise
- policy language should be plain English
- avoid fake precision if we do not yet have real backend pricing logic

## Current Technical Opportunities
We can likely reuse or extend:
- `src/components/sections/ReservationSection.jsx`
- `src/components/sections/ReservationBar.jsx`
- `src/components/DateRangeField.jsx`
- `src/components/ReservationCounter.jsx`
- `src/data/siteContent.js`

We will likely need new components for:
- reservation search summary
- room result cards
- selected booking summary
- policy/trust block

## Risks and Cautions
1. Fake booking realism
   If we make it look too transactional without real backend support, we risk a misleading UX.

2. Overfitting to template markup
   The original HTML is a visual reference, not necessarily the best conversion model.

3. Long single-page flow
   If everything stays on one long page without good hierarchy, the reservation UX may still feel heavy.

4. Mobile complexity
   Date and guest controls can become frustrating if not carefully sized and staged.

## Open Questions
- Should reservation search results live on the same `/reservation` page or advance into a nested state/stepper?
- Should pricing stay "from" pricing for now, or should we calculate a stay total from selected dates?
- Do we want room comparison as cards only, or cards plus a compact comparison drawer?
- Should contact/support stay visible in a sticky summary panel?
- Do we want to support promo/special rate codes in the first version?

## Decisions Log
Use this section to record actual decisions as we go.

### Decision 001
- Topic: Standalone booking-related pages
- Decision: `/about`, `/reservation`, and `/contact` are standalone React pages
- Reason: matches expected navigation behavior and supports a cleaner multi-step UX path
- Status: Accepted

### Decision 002
- Topic: Reservation improvement direction
- Decision: move toward search -> results -> guest details rather than keeping a one-step inquiry form
- Reason: better matches top hotel booking patterns and user expectations
- Status: Accepted

## Completion Log
Use this to record what was actually completed, not just planned.

### Completed Before This Document
- Created standalone `/about` page
- Created standalone `/reservation` page
- Created standalone `/contact` page
- Moved `About Us` to top-level nav
- Removed `News` from nav
- Updated header behavior for secondary pages

### Wave Completion Entries
Add entries here as each wave finishes.

#### Template
- Wave:
- Date:
- Completed work:
- Notes:
- Follow-ups:

#### Entry
- Wave: Wave 1
- Date: 2026-04-24
- Completed work:
  - converted reservation from form-first into search-first architecture
  - added homepage-to-reservation search handoff
  - replaced room dropdown with in-page available room cards
  - moved guest details behind room selection
  - expanded supporting room and date-range state handling
- Notes:
  - this wave establishes the booking flow foundation rather than final UI polish
  - the site is now in a much better position for room-rate UX improvements in Wave 2
- Follow-ups:
  - improve room card polish and pricing hierarchy
  - strengthen selected booking summary
  - improve mobile ergonomics in later waves

#### Entry
- Wave: Wave 2
- Date: 2026-04-24
- Completed work:
  - upgraded room result cards with stronger hotel-style comparison content
  - improved pricing hierarchy and added estimated totals
  - expanded room data with badges and best-fit labels
  - improved the selected booking summary panel into a more useful review block
- Notes:
  - this wave focused on making room choice easier and more credible
  - the reservation page now reads more like a booking results experience than a generic listing
- Follow-ups:
  - consider filters, sorting, and stronger mobile result interactions
  - continue refining trust/policy communication in later waves

#### Entry
- Wave: Wave 3
- Date: 2026-04-24
- Completed work:
  - improved guest-details step progression
  - added booking stepper state
  - replaced plain inline success message with a stronger confirmation state
  - added edit path back from confirmation to guest details
- Notes:
  - this wave made the right-hand booking column feel more like a real funnel and less like a static sidebar
  - the reservation experience now has a clearer before/after state around submission
- Follow-ups:
  - consider whether future work should move confirmation into a more dedicated final experience
  - continue improving trust and support cues around booking completion

#### Entry
- Wave: Wave 4
- Date: 2026-04-24
- Completed work:
  - added stronger direct-booking reassurance
  - added policy/support panels in the booking summary column
  - added clearer support contact cues near guest details and confirmation
  - improved cancellation/payment expectation language
- Notes:
  - this wave focused on reducing hesitation and making the flow feel more credible
  - the booking experience now does a better job of answering “what happens next?” before users have to ask
- Follow-ups:
  - consider adding third-party review/reputation support later
  - simplify and prioritize trust messaging further during polish passes

#### Entry
- Wave: Wave 5
- Date: 2026-04-24
- Completed work:
  - added sticky mobile booking action bar
  - improved responsive behavior for room cards and summary layout
  - tightened small-screen spacing and action placement
  - made mobile navigation between results and summary more direct
- Notes:
  - this wave focused on reducing mobile friction rather than changing the overall booking architecture
  - the reservation flow should now feel much more anchored on smaller screens
- Follow-ups:
  - validate with visual/mobile testing later
  - continue refining small-screen density and CTA prioritization if needed

#### Entry
- Wave: Wave 6
- Date: 2026-04-24
- Completed work:
  - extracted booking logic into dedicated helpers
  - normalized booking search, quote, and summary shapes
  - documented intended backend integration handoff points
  - reduced component-level coupling between UI and booking calculations
- Notes:
  - this wave was about future-proofing rather than visible UI change
  - the reservation flow is now in a much better position for real backend integration work later
- Follow-ups:
  - future availability, pricing, and submit APIs should plug into the helper-defined shapes
  - real integration work should preserve the current UI contracts where possible

## Suggested Build Order
When we start implementation from this plan, the recommended order is:

1. Wave 1
2. Wave 2
3. Wave 3
4. Wave 4
5. Wave 5
6. Wave 6

## Immediate Next Step
The next practical step should be:
- review the completed reservation overhaul and decide whether to begin backend integration work or a separate final visual polish pass

That means the first concrete build task is:
- either connect real booking services or run a final QA/polish pass across desktop and mobile

## References
- Baymard travel UX best practices: https://baymard.com/blog/travel-site-ux-best-practices
- Hilton booking channels: https://www.hilton.com/en/help-center/reservations/booking-a-reservation/
- Hilton connecting rooms: https://www.hilton.com/en/help-center/reservations/confirmed-connecting-rooms/
