import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

function Navbar() {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to='/' className='navbar-logo'>
          HIPPPIE <span>SPORTS</span>
        </NavLink>
        <div className='menu-icon' onClick={handleClick}>
        {click ? <FaTimes /> :  <FaBars />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'><NavLink to='/' 
          className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')
          } onClick={closeMobileMenu}>HOME </NavLink>
          </li>
          <li className='nav-item'><NavLink to='/about'
          className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')
          } onClick={closeMobileMenu}>ABOUT</NavLink>
          </li>
          <li className='nav-item'><NavLink to='/media' 
          className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')
          } onClick={closeMobileMenu}>MEDIA</NavLink>
          </li>
          <li className='nav-item'><NavLink to='/players'
          className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')
          } onClick={closeMobileMenu}>PLAYERS</NavLink>
          </li>
          <li className='nav-items'><NavLink 
          className= {click ? 'nav-links active-form' : 'nav-links'} onClick={closeMobileMenu}>FORM</NavLink>
          <div className='dropdown'>
          <NavLink to='/editPlayers' className='dropdown-link' onClick={closeMobileMenu}>
    Edit Player
  </NavLink>
  <NavLink to='/editStats' className='dropdown-link' onClick={closeMobileMenu}>
    Edit Statistics
  </NavLink>
  <NavLink to='editVideos' className='dropdown-link' onClick={closeMobileMenu}>
    Edit Video
  </NavLink>
          </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
