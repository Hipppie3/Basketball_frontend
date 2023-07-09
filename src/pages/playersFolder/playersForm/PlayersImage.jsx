import React, { useState } from 'react';
import axios from 'axios';

function PlayersImage({ playerId, setPlayerId }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('player[image]', image);

    try {
      const response = await axios.post(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${playerId}/upload_image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Image uploaded:', response.data);
      // Handle any success message or further actions after image upload
      
      // Clear the image input field and reset the playerId
      setImage(null);
      setPlayerId('');
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle any error messages or error handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Player ID"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
      />
      <button type="submit">Upload Image</button>
    </form>
  );
}

export default PlayersImage;
