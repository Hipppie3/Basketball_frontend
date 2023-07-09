import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Players.css';
import { FaSearch } from 'react-icons/fa'



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
        <h1 className='sports-title'>PLAYERS</h1>
      <div className="search-input">
        <input type="text" placeholder="Search for a player" />
        <button type="submit">
        <FaSearch />
        </button>
      </div>

        
        <div className="player-name-container">
     {players.map((player) => (
  <div className="player-card" key={player.id}>
    <Link
      className="player-name"
      to={`/players/${player.id}`}
      onClick={(event) => handlePlayerClick(event, player.id)}
    >
      {player.image_url && <img src={player.image_url} className="player-card-image" />}
      {player.first_name} {player.last_name} {player.id}
    </Link>
    <div className="player-sports">BASKETBALL</div>
  </div>
))}

        </div>

      </div>

    </div>
  );
}

export default Players;
