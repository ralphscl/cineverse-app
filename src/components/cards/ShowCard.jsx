import { Link } from "react-router-dom";
import Genre from "../Genre.jsx";
import { convertToSlug } from "../../utils/StringUtils.js";
import "./ShowCard.css";

const ShowCard = ({ show, cardType }) => {
  const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

  return (
    <Link
      to={`/tv/${show.id}-${convertToSlug(
        show.title || show.name || show.original_name
      )}`}
    >
      <div
        className={`card ${cardType}`}
        style={{
          backgroundImage: `url(${TMDB_ASSET_BASEURL}${
            cardType === "poster" ? show.poster_path : show.backdrop_path
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
            <Genre show={show} showType="tv" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;