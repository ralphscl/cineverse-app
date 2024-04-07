import React, { useEffect, useState } from "react";
// Utils
import { capitalizeFirstLetter } from "../../utils/StringUtils";
// Service
import { requests, getTvShows } from "../../service/requests";
import { useFetchApi } from "../../hooks/useFetchApi";
// Components
import ShowBanner from "../../components/banner/ShowBanner";
import ShowDetails from "../../components/showDetails/ShowDetails";
import Row from "../../components/containers/Row";
// CSS
import "./SeriesList.css";

const SeriesList = () => {
  const [network, setNetwork] = useState("disney+");
  const [bannerShow, setBannerShow] = useState(null);

  const {
    isLoading,
    hasError,
    apiData: trendingData,
  } = useFetchApi(getTvShows(1, network, "popularity", "desc"));

  useEffect(() => {
    setBannerShow(
      trendingData?.results[
        Math.floor(Math.random() * trendingData?.results.length)
      ]
    );
  }, [trendingData]);

  return (
    <div className="series-list">
      <ShowBanner
        imageUrl={bannerShow?.backdrop_path}
        size="sm"
        allowLinkTitle={true}
      />

      <ShowDetails show={bannerShow} allowLinkTitle={true} />

      <div className="listing">
        <Row
          title={`${capitalizeFirstLetter(network)} TV Shows`}
          reqUrl={getTvShows(2, network)}
          cardType="poster"
        />
        <Row
          title="Trending Now"
          reqUrl={requests.getTrending}
          cardType="backdrop"
        />
        <Row
          title="Top Rated"
          reqUrl={requests.getTopRated}
          cardType="backdrop"
        />
      </div>
    </div>
  );
};

export default SeriesList;
