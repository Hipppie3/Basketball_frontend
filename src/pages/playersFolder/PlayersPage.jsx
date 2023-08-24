import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import './PlayersPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faLinkedin  } from '@fortawesome/free-brands-svg-icons'
import YouTube from 'react-youtube';
// import { AuthContext } from '../../context/AuthContext'

function PlayersPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [playerStatistics, setPlayerStatistics] = useState(null);

  // const { loggedIn, setLoggedIn} = useContext(AuthContext)

  const handleScrollLeft = () => {
    setScrollPosition(scrollPosition - 1);
  };

  const handleScrollRight = () => {
    setScrollPosition(scrollPosition + 1);
  };

  const canScrollLeft = scrollPosition > 0; // Check if there are videos to scroll to the left
  const canScrollRight = scrollPosition + 4 < player?.videos?.length; // Check if there are videos to scroll to the right

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
const fetchPlayerStatistics = async () => {
      try {
        const statisticsResponse = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}/statistics`);
        setPlayerStatistics(statisticsResponse.data);
        console.log(statisticsResponse.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchPlayerData();
    fetchPlayerStatistics();
  }, [id]);

if (!player || !playerStatistics) {
  return <div>Loading...</div>;
}

const visibleVideos = player.videos?.slice(scrollPosition, scrollPosition + 4) || [];
  const getPlayerVideoId = (url) => {
  const videoId = url.split('v=')[1];
  return videoId;
  };  

    let totalPoints = 0;
    let totalRebounds = 0;
    let totalAssists = 0;
    let totalSteals = 0;
    let totalBlocks = 0;

  player.statistics.forEach((stat) => {
    totalPoints += stat.pts || 0;
    totalRebounds += stat.reb || 0;
    totalAssists += stat.ast || 0;
    totalSteals += stat.stl || 0;
    totalBlocks += stat.blocks || 0;
  });

  // Calculate average points per game
  const averagePoints = player.statistics.length > 0 ? (totalPoints / player.statistics.length).toFixed(2) : 0;
  const averageRebounds = player.statistics.length > 0 ? (totalRebounds / player.statistics.length).toFixed(2) : 0;
  const averageAssists = player.statistics.length > 0 ? (totalAssists / player.statistics.length).toFixed(2) : 0;
  const averageSteals = player.statistics.length > 0 ? (totalSteals / player.statistics.length).toFixed(2) : 0;
  const averageBlocks = player.statistics.length > 0 ? (totalBlocks / player.statistics.length).toFixed(2) : 0;

console.log(averagePoints);

  const getVideoId = (url) => {
    const match = url.match(/youtube\.com.*(\?v=|\/embed\/|\/\d\/|\/vi\/|\/v\/|https:\/\/youtu\.be\/|\/e\/|watch\?v=|\&v=|youtu\.be\/|\/v\/|e\/|youtube\.com\/v\/)([^#\&\?\n]*)/);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return null;
    }
  };
  

  return (
   <div className="players">
  <section className="players-container">
    <div className="players-profile" >
      <div className="players-image" style={{ backgroundImage: `url(${player.image_url})` }}></div>
      <div className="profile-information">
        <h1 className="name">{player.first_name} {player.last_name}</h1>
      </div>
    </div>


       <div className="players-info" key={id}>
          <div className="left-section">
            <div className="players-avg">
              <span className="avg">PPG</span><span className="avg-num">{averagePoints}</span>
            </div>
            <div className="players-avg">
              <span className="avg">RBG</span><span className="avg-num">{averageRebounds} </span>
            </div>
            <div className="players-avg">
              <span className="avg">APG</span><span className="avg-num">{averageAssists} </span>
            </div>
            <div className="players-avg">
              <span className="avg">SPG</span><span className="avg-num">{averageSteals} </span>
            </div>
            <div className="players-avg">
              <span className="avg">BPG</span><span className="avg-num">{averageBlocks} </span>
            </div>
          </div>

          <div className="right-section">
            <div className="left-side">
              <div className="left-info"><span>AGE</span></div>
              <div className="left-info"><span>HEIGHT</span></div>
              <div className="left-info"><span>WEIGHT</span></div>
              <div className="left-info"><span>CAREER</span></div>
            </div>    
            <div className="right-side">
              <div className="right-info social-media-icons-white"><span>
              <a href="http://facebook.com">
              <FontAwesomeIcon icon={faFacebook}/>
              </a></span></div>
              <div className="right-info social-media-icons-white"><span>
              <a href="http://facebook.com">
              <FontAwesomeIcon icon={faInstagram}/>
              </a></span></div>
              <div className="right-info social-media-icons-white"><span>
              <a href="http://facebook.com">
              <FontAwesomeIcon icon={faTwitter}/>
              </a></span></div>
              <div className="right-info social-media-icons-white"><span>
              <a href="http://facebook.com">
              <FontAwesomeIcon icon={faLinkedin}/>
              </a></span></div>
            </div>    
          </div>
        </div>


        <div className="players-link-container">
          <div className="players-link-left">
            <ul>
              
              <li>Profile</li>

              <li><NavLink to={`/players/${player.id}/stats`} className='stats-link' >Stats</NavLink></li>

              {/* <li><NavLink to={`/players/${player.player.id}/bio`} className='stats-link' >Bio</NavLink></li> */}

              <li><NavLink to={`/players/${player.id}/media`} className='stats-link' >Media</NavLink></li>

            </ul>
          </div>
          <div className="players-link-right"></div>
        </div>
      </section>
        <section className="ad">
     <div className="ad-container">
       <h1>Business Website</h1>
     </div>
     </section>

       <section className="video-container1">
        <div className="players-video">
          <div className="latest-video">LATEST VIDEOS</div>
          <div className="vid">
            {canScrollLeft && (
              <button 
                className={`scroll-btn left ${canScrollLeft ? 'slide-left' : ''}`}onClick={handleScrollLeft}>
                &lt;
              </button>
            )}
            {visibleVideos.slice(-5).map((video, index) => {
  const videoIndex = scrollPosition + index; // Calculate the actual index of the video in the videos array
  return (

  <div className="eaVid" key={`video-${video.id}`}>
  <YouTube  style={{height: "150px", width: "250px", backgroundColor: "black"}} videoId={getVideoId(video.url)}/>
  <div className="hi" >{video.title}</div>
  </div>
  );
})}
            {canScrollRight && (
              <button className={`scroll-btn right ${canScrollRight ? 'slide-right' : ''}`} onClick={handleScrollRight}>
                &gt;
              </button>
            )}
          </div>
        </div>
      </section>



        <section className="players-stats-container">

        <div className="players-stats">
          <h2>Last 5 Games</h2>
          <div className="game-table">
            <div className="game-row game-header">
              <div className="game-date">DATE</div>
              <div className="w_l">W_L</div>
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
            


 {playerStatistics.slice(-5).map((stat) => (
        <div key={stat.id}>
       {console.log(stat)}
              <div className="game-row">
              {stat.game?.date ? (
        <NavLink to={`/games/${stat.game_id}`} className="game-date">
          {stat.game.date}
        </NavLink>
      ) : (
        <div className="game-date">nil</div>
      )}
              <div className="w_l">{stat.w_l}</div>
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
  );
}

export default PlayersPage;
