import React from "react";
// Hooks
import { useFetchApi } from "../hooks/useFetchApi";
// Service
import { getTvShowVideo } from "../service/requests";
// CSS
import "./YoutubeTrailer.css";

const YoutubeTrailer = ({ containerID, tmdbID, title }) => {
  const {
    isLoading,
    hasError,
    apiData: trailer,
  } = useFetchApi(getTvShowVideo(tmdbID));

  const getTrailer = () => {
    const trailerVideo = trailer?.results.find(
      (video) => video?.type === "Trailer"
    );
    return trailerVideo;
  };

  return (
    <section id={containerID} className="youtube-trailer">
      {trailer?.results && (
        <iframe
          src={`https://www.youtube.com/embed/${
            getTrailer()?.key
          }?si=JCnaD6PZ1xf_D1ch`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </section>
  );
};

export default YoutubeTrailer;
