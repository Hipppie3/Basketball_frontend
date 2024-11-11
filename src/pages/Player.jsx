import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Player() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('/api/players');
        console.log(response.data)
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPlayers();
  }, []);

  const playersFullName = (first, last) => {
    const playerFull = `${first} ${last}`;
    return playerFull;
  } 

  return (
    <div>
      <h1>Players</h1>
      {players.map(player => 
      <div key={player.id}>
      <h3>Name: {playersFullName(player.firstName, player.lastName)}</h3>
      </div>
    )}
    </div>
  )
}

export default Player
