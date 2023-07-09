import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './PlayerStats.css'

function PlayersStatsPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

   useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}`);
        setPlayer(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchPlayerData();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="playersStatsPage">
            <section className="players-stats-container">
        <div className="players-stats">
          <img src="https://agile-reef-32463-2ad3559c3e00.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--11c2611a075daf4cc25880daf68ccdd768cebca8/h2.png" alt="Player" />

            <h1>{player.player.first_name} {player.player.last_name}</h1>
          <div className="game-table">
            <div className="game-row game-header">
              <div className="stat-id">Stats ID</div>
              <div className="game-date">GAME DATE</div>
              <div className="fgm">FGM</div>
              <div className="fga">FGA</div>
              <div className="fgp">FG%</div>
              <div className="twoPM">2PM</div>
              <div className="twoPA">2PA</div>
              <div className="threePM">3PM</div>
              <div className="threePA">3PA</div>
              <div className="oReb">OREB</div>
              <div className="dReb">DREB</div>
              <div className="reb">REB</div>
              <div className="ast">AST</div>
              <div className="stl">STL</div>
              <div className="blk">BLK</div>
              <div className="to">TO</div>
              <div className="pts">PTS</div>

            </div>
            


 {player.statistics.map((stat) => (
        <div key={stat.id}>
            <div className="game-row">
              <div className="stats-id">{stat.id}</div>
              <div className="game-date">{stat.game_date}</div>
              <div className="fgm">{stat.fgm}</div>
              <div className="fga">{stat.fga}</div>
              <div className="fgp">{stat.fg_percentage}</div>
              <div className="twoPM">{stat.two_pm}</div>
              <div className="twoPA">{stat.two_pa}</div>
              <div className="threePM">{stat.three_pm}</div>
              <div className="threePA">{stat.three_pa}</div>
              <div className="oReb">{stat.oreb}</div>
              <div className="dReb">{stat.dreb}</div>
              <div className="reb">{stat.reb}</div>
              <div className="ast">{stat.ast}</div>
              <div className="stl">{stat.stl}</div>
              <div className="blk">{stat.blk}</div>
              <div className="to">{stat.to}</div>
              <div className="pts">{stat.pts}</div>
            </div>
       </div>))}

          </div>
        </div>
      </section>
      </div>
  )
}

export default PlayersStatsPage
