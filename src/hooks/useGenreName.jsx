import React, { useState, useEffect } from "react";
import { getGenreNames } from "../service/requests";

const useGenreName = ({ show, showType }) => {
  const [genres, setGenres] = useState([]);
  //   console.log("genre");
  //   console.log(genres);
  useEffect(() => {
    const fetchGenres = async () => {
      const fetchedGenres = await Promise.all(
        show?.genre_ids.map((id) => getGenreNames(showType, id))
      );
      setGenres(fetchedGenres);
    };

    fetchGenres();
  }, [show, showType]);

  return genres?.join(", ") || "Unknown";
};

export default useGenreName;
