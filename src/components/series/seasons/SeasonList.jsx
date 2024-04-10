import { useEffect, useState } from "react";
import EpisodeList from "../episodes/EpisodeList";
import "./SeasonList.css";

const SeasonList = ({ tmdbID, seasons }) => {
  const [curSeason, setCurSeason] = useState(0);

  useEffect(() => {
    // Update the current season when seasons is not empty
    if (seasons?.length > 0) {
      setCurSeason(seasons[0]?.season_number);
    }
  }, [seasons]);

  useEffect(() => setCurSeason(0), [tmdbID]);

  return (
    <section className="season-list">
      <div className="seasons">
        <ul>
          {seasons?.map(
            (season) =>
              season?.air_date !== null && (
                <li
                  key={season?.season_number}
                  className={`${
                    season?.season_number === curSeason && "active"
                  }`}
                  onClick={() => setCurSeason(season?.season_number)}
                >
                  {season?.name}
                </li>
              )
          )}
        </ul>
      </div>

      {curSeason && (
        <EpisodeList
          containerID={"episodes"}
          tmdbID={tmdbID}
          season={curSeason}
        />
      )}
    </section>
  );
};

export default SeasonList;
