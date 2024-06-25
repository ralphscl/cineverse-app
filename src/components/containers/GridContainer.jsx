import { useFetchApi } from '../../hooks/useFetchApi';
import ShowCard from '../cards/showCard/ShowCard';
import "./GridContainer.css";

const ScrollableCollumn = ({
  title,
  reqUrl,
  hideTitle = false,
  cardType,
  showType
}) => {
  const { isLoading, hasError, apiData: shows } = useFetchApi(reqUrl, "tmdb");

  console.log(shows)
  return (
    <div>
      {shows?.results?.map((show) => (
        <ShowCard key={show.id} show={show} cardType={cardType} showType={showType} />
      ))}
    </div>
  )
}

export default ScrollableCollumn