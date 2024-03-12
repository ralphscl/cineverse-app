import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EpisodeList from "../../components/EpisodeList";
import YoutubeTrailer from "../../components/YoutubeTrailer";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi";
// Service
import { getTvShow } from "../../service/requests";
// Utils
import { splitSlug } from "../../utils/StringUtils";
// CSS
import "./TvPage.css";

const TvPage = () => {
  const { slug } = useParams();
  const [id] = splitSlug(slug);

  const {
    isLoading: showLoading,
    serverError: showError,
    apiData: show,
  } = useFetchApi(getTvShow(id));

  const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

  console.log(show);
  return (
    <div className="tvpage">
      <section
        className="banner"
        style={{
          backgroundImage:
            show && `url(${TMDB_ASSET_BASEURL}${show?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {showLoading && <p className="loading">Loading.....</p>}
        {showError && <p>Error fetching data. Please try again later</p>}
        <div className="overlay" />
      </section>

      <div className="content">
        <section>
          <h1>{show?.title || show?.name || show?.original_name}</h1>

          <a
            className="btn visit"
            href={show?.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit
          </a>
          <a href="#trailer" className="btn trailer">
            Trailer
          </a>

          <ul>
            <li>{splitSlug(show?.first_air_date)[0]}</li>
            <li>
              {show?.seasons?.length} Season
              {show?.seasons?.length > 1 && "s"}
            </li>
            <li>
              <a href="#leave-a-review" className="review">
                Leave a Review
              </a>
            </li>
          </ul>

          <p className="overview">{show?.overview}</p>

          <p className="genre">
            {show?.genres.map((genre, index) => {
              return (
                <span key={genre.name}>
                  {genre.name}
                  {index < show?.genres.length - 1 && ", "}
                </span>
              );
            })}
          </p>
        </section>

        <YoutubeTrailer
          containerID="trailer"
          tmdbID={id}
          title={show?.name || show?.original_name}
        />
      </div>

      <EpisodeList containerID="episodes" tmdbID={id} seasons={show?.seasons} />
    </div>
  );
};

export default TvPage;
