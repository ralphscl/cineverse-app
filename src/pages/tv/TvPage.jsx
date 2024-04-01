import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowBanner from "../../components/banner/ShowBanner";
import ShowDetails from "../../components/ShowDetails";
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
  const [recommended, hasRecommended] = useState(true);

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [id]);

  return (
    <div className="tvpage">
      {isLoading && <p className="loading">Loading.....</p>}
      {hasError && <p>Error fetching data. Please try again later</p>}
      <ShowBanner imageUrl={show?.backdrop_path} size="lg" />

      <ShowDetails show={show} />

      <SeasonNav tmdbID={id} seasons={show?.seasons} />

      <div style={{ backgroundColor: "rgba(255,255,255,3%)" }}>
        <Credits tmdbID={id} />
      </div>

      {recommended && (
        <Recommended tmbdID={id} type={"tv"} hasApiResult={hasRecommended} />
      )}
    </div>
  );
};

export default TvPage;
