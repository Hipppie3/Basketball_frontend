import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';


function Navbar() {
  const [click, setClick] = useState(false);
  const { loggedIn, setLoggedIn, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
          {/* <li className="nav-item">
            <NavLink
              to="/teams"
              className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')}
              onClick={closeMobileMenu}
            >
              TEAMS
            </NavLink>
          </li> */}
            <li className="nav-item">
            <NavLink
              to="/games"
              className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')}
              onClick={closeMobileMenu}
            >
              GAMES
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
          {user && <>
              <li className="nav-items">
                  <NavLink className={click ? 'nav-links active-form' : 'nav-links'} to="/form" onClick={closeMobileMenu}>
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
                  <NavLink to="/addSportVideo" className="dropdown-link" onClick={closeMobileMenu}>
                    Edit Sport Video
                  </NavLink>
                  <NavLink to="/addNewTeam" className="dropdown-link" onClick={closeMobileMenu}>
                    Edit Team
                  </NavLink>
                   <NavLink to="/all" className="dropdown-link" onClick={closeMobileMenu}>
                    All
                  </NavLink>
                  <NavLink to='/gameManagement' className="dropdown-link" onClick={closeMobileMenu}>
                    Edit Game
                  </NavLink>
                </div>
              </li>
              </>
}

            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')}
                onClick={closeMobileMenu}
              >
                LOGIN
              </NavLink>
            </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
