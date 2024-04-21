import { useState } from "react";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi";
// Service
import { getSeriesTrailers } from "../../service/tmdb/requests";
// CSS
import "./YoutubeTrailer.css";

const YoutubeTrailer = ({ containerID, tmdbID, title }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const {
    isLoading,
    hasError,
    apiData: trailer,
  } = useFetchApi(getSeriesTrailers(tmdbID), "tmdb");

  const getTrailer = () => {
    const trailerVideo = trailer?.results.find(
      (video) => video?.type === "Trailer"
    );
    return trailerVideo;
  };

  return (
    <>
      <a
        className="btn btn-trailer"
        onClick={() => setShowTrailer(!showTrailer)}
      >
        Trailer
      </a>

      {showTrailer && (
        <div
          id={containerID}
          className="trailer"
          onClick={() => setShowTrailer(false)}
        >
          <div className="container">
            {trailer?.results && (
              <iframe
                src={`https://www.youtube.com/embed/${
                  getTrailer()?.key
                }?si=JCnaD6PZ1xf_D1ch?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share autoplay"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default YoutubeTrailer;
