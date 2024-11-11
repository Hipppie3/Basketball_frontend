import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
   <nav>
    <ul>
     <li>
      <NavLink to="/" className={({isActive}) => (isActive ? "active" : "inactive")}>
      HOME
      </NavLink>
     </li>
     <li>
      <NavLink to="/players" className={({isActive}) => (isActive ? "active" : "inactive")}>
      PLAYERS
      </NavLink>
     </li>
     <li>
      <NavLink to="/playersForm" className={({isActive}) => (isActive ? "active" : "inactive")}>
      PLAYERS FORM
      </NavLink>
     </li>
    </ul>
   </nav>
  )
}
