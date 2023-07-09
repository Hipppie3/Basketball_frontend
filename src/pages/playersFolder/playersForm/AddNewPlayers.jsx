import React, { useState } from 'react';
import axios from 'axios';
import PlayersImage from './PlayersImage';

function AddNewPlayers() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [deletePlayerId, setDeletePlayerId] = useState('');
  const [playerId, setPlayerId] = useState(''); // Initialize playerId state

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

    // Retrieve the playerId from the response
    const playerId = response.data.player.id;
    console.log('New player created with ID:', playerId);

    // Reset form values
    setFirstName('');
    setLastName('');

    // Update the playerId state
    setPlayerId(playerId);
  } catch (error) {
    console.error(error);
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
      </div>

      <PlayersImage playerId={playerId} setPlayerId={setPlayerId} />

      <div className="playerContainer">
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
