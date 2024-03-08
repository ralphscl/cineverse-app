import { useParams } from "react-router-dom";
// Hooks
import { useFetchApi } from "../hooks/useFetchApi";
// Service
import { getTvShow } from "../service/requests";
// Utils
import { splitSlug } from "../utils/StringUtils";
import { checkNullOrUndefined } from "../utils/ObjectUtils.js";
// CSS
import "./TvShowPage.css";

const TvShowPage = () => {
  const { slug } = useParams();
  const [id] = splitSlug(slug);

  const { isLoading, serverError, apiData } = useFetchApi(getTvShow(id));

  const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

  return (
    <div className="showpage">
      <div
        className="banner"
        style={{
          backgroundImage:
            apiData && `url(${TMDB_ASSET_BASEURL}${apiData?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {isLoading && <p className="loading">Loading.....</p>}
        {serverError && <p>Error fetching data. Please try again later</p>}
        <div className="overlay" />
      </div>
      <div className="content">
        <h1>{apiData?.title || apiData?.name || apiData?.original_name}</h1>

        <button
          className="visit"
          onClick={() => window.open(apiData.homepage, "_blank")}
        >
          Visit
        </button>
        <button className="trailer">Trailer</button>

        <ul>
          <li>{splitSlug(apiData?.first_air_date)[0]}</li>
          <li>
            {apiData?.seasons?.length} Season
            {apiData?.seasons?.length > 1 && "s"}
          </li>
          <li>
            <a href="#leave-a-review">Leave a Review</a>
          </li>
        </ul>

        <p className="overview">{apiData?.overview}</p>
      </div>
    </div>
  );
};

export default TvShowPage;
