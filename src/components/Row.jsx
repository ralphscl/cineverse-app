import React, { useEffect, useState } from "react";
import instance from "../service/tmdb.js";
import Genre from "./Genre.jsx";
import "./Row.css";

const Row = ({ title, reqUrl }) => {
  const [shows, setShows] = useState();
  const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

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
          return (
            <div
              key={show.id}
              className="card"
              style={{
                backgroundImage: `url(${TMDB_ASSET_BASEURL}${show.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <div className="overlay">
                <div className="description">
                  <p className="title">{show.name}</p>
                  <p className="summary">{show.overview}</p>
                  <Genre show={show} type="tv" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Row;
