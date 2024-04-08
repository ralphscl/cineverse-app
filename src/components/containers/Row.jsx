import ShowCard from "../cards/showCard/ShowCard.jsx";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi.jsx";
// CSS
import "./Row.css";
import { useEffect } from "react";

const Row = ({ title, reqUrl, cardType, hasApiResult }) => {
  const { isLoading, hasError, apiData: shows } = useFetchApi(reqUrl);

  useEffect(() => {
    if (hasApiResult && shows?.results.length === 0) {
      hasApiResult(false);
    }
  }, [shows]);

  return (
    <div>
      <h2 className="title">{title}</h2>

      <div className={`row ${cardType === "poster" ? "poster" : "backdrop"}`}>
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
