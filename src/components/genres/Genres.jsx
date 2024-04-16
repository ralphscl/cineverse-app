import { useEffect, useState } from "react";
import { getGenres } from "../../service/requests";
import { useFetchApi } from "../../hooks/useFetchApi";
import "./Genres.css";

const Genres = ({ currentGenre, setGenre, showType }) => {
  const {
    isLoading,
    hasError,
    apiData: genreList,
  } = useFetchApi(getGenres(showType));

  return (
    <div className="genres">
      {genreList?.genres.map((genre) => (
        <GenreItem
          key={genre?.id}
          genre={genre}
          currentGenre={currentGenre}
          setGenre={setGenre}
        />
      ))}
    </div>
  );
};

const GenreItem = ({ genre, currentGenre, setGenre }) => {
  return (
    <div
      className={`genre-item ${genre?.id === currentGenre?.id && "active"}`}
      onClick={() => setGenre(genre)}
    >
      <h3>{genre.name}</h3>
    </div>
  );
};

export default Genres;
