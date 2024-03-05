import ShowCard from "../cards/ShowCard.jsx";
import { useFetchAPI } from "../../hooks/useFetchApi.jsx";
import "./Row.css";

const Row = ({ title, reqUrl, cardType }) => {
  const { isLoading, serverError, apiData } = useFetchAPI(reqUrl);

  console.table(apiData?.results);

  return (
    <div>
      <h2 className="title">{title}</h2>

      <div className="row">
        {isLoading && <p>Loading.....</p>}
        {serverError && <p>Error fetching data. Please try again later</p>}
        {apiData?.results?.map((show) => {
          return <ShowCard key={show.id} show={show} cardType={cardType} />;
        })}
      </div>
    </div>
  );
};

export default Row;
