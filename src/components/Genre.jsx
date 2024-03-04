import { useEffect, useState } from "react";
import { getGenreNames } from "../service/requests.js";

const Genre = ({ show, type }) => {
  const [genres, setGenres] = useState();

  useEffect(() => {
    const fetchGenres = async () => {
      const fetchedGenres = await Promise.all(
        show?.genre_ids.map((id) => getGenreNames("tv", id))
      );
      setGenres(fetchedGenres);
    };

    fetchGenres();
  }, [show]);

  return <p className="genre">{genres?.join(", ") || "Unknown"}</p>;
};

export default Genre;
