import { useState } from "react";
import DateRangeField, { createDefaultRange, rangeToSearchParams } from "../DateRangeField";

function NumberField({ label, value, setValue }) {
  return (
    <div className="react-reservation-bar-field react-reservation-bar-counter">
      <div className="text-center">
        <h6 className="id-color">{label}</h6>
        <div className="de-number">
          <span className="d-minus" onClick={() => setValue(Math.max(0, value - 1))}>
            -
          </span>
          <input type="text" className="no-border no-bg" value={value} readOnly />
          <span className="d-plus" onClick={() => setValue(Math.min(10, value + 1))}>
            +
          </span>
        </div>
      </div>
    </div>
  );
}

function ReservationBar() {
  const [dateRange, setDateRange] = useState(createDefaultRange);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  const reservationHref = `/reservation?${new URLSearchParams({
    ...rangeToSearchParams(dateRange),
    adults: String(adults),
    children: String(children),
    rooms: String(roomCount),
  }).toString()}`;

  return (
    <div id="reservation-bar" className="bg-dark text-light pt30 pb30">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-12">
            <div className="react-reservation-bar-layout">
              <div className="react-reservation-bar-title text-lg-start text-center">
                <h3 className="mb-0">Reservation</h3>
              </div>

              <div className="react-reservation-bar-field react-reservation-bar-date">
                <DateRangeField value={dateRange} onChange={setDateRange} />
              </div>

              <NumberField label="Adult" value={adults} setValue={setAdults} />
              <NumberField label="Children" value={children} setValue={setChildren} />
              <NumberField label="Room" value={roomCount} setValue={setRoomCount} />

              <div className="react-reservation-bar-action text-lg-end text-center">
                <a className="btn-main" href={reservationHref}>
                  Check Availability
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationBar;
