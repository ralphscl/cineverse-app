import { Link } from "react-router-dom";
import { convertToSlug } from "../../../utils/StringUtils.js";
import useGenreName from "../../../hooks/useGenreName.jsx";
import Genre from "../../genres/Genres.jsx";
import "./ShowCard.css";

const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

const ShowCard = ({ show, cardType, showType }) => {
  return (
    <Link
      to={`/${showType === "tv" ? "series" : "movie"}/${show.id}-${convertToSlug(
        show.title || show.name || show.original_name
      )}`}
    >
      <div
        className={`card ${cardType}`}
        style={{
          backgroundImage:
            show &&
            `url(${TMDB_ASSET_BASEURL}${cardType === "poster" ? show.poster_path : show.backdrop_path
            })`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="overlay">
          <div className="description">
            <h4 className="title">
              {show.title || show.name || show.original_name}
            </h4>
            <p className="summary">{show.overview}</p>
            {/* <p className="genre">{genre}</p> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
