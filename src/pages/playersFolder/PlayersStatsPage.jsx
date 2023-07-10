import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './PlayerStats.css'

function PlayersStatsPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

   useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}`);
        setPlayer(response.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchPlayerData();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

    // Calculate the totals
  let totalFGM = 0;
  let totalFGA = 0;
  let totalFGPercentage = 0;
  let total2PM = 0;
  let total2PA = 0;
  let total3PM = 0;
  let total3PA = 0;
  let totalOREB = 0;
  let totalDREB = 0;
  let totalREB = 0;
  let totalAST = 0;
  let totalSTL = 0;
  let totalBLK = 0;
  let totalTO = 0;
  let totalPTS = 0;
  // ... other stat variables

  player.statistics.forEach((stat) => {
    totalFGM += stat.fgm;
    totalFGA += stat.fga;
    totalFGPercentage += parseFloat(stat.fg_percentage) || 0;
    total2PA += stat.two_pa;
    total2PM += stat.two_pm;
    total3PM += stat.three_pm;
    total3PA += stat.three_pa;
    totalOREB += stat.oreb;
    totalDREB += stat.dreb;
    totalREB += stat.reb;
    totalAST += stat.ast;
    totalSTL += stat.stl;
    totalBLK += stat.blk;
    totalTO += stat.to;
    totalPTS += stat.pts
    // ... update other stat variables accordingly
  });

  const averageFGPercentage = player.statistics.length > 0 ? (totalFGPercentage / player.statistics.length).toFixed(2) : 0;

  return ( 
    <div className="playersStatsPage">

 
          <div className="players-link-left1">
            <ul>
              <li>Profile</li>
              <li><NavLink to={`/players/${player.player.id}/stats`} className='stats-link' activeClassName="active-link">Stats</NavLink></li>
              <li><NavLink to={`/players/${player.player.id}/bio`} className='stats-link' activeClassName="active-link"></NavLink>Bio</li>
              <li><NavLink to={`/players/${player.player.id}/media`} className='stats-link' activeClassName="active-link"></NavLink>Media</li>
            </ul>
          </div>
   
        

            <section className="players-stats-container">
              
        <div className="players-stats">
                  <div className="players-name">
      <h1>{player.player.first_name} {player.player.last_name}</h1>
      </div>
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
              <div className="game-row total-row">
                <div className="stat-id"> Total </div>
                <div></div>
                <div className="fga">{totalFGM}</div>
                <div className="fga">{totalFGA}</div>
                <div className="fgp">{averageFGPercentage}</div>
                <div className="twoPM">{total2PM}</div>
              <div className="twoPA">{total2PA}</div>
              <div className="threePM">{total3PM}</div>
              <div className="threePA">{total3PA}</div>
              <div className="oReb">{totalOREB}</div>
              <div className="dReb">{totalDREB}</div>
              <div className="reb">{totalREB}</div>
              <div className="ast">{totalAST}</div>
              <div className="stl">{totalSTL}</div>
              <div className="blk">{totalBLK}</div>
              <div className="to">{totalTO}</div>
              <div className="pts">{totalPTS}</div>
              </div>
          </div>
        </div>
      </section>
      </div>
  )
}

export default PlayersStatsPage
