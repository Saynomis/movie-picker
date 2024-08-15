import { FaRegHeart } from "react-icons/fa";
import "../styles/Header.css";

export default function Header({ handleFavorites }) {
  return (
    <div className="header-container">
      <div className="header">
        <div className="logo">
          {" "}
          <img src="movie.png" alt="" />
        </div>
        <h1 className="title">Movie Picker</h1>
      </div>
      <div className="favorites">
        <button onClick={handleFavorites}>
          <FaRegHeart />
        </button>
      </div>
    </div>
  );
}
