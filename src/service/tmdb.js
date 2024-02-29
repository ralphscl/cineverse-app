import axios from 'axios';

const ACCESS_TOKEN_AUTH = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTdjNzgzZTljZWJhZDliMWY4ZjhjNWNiNGRiZjA0NCIsInN1YiI6IjY1ZGE1OWYwMDViNTQ5MDE0NzE2NDAwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4B4_3uH75HoCh5oL40IStWpXmGSwgqbKNh7ekt46c1Y';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN_AUTH}`
  }
})

export default instance;