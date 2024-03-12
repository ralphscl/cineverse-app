import React, { useEffect, useState } from "react";
import "./EpisodeList.css";

const EpisodeList = ({ containerID, tmdbID, seasons }) => {
  const [curSeason, setCurSeason] = useState();

  useEffect(() => {
    if (curSeason === undefined && seasons?.length > 0) {
      setCurSeason(seasons[0].season_number);
    }

    //
  }, [curSeason, seasons]);

  return (
    <section id={containerID} className="episode-list">
      <div className="seasons">
        <ul>
          {seasons?.map((season) => (
            <>
              {console.log(season)}
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
    </section>
  );
};

export default EpisodeList;
