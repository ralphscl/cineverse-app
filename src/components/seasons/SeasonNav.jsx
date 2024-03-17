import React, { useEffect, useState } from "react";
import EpisodeList from "../episodes/EpisodeList";
import "./SeasonNav.css";

const SeasonNav = ({ tmdbID, seasons }) => {
  const [curSeason, setCurSeason] = useState();

  useEffect(() => {
    if (curSeason === undefined && seasons?.length > 0) {
      setCurSeason(seasons[0].season_number);
    }
  }, [curSeason, seasons]);

  return (
    <section className="season-nav">
      <div className="seasons">
        <ul>
          {seasons?.map((season) => (
            <>
              {season?.air_date !== null && (
                <li
                  className={`${
                    season?.season_number === curSeason && "active"
                  }`}
                  onClick={() => setCurSeason(season?.season_number)}
                >
                  {season?.name}
                </li>
              )}
            </>
          ))}
        </ul>
      </div>

      <EpisodeList
        containerID={"episodes"}
        tmdbID={tmdbID}
        season={curSeason}
      />
    </section>
  );
};

export default SeasonNav;
