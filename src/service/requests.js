import networkId from './networks.js';

const ACCESS_TOKEN = '957c783e9cebad9b1f8f8c5cb4dbf044';

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