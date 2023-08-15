import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Games.css'

// ... (import statements)

function Games() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameResponse = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games`);
        setGames(gameResponse.data)
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };
    fetchData();
  }, []);

  // Sort the games array by date before rendering
  const sortedGames = games.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  // Function to format date in "month date year" format
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };
  const utcDate = new Date(dateString);
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
  return localDate.toLocaleDateString(undefined, options);
};

  return (
    <div className='games-container'>
      {sortedGames.map(game => (
      
        <NavLink key={game.id} to={`/games/${game.id}`} className='link'>
          <div className='games'>
            <div className='game-score'>{game.home_team_score} - {game.away_team_score}</div>
            <div className='game-name'>
                {console.log(game.date)}
              <div className="nav-link">
                <h1 className='gameName'>{game.name}</h1>
                <h2>{formatDate(game.date)}</h2> {/* Use the formatted date */}
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default Games;
