import Row from './components/Row'
import './App.css'

import { requests, getTvShows } from './service/requests';

function App() {

  return (
    <>
      <Row title="TV Shows" reqUrl={getTvShows(2, 'netflix')} />
      <Row title="Trending Now" reqUrl={requests.getTrending} />
      <Row title="Popular Shows" reqUrl={requests.getTrending} />
      <Row title="Top Rated" reqUrl={requests.getTrending} />
    </>
  )
}

export default App
