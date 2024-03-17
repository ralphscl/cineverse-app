import React from "react";
import Row from "./containers/Row";
import { getRecommended } from "../service/requests";
import "./Recommended.css";

const Recommended = ({ type, tmbdID }) => {
  return (
    <div className="recommended">
      <Row
        title="More like this"
        reqUrl={getRecommended(type, tmbdID)}
        cardType="poster"
      />
    </div>
  );
};

export default Recommended;
