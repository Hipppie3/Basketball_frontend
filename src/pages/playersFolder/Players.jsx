import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Players.css';
import { FaSearch } from 'react-icons/fa';

function Players() {
  const [players, setPlayers] = useState(null);
  const [sports, setSports] = useState([]); // New state to store sports data
  const [sortedPlayers, setSortedPlayers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players');
        setPlayers(response.data);
        setSortedPlayers([...response.data].sort((a, b) => a.first_name.localeCompare(b.first_name)));
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchPlayerData();
  }, []);

  // Fetch sports data
  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/sports');
        setSports(response.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchSportsData();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [sortedPlayers, searchQuery]);

  const filterPlayers = () => {
    if (!searchQuery) {
      setFilteredPlayers(sortedPlayers);
    } else {
      const filtered = sortedPlayers.filter(
        (player) =>
          player.first_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlayers(filtered);
    }
  };

  const getSportNameById = (sportId) => {
    const sport = sports.find((s) => s.id === sportId);
    return sport ? sport.name : 'Unknown Sport';
  };

  if (!filteredPlayers || !sports.length) {
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
          <input
            type="text"
            placeholder="Search for a player"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
        <div className="player-name-container">
          {filteredPlayers.map((player) => (
            <div className="player-card" key={player.id}>
              <div>
                <Link
                  className="player-name"
                  to={`/players/${player.id}`}
                  onClick={(event) => handlePlayerClick(event, player.id)}
                >
                  <img
                    src={player.image_url}
                    className="player-card-image"
                    
                  />
                  {player.first_name} {player.last_name} 
                </Link>
              </div>
              <div className="player-sports">
                {player.sport ? getSportNameById(player.sport.id) : 'Unknown Sport'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Players;
