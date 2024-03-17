import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowBanner from "../../components/banner/ShowBanner";
import ShowDetails from "../../components/ShowDetails";
import YoutubeTrailer from "../../components/YoutubeTrailer";
import SeasonNav from "../../components/seasons/SeasonNav";
import Credits from "../../components/credits/Credits";
import Recommended from "../../components/Recommended";
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
  console.log(show);
  return (
    <div className="tvpage">
      {showLoading && <p className="loading">Loading.....</p>}
      {showError && <p>Error fetching data. Please try again later</p>}
      <ShowBanner imageUrl={show?.backdrop_path} />

      <ShowDetails show={show} />

      <YoutubeTrailer
        containerID="trailer"
        tmdbID={id}
        title={show?.name || show?.original_name}
      />

      <SeasonNav tmdbID={id} seasons={show?.seasons} />

      <Credits tmdbID={id} />

      <Recommended tmbdID={id} type={"tv"} />
    </div>
  );
};

export default TvPage;
