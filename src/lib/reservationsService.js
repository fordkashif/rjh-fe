import { createReservationConfirmation } from "./bookingApi";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

function buildMockReservationResult(payload) {
  return createReservationConfirmation(payload);
}

function normalizeDateRange(range) {
  return {
    checkIn: range.checkIn,
    checkOut: range.checkOut,
  };
}

function overlapsStay({ checkIn, checkOut }, reservation) {
  return reservation.check_in < checkOut && reservation.check_out > checkIn;
}

function isReservationBlocking(status) {
  return !["cancelled", "completed", "checked_out", "no_show"].includes(String(status ?? "").toLowerCase());
}

function isRoomBookable(status) {
  return !["out_of_service", "maintenance", "blocked"].includes(String(status ?? "").toLowerCase());
}

function buildFallbackAvailability(rooms) {
  return Object.fromEntries(
    rooms.map((room) => [
      room.code,
      {
        roomTypeCode: room.code,
        totalInventory: Number.POSITIVE_INFINITY,
        reservedCount: 0,
        availableRoomCount: Number.POSITIVE_INFINITY,
      },
    ]),
  );
}

export async function fetchRoomTypeAvailability({ hotelId, rooms, searchState, range }) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      source: "fallback",
      inventoryByRoomTypeCode: buildFallbackAvailability(rooms),
    };
  }

  const stay = range ?? normalizeDateRange({
    checkIn: searchState.range.from.toISOString().slice(0, 10),
    checkOut: searchState.range.to.toISOString().slice(0, 10),
  });

  const { data: rpcRows, error: rpcError } = await supabase.rpc("get_public_room_type_availability", {
    p_hotel_id: hotelId,
    p_check_in: stay.checkIn,
    p_check_out: stay.checkOut,
  });

  if (!rpcError && Array.isArray(rpcRows)) {
    return {
      source: "supabase",
      inventoryByRoomTypeCode: Object.fromEntries(
        rpcRows.map((row) => [
          row.room_type_code,
          {
            roomTypeCode: row.room_type_code,
            totalInventory: Number(row.total_inventory ?? 0),
            reservedCount: Number(row.reserved_count ?? 0),
            availableRoomCount: Number(row.available_room_count ?? 0),
          },
        ]),
      ),
    };
  }

  const [{ data: roomTypeRows, error: roomTypeError }, { data: roomRows, error: roomError }, { data: reservationRows, error: reservationError }] = await Promise.all([
    supabase.from("room_types").select("id, code").eq("hotel_id", hotelId).eq("is_active", true),
    supabase.from("rooms").select("room_type_id, status").eq("hotel_id", hotelId),
    supabase.from("reservations").select("room_type_code, check_in, check_out, status, room_count").eq("hotel_id", hotelId),
  ]);

  if (roomTypeError || roomError || reservationError) {
    throw rpcError || roomTypeError || roomError || reservationError;
  }

  const inventoryByRoomTypeCode = Object.fromEntries(
    roomTypeRows.map((roomType) => {
      const totalInventory = roomRows.filter(
        (room) => room.room_type_id === roomType.id && isRoomBookable(room.status),
      ).length;

      const reservedCount = reservationRows
        .filter(
          (reservation) =>
            reservation.room_type_code === roomType.code &&
            isReservationBlocking(reservation.status) &&
            overlapsStay(stay, reservation),
        )
        .reduce((sum, reservation) => sum + Math.max(1, Number(reservation.room_count ?? 1)), 0);

      return [
        roomType.code,
        {
          roomTypeCode: roomType.code,
          totalInventory,
          reservedCount,
          availableRoomCount: Math.max(0, totalInventory - reservedCount),
        },
      ];
    }),
  );

  return {
    source: "supabase",
    inventoryByRoomTypeCode,
  };
}

export async function submitReservationRequest(payload) {
  if (!isSupabaseConfigured || !supabase) {
    return buildMockReservationResult(payload);
  }

  const availability = await fetchRoomTypeAvailability({
    hotelId: payload.hotelId,
    rooms: [],
    range: {
      checkIn: payload.stay.checkIn,
      checkOut: payload.stay.checkOut,
    },
  });

  const roomAvailability = availability.inventoryByRoomTypeCode[payload.roomTypeCode];

  if (roomAvailability && roomAvailability.availableRoomCount < payload.stay.roomCount) {
    throw new Error("This room type is no longer available for the selected dates. Please refresh your search and try again.");
  }

  const reservationInsert = {
    request_reference: payload.requestReference,
    organization_id: payload.organizationId,
    hotel_id: payload.hotelId,
    source: payload.source,
    status: payload.status,
    room_type_code: payload.roomTypeCode,
    room_title: payload.roomTitle,
    check_in: payload.stay.checkIn,
    check_out: payload.stay.checkOut,
    nights: payload.stay.nights,
    room_count: payload.stay.roomCount,
    adults: payload.stay.adults,
    children: payload.stay.children,
    currency: payload.pricing.currency,
    nightly_rate: payload.pricing.nightlyRate,
    subtotal: payload.pricing.subtotal,
    taxes_and_fees: payload.pricing.taxesAndFees,
    estimated_total: payload.pricing.estimatedTotal,
    guest_message: payload.guest.message,
    metadata: payload.metadata,
  };

  const { data: reservationData, error: reservationError } = await supabase
    .from("reservations")
    .insert(reservationInsert)
    .select("id")
    .single();

  if (reservationError) {
    throw reservationError;
  }

  const { error: guestError } = await supabase.from("reservation_guests").insert({
    reservation_id: reservationData.id,
    full_name: payload.guest.name,
    email: payload.guest.email,
    phone: payload.guest.phone,
  });

  if (guestError) {
    throw guestError;
  }

  const { error: auditError } = await supabase.from("reservation_audit_log").insert({
    reservation_id: reservationData.id,
    event_type: "reservation_requested",
    event_data: {
      request_reference: payload.requestReference,
      source: payload.source,
      website_domain: payload.metadata.websiteDomain,
    },
  });

  if (auditError) {
    throw auditError;
  }

  return createReservationConfirmation(payload);
}
