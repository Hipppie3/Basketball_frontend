import React, { useContext, useState } from 'react';
import axios from 'axios';
import './Login.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
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
    },
  {
    withCredentials: true
  })
    .then((response) => {
      const user = response.data;
      if (response.status === 200) {
        setLoggedIn(true);
        console.log(user); // Use console.log to display the user data
        navigate('/'); // Navigate to the desired route after successful login
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
          placeholder="Enter Name"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={handleNameChange}
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
