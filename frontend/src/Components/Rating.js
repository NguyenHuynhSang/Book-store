function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div>
      <span className="rating">
        <i
          className={
            rating >= 1
              ? 'fas fa-star '
              : rating >= 0.5
              ? 'fas fa-star-half'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className="rating">
        <i
          className={
            rating >= 2
              ? 'fas fa-star'
              : rating >= 1.5
              ? 'fas fa-star-half'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className="rating">
        <i
          className={
            rating >= 3
              ? 'fas fa-star'
              : rating >= 2.5
              ? 'fas fa-star-half'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className="rating">
        <i
          className={
            rating >= 4
              ? 'fas fa-star'
              : rating >= 3.5
              ? 'fas fa-star-half'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className="rating">
        <i
          className={
            rating >= 5
              ? 'fas fa-star'
              : rating >= 4.5
              ? 'fas fa-star-half'
              : 'far fa-star'
          }
        ></i>
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{' ' + numReviews + ' reviews'}</span>
      )}
    </div>
  );
}

export default Rating;
