import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import './GameDetailsPage.css';
import YouTube from 'react-youtube';

function GameDetailsPage() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games/${gameId}`);
        setGame(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchGameData();
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const playersByWinStatus = {
    'W': [],
    'L': [],
  };

  game.statistics.forEach((stat) => {
    const winStatus = stat.w_l;
    playersByWinStatus[winStatus].push({
      name: stat.player.first_name,
      statistics: stat,
    });
  });

  const getVideoId = (url) => {
    const match = url.match(/youtube\.com.*(\?v=|\/embed\/|\/\d\/|\/vi\/|\/v\/|https:\/\/youtu\.be\/|\/e\/|watch\?v=|\&v=|youtu\.be\/|\/v\/|e\/|youtube\.com\/v\/)([^#\&\?\n]*)/);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1 className='gameTitle'>{game.name}</h1>
      <div className='gameVideo'>
        {game.video_url ? (
          <YouTube
            videoId={getVideoId(game.video_url)}
            opts={{
              height: '200', // Set the desired height here
              width: '300', // Make sure the width is set to 100% for responsive design
              playerVars: {
                // Set additional YouTube player options if needed
              },
            }}
          />
        ) : (
          <p>No video available</p>
        )}
      </div>
      {Object.entries(playersByWinStatus).map(([winStatus, players]) => (
        <div className='gameTeam' key={winStatus}>
          <h1>
            {winStatus === 'W'
              ? game.home_team_score !== null
                ? `WINNERS - ${game.home_team_score}`
                : 'WINNERS'
              : game.away_team_score !== null
              ? `LOSERS - ${game.away_team_score}`
              : 'LOSERS'}
          </h1>
          <div className='gameHeader'>
            <div>Players</div>
            <div className='gamePlayersHeader'>FGA</div>
            <div className='gamePlayersHeader'>FGM</div>
            <div className='gamePlayersHeader'>FG%</div>
            <div className='gamePlayersHeader'>2PA</div>
            <div className='gamePlayersHeader'>2PM</div>
            <div className='gamePlayersHeader'>3PA</div>
            <div className='gamePlayersHeader'>3PM</div>
            <div className='gamePlayersHeader'>OREB</div>
            <div className='gamePlayersHeader'>DREB</div>
            <div className='gamePlayersHeader'>REB</div>
            <div className='gamePlayersHeader'>AST</div>
            <div className='gamePlayersHeader'>STL</div>
            <div className='gamePlayersHeader'>BLK</div>
            <div className='gamePlayersHeader'>TO</div>
            <div className='gamePlayersHeader'>PTS</div>
          </div>
          {players.map((player) => (
            <div className='playerStatsList' key={player.name}>
              {console.log(player.statistics.player_id)}
              <div className='gamePlayers'>
                <NavLink to={`/players/${player.statistics.player_id}`}>
                  {player.name}
                </NavLink>
              </div>
              <div className='gamePlayersHeaders'>{player.statistics.fga}</div>
              <div className='gamePlayersHeaders'>{player.statistics.fgm}</div>
              <div className='gamePlayersHeaderss'>
                {player.statistics.fg_percentage}
              </div>
              <div className='gamePlayersHeaders'>{player.statistics.two_pa}</div>
              <div className='gamePlayersHeaders'>{player.statistics.two_pm}</div>
              <div className='gamePlayersHeaders'>{player.statistics.three_pa}</div>
              <div className='gamePlayersHeaders'>{player.statistics.three_pm}</div>
              <div className='gamePlayersHeaders'>{player.statistics.oreb}</div>
              <div className='gamePlayersHeaders'>{player.statistics.dreb}</div>
              <div className='gamePlayersHeaders'>{player.statistics.reb}</div>
              <div className='gamePlayersHeaders'>{player.statistics.ast}</div>
              <div className='gamePlayersHeaders'>{player.statistics.stl}</div>
              <div className='gamePlayersHeaders'>{player.statistics.blk}</div>
              <div className='gamePlayersHeaders'>{player.statistics.to}</div>
              <div className='gamePlayersHeaders'>{player.statistics.pts}</div>
              {/* Add more statistics as needed */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameDetailsPage;
