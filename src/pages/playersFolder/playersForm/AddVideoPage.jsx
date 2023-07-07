import axios from 'axios';
import React, { useState } from 'react'
import './AddVideoPage.css'

function AddVideoPage() {
  const [id, setId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [deleteVideoId, setDeleteVideoId] = useState('');

   const handleVideoSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}/videos`, {
        title: videoTitle,
        url: videoUrl,
      });
      console.log(response.data);
      // Reset form values
      setVideoTitle('');
      setVideoUrl('');
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeleteVideo = async () => {
    try {
      await axios.delete(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}/videos/${deleteVideoId}`);
      // Reset form values
      setId('');
      setDeleteVideoId('');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="addNewVideoContainer">
      <div className="addVideoContainer">
      <h1 className="addVideoTitle">Add Video</h1>

      <form onSubmit={handleVideoSubmit} className="newVideo">
        
        <div className="newVideoContainer">
        <label className="newVideoLabel">
          Player ID:
          <input
          className="newVideoInput"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        
        <label className="newVideoLabel">
          Title:
          <input
          className="newVideoInput"
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
        </label>
        <label className="newVideoLabel"> 
          URL:
          <input
          className="newVideoInput"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </label>
        </div>
        <button className="addVideoBtn" type="submit">Add Video</button>
      </form>
      </div>


      
      <div className="deleteVideoContainer">
        <h1 className="deleteVideoTitle" >Delete Player Video</h1>
      <form onSubmit={handleDeleteVideo} className="deleteVideo">
        <label>
          Player ID:
          <input
          className="deleteVideoInput"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <label>
          Video ID:
          <input
          className="deleteVideoInput"
            type="number"
            value={deleteVideoId}
            onChange={(e) => setDeleteVideoId(e.target.value)}
          />
        </label>
        <button className="deleteVideoBtn" type="submit">Delete Player Video</button>
      </form>
      </div>
    </div>
  )
}

export default AddVideoPage
