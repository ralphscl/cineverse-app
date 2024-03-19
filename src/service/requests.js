import networkId from './networks.js';
import instance from '../service/tmdb.js';

export const requests = {
  'getTrending': `/trending/tv/week?language=en-US`,
  'getPopular': `/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc`,
  'getTopRated': `/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200`,
};

export const getTvShows = ( page = 1, network, genre ) => {
  let params = `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=vote_average.desc`;

  if (network) {
    params += ` &with_networks=${networkId[network]}`;
  }

  return params;
}

export const getTvShow = (id) => {
  return `/tv/${id}?language=en-US`;
}

export const getTvShowVideo = (id) => {
  return `/tv/${id}/videos?language=en-US`;
}

export const getTvSeason = ( id, season = null, episode = null ) => {
  let params = `/tv/${id}`;

  if(season !== null) { 
    params += `/season/${season}`;
  }

  if(episode !== null) {
    params += `/episode/${episode}`;
  }
  
  return params += `?language=en-US'`
}

export const getCredits = (id) => {
  return `/tv/${id}/aggregate_credits?language=en-US`;
}

export const getCast = (id) => {
  return `/person/${id}?language=en-US'`;
}

export const getRecommended = (type, id) => {
  return `/${type}/${id}/recommendations?language=en-US&page=1`;
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