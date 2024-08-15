import { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import "./styles/App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const openFavorites = () => setIsFavoriteOpen(true);
  const closeFavorites = () => setIsFavoriteOpen(false);

  // Fetch movies based on the search value
  const fetchMovies = async () => {
    if (!searchValue) return;

    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=5348d00c`
    );
    const data = await response.json();
    setMovies(data.Search || []);
  };

  // Fetch details of the selected movie
  const fetchMovieDetails = async (imdbID) => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=5348d00c`
    );
    const data = await response.json();
    setSelectedMovie(data || null);
  };

  // Effect to fetch movies when the search value changes
  useEffect(() => {
    fetchMovies();
  }, [searchValue]);

  // Handle movie selection
  const handleMovieSelect = (movie) => {
    setSelectedMovie(null);
    fetchMovieDetails(movie.imdbID);
    openPopup();
  };

  const addFavorites = (id, poster) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((favorite) => favorite.id === id);
      if (isFavorite) {
        return prevFavorites.filter((favorite) => favorite.id !== id);
      }
      console.log(id);

      return [...prevFavorites, { id, poster }];
    });
  };

  const handleFavorites = () => {
    openFavorites();
  };

  const handleFavorite = (favorite) => {
    setSelectedMovie(null);
    closeFavorites();
    fetchMovieDetails(favorite.id);
    openPopup();
  };

  return (
    <div className="container">
      <Header handleFavorites={handleFavorites} />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
      {isPopupOpen && selectedMovie && (
        <MovieDetails
          id={selectedMovie.imdbID}
          title={selectedMovie.Title}
          poster={selectedMovie.Poster}
          plot={selectedMovie.Plot}
          year={selectedMovie.Year}
          rating={selectedMovie.imdbRating}
          onClose={closePopup}
          addFavorite={addFavorites}
          favorites={favorites}
        />
      )}
      {isFavoriteOpen && (
        <Favorites
          favorites={favorites}
          handleFavorites={closeFavorites}
          handleFavorite={handleFavorite}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
