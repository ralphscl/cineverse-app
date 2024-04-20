import React from "react";
import ScrollableRow from "../containers/ScrollableRow";
import { getRecommended } from "../../service/tmdb/requests";
import "./Recommended.css";

const Recommended = ({ type, tmbdID, hasApiResult = null }) => {
  return (
    <section className="recommended">
      <ScrollableRow
        title="More like this"
        reqUrl={getRecommended(type, tmbdID)}
        cardType="poster"
        hasApiResult={hasApiResult}
      />
    </section>
  );
};

export default Recommended;
