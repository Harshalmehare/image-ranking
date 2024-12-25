import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/upload', formData);
      alert('Image uploaded successfully!');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
