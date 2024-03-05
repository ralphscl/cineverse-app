import React, { useEffect, useState } from "react";
import ShowCard from "./ShowCard.jsx";
import instance from "../service/tmdb.js";
import "./Row.css";

const Row = ({ title, reqUrl, cardType }) => {
  const [shows, setShows] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const req = await instance.get(reqUrl);
      setShows(req.data.results);
    };

    fetchData();
  }, [reqUrl]);

  console.table(shows);

  return (
    <div>
      <h2 className="title">{title}</h2>

      <div className="row">
        {shows?.map((show) => {
          return <ShowCard key={show.id} show={show} cardType={cardType} />;
        })}
      </div>
    </div>
  );
};

export default Row;
