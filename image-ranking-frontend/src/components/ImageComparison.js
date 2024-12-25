import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageComparison() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/images')
      .then((res) => {
        console.log('Images from API:', res.data); // Debugging API response
        setImages(res.data);
      })
      .catch((err) => {
        console.error('Error fetching images:', err); // Debugging errors
      });
  }, []);

  const voteImage = (id) => {
    axios.post(`http://localhost:5000/vote/${id}`)
      .then(() => {
        alert('Vote added!');
        window.location.reload();
      })
      .catch((err) => {
        console.error('Error adding vote:', err);
      });
  };

  return (
    <div>
      <h2>Image Comparison</h2>
      {images.length > 0 ? (
        images.slice(0, 2).map((image) => (
          <div key={image.id} style={{ margin: '20px' }}>
            <img
              src={`http://localhost:5000/${image.image_path}`}
              alt="Uploaded"
              width="200"
              onError={(e) => (e.target.style.display = 'none')} // Hide broken images
            />
            <button onClick={() => voteImage(image.id)}>Vote</button>
          </div>
        ))
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
}

export default ImageComparison;
