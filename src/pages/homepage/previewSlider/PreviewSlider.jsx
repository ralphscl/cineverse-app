import React, { useEffect, useState } from "react";
import Slider from "../../../components/slider/Slider";
import Newsletter from "../../../components/newsletter/Newsletter";
import networks from "../../../service/networks";
import instance from "../../../service/tmdb/tmdb";
import "./PreviewSlider.css";

const PreviewSlider = () => {
  const [slideData, setSlideData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = Object.entries(networks).map(
          async ([network, networkId]) => {
            const url = `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_networks=${networkId}`;
            const res = await instance.get(url);
            const data = await res.data;

            return data.results[Math.floor(Math.random() * 21)];
          }
        );

        const results = await Promise.all(promises);
        setSlideData(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="preview-slider">
      <Slider slideData={slideData} />
    </div>
  );
};

export default PreviewSlider;
