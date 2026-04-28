import { addDays, differenceInCalendarDays, format } from "date-fns";

export function createDefaultBookingRange() {
  return {
    from: new Date(),
    to: addDays(new Date(), 1),
  };
}

export function createInitialBookingSearchState(searchParams) {
  const defaultRange = createDefaultBookingRange();
  const parsedRange = searchParams ? bookingRangeFromSearchParams(searchParams) ?? defaultRange : defaultRange;

  return {
    range: parsedRange,
    adults: Math.max(1, Number.parseInt(searchParams?.get("adults") ?? "1", 10) || 1),
    children: Math.max(0, Number.parseInt(searchParams?.get("children") ?? "0", 10) || 0),
    roomCount: Math.max(1, Number.parseInt(searchParams?.get("rooms") ?? "1", 10) || 1),
  };
}

export function createInitialGuestDetails() {
  return {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
}

export function bookingRangeToSearchParams(range) {
  if (!range?.from || !range?.to) {
    return {};
  }

  return {
    checkIn: format(range.from, "yyyy-MM-dd"),
    checkOut: format(range.to, "yyyy-MM-dd"),
  };
}

export function bookingRangeFromSearchParams(searchParams) {
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  if (!checkIn || !checkOut) {
    return null;
  }

  const from = new Date(`${checkIn}T00:00:00`);
  const to = new Date(`${checkOut}T00:00:00`);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    return null;
  }

  return { from, to };
}

export function getBookingNights(range) {
  if (!range?.from || !range?.to) {
    return 1;
  }

  return Math.max(1, differenceInCalendarDays(range.to, range.from));
}

export function getStayLabel(nights) {
  return `${nights} ${nights === 1 ? "night" : "nights"}`;
}

export function parseNightlyPrice(price) {
  return Number.parseInt(String(price).replace(/[^0-9]/g, ""), 10);
}

export function getEstimatedTaxes(subtotal) {
  return Math.round(subtotal * 0.12);
}

export function roomMatchesBookingSearch(room, searchState) {
  const guestCapacity = Number.parseInt(room.guests, 10);

  if (!Number.isNaN(guestCapacity) && guestCapacity < searchState.adults) {
    return false;
  }

  if (searchState.roomCount > 1 && guestCapacity < Math.ceil(searchState.adults / searchState.roomCount)) {
    return false;
  }

  if (Number.isFinite(room.availableRoomCount) && room.availableRoomCount < searchState.roomCount) {
    return false;
  }

  return true;
}

export function buildRoomQuote(room, nights, roomCount = 1) {
  const nightlyPrice = parseNightlyPrice(room.price);
  const normalizedRoomCount = Math.max(1, roomCount);
  const subtotal = nightlyPrice * nights * normalizedRoomCount;
  const taxes = getEstimatedTaxes(subtotal);
  const estimatedTotal = subtotal + taxes;

  return {
    nightlyPrice,
    roomCount: normalizedRoomCount,
    subtotal,
    taxes,
    estimatedTotal,
  };
}

export function buildBookingSummary({ room, searchState, nights }) {
  const quote = buildRoomQuote(room, nights, searchState.roomCount);

  return {
    roomTitle: room.title,
    roomRateLabel: room.rateLabel,
    roomRateNote: room.rateNote,
    stayDatesLabel: `${format(searchState.range.from, "MMM dd")} - ${format(searchState.range.to, "MMM dd")}`,
    guestLabel: `${searchState.adults} adult${searchState.adults === 1 ? "" : "s"}${
      searchState.children ? `, ${searchState.children} child${searchState.children === 1 ? "" : "ren"}` : ""
    }`,
    roomCountLabel: `${searchState.roomCount} room${searchState.roomCount === 1 ? "" : "s"}`,
    roomRateLabelText: `${room.price} / night${searchState.roomCount > 1 ? ` x ${searchState.roomCount} rooms` : ""}`,
    staySubtotal: quote.subtotal,
    taxesAndFees: quote.taxes,
    estimatedTotal: quote.estimatedTotal,
  };
}

// Integration note:
// These helpers define the client-side booking shapes we expect to preserve
// even after replacing mocked room data with live inventory and pricing data.
// Future API work should translate backend search/inventory responses into
// these shapes rather than coupling UI components directly to transport models.
