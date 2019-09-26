import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import axios from 'axios';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/photos'

const COLORS = {
  0: "green",
  1: "blue",
  2: "purple",
}

function App() {
  const [photos, setPhotos] = useState([])

  // componentDidMount
  useEffect(() => {
    (async function(){
      const { data } = await axios.get(API_URL)
      setPhotos(data)
    } ())
  }, [])

  const latestAlbums = useMemo(() => {
    const albums = _.take(_.sortBy(_.values(
      _.groupBy(photos, photo => photo.albumId)
    ), photos => -photos[0].albumId), 3)

    return _.take(albums, 3).map(photos => _.take(_.sortBy(photos, photo => -photo.id), 2))
  }, [photos])

  return (
    <section className="App">
      {latestAlbums.map((photos, index) => (
        <article key={photos[0].albumId} style={{border: `1px solid ${COLORS[index]}`, margin: 20}}>
          {photos.map(({ title, thumbnailUrl }) => (
            <figure>
              <img src={thumbnailUrl} alt={title} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </article>
      ))}
    </section>
  );
}

export default App;
