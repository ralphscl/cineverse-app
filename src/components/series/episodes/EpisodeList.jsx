import React, { Suspense, lazy, useEffect } from "react";
import { getSeriesSeasons } from "../../../service/requests";
// Hooks
import { useFetchApi } from "../../../hooks/useFetchApi";
import "./EpisodeList.css";

const EpisodeCard = lazy(() => import("../../cards/episodeCard/EpisodeCard"));
const EpisodeList = ({ containerID, tmdbID, season }) => {
  const {
    isLoading,
    hasError,
    apiData: seasonDetails,
  } = useFetchApi(getSeriesSeasons(tmdbID, season));

  return (
    <Suspense fallback={<div>Loading Components...</div>}>
      <div key={containerID} className="episode-list">
        {seasonDetails?.episodes?.map((episode) => (
          <EpisodeCard
            key={episode?.episode_number}
            episode={episode}
            defaultImage={seasonDetails?.poster_path}
          />
        ))}
      </div>
    </Suspense>
  );
};

export default EpisodeList;
