import React, { useEffect, useState } from "react";
import "./Slider.css";
import ShowDetails from "../showDetails/ShowDetails";

const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

const Slider = ({ slideData, delay = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideLength = slideData.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === slideLength ? 0 : activeIndex + 1);
    }, delay);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="slider">
      {slideData?.map((data) => (
        <div
          key={data.id}
          style={{
            background: `url(${TMDB_ASSET_BASEURL}${data?.backdrop_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container">
            <div className="wrapper">
              <ShowDetails tmdbID={data.id} allowLinkTitle={true} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Slider;
