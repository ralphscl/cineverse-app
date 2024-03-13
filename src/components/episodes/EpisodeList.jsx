import React, { useEffect } from "react";
import { getTvSeason } from "../../service/requests";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi";
import EpisodeCard from "./EpisodeCard";
import "./EpisodeList.css";

const EpisodeList = ({ containerID, tmdbID, season }) => {
  const {
    isLoading: showLoading,
    serverError: showError,
    apiData: seasonDetails,
  } = useFetchApi(getTvSeason(tmdbID, season));

  console.log(seasonDetails);
  return (
    <section className="episode-list">
      {seasonDetails?.episodes?.map((episode) => (
        <EpisodeCard episode={episode} />
      ))}
    </section>
  );
};

export default EpisodeList;
