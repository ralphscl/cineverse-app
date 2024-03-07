import { useParams } from "react-router-dom";
// Hooks
import { useFetchApi } from "../hooks/useFetchApi";
// Service
import { getTvShow } from "../service/requests";
// Utils
import { splitSlug } from "../utils/StringUtils";
// CSS
import "./ShowPage.css";

const ShowPage = () => {
  const { slug } = useParams();
  const [id] = splitSlug(slug);

  const { isLoading, serverError, apiData } = useFetchApi(getTvShow(id));

  const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

  console.log(apiData);
  return (
    <div className="showpage">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${TMDB_ASSET_BASEURL}${apiData?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {isLoading && <p className="loading">Loading.....</p>}
        {serverError && <p>Error fetching data. Please try again later</p>}
        <div className="overlay" />
      </div>
      <div className="content">{id}</div>
    </div>
  );
};

export default ShowPage;
