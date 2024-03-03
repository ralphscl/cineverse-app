import { useState } from 'react';
// Utils
import { capitalizeFirstLetter } from './utils/StringUtils';
// Service
import { requests, getTvShows } from './service/requests';
// Components
import Row from './components/Row'
// CSS
import './App.css'


function App() {
  const [network, setNetwork] = useState('netflix');

  return (
    <>
      <Row title={`${capitalizeFirstLetter(network)} TV Shows`} reqUrl={getTvShows(2, network)} />
      <Row title="Trending Now" reqUrl={requests.getTrending} />
      <Row title="Popular Shows" reqUrl={requests.getPopular} />
      <Row title="Top Rated" reqUrl={requests.getTopRated} />
    </>
  )
}

export default App
