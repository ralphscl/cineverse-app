import React, { useEffect, useState } from "react";
// Utils
import { capitalizeFirstLetter } from "../../utils/StringUtils";
// Service
import { requests, getSeriesList } from "../../service/tmdb/requests";
import { useFetchApi } from "../../hooks/useFetchApi";
// Components
import Banner from "../../components/banner/Banner";
import ShowDetails from "../../components/showDetails/ShowDetails";
import Networks from "../../components/networks/Networks";
import Genres from "../../components/genres/Genres";
import RowContainer from "../../components/containers/RowContainer";
// CSS
import "./SeriesList.css";

const SeriesList = () => {
  const [network, setNetwork] = useState("Netflix");
  const [genre, setGenre] = useState({ id: 80, name: "Crime" });
  const [bannerShow, setBannerShow] = useState(null);

  const { // Banner
    isLoading,
    hasError,
    apiData: trendingData,
  } = useFetchApi(getSeriesList(1, network, "popularity", "desc"), "tmdb");

  useEffect(() => {
    setBannerShow(
      trendingData?.results[
      Math.floor(Math.random() * trendingData?.results.length)
      ]
    );
  }, [trendingData]);

  return (
    <div className="series-list">
      <Banner
        imageUrl={bannerShow?.backdrop_path}
        size="sm"
        allowLinkTitle={true}
      />

      {bannerShow?.id && (
        <ShowDetails
          showType="tv"
          tmdbID={bannerShow?.id}
          allowLinkTitle={true}
        />
      )}

      <div className="listing">
        <Networks currentNetwork={network} setNetwork={setNetwork} />
        <RowContainer
          title={`${network} Shows`}
          reqUrl={getSeriesList(1, network, "popular", "desc")}
          hideTitle={true}
          cardType="poster"
          showType="tv"
        />

        <Genres
          currentNetwork={network}
          currentGenre={genre}
          setGenre={setGenre}
          showType={"tv"}
        />
        <RowContainer
          title={`${capitalizeFirstLetter(genre.name)}`}
          reqUrl={getSeriesList(1, network, null, null, genre.id)}
          hideTitle={true}
          cardType="poster"
          showType="tv"
        />

        <RowContainer
          title="Top Rated"
          reqUrl={requests.getTopRated}
          cardType="backdrop"
          showType="tv"
        />

        <RowContainer
          title="Trending Now"
          reqUrl={requests.getTrending}
          cardType="backdrop"
          showType="tv"
        />
      </div>
    </div>
  );
};

export default SeriesList;
