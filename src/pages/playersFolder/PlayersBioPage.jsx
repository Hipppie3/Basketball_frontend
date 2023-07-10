import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

function PlayersBioPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

   useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}`);
        console.log(response.data)
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
  return (
    <div>
      
          <div className="players-link-left1">     
            <ul>
              <li>
              <NavLink className='stats-link'to={`/players/${player.player.id}`}>Profile</NavLink></li>
              <li><NavLink to={`/players/${player.player.id}/stats`} className='stats-link' activeClassName="active-link">Stats</NavLink></li>
              {/* <li>Bio</li> */}
              <li><NavLink to={`/players/${player.player.id}/media`} className='stats-link' >Media</NavLink></li>
            </ul>
          </div>
        <div>
        <h1>{player.player.first_name}{player.player.last_name}</h1>
        </div>
        <div>
          <h1>Biography</h1>
        </div>
        
    </div>
  )
}

export default PlayersBioPage
