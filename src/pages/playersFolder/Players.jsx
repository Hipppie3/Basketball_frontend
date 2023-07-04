import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Players.css';


function Players() {
  const [players, setPlayers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players');
        setPlayers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchPlayerData();
  }, []);

  if (!players) {
    return <div>Loading...</div>;
  }

  const handlePlayerClick = (e, playerId) => {
    e.preventDefault();
    navigate(`/players/${playerId}`);
  };

  return (
    <div className="player-container">
      <div className="player-card-container">
        <h1 className='sports-title'>Basketball</h1>
        <div className="player-name-container">
        {players.map((player) => (
          <div key={player.id} >
            <Link className="player-name" to={`/players/${player.id}`} onClick={(event) => handlePlayerClick(event, player.id)}>
              {player.first_name} {player.last_name}
            </Link>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Players;
