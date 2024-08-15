import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import "../styles/MovieDetails.css";

export default function movieDetails({
  id,
  title,
  poster,
  plot,
  onClose,
  year,
  rating,
  addFavorite,
  favorites
}) {
const isFavorite = favorites.some((favorite) => favorite.id === id);

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <img src={poster} alt={title} />
        <div className="details">
          <h2>
            {title} ({year})
          </h2>
          <p>{plot}</p>
          <h2>IMDB: {rating}/10</h2>
        </div>
        <div className="btn-container">
          <button
            className={isFavorite ? "heart-red" : ''}
            onClick={() => addFavorite(id, poster)}
          >
            <FaRegHeart />
          </button>
          <button onClick={onClose}>
            <IoIosCloseCircleOutline />
          </button>
        </div>
      </div>
    </>
  );
}
