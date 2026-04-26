function StarRating({ count = 5 }) {
  return (
    <span className="d-stars">
      {Array.from({ length: count }).map((_, index) => (
        <i className="icofont-star" key={index} />
      ))}
    </span>
  );
}

export default StarRating;
