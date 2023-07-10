import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

function PlayersMediaPage() {
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
  return (
    <div>
              <div className="players-link-left1">
            
            <ul>
              <li>
              <NavLink className='stats-link'to={`/players/${player.player.id}`}>Profile</NavLink></li>
              <li>Stats</li>
              <li><NavLink to={`/players/${player.player.id}/bio`} className='stats-link' >Bio</NavLink></li>

              <li><NavLink to={`/players/${player.player.id}/media`} className='stats-link' >Media</NavLink></li>
            </ul>
          </div>
   
    </div>
  )
}

export default PlayersMediaPage
