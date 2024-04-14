import React, { useEffect, useState } from "react";
// Utils
import { capitalizeFirstLetter } from "../../utils/StringUtils";
// Service
import { requests, getSeriesList } from "../../service/requests";
import { useFetchApi } from "../../hooks/useFetchApi";
// Components
import ShowBanner from "../../components/banner/ShowBanner";
import ShowDetails from "../../components/showDetails/ShowDetails";
import Networks from "../../components/networks/Networks";
import ScrollableRow from "../../components/containers/ScrollableRow";
// CSS
import "./SeriesList.css";

const SeriesList = () => {
  const [network, setNetwork] = useState("Netflix");
  const [genre, setGenre] = useState({ id: 80, name: "Crime" });
  const [bannerShow, setBannerShow] = useState(null);

  const {
    isLoading,
    hasError,
    apiData: trendingData,
  } = useFetchApi(getSeriesList(1, network, "popularity", "desc"));

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

      <Networks currentNetwork={network} setNetwork={setNetwork} />

      <div className="listing">
        <ScrollableRow
          title={""}
          reqUrl={getSeriesList(1, network, "popular", "desc")}
          cardType="poster"
        />

        <ScrollableRow
          title={`${capitalizeFirstLetter(genre.name)}`}
          reqUrl={getSeriesList(1, network, null, null, genre.id)}
          cardType="poster"
        />

        <ScrollableRow
          title="Top Rated"
          reqUrl={requests.getTopRated}
          cardType="backdrop"
        />

        <ScrollableRow
          title="Trending Now"
          reqUrl={requests.getTrending}
          cardType="backdrop"
        />
      </div>
    </div>
  );
};

export default SeriesList;
