import React from 'react'
import { NavLink } from 'react-router-dom'

function PlayersMediaPage() {
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
