import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Games.css'

function Games() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameResponse = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games`);
        setGames(gameResponse.data)
        console.log(gameResponse.data)
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };
    fetchData();
  }, []);

  // Sort the games array by date before rendering
  const sortedGames = games.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className='games-container'>
      {sortedGames.map(game => (
        <NavLink key={game.id} to={`/games/${game.id}`} className='link'>
        <div className='games'>
        <div className='game-score'>{game.home_team_score} - {game.away_team_score}</div>
        <div className='game-name'>
        <div className="nav-link">
          <h1>{game.name}</h1>
          <h2>{game.date}</h2>
        </div>
        </div>
        </div>
      </NavLink>
      ))}
    </div>
  )
}

export default Games;
