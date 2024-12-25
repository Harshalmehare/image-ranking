import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/top-images').then(res => setImages(res.data));
  }, []);

  return (
    <div>
      <h2>Top Ranked Images</h2>
      {images.map((image) => (
        <div key={image.id}>
          <img
            src={`http://localhost:5000/${image.image_path}`}
            alt="top"
            width="200"
            height="200"
          />
          <p>Votes: {image.votes}</p>
        </div>
      ))}
    </div>
  );
}

export default TopImages;
