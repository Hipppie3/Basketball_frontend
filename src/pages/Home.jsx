import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user, loggedIn, setUser, setLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate('');

console.log(user)
console.log(loggedIn)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/me'); // Replace with your actual endpoint URL

        setUser(response.data);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Perform logout logic
    fetch("https://agile-reef-32463-2ad3559c3e00.herokuapp.com/logout", {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          navigate('/login')
        }
      });
  };
  console.log(user)
  console.log(loggedIn)
  return (
    <div>
      {user ? (
        <div>
          <h2>Hi {user.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>No user</p>
      )}
    </div>
  );
};

export default Home;
