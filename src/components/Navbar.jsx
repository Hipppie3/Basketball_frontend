import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Navbar() {
  const [click, setClick] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
console.log(loggedIn)

const handleLogout = () => {
  console.log('Logging out...');
  axios
    .delete('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/logout', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('Logout response:', response);
      setLoggedIn(false);
      navigate('/login');
    })
    .catch((error) => {
      console.log('Logout error:', error.message);
      if (error.response) {
        console.log('Error response:', error.response.data);
      }
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
                {loggedIn && ( // Conditionally render the "FORM" element
                  <NavLink className={click ? 'nav-links active-form' : 'nav-links'} onClick={closeMobileMenu}>
                    FORM
                  </NavLink>
                )}
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
