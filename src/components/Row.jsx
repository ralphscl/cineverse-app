import React, { useEffect, useState } from 'react'
import instance from '../service/tmdb.js';

const Row = ({ title, reqUrl }) => {
  const [shows, setShows] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const req = await instance.get(reqUrl);
      setShows(req.data.results);
    }

    fetchData();
  }, [reqUrl])
console.log(shows);
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}

export default Row
