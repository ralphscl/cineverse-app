import React from "react";
import Overlay from "../overlay/Overlay";
import "./ShowBanner.css";

const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

const ShowBanner = ({ imageUrl, size }) => {
  return (
    <section
      className={`banner ${size}`}
      style={{
        backgroundImage: imageUrl && `url(${TMDB_ASSET_BASEURL}${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <Overlay />
    </section>
  );
};

export default ShowBanner;
