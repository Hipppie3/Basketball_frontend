import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function Games() {
 const [games, setGames] = useState([])

 useEffect(()=> {
  const fetchData = async () => {
   try {
    const gameResponse = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games`
    );
   setGames(gameResponse.data)
   console.log(gameResponse.data)
  } catch (error) {
  console.error('Something went wrong:', error);
  }
 };
 fetchData();
},[]);

  return (
    <div>
      {games.map(game => (
       <>
       <NavLink to={`/games/${game.id}`}>
       <h1>{game.name}</h1>
       <h2>{game.date}</h2>
       </NavLink>
       </>
      ))}
    </div>
  )
}

export default Games
