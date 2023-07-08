import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function PlayersStatsPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

   useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}`);
        setPlayer(response.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchPlayerData();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{player.first_name} Stats</h1>
      {player.statistics.map((stat) => (
        <div key={stat.id}>
        <p1>{stat.pts}</p1>
        </div>
      ))}
    </div>
  )
}

export default PlayersStatsPage
