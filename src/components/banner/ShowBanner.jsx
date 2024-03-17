import React from "react";
import Overlay from "../overlay/Overlay";
import "./ShowBanner.css";

const ShowBanner = ({ imageUrl }) => {
  const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

  return (
    <section
      className="banner"
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
