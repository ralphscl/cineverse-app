import React from "react";
import "./EpisodeCard.css";

const EpisodeCard = ({ episode }) => {
  const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

  return (
    <div
      className="episode-card"
      style={{
        backgroundImage:
          episode && `url(${TMDB_ASSET_BASEURL}${episode.still_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <p>{episode.name}</p>
    </div>
  );
};

export default EpisodeCard;
