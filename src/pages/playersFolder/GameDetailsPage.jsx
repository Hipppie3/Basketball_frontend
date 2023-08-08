import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './GameDetailsPage.css'

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
      <h1 className='gameTitle'>{game.name}</h1>
      {Object.entries(playersByTeam).map(([teamName, players]) => (
        <div className='gameTeam' key={teamName}>
          <h1>{teamName}</h1>
          <div className='gameHeader'>
              <div>Players</div>
              <div className="gamePlayersHeader">FGA</div>
              <div className="gamePlayersHeader">FGM</div>
              <div className="gamePlayersHeader">FG%</div>
              <div className="gamePlayersHeader">2PA</div>
              <div className="gamePlayersHeader">2PM</div>
              <div className="gamePlayersHeader">3PA</div>
              <div className="gamePlayersHeader">3PM</div>
              <div className="gamePlayersHeader">OREB</div>
              <div className="gamePlayersHeader">DREB</div>
              <div className="gamePlayersHeader">REB</div>
              <div className="gamePlayersHeader">AST</div>
              <div className="gamePlayersHeader">STL</div>
              <div className="gamePlayersHeader">BLK</div>
              <div className="gamePlayersHeader">TO</div>
              <div className="gamePlayersHeader">PTS</div>
          </div>
          {players.map((player) => (
      
              <div className='playerStatsList'>
                      {console.log(player)}
                <div>{player.name}</div>
                <div className="gamePlayersHeaders">{player.statistics.fga}</div>
                <div className="gamePlayersHeaders">{player.statistics.fgm}</div>
                <div className="gamePlayersHeaderss">{player.statistics.fg_percentage}</div>
                <div className="gamePlayersHeaders">{player.statistics.two_pa}</div>
                <div className="gamePlayersHeaders">{player.statistics.two_pm}</div>
                <div className="gamePlayersHeaders">{player.statistics.three_pa}</div>
                <div className="gamePlayersHeaders">{player.statistics.three_pm}</div>
                <div className="gamePlayersHeaders">{player.statistics.oreb}</div>
                <div className="gamePlayersHeaders">{player.statistics.dreb}</div>
                <div className="gamePlayersHeaders">{player.statistics.reb}</div>
                <div className="gamePlayersHeaders">{player.statistics.ast}</div>
                <div className="gamePlayersHeaders">{player.statistics.stl}</div>
                <div className="gamePlayersHeaders">{player.statistics.blk}</div>
                <div className="gamePlayersHeaders">{player.statistics.to}</div>
                <div className="gamePlayersHeaders">{player.statistics.pts}</div>
                {/* Add more statistics as needed */}
              </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameDetailsPage;
