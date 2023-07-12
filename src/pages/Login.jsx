import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/login', {
        username,
        password
      })
      .then((response) => {
        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          navigate('/');
        } else {
          console.error('Login failed');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="loginTitle">Log In</h1>
        <input
          className="input"
          placeholder="Enter Username"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          className="input"
          placeholder="Enter Password"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="loginBtn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
