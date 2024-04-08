import { useEffect, useState } from "react";
import EpisodeList from "../episodes/EpisodeList";
import "./SeasonList.css";

const SeasonList = ({ tmdbID, seasons }) => {
  const [curSeason, setCurSeason] = useState(0);

  useEffect(() => {
    if (curSeason !== undefined && seasons?.length > 0) {
      setCurSeason(seasons[curSeason].season_number);
    }
  }, [curSeason, seasons]);

  useEffect(() => setCurSeason(0), [tmdbID]);

  return (
    <section className="season-list">
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

export default SeasonList;