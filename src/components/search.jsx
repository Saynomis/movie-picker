import { FaSearch } from "react-icons/fa";
import "../styles/Search.css";

export default function Search({ searchValue, setSearchValue }) {
  return (
    <div className="search-container">
      <input
        className="search"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search a Movie"
      />
      <button className="search-btn">
        <FaSearch />
      </button>
    </div>
  );
}
