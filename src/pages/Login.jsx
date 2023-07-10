import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

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
      .post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/sessions', { name, password })
      .then((response) => {
        const data = response.data;
        // Handle the response from the backend
        // For example, you can check if the login was successful
        if (data.success) {
          // Redirect the user to the desired page upon successful login
          // Replace 'your_redirect_path' with the actual path
          window.location.href = '/';
        } else {
          // Handle authentication errors, e.g., display an error message
          console.log(data.error);
        }
      })
      .catch((error) => {
        // Handle any network or other errors
        console.log(error);
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
