import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import YoutubeTrailer from "../../components/youtubeTrailer/YoutubeTrailer";
import { useFetchApi } from "../../hooks/useFetchApi";
import {
  getContentRating,
  getExternalIds,
  getSeriesDetails,
} from "../../service/tmdb/requests";
// Utils
import { splitSlug, convertToSlug } from "../../utils/StringUtils";
import "./ShowDetails.css";
import { getSeriesMoreInfo } from "../../service/omdb/requests";
import Producers from "../producers/Producers";

const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

const ShowDetails = ({
  tmdbID,
  allowLinkTitle = false,
  showPlot = false,
  showProducers = false,
}) => {
  const [contentRating, setContentRating] = useState(null);
  const [network, setNetwork] = useState(null);

  const {
    isLoading,
    hasError,
    apiData: show,
  } = useFetchApi(getSeriesDetails(tmdbID), "tmdb");

  const { apiData: showIds } = useFetchApi(
    getExternalIds("tv", show?.id),
    "tmdb"
  );

  const { apiData: otherDetails } = useFetchApi(
    getSeriesMoreInfo(showIds?.imdb_id),
    "omdb"
  );

  const showTitle = show?.title || show?.name || show?.original_name;
  const networkLength = show?.networks.length - 1;

  useEffect(() => {
    const fetchContentRating = async () => {
      const fetchedContentRating = await getContentRating(show?.id);
      setContentRating(fetchedContentRating);
    };

    fetchContentRating();
  }, [show]);

  useEffect(() => {
    setNetwork(show?.networks[networkLength]);
  }, [show]);

  return (
    <section className="show-details">
      {/* Title */}
      {allowLinkTitle ? (
        <Link to={`/series/${show?.id}-${convertToSlug(showTitle)}`}>
          <h1>{showTitle}</h1>
        </Link>
      ) : (
        <h1>{showTitle}</h1>
      )}

      {/* Network Logo */}
      {network && (
        <img
          src={`${TMDB_ASSET_BASEURL}${network.logo_path}`}
          alt={network?.name}
          className="network"
        />
      )}

      {/* Buttons */}
      <a
        className="btn visit"
        href={show?.homepage}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit
      </a>

      {show && (
        <YoutubeTrailer
          containerID="trailer"
          tmdbID={show?.id}
          title={show?.name || show?.original_name}
        />
      )}

      {/* Information 1 */}
      <ul>
        {contentRating && (
          <li>
            <span>{contentRating}</span>
          </li>
        )}
        <li>{splitSlug(show?.first_air_date)[0]}</li>
        <li>
          {show?.seasons?.length} Season
          {show?.seasons?.length > 1 && "s"}
        </li>
        <li>
          <a href="#leave-a-review" className="review">
            Leave a Review
          </a>
        </li>
      </ul>

      {/* Information 2 */}
      <p className="overview">{show?.overview}</p>
      {showPlot && <p className="plot">{otherDetails?.Plot}</p>}

      <p className="genre">
        {show?.genres?.map((genre, index) => {
          return (
            <span key={genre.name}>
              {genre.name}
              {index < show?.genres.length - 1 && ", "}
            </span>
          );
        })}
      </p>

      {/* Information 3 */}
      <p className="language">Language: {otherDetails?.Language}</p>

      {showProducers && <Producers tmdbId={show?.id} />}
    </section>
  );
};

export default ShowDetails;
