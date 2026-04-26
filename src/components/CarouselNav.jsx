function CarouselNav({ className, previousClassName, nextClassName, previousLabel, nextLabel }) {
  return (
    <div className={className}>
      <button
        type="button"
        className={`btn-prev ${previousClassName}`}
        aria-label={previousLabel}
      />
      <button
        type="button"
        className={`btn-next ${nextClassName}`}
        aria-label={nextLabel}
      />
    </div>
  );
}

export default CarouselNav;
