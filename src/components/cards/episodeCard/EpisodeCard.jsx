import React from "react";
import NoImagePlaceholder from "../../../assets/no_image_placeholder.png";
import "./EpisodeCard.css";

const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

const EpisodeCard = ({ episode, defaultImage }) => {
  const getCoverUrl = () => {
    const episodeCover =
      episode.still_path !== "" ? episode.still_path : defaultImage;
    return episodeCover === null
      ? NoImagePlaceholder
      : TMDB_ASSET_BASEURL + episodeCover;
  };

  return (
    <div
      key={episode.episode_number}
      className="episode-card"
      style={{
        backgroundImage: `url(${getCoverUrl()})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="overlay">
        <h4 className="number">{episode.episode_number}</h4>
        <p className="title">{episode.name}</p>
        <p className="overview">{episode.overview}</p>
      </div>
    </div>
  );
};

export default EpisodeCard;
