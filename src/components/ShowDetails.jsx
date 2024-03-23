import React, { useState, useEffect } from "react";
// Utils
import { splitSlug } from "../utils/StringUtils";
import "./ShowDetails.css";
import { getContentRating } from "../service/requests";

const ShowDetails = ({ show }) => {
  const [contentRating, setContentRating] = useState(null);

  useEffect(() => {
    const fetchContentRating = async () => {
      const fetchedContentRating = await getContentRating(show?.id);
      setContentRating(fetchedContentRating);
    };

    fetchContentRating();
  }, [show]);
  console.log(contentRating);

  return (
    <section className="content">
      <h1>{show?.title || show?.name || show?.original_name}</h1>

      <a
        className="btn visit"
        href={show?.homepage}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit
      </a>
      <a href="#trailer" className="btn trailer">
        Trailer
      </a>

      <ul>
        <li>
          <span>{contentRating}</span>
        </li>
        <li>{splitSlug(show?.first_air_date)[0]}</li>
        <li>
          {show?.seasons?.length} Season
          {show?.seasons?.length > 1 && "s"}
        </li>
        <li>
          <a href="#leave-a-review" className="review">
            Leave a Review
          </a>
        </li>
      </ul>

      <p className="overview">{show?.overview}</p>

      <p className="genre">
        {show?.genres?.map((genre, index) => {
          return (
            <span key={genre.name}>
              {genre.name}
              {index < show?.genres.length - 1 && ", "}
            </span>
          );
        })}
      </p>
    </section>
  );
};

export default ShowDetails;
