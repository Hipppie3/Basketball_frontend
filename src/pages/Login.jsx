import React, { useContext, useState } from 'react';
import axios from 'axios';
import './Login.css';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useContext(AuthContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a request to your Rails backend for authentication
    // Replace 'your_backend_endpoint' with the actual endpoint URL
    axios
      .post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/login', {
        username: name,
        password
      })
      .then((response) => {
        const user = response.data;
        if (response.status === 201) {
          setLoggedIn(true);
          console.log(user); // Use console.log to display the user data
          // Remove the following line to prevent page refresh
          // window.location.href = '/';
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
          id="name"
          autoComplete="off"
          value={name}
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
