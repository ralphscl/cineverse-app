import React from "react";
import RowContainer from "../containers/RowContainer";
import { getRecommended } from "../../service/tmdb/requests";
import "./Recommended.css";

const Recommended = ({ type, tmbdID, hasApiResult = null }) => {
  return (
    <section className="recommended">
      <RowContainer
        title="More like this"
        reqUrl={getRecommended(type, tmbdID)}
        cardType="poster"
        showType="tv"
        hasApiResult={hasApiResult}
      />
    </section>
  );
};

export default Recommended;
