import networkId from './networks.js';
import instance from '../service/tmdb.js';

export const requests = {
  'getTrending': `/trending/tv/week?language=en-US`,
  'getPopular': `/tv/popular?language=en-US&page=1`,
  'getTopRated': `/tv/top_rated?language=en-US&page=1`,
};

export const getTvShows = ( page = 1, network, genre ) => {
  let parameters = `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=vote_average.desc`;

  if (network) {
    parameters += ` &with_networks=${networkId[network]}`;
  }

  return parameters;
}

export const getTvShow = (id) => {
  return `/tv/${id}?language=en-US`;
}

export const getTvShowVideo = (id) => {
  return `/tv/${id}/videos?language=en-US`;
}

export const getGenreNames = async (type, id) => {
  const parameters = `https://api.themoviedb.org/3/genre/${type}/list?language=en`;
  
  try {
    const response = await instance.get(parameters);
    const genre = response.data.genres.find(genre => genre.id === id);
    return genre ? genre.name : 'Unknown';
  } catch (error) {
    console.error('Error fetching genre name:', error);
    return 'Unknown';
  }
}