import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };
    fetchTeamData();
  }, []);

  return (
    <div>
     <h1>TEAMS</h1>
      {teams.map((team) => (
        <div key={team.id}>
          <Link to={`/teams/${team.id}`}>
            {team.name}
                {console.log(team)}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Teams;
