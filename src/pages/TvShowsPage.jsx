import React, { useState } from "react";
// Utils
import { capitalizeFirstLetter } from "../utils/StringUtils";
// Service
import { requests, getTvShows } from "../service/requests";
// Components
import Row from "../components/containers/Row";
// CSS
import "./TvShowsPage.css";

const TvShowsPage = () => {
  const [network, setNetwork] = useState("netflix");

  return (
    <div className="listing">
      <div className="banner"></div>

      <div className="content">
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
          title="Popular Shows"
          reqUrl={requests.getPopular}
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

export default TvShowsPage;
