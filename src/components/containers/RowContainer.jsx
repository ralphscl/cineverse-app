import { useEffect } from "react";
import ShowCard from "../cards/showCard/ShowCard.jsx";
// Hooks
import { useFetchApi } from "../../hooks/useFetchApi.jsx";
// CSS
import "./RowContainer.css";

const ScrollableRow = ({
  title,
  reqUrl,
  hideTitle = false,
  cardType,
  showType,
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
      <div className={`row ${cardType}`}>
        {hasError && <p>Error fetching data. Please try again later</p>}
        {shows?.total_results === 0 ? (
          <div className="empty-rows">
            <p>{`Currently, there are no shows available in the "${title}" category on this network. Please check back later or explore other categories.`}</p>
          </div>
        ) : isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          shows?.results?.map((show) => (
            <ShowCard key={show.id} show={show} cardType={cardType} showType={showType} />
          ))
        )}
      </div>
    </div>
  );
};

export default ScrollableRow;
