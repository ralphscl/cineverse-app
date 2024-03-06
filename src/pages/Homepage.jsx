import React, { useState } from "react";
// Utils
import { capitalizeFirstLetter } from "../utils/StringUtils";
// Service
import { requests, getTvShows } from "../service/requests";
// Components
import Row from "../components/containers/Row";

const Homepage = () => {
  const [network, setNetwork] = useState("netflix");
  return (
    <>
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
    </>
  );
};

export default Homepage;
