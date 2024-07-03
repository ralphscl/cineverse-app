import { useEffect, useState } from "react";
import { useFetchApi } from "../../hooks/useFetchApi";
import { topMovies, getMovieList, getGenres } from "../../service/tmdb/requests";
import { capitalizeFirstLetter } from "../../utils/StringUtils";
import Banner from "../../components/banner/Banner";
import RowContainer from "../../components/containers/RowContainer";
import GridContainer from "../../components/containers/GridContainer";
import ShowDetails from "../../components/showDetails/ShowDetails";
import Dropdown from "../../components/dropdown/Dropdown";
import "./MovieList.css";

const MovieList = () => {
  const [genre, setGenre] = useState("");
  const [bannerShow, setBannerShow] = useState(null);

  const { // Banner
    isLoading,
    hasError,
    apiData: trendingData,
  } = useFetchApi(getMovieList(1, null), "tmdb");

  const { // Genre options
    apiData: genreList,
  } = useFetchApi(getGenres("movie"), "tmdb");

  useEffect(() => {
    setBannerShow(
      trendingData?.results[
      Math.floor(Math.random() * trendingData?.results.length)
      ]
    );
    setGenre(genreList?.genres[0])
  }, [trendingData]);

  return (
    <div className="movie-list">
      <Banner
        imageUrl={bannerShow?.backdrop_path}
        size="sm"
        allowLinkTitle={true}
      />

      {bannerShow?.id && (
        <ShowDetails
          showType="movie"
          tmdbID={bannerShow?.id}
          allowLinkTitle={true}
        />
      )}

      <div className="listing">
        <RowContainer
          title="Top Rated"
          reqUrl={topMovies.getTopRated}
          cardType="backdrop"
          showType="movie"
        />

        <RowContainer
          title="Trending Now"
          reqUrl={topMovies.getTrending}
          cardType="backdrop"
          showType="movie"
        />

        <Dropdown
          options={genreList?.genres}
          selectedOption={genre}
          onChangeOption={setGenre}
        />
        <GridContainer
          title={`${capitalizeFirstLetter(genre?.name)}`}
          hideTitle={true}
          reqUrl={getMovieList(1, null, null, genre?.id)}
          cardType="poster"
        />
      </div>
    </div>
  );
};

export default MovieList;
