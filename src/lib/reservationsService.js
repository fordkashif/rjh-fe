import { isSupabaseConfigured, supabase } from "./supabaseClient";

function requireConfiguredReservationClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Online reservations are temporarily unavailable. Please try again shortly.");
  }
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

export async function fetchRoomTypeAvailability({ hotelId, rooms, searchState, range }) {
  requireConfiguredReservationClient();

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
  requireConfiguredReservationClient();
  const { data, error } = await supabase.functions.invoke("create-public-reservation-request", {
    body: payload,
  });

  if (error) {
    throw error;
  }

  if (!data?.ok) {
    throw new Error(data?.error ?? "Your reservation request could not be sent just now. Please try again.");
  }

  return {
    requestReference: data.requestReference,
    hotelId: payload.hotelId,
    roomTitle: data.roomTitle ?? payload.roomTitle,
    guestName: data.guestName ?? payload.guest.name,
    guestEmail: data.guestEmail ?? payload.guest.email,
    estimatedTotal: data.estimatedTotal ?? payload.pricing.estimatedTotal,
    status: data.status ?? payload.status,
    reservationId: data.reservationId,
    emailDeliveryStatus: data.emailDeliveryStatus ?? "failed",
  };
}
