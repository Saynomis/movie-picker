import Header from "./components/Header";
import Search from "./components/search";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import MovieDetails from "./components/MovieDetail";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import "./styles/App.css";

// vytvorit novy state query do ktoreho posunieme novy 
// fetch request a potom ho volame v novom componente movieDetails

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState([]);
  const [isOpen, setIsOpen] =useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fetchMovies = async () => {
    const url = ` http://www.omdbapi.com/?s=${searchValue}&apikey=5348d00c`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else {
      setMovies([]);
    } 
  };


  useEffect(() => {
    fetchMovies(searchValue);
  }, [searchValue]);

  const handleClick = (movie) => {
    console.log(movie.imdbID);
    setIsOpen(!isOpen)
  };

  return (
    <>
      <div className="container">
        <Header />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <MovieList movies={movies} handleClick={handleClick} />
        {/* {isOpen && (<MovieDetails title={} poster={} plot={}/>)} */}
        <Footer />
      </div>
    </>
  );
}

export default App;
