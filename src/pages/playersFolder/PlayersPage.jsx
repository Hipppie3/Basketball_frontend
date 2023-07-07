import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import video1 from '../videos/a.mp4';
import video2 from '../videos/b.mp4';
import './PlayersPage.css'

function PlayersPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const videos = [video1, video2, video1, video2, video1, video2]; // Add more videos as needed
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  const texts = ["Pat with the sideline jumper", "Text 2", "Text 3", "Text 4", "Text 5", "Text 6"]; // Add more texts as needed
  
  const visibleVideos = videos.slice(scrollPosition, scrollPosition + 4);

  const handleScrollLeft = () => {
    setScrollPosition(scrollPosition - 1);
  };

  const handleScrollRight = () => {
    setScrollPosition(scrollPosition + 1);
  };

   const canScrollLeft = scrollPosition > 0; // Check if there are videos to scroll to the left
  const canScrollRight = scrollPosition + 4 < videos.length; // Check if there are videos to scroll to the right

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

  

console.log(player);
  return (
     <div className="players">

      <section className="players-container">
        <div className="players-profile">
          <img className={player.player.first_name} src={player.image} alt="hiep"/>
          <div className="profile-information">
            <h3 className="position">Park Crew | #0 | Point Guard</h3>
            <h1 className="name">{player.player.first_name} <br/>{player.player.last_name}</h1>
          </div>


        </div>
    {player.statistics.map((stat) => (
       <div className="players-info" key={id}>
          <div className="left-section">
            <div className="players-avg">
              <span className="avg">PPG</span> <span className="avg-num"></span>
            </div>
            <div className="players-avg">
              <span className="avg">RBG</span> <span className="avg-num"></span>
            </div>
            <div className="players-avg">
              <span className="avg">APG</span> <span className="avg-num"></span>
            </div>
            <div className="players-avg">
              <span className="avg">SPG</span> <span className="avg-num"></span>
            </div>
            <div className="players-avg">
              <span className="avg">BPG</span> <span className="avg-num"></span>
            </div>
          </div>

          <div className="right-section">
            <div className="left-side">
              <div className="left-info"><span>HEIGHT</span></div>
              <div className="left-info"><span>WEIGHT</span></div>
              <div className="left-info"><span>COUNTRY</span></div>
              <div className="left-info"><span>COLLEGE</span></div>
            </div>    
            <div className="right-side">
              <div className="right-info"><span>AGE</span></div>
              <div className="right-info"><span>BIRTHDATE</span></div>
              <div className="right-info"><span>DRAFT</span></div>
              <div className="right-info"><span>EXPERIENCE</span></div>
            </div>    
          </div>
        </div>
    ))}

        <div className="players-link-container">
          <div className="players-link-left">
            <ul>
              <li>Profile</li>
              <li>Stats</li>
              <li>Bio</li>
              <li>Media</li>
            </ul>
          </div>
          <div className="players-link-right"></div>
        </div>
      </section>

        <section className="ad">
     <div className="ad-container">
       <h1>SPONSORS</h1>
     </div>
     </section>

       <section className="video-container">
        <div className="players-video">
          <div className="latest-video">LATEST VIDEOS</div>
   
          <div className="vid">
            {canScrollLeft && (
              <button 
                className={`scroll-btn left ${canScrollLeft ? 'slide-left' : ''}`}onClick={handleScrollLeft}>
                &lt;
              </button>
            )}
            {player.videos.map((playerVideo, index) => {
  const videoIndex = scrollPosition + index; // Calculate the actual index of the video in the videos array
  return (

      <div className="eaVid" key={`video-${index}`}>
        <video src={playerVideo.url} controls />
        <div className="hi">{playerVideo.title}</div>
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
              
              <div className="game-date">GAME DATE</div>
              {/* <div className="game-matchup">MATCHUP</div>
              <div className="game-outcome">W/L</div> */}
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
              <div className="game-date">{stat.game_date}</div>
              {/* <div className="game-matchup">{stat.matchup}</div>
              <div className="game-outcome">{stat.w_l}</div> */}
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
