import React, { useState } from 'react'
import './AddNewPlayer.css'
import axios from 'axios';

function AddNewPlayers() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');



  const handlePlayerSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('api/players', {
      player: {
        first_name: firstName,
        last_name: lastName,
      },
    });
    console.log(response.data);
    // Reset form values
    setFirstName('');
    setLastName('');
  } catch (error) {
    console.error(error);
  }
};



  return (
   <div className="addNewPlayerContainer">
    <h1 className="addPlayerTitle">Add New Player</h1>
      <div >
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
        <button className="addPlayerBtn" type="submit">Add Player</button>
      </form>




        <h1 className="deletePlayerTitle">Delete Player</h1>
      <form /*onSubmit={handleDeletePlayer}*/ className="deletePlayer">
        <label>
          Player ID:
          <input
            className="deletePlayerInput"
            type="number"
            // value={deletePlayerId}
            // onChange={(e) => setDeletePlayerId(e.target.value)}
          />
        </label>
        <button type="submit" className="deletePlayerBtn">Delete Player</button>
      </form>
    </div>
    </div>
  )
}

export default AddNewPlayers
