import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import './PlayersMediaPage.css'

function PlayersMediaPage() {
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
    <div classname='players-media'>
              <div className="players-link-left1">
            <ul>
              <li>
              <NavLink className='stats-link'to={`/players/${player.player.id}`}>Profile</NavLink></li>
              <li><NavLink to={`/players/${player.player.id}/stats`} className='stats-link' activeClassName="active-link">Stats</NavLink></li>
              {/* <li><NavLink to={`/players/${player.player.id}/bio`} className='stats-link' >Bio</NavLink></li> */}
              <li>Media</li>
            </ul>
          </div>
          
          <div className='media-container'>
    
          </div>
    </div>
  )
}

export default PlayersMediaPage
