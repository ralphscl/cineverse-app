import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import YoutubeTrailer from "../../components/youtubeTrailer/YoutubeTrailer";
import { useFetchApi } from "../../hooks/useFetchApi";
import { getContentRating, getSeriesDetails } from "../../service/requests";
// Utils
import { splitSlug, convertToSlug } from "../../utils/StringUtils";
import "./ShowDetails.css";

const ShowDetails = ({ tmdbID, allowLinkTitle = null }) => {
  const [contentRating, setContentRating] = useState(null);

  const {
    isLoading,
    hasError,
    apiData: show,
  } = useFetchApi(getSeriesDetails(tmdbID));

  const showTitle = show?.title || show?.name || show?.original_name;

  useEffect(() => {
    const fetchContentRating = async () => {
      const fetchedContentRating = await getContentRating(show?.id);
      setContentRating(fetchedContentRating);
    };

    fetchContentRating();
  }, [show]);

  // console.log(contentRating);

  return (
    <section className="show-details">
      {allowLinkTitle ? (
        <Link to={`/series/${show?.id}-${convertToSlug(showTitle)}`}>
          <h1>{showTitle}</h1>
        </Link>
      ) : (
        <h1>{showTitle}</h1>
      )}

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

      <p className="overview">{show?.overview}</p>

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
    </section>
  );
};

export default ShowDetails;
