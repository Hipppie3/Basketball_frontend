import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameManagement() {
  const [games, setGames] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [homeTeamScore, setHomeTeamScore] = useState(0);
  const [awayTeamScore, setAwayTeamScore] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (selectedGame) {
      setName(selectedGame.name);
      setDate(selectedGame.date);
      setVideoUrl(selectedGame.video_url || '');
      setHomeTeamScore(selectedGame.home_team_score || 0);
      setAwayTeamScore(selectedGame.away_team_score || 0);
    }
  }, [selectedGame]);

  const fetchGames = async () => {
    try {
      const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

const handleCreate = async () => {
  try {
    // Convert the date to the expected format 'month/day/year'
    const formattedDate = new Date(date).toLocaleDateString('en-US');

    await axios.post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games', {
      name,
      date: formattedDate,
      video_url: videoUrl,
      home_team_score: homeTeamScore,
      away_team_score: awayTeamScore,
    });
    fetchGames();
  } catch (error) {
    console.error('Error creating game:', error);
  }
};

const handleUpdate = async () => {
  if (!selectedGame) return;

  try {
    // Convert the date to the expected format 'month/day/year'
    const formattedDate = new Date(date).toLocaleDateString('en-US');

    await axios.patch(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games/${selectedGame.id}`, {
      name,
      date: formattedDate,
      video_url: videoUrl,
      home_team_score: homeTeamScore,
      away_team_score: awayTeamScore,
    });
    fetchGames();
    setSelectedGame(null);
    setName('');
    setDate('');
    setVideoUrl('');
    setHomeTeamScore(0);
    setAwayTeamScore(0);
  } catch (error) {
    console.error('Error updating game:', error);
  }
};


  const handleDelete = async (game) => {
    try {
      await axios.delete(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games/${game.id}`);
      fetchGames();
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <div>
      <h2>Game Management</h2>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" placeholder="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <input type="number" placeholder="Home Team Score" value={homeTeamScore} onChange={(e) => setHomeTeamScore(e.target.value)} />
        <input type="number" placeholder="Away Team Score" value={awayTeamScore} onChange={(e) => setAwayTeamScore(e.target.value)} />
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <ul>
        
        {games.map((game) => (
          <li key={game.id}>
            {console.log(game)}
            {game.name} - {game.date} - ({game.home_team_score} - {game.away_team_score }) - {game.id}
            <button onClick={() => setSelectedGame(game)}>Edit</button>
            <button onClick={() => handleDelete(game)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameManagement;
