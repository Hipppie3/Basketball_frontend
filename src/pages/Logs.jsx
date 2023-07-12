import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setLoggedIn(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/login', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoggedIn(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleLogin}>
        <h1 className="loginTitle">Log In</h1>
        <input
          className="input"
          placeholder="Enter Name"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          placeholder="Enter Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginBtn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
