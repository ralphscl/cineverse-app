import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Hooks
import { useFetchApi } from "../hooks/useFetchApi";
// Service
import { getTvShow, getTvShowVideo } from "../service/requests";
// Utils
import { splitSlug } from "../utils/StringUtils";
// CSS
import "./TvShowPage.css";

const TvShowPage = () => {
  const { slug } = useParams();
  const [id] = splitSlug(slug);

  const {
    isLoading: showLoading,
    serverError: showError,
    apiData: show,
  } = useFetchApi(getTvShow(id));

  const {
    isLoading: trailerLoading,
    serverError: trailerError,
    apiData: trailer,
  } = useFetchApi(getTvShowVideo(id));

  const getTrailer = () => {
    const trailerVideo = trailer?.results.find(
      (video) => video?.type === "Trailer"
    );
    return trailerVideo;
  };

  const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

  console.log(show);
  return (
    <div className="showpage">
      <div
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
      </div>

      <div className="content">
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

        <div id="trailer" className="video-container">
          {trailer?.results && (
            <iframe
              width="90%"
              height="720"
              frameBorder="0"
              src={`https://www.youtube.com/embed/${
                getTrailer()?.key
              }?si=JCnaD6PZ1xf_D1ch`}
              title={show?.name || show?.original_name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default TvShowPage;
