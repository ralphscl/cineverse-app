import React, { Suspense, lazy, useEffect } from "react";
import { getTvSeason } from "../../service/requests";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi";
import "./EpisodeList.css";

const EpisodeCard = lazy(() => import("../cards/episodeCard/EpisodeCard"));

const EpisodeList = ({ containerID, tmdbID, season }) => {
  const {
    isLoading: showLoading,
    serverError: showError,
    apiData: seasonDetails,
  } = useFetchApi(getTvSeason(tmdbID, season));

  console.log(seasonDetails);
  return (
    <Suspense fallback={<div>Loading Components...</div>}>
      <section key={containerID} className="episode-list">
        {seasonDetails?.episodes?.map((episode) => (
          <EpisodeCard
            episode={episode}
            defaultImage={seasonDetails?.poster_path}
          />
        ))}
      </section>
    </Suspense>
  );
};

export default EpisodeList;
