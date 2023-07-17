import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
const { user, loggedIn } = useContext(AuthContext)
  console.log(user)
  console.log(loggedIn)

  return (
    <div className="homepage-container">
      <h1>HOME</h1>
    </div>
  );
};

export default HomePage;
