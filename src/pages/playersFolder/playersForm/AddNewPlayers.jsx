import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddNewPlayer.css';

function AddNewPlayers() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [deletePlayerId, setDeletePlayerId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [image, setImage] = useState(null);
  const [players, setPlayers] = useState([]);
  const [newTeamId, setNewTeamId] = useState('');

  useEffect(() => {
    // Fetch the list of players from the API
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players');
        setPlayers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlayers();
  }, []);

  const handlePlayerSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players', {
        player: {
          first_name: firstName,
          last_name: lastName,
          team_id: teamId,
        },
      });

      // Reset form values
      setFirstName('');
      setLastName('');
      setTeamId('');
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

  const handleUpdateTeam = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${playerId}`, {
        player: {
          team_id: newTeamId,
        },
      });

      // Reset form values
      setPlayerId('');
      setNewTeamId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="addNewPlayerContainer">
      {/* Add Player Form */}
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
          <label className="newPlayerLabel">
            Team ID: 
            <input
              className="newPlayerInput"
              type="number"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            />
          </label>
          <button className="addPlayerBtn" type="submit">
            Add Player
          </button>
        </form>
        {/* Existing code... */}
      </div>

      {/* Update Player Team Form */}
      <div className="updateTeamContainer">
        <h1 className="updateTeamTitle">Update Player Team</h1>
        <form onSubmit={handleUpdateTeam} className="updateTeam">
          <label className="updateTeamLabel">
            Select Player:
            <select
              className="updateTeamSelect"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
            >
              <option value="">Select a player...</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {`${player.first_name} ${player.last_name}`}
                </option>
              ))}
            </select>
          </label>
          <label className="updateTeamLabel">
            New Team ID:
            <input
              className="updateTeamInput"
              type="number"
              value={newTeamId}
              onChange={(e) => setNewTeamId(e.target.value)}
            />
          </label>
          <button type="submit" className="updateTeamBtn">
            Update Team
          </button>
        </form>
      </div>

      {/* Existing Delete Player Form */}
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
      </label>
      <input className="upload-input" type="file" onChange={handleImageChange} />
      <button type="submit" className="image-btn">Upload Image</button>
    </form>
    </div>
    </div>
  );
}

export default AddNewPlayers;
