import { buildRoomQuote, getBookingNights } from "./booking";

function createRequestId(prefix = "rq") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function buildAvailabilitySearchPayload({ hotel, searchState }) {
  return {
    hotelId: hotel.id,
    organizationId: hotel.organizationId,
    checkIn: searchState.range.from.toISOString().slice(0, 10),
    checkOut: searchState.range.to.toISOString().slice(0, 10),
    adults: searchState.adults,
    children: searchState.children,
    roomCount: searchState.roomCount,
  };
}

export function buildReservationPayload({ hotel, room, searchState, guestState }) {
  const nights = getBookingNights(searchState.range);
  const quote = buildRoomQuote(room, nights, searchState.roomCount);

  return {
    hotelId: hotel.id,
    organizationId: hotel.organizationId,
    source: hotel.websiteLabel,
    status: "pending",
    requestReference: createRequestId("resreq"),
    roomTypeCode: room.code ?? room.title,
    roomTitle: room.title,
    stay: {
      checkIn: searchState.range.from.toISOString().slice(0, 10),
      checkOut: searchState.range.to.toISOString().slice(0, 10),
      nights,
      roomCount: searchState.roomCount,
      adults: searchState.adults,
      children: searchState.children,
    },
    guest: {
      name: guestState.name,
      email: guestState.email,
      phone: guestState.phone,
      message: guestState.message,
    },
    pricing: {
      currency: hotel.currency,
      nightlyRate: quote.nightlyPrice,
      subtotal: quote.subtotal,
      taxesAndFees: quote.taxes,
      estimatedTotal: quote.estimatedTotal,
    },
    metadata: {
      websiteDomain: hotel.websiteUrl,
      timezone: hotel.timezone,
      createdFrom: "website-direct-booking",
    },
  };
}

export function createReservationConfirmation(payload, options = {}) {
  return {
    requestReference: payload.requestReference,
    hotelId: payload.hotelId,
    roomTitle: payload.roomTitle,
    guestName: payload.guest.name,
    guestEmail: payload.guest.email,
    estimatedTotal: payload.pricing.estimatedTotal,
    status: payload.status,
    ...options,
  };
}
