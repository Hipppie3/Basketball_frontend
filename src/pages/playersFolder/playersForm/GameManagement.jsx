import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameManagement() {
  const [games, setGames] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (selectedGame) {
      setName(selectedGame.name);
      setDate(selectedGame.date);
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
      await axios.post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games', {
        name,
        date,
      });
      fetchGames();
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedGame) return;

    try {
      await axios.patch(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games/${selectedGame.id}`, {
        name,
        date,
      });
      fetchGames();
      setSelectedGame(null);
      setName('');
      setDate('');
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
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.name} - {game.date} - {game.id}
            <button onClick={() => setSelectedGame(game)}>Edit</button>
            <button onClick={() => handleDelete(game)}>Delete</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameManagement;
