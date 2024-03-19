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

  const { isLoading, hasError, apiData: show } = useFetchApi(getTvShow(id));

  return (
    <div className="tvpage">
      {isLoading && <p className="loading">Loading.....</p>}
      {hasError && <p>Error fetching data. Please try again later</p>}
      <ShowBanner imageUrl={show?.backdrop_path} size="lg" />

      <ShowDetails show={show} />

      <YoutubeTrailer
        containerID="trailer"
        tmdbID={id}
        title={show?.name || show?.original_name}
      />

      <SeasonNav tmdbID={id} seasons={show?.seasons} />

      <div style={{ backgroundColor: "rgba(255,255,255,3%)" }}>
        <Credits tmdbID={id} />
      </div>

      <Recommended tmbdID={id} type={"tv"} />
    </div>
  );
};

export default TvPage;
