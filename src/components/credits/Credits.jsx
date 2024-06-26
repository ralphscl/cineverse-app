import React from "react";
import CastCard from "../cards/castCard/CastCard";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi";
import { getCredits } from "../../service/tmdb/requests";
import "./Credits.css";

const Credits = ({ tmdbID }) => {
  const { isLoading, hasError, apiData } = useFetchApi(
    getCredits("tv", tmdbID),
    "tmdb"
  );

  return (
    <section className="credits">
      <h2>Casts</h2>
      <div className="casts">
        {apiData?.cast?.slice(0, 15).map((cast) => (
          <CastCard
            key={cast?.id}
            tmdbID={cast?.id}
            castCharacter={cast?.roles[0].character}
          />
        ))}
      </div>
    </section>
  );
};

export default Credits;
