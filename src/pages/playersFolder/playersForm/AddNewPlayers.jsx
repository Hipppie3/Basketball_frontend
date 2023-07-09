import React, { useState } from 'react';
import axios from 'axios';
import './AddNewPlayer.css'


function AddNewPlayers() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [deletePlayerId, setDeletePlayerId] = useState('');
  const [playerId, setPlayerId] = useState(''); // Initialize playerId state

  const [image, setImage] = useState(null);

const handlePlayerSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log(firstName, lastName);
    const response = await axios.post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players', {
      player: {
        first_name: firstName,
        last_name: lastName,
      },
    });



    // Reset form values
    setFirstName('');
    setLastName('');


  } catch (error) {
    console.error(error);
  }
};


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



  const handleDeletePlayer = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${deletePlayerId}`, {
        data: {
          player: {
            id: deletePlayerId,
          },
        },
      });
      // Reset form values
      setDeletePlayerId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="addNewPlayerContainer">

      <div className="playerContainer">
        <h1 className="addPlayerTitle">Add New Player</h1>
        <form onSubmit={handlePlayerSubmit} className="newPlayer">
          <label className="newPlayerLabel">
            First Name:
            <input
              className="newPlayerInput"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="newPlayerLabel">
            Last Name:
            <input
              className="newPlayerInput"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <button className="addPlayerBtn" type="submit">
            Add Player
          </button>
        </form>


      
      <div className='add-image-form'>
       <h1> Add Player Image</h1>      
      <form onSubmit={handleSubmit} className="add-player-image">
        <label>
        Player ID:
        <input
        className="image-id"
        type="number"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
      />
      <input className="upload-input" type="file" onChange={handleImageChange} />
      </label>
      <button type="submit" className="image-btn">Upload Image</button>
    </form>
    </div>
      </div>


      <div className="playerContainer1">
        <h1 className="deletePlayerTitle">Delete Player</h1>
        <form onSubmit={handleDeletePlayer} className="deletePlayer">
          <label>
            Player ID:
            <input
              className="deletePlayerInput"
              type="number"
              value={deletePlayerId}
              onChange={(e) => setDeletePlayerId(e.target.value)}
            />
          </label>
          <button type="submit" className="deletePlayerBtn">
            Delete Player
          </button>
        </form>
      </div>


    </div>
  );
}

export default AddNewPlayers;
