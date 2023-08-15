import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user, loggedIn, setUser, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate('');

  const handleLogout = () => {
    // Perform logout logic
    fetch("https://agile-reef-32463-2ad3559c3e00.herokuapp.com/logout", {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          setLoggedIn(false);
          navigate('/login');
        }
      });
  };

  return (
    <div className="home-container">
      <div>
        {user ? (
          <>
        <h2>Hi {user ? user.username : 'Guest'}!</h2>
        <button onClick={handleLogout}>Logout</button>
        </>
        ) : (
          <h2>Coming Soon</h2>
        )
}
      </div>
    </div>
  );
}

export default Home;
