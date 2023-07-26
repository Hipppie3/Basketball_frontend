import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddNewTeam.css'

function AddNewTeam() {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [sports, setSports] = useState([]);
  const [selectedSportId, setSelectedSportId] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    const fetchSports = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/sports');
        setSports(response.data);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };

    fetchTeams();
    fetchSports();
  }, []);

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    console.log('Team Name:', teamName);
    try {
      const response = await axios.post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/teams', {
        team: {
          name: teamName,
        },
      });

      // Reset form values
      setTeamName('');
      // Refresh the teams list after adding a new team
      setTeams([...teams, response.data]);
    } catch (error) {
      console.error('Error adding new team:', error);
    }
  };

  const handleUpdateTeamName = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/teams/${selectedTeamId}`, {
        team: {
          name: newTeamName,
        },
      });

      // Reset form values
      setSelectedTeamId('');
      setNewTeamName('');
      // Refresh the teams list after updating a team's name
      const updatedTeams = teams.map((team) => {
        if (team.id === selectedTeamId) {
          return { ...team, name: newTeamName };
        }
        return team;
      });
      setTeams(updatedTeams);
    } catch (error) {
      console.error('Error updating team name:', error);
    }
  };

  const handleUpdateTeamSport = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/teams/${selectedTeamId}`, {
        team: {
          sport_id: selectedSportId,
        },
      });

      // Reset form values
      setSelectedTeamId('');
      setSelectedSportId('');
      // Refresh the teams list after updating a team's sport
      const updatedTeams = teams.map((team) => {
        if (team.id === selectedTeamId) {
          return { ...team, sport_id: selectedSportId };
        }
        return team;
      });
      setTeams(updatedTeams);
    } catch (error) {
      console.error('Error updating team sport:', error);
    }
  };

  return (
    <div className="addNewTeamContainer">
      <div className="teamContainer">
        <h1 className="addTeamTitle">Add New Team</h1>
        <form onSubmit={handleTeamSubmit} className="newTeam">
          <label className="newTeamLabel">
            Team Name:
            <input
              className="newTeamInput"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </label>
          <button className="addTeamBtn" type="submit">
            Add Team
          </button>
        </form>
      </div>

      {/* Update Team Name Form */}
      <div className="updateTeamContainer">
        <h1 className="updateTeamTitle">Update Team Name</h1>
        <form onSubmit={handleUpdateTeamName} className="updateTeam">
          <label className="updateTeamLabel">
            Select Team:
            <select
              className="updateTeamSelect"
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
            >
              <option value="">Select a team...</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
          <label className="updateTeamLabel">
            New Team Name:
            <input
              className="updateTeamInput"
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
          </label>
          <button type="submit" className="updateTeamBtn">
            Update Team Name
          </button>
        </form>
      </div>

      {/* Update Team Sport Form */}
      <div className="updateTeamContainer">
        <h1 className="updateTeamTitle">Update Team Sport</h1>
        <form onSubmit={handleUpdateTeamSport} className="updateTeam">
          <label className="updateTeamLabel">
            Select Team:
            <select
              className="updateTeamSelect"
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
            >
              <option value="">Select a team...</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
          <label className="updateTeamLabel">
            Select Sport:
            <select
              className="updateTeamSelect"
              value={selectedSportId}
              onChange={(e) => setSelectedSportId(e.target.value)}
            >
              <option value="">Select a sport...</option>
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="updateTeamBtn">
            Update Team Sport
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewTeam;
