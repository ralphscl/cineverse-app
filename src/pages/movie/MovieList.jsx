import React, { useEffect, useState } from "react";
import { useFetchApi } from "../../hooks/useFetchApi";
import { getMovieList } from "../../service/tmdb/requests";
import ShowBanner from "../../components/banner/ShowBanner";
import ShowDetails from "../../components/showDetails/ShowDetails";

const MovieList = () => {
  const [genre, setGenre] = useState({ id: 80, name: "Crime" });
  const [bannerShow, setBannerShow] = useState(null);

  const {
    isLoading,
    hasError,
    apiData: trendingData,
  } = useFetchApi(getMovieList(), "tmdb");

  useEffect(() => {
    setBannerShow(
      trendingData?.results[
        Math.floor(Math.random() * trendingData?.results.length)
      ]
    );
  }, [trendingData]);

  return (
    <div className="movie-list">
      <ShowBanner
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
    </div>
  );
};

export default MovieList;
