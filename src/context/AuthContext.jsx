import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Add user state


const checkLoggedInStatus = async () => {
  try {
    const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/me', { withCredentials: true });

    setLoggedIn(true);
    setUser(response.data);
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  console.log(loggedIn);
  console.log(user);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
