import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddSportVideo() {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/sports');
      setSports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleAddSportMediaVideo = async () => {
    try {
      const response = await axios.post(
        `https://agile-reef-32463-2ad3559c3e00.herokuapp.com/sports/${selectedSport}/sport_media_videos`,
        { url: videoUrl }
      );
      console.log(response.data); // Handle the response as needed
      // Clear form inputs
      setSelectedSport('');
      setVideoUrl('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add Sport Media Video</h2>
      <div>
        <label htmlFor="sport">Select Sport:</label>
        <select id="sport" value={selectedSport} onChange={handleSportChange}>
          <option value="">Select a sport</option>
          {sports.map((sport) => (
            <option key={sport.id} value={sport.id}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="videoUrl">Sport Media Video URL:</label>
        <input
          type="text"
          id="videoUrl"
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
      </div>
      <button onClick={handleAddSportMediaVideo}>Add Sport Media Video</button>
    </div>
  );
}

export default AddSportVideo;
