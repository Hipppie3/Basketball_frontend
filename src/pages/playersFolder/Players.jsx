import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Players.css';
import { FaSearch } from 'react-icons/fa';
import avatarImg from './images/players.png'

function Players() {
  const [players, setPlayers] = useState([]);
  const [sports, setSports] = useState([]);
  const [sortedPlayers, setSortedPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [playerWithMostPoints, setPlayerWithMostPoints] = useState(null);
  const [playerWithMostRebounds, setPlayerWithMostRebounds] = useState(null);
  const [playerWithMostAssists, setPlayerWithMostAssists] = useState(null);
  const [playerWithMostSteals, setPlayerWithMostSteals] = useState(null);
  const [playerWithMostThreePointers, setPlayerWithMostThreePointers] = useState(null);
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

  useEffect(() => {
    if (sortedPlayers.length > 0) {
      const playerWithMostPoints = sortedPlayers.reduce(
        (maxPlayer, currentPlayer) => {
          if (currentPlayer.statistics && currentPlayer.statistics.length > 0) {
            const totalPoints = currentPlayer.statistics.reduce(
              (sum, stat) => sum + stat.pts,
              0
            );
            if (totalPoints > maxPlayer.points) {
              return {
                playerId: currentPlayer.id,
                playerName: `${currentPlayer.first_name} ${currentPlayer.last_name}`,
                points: totalPoints,
              };
            }
          }
          return maxPlayer;
        },
        { playerId: null, playerName: null, points: 0 }
      );

      setPlayerWithMostPoints(playerWithMostPoints);
    }
  }, [sortedPlayers]);

  useEffect(() => {
    if (sortedPlayers.length > 0) {
      const playerWithMostRebounds = sortedPlayers.reduce(
        (maxPlayer, currentPlayer) => {
          if (currentPlayer.statistics && currentPlayer.statistics.length > 0) {
            const totalRebounds = currentPlayer.statistics.reduce(
              (sum, stat) => sum + stat.reb,
              0
            );
            if (totalRebounds > maxPlayer.rebounds) {
              return {
                playerId: currentPlayer.id,
                playerName: `${currentPlayer.first_name} ${currentPlayer.last_name}`,
                rebounds: totalRebounds,
              };
            }
          }
          return maxPlayer;
        },
        { playerId: null, playerName: null, rebounds: 0 }
      );

      setPlayerWithMostRebounds(playerWithMostRebounds);
    }
  }, [sortedPlayers]);

  useEffect(() => {
    if (sortedPlayers.length > 0) {
      const playerWithMostAssists = sortedPlayers.reduce(
        (maxPlayer, currentPlayer) => {
          if (currentPlayer.statistics && currentPlayer.statistics.length > 0) {
            const totalAssists = currentPlayer.statistics.reduce(
              (sum, stat) => sum + stat.ast,
              0
            );
            if (totalAssists > maxPlayer.assists) {
              return {
                playerId: currentPlayer.id,
                playerName: `${currentPlayer.first_name} ${currentPlayer.last_name}`,
                assists: totalAssists,
              };
            }
          }
          return maxPlayer;
        },
        { playerId: null, playerName: null, assists: 0 }
      );

      setPlayerWithMostAssists(playerWithMostAssists);
    }
  }, [sortedPlayers]);

  useEffect(() => {
    if (sortedPlayers.length > 0) {
      const playerWithMostSteals = sortedPlayers.reduce(
        (maxPlayer, currentPlayer) => {
          if (currentPlayer.statistics && currentPlayer.statistics.length > 0) {
            const totalSteals = currentPlayer.statistics.reduce(
              (sum, stat) => sum + stat.stl,
              0
            );
            if (totalSteals > maxPlayer.steals) {
              return {
                playerId: currentPlayer.id,
                playerName: `${currentPlayer.first_name} ${currentPlayer.last_name}`,
                steals: totalSteals,
              };
            }
          }
          return maxPlayer;
        },
        { playerId: null, playerName: null, steals: 0 }
      );

      setPlayerWithMostSteals(playerWithMostSteals);
    }
  }, [sortedPlayers]);

  useEffect(() => {
    if (sortedPlayers.length > 0) {
      const playerWithMostThreePointers = sortedPlayers.reduce(
        (maxPlayer, currentPlayer) => {
          if (currentPlayer.statistics && currentPlayer.statistics.length > 0) {
            const totalThreePointers = currentPlayer.statistics.reduce(
              (sum, stat) => sum + stat.three_pm,
              0
            );
            if (totalThreePointers > maxPlayer.threePointers) {
              return {
                playerId: currentPlayer.id,
                playerName: `${currentPlayer.first_name} ${currentPlayer.last_name}`,
                threePointers: totalThreePointers,
              };
            }
          }
          return maxPlayer;
        },
        { playerId: null, playerName: null, threePointers: 0 }
      );

      setPlayerWithMostThreePointers(playerWithMostThreePointers);
    }
  }, [sortedPlayers]);

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

  const getPlayerInfoById = (playerId) => {
    const player = players.find((p) => p.id === playerId);
    return {
      image: player?.image_url,
      name: `${player?.first_name} ${player?.last_name}`,
    };
  };

  const handlePlayerClick = (e, playerId) => {
    e.preventDefault();
    navigate(`/players/${playerId}`);
  };

  if (!filteredPlayers.length || !sports.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-container">
      <div className="player-card-container">
        <h1 className="sports-title">PLAYERS</h1>
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
        <div className="most-stat-players-container">
          {playerWithMostPoints && (
            <div className="most-stat-player">
              <h2>Most Points</h2>
              <div className="player-card" key={playerWithMostPoints.playerId}>
                <div>
                  <Link
                    className="player-name"
                    to={`/players/${playerWithMostPoints.playerId}`}
                    onClick={(event) =>
                      handlePlayerClick(event, playerWithMostPoints.playerId)
                    }
                  >
                    <img
                      src={getPlayerInfoById(playerWithMostPoints.playerId).image}
                      className="player-card-image"
                      alt={`${getPlayerInfoById(playerWithMostPoints.playerId).name}'s Avatar`}
                    />
                    <div className="player-info">
                    <div className="player-name">
                    {getPlayerInfoById(playerWithMostPoints.playerId).name}
                    </div> 
                    <div className="player-points"> 
                    {`${playerWithMostPoints.points} - points`}
                    </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {playerWithMostRebounds && (
            <div className="most-stat-player">
              <h2>Most Rebounds</h2>
              <div className="player-card" key={playerWithMostRebounds.playerId}>
                <div>
                  <Link
                    className="player-name"
                    to={`/players/${playerWithMostRebounds.playerId}`}
                    onClick={(event) =>
                      handlePlayerClick(event, playerWithMostRebounds.playerId)
                    }
                  >
                    <img
                      src={getPlayerInfoById(playerWithMostRebounds.playerId).image}
                      className="player-card-image"
                      alt={`${getPlayerInfoById(playerWithMostRebounds.playerId).name}'s Avatar`}
                    />
          <div className="player-info">
          <div className="player-name">
            {getPlayerInfoById(playerWithMostRebounds.playerId).name}
          </div>
          <div className="player-rebounds">
            {`${playerWithMostRebounds.rebounds} - rebounds`}
          </div>
        </div>
      </Link>
                </div>
              </div>
            </div>
          )}
          {playerWithMostAssists && (
            <div className="most-stat-player">
              <h2>Most Assists</h2>
              <div className="player-card" key={playerWithMostAssists.playerId}>
                <div>
                  <Link
                    className="player-name"
                    to={`/players/${playerWithMostAssists.playerId}`}
                    onClick={(event) =>
                      handlePlayerClick(event, playerWithMostAssists.playerId)
                    }
                  >
                    <img
                      src={getPlayerInfoById(playerWithMostAssists.playerId).image}
                      className="player-card-image"
                      alt={`${getPlayerInfoById(playerWithMostAssists.playerId).name}'s Avatar`}
                    />
                    <div className="player-info">
                    <div className="player-name">
                    {getPlayerInfoById(playerWithMostAssists.playerId).name} 
                    </div>
                    <div className='player-assists'>
                    {`${playerWithMostAssists.assists} - assists`}
                    </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {playerWithMostSteals && (
            <div className="most-stat-player">
              <h2>Most Steals</h2>
              <div className="player-card" key={playerWithMostSteals.playerId}>
                <div>
                  <Link
                    className="player-name"
                    to={`/players/${playerWithMostSteals.playerId}`}
                    onClick={(event) =>
                      handlePlayerClick(event, playerWithMostSteals.playerId)
                    }
                  >
                    <img
                      src={getPlayerInfoById(playerWithMostSteals.playerId).image}
                      className="player-card-image"
                      alt={`${getPlayerInfoById(playerWithMostSteals.playerId).name}'s Avatar`}
                    />
                    <div className="player-info">
                    <div className="player-name">
                    {getPlayerInfoById(playerWithMostSteals.playerId).name} 
                    </div>
                    <div className='player-steals'>
                     {`${playerWithMostSteals.steals} - steals`}
                    </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {playerWithMostThreePointers && (
            <div className="most-stat-player">
              <h2>Most 3-Pointers</h2>
              <div className="player-card" key={playerWithMostThreePointers.playerId}>
                <div>
                  <Link
                    className="player-name"
                    to={`/players/${playerWithMostThreePointers.playerId}`}
                    onClick={(event) =>
                      handlePlayerClick(event, playerWithMostThreePointers.playerId)
                    }
                  >
                    <img
                      src={getPlayerInfoById(playerWithMostThreePointers.playerId).image}
                      className="player-card-image"
                      alt={`${getPlayerInfoById(playerWithMostThreePointers.playerId).name}'s Avatar`}
                    />
                    <div className="player-info">
                    <div className="player-name">
                    {getPlayerInfoById(playerWithMostThreePointers.playerId).name} 
                    </div>
                    <div className="player-three-pointers">
                     {`${playerWithMostThreePointers.threePointers} - three-pointers`}
                    </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
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
    src={player.image_url || avatarImg} // Replace 'path/to/default-image.jpg' with your default image path
    className="player-card-image"
    alt={`${player.first_name} ${player.last_name}'s Avatar`}
  />
  {`${player.first_name} ${player.last_name}`}
</Link>

              </div>
              <div className="player-sports">
                {player.sport
                  ? getSportNameById(player.sport.id)
                  : 'Unknown Sport'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Players;
