# Booking Integration Notes

This file documents the intended handoff points for future reservation backend work.

## Current UI-Level Shapes
The reservation UI currently depends on the following normalized client-side shapes:

### Booking Search State
```js
{
  range: { from: Date, to: Date },
  adults: number,
  children: number,
  roomCount: number
}
```

### Guest Details State
```js
{
  name: string,
  email: string,
  phone: string,
  message: string
}
```

### Room Quote Shape
Produced by `buildRoomQuote(room, nights, roomCount)`:
```js
{
  nightlyPrice: number,
  roomCount: number,
  subtotal: number,
  taxes: number,
  estimatedTotal: number
}
```

### Booking Summary Shape
Produced by `buildBookingSummary({ room, searchState, nights })`:
```js
{
  roomTitle: string,
  roomRateLabel: string,
  roomRateNote: string,
  stayDatesLabel: string,
  roomCountLabel: string,
  guestLabel: string,
  roomRateLabelText: string,
  staySubtotal: number,
  taxesAndFees: number,
  estimatedTotal: number
}
```

## Intended Future Backend Flow
When real inventory and reservation APIs are added, the backend layer should:

1. accept normalized booking search input
2. return room availability and pricing data
3. map transport-layer responses into the UI room/result shape
4. preserve the summary and quote shapes where possible

That means the UI should not be rewritten to depend directly on PMS/CRS response formats.

## Recommended Future Integration Points
- availability search:
  replace mocked `rooms.filter(...)` flow
- pricing:
  replace `buildRoomQuote(...)` estimated calculations
- reservation submit:
  replace `setBookingStep("confirmed")` with real API request state handling
- confirmation:
  replace UI-only success state with reservation reference/confirmation payload

## Important Constraint
We should keep UI rendering coupled to normalized client-side shapes, not raw backend payloads.
That will make future adapter work much smaller and safer.
