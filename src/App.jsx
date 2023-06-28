import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
const [ stats, setStats ] = useState([])

useEffect(()=> {
  axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players')
    .then((response) => {
      setStats(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
},[]);


  return (
    <>
    {stats.map((stat) => (
    <h1 key={stat.id}>{stat.first_name}</h1>
    ))}
    </>
  )
}

export default App
