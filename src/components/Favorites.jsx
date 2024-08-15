import "../styles/Favorites.css";

export default function Favorites({
  favorites,
  handleFavorites,
  handleFavorite,
}) {
  return (
    <>
      <div className="overlay" onClick={handleFavorites}></div>
      <div className="modal">
        <div className="fav-container">
          {favorites.map((favorite, index) => (
            <img
              onClick={() => handleFavorite(favorite)}
              key={index}
              src={favorite.poster}
            />
          ))}
        </div>
      </div>
    </>
  );
}
