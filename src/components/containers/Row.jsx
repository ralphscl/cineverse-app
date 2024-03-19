import ShowCard from "../cards/showCard/ShowCard.jsx";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi.jsx";
// CSS
import "./Row.css";

const Row = ({ title, reqUrl, cardType }) => {
  const { isLoading, hasError, apiData: shows } = useFetchApi(reqUrl);

  return (
    <div>
      <h2 className="title">{title}</h2>

      <div className="row">
        {isLoading && <section className="loading">Loading.....</section>}
        {hasError && <p>Error fetching data. Please try again later</p>}
        {shows?.results?.map((show) => {
          return <ShowCard key={show.id} show={show} cardType={cardType} />;
        })}
      </div>
    </div>
  );
};

export default Row;
