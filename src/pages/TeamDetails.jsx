import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/teams/${id}`);
        setTeam(response.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };
    fetchTeamData();
  }, [id]);

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Team: {team.name}</h2>
      <h3>Players:</h3>
      <ul>
        {team.players.map((player) => (
          <li key={player.id}>
            <Link to={`/players/${player.id}`}>
              {player.first_name} {player.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamDetail;
