import ShowCard from "../cards/ShowCard.jsx";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi.jsx";
// CSS
import "./Row.css";

const Row = ({ title, reqUrl, cardType }) => {
  const { isLoading, serverError, apiData } = useFetchApi(reqUrl);

  return (
    <div>
      <h2 className="title">{title}</h2>

      <div className="row">
        {isLoading && <div className="loading">Loading.....</div>}
        {serverError && <p>Error fetching data. Please try again later</p>}
        {apiData?.results?.map((show) => {
          return <ShowCard key={show.id} show={show} cardType={cardType} />;
        })}
      </div>
    </div>
  );
};

export default Row;
