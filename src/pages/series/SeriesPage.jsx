import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import ShowDetails from "../../components/showDetails/ShowDetails";
import SeasonList from "../../components/series/seasons/SeasonList";
import Credits from "../../components/credits/Credits";
import Recommended from "../../components/recommended/Recommended";
import Comments from "../../components/comments/Comments";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi";
// Service
import { getShowDetails } from "../../service/tmdb/requests";
// Utils
import { splitSlug } from "../../utils/StringUtils";
// CSS
import "./SeriesPage.css";

const SeriesPage = () => {
  const { slug } = useParams();
  const [id] = splitSlug(slug);

  const {
    isLoading,
    hasError,
    apiData: show,
  } = useFetchApi(getShowDetails("tv", id), "tmdb");

  const [recommended, hasRecommended] = useState(true);

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [id]);

  return (
    <div className="series-page">
      {hasError && <p>Error fetching data. Please try again later</p>}
      {isLoading ? (
        <p className="loading">Loading.....</p>
      ) : (
        <>
          <Banner imageUrl={show?.backdrop_path} size="lg" />

          <ShowDetails
            showType="tv"
            tmdbID={id}
            showPlot={true}
            showProducers={true}
          />

          <SeasonList tmdbID={id} seasons={show?.seasons} />

          <div style={{ backgroundColor: "rgba(255,255,255,3%)" }}>
            <Credits tmdbID={id} />
          </div>

          {recommended && (
            <Recommended
              tmbdID={id}
              type={"tv"}
              hasApiResult={hasRecommended}
            />
          )}

          {/* <Comments tmbdID={id} /> */}
        </>
      )}
    </div>
  );
};

export default SeriesPage;
