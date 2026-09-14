import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchApi } from "../../hooks/useFetchApi";
import { getGenres, getMovieList, requests } from "../../service/tmdb/requests";
import { capitalizeFirstLetter } from "../../utils/StringUtils";
import Banner from "../../components/banner/Banner";
import GridContainer from "../../components/containers/GridContainer";
import RowContainer from "../../components/containers/RowContainer";
import ShowDetails from "../../components/showDetails/ShowDetails";
import Dropdown from "../../components/dropdown/Dropdown";
import useListingReveal from "../../hooks/useListingReveal";
import "./MovieList.css";
import "../ListingTransitions.css";

const MovieList = () => {
  const [params, setParams] = useSearchParams();
  const page = Math.min(500, Math.max(1, Math.floor(Number(params.get("page"))) || 1));
  const [bannerShow, setBannerShow] = useState(null);
  const genrePickerRef = useRef(null);
  const listingRef = useListingReveal();
  const shouldScrollToGenreRef = useRef(false);

  const { apiData: trendingData } = useFetchApi(getMovieList(1, null), "tmdb");

  const { // Genre options
    apiData: genreList,
  } = useFetchApi(getGenres("movie"), "tmdb");

  useEffect(() => {
    setBannerShow(
      trendingData?.results[
      Math.floor(Math.random() * trendingData?.results.length)
      ]
    );
  }, [trendingData]);

  const genre = genreList?.genres?.find((item) => String(item.id) === params.get("genre")) || null;
  const selectedGenreName = genre?.name || "Popular Movies";

  const handleGenreChange = (nextGenre) => {
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (nextGenre?.id) next.set("genre", nextGenre.id); else next.delete("genre");
      next.delete("page");
      return next;
    });
  };

  const handlePageChange = (nextPage) => {
    shouldScrollToGenreRef.current = true;
    setParams((current) => {
      const next = new URLSearchParams(current);
      next.set("page", nextPage);
      return next;
    });
  };

  const scrollToGenrePicker = useCallback(() => {
    if (!shouldScrollToGenreRef.current) {
      return;
    }

    shouldScrollToGenreRef.current = false;

    window.requestAnimationFrame(() => {
      const genrePicker = genrePickerRef.current;
      if (!genrePicker) {
        return;
      }

      const top = genrePicker.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }, []);

  return (
    <div className="movie-list">
      <Banner
        key={bannerShow?.id || "movie-banner"}
        imageUrl={bannerShow?.backdrop_path}
        size="sm"
        showType="movie"
        tmdbID={bannerShow?.id}
        allowLinkTitle={true}
      />

      <ShowDetails
        showType="movie"
        tmdbID={bannerShow?.id}
        allowLinkTitle={true}
        showWatchButton={false}
        variant="hero"
      />

      <div ref={listingRef} className="listing catalog-listing">
        <div ref={genrePickerRef}>
          <Dropdown
            options={genreList?.genres}
            selectedOption={genre}
            onChangeOption={handleGenreChange}
            label="Find a Movie Mood"
            allLabel="Popular"
          />
        </div>
        <GridContainer
          title={`${capitalizeFirstLetter(selectedGenreName)}`}
          hideTitle={true}
          reqUrl={getMovieList(page, null, null, genre?.id)}
          cardType="poster"
          showType="movie"
          page={page}
          onPageChange={handlePageChange}
          onLoadComplete={scrollToGenrePicker}
        />

        <RowContainer
          title="Top Rated"
          reqUrl={requests.getMovieTopRated}
          cardType="backdrop"
          showType="movie"
        />

        <RowContainer
          title="Trending Now"
          reqUrl={requests.getMovieTrending}
          cardType="backdrop"
          showType="movie"
        />
      </div>
    </div>
  );
};

export default MovieList;
