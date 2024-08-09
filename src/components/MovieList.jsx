import '../styles/MovieList.css'

export default function MovieList({ movies, handleClick }) {
  return (
    <div className="movie-list-container">
      {movies.map((movie, index) => (
        <div key={index} className='movie-item'>
          <img onClick={() => handleClick(movie)} src={movie.Poster} alt="movie" />
        </div>
      ))}
    </div>
  );
}
