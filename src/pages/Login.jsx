import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn, setLoggedIn, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate('');


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/login', {
        username,
        password
      }, { withCredentials: true }); // Include withCredentials option to send session cookie

      setLoggedIn(true);
      setUser(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
