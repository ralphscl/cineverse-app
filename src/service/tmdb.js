import axios from 'axios';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const TMDB_BASEURL = import.meta.env.VITE_TMDB_BASEURL;

const instance = axios.create({
  baseURL: TMDB_BASEURL,
  headers: {
    'Authorization': `Bearer ${TMDB_TOKEN}`
  }
})

export default instance;