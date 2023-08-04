import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GameDetailsPage() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games/${gameId}`);
        setGame(response.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchGameData();
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  // Create an object to group players by their team name
  const playersByTeam = {};
  game.statistics.forEach((stat) => {
    const teamName = stat.player.team.name;
    if (!playersByTeam[teamName]) {
      playersByTeam[teamName] = [];
    }
    playersByTeam[teamName].push({
      name: stat.player.first_name,
      statistics: stat,
    });
  });

  return (
    <div>
      <h1>{game.name}</h1>
      {Object.entries(playersByTeam).map(([teamName, players]) => (
        <div key={teamName}>
          <h1>{teamName}</h1>
          {players.map((player) => (
            <div key={player.name}>
              <h2>{player.name}</h2>
              <ul>
                <li>PTS: {player.statistics.pts}</li>
                <li>REB: {player.statistics.reb}</li>
                <li>AST: {player.statistics.ast}</li>
                {/* Add more statistics as needed */}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameDetailsPage;
