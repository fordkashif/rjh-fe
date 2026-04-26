function ReservationCounter({ label, value, onChange, minimum = 0 }) {
  return (
    <div className="react-booking-counter">
      <h4>{label}</h4>
      <div className="react-booking-counter-controls">
        <button
          type="button"
          className="react-booking-counter-button"
          onClick={() => onChange(Math.max(minimum, value - 1))}
          aria-label={`Decrease ${label}`}
        >
          -
        </button>

        <div className="react-booking-counter-value" aria-live="polite">
          {value}
        </div>

        <button
          type="button"
          className="react-booking-counter-button"
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ReservationCounter;
