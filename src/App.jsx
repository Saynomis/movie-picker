import { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import MovieDetails from "./components/MovieDetails";
import "./styles/App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

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
    console.log(data);
  };

  // Effect to fetch movies when the search value changes
  useEffect(() => {
    fetchMovies();
  }, [searchValue]);

  // Handle movie selection
  const handleMovieSelect = (movie) => {
    fetchMovieDetails(movie.imdbID);
    openPopup()
  };

  return (
    <div className="container">
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
      {isPopupOpen && selectedMovie && (
        <MovieDetails
          title={selectedMovie.Title}
          poster={selectedMovie.Poster}
          plot={selectedMovie.Plot}
          year={selectedMovie.Year}
          rating={selectedMovie.imdbRating}
          onClose={closePopup}  
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
