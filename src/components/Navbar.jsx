import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import axios from 'axios';

function Navbar() {
  const [click, setClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

const handleLogout = () => {
  // Perform logout logic here
  // For example, you can make a request to your backend to clear the user's session or access token

  axios
    .post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/logout')
    .then((response) => {
      // Handle successful logout
      // For example, you can clear any user-related data from local storage or state

      // Set the loggedIn state to false
      setLoggedIn(false);

      // Redirect the user to the login page or desired page
      window.location.href = '/login';
    })
    .catch((error) => {
      // Handle logout error
      console.log(error);
    });
};


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          HIPPPIE <span>SPORTS</span>
        </NavLink>

        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')}
              onClick={closeMobileMenu}
            >
              HOME
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')}
              onClick={closeMobileMenu}
            >
              ABOUT
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/media"
              className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')}
              onClick={closeMobileMenu}
            >
              MEDIA
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/players"
              className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')}
              onClick={closeMobileMenu}
            >
              PLAYERS
            </NavLink>
          </li>

          {loggedIn ? (
            <>
              <li className="nav-items">
                <NavLink className={click ? 'nav-links active-form' : 'nav-links'} onClick={closeMobileMenu}>
                  FORM
                </NavLink>
                <div className="dropdown">
                  <NavLink to="/editPlayers" className="dropdown-link" onClick={closeMobileMenu}>
                    Edit Player
                  </NavLink>
                  <NavLink to="/editStats" className="dropdown-link" onClick={closeMobileMenu}>
                    Edit Statistics
                  </NavLink>
                  <NavLink to="/editVideos" className="dropdown-link" onClick={closeMobileMenu}>
                    Edit Video
                  </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/logout"
                  className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')}
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')}
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
