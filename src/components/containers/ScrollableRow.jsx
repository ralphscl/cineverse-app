import { useEffect } from "react";
import ShowCard from "../cards/showCard/ShowCard.jsx";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi.jsx";
// CSS
import "./ScrollableRow.css";

const ScrollableRow = ({
  title,
  reqUrl,
  hideTitle = false,
  cardType,
  hasApiResult,
}) => {
  const { isLoading, hasError, apiData: shows } = useFetchApi(reqUrl, "tmdb");

  useEffect(() => {
    if (hasApiResult && shows?.results.length === 0) {
      hasApiResult(false);
    }
  }, [shows]);

  return (
    <div>
      {!hideTitle && <h2 className="row-title">{title}</h2>}

      <div className={`row ${cardType === "poster" ? "poster" : "backdrop"}`}>
        {hasError && <p>Error fetching data. Please try again later</p>}
        {isLoading ? (
          <section className="loading">Loading.....</section>
        ) : (
          shows?.results?.map((show) => (
            <ShowCard key={show.id} show={show} cardType={cardType} />
          ))
        )}
      </div>
    </div>
  );
};

export default ScrollableRow;
