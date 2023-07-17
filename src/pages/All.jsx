import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './All.css';

function All() {
  const [all, setAll] = useState([]);
  const [id, setId] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [editingStatisticId, setEditingStatisticId] = useState(null);
  const [editedStatistics, setEditedStatistics] = useState({});
  const [isEditingPlayer, setIsEditingPlayer] = useState(false); // State to track player edit mode
  const [editedPlayer, setEditedPlayer] = useState({}); // State to store edited player data

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players');
        setAll(response.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchPlayerData();
  }, []);


const handlePlayerChange = (e, setId) => {
  const playerId = e.target.value;
  setId(playerId);
};


  useEffect(() => {
    const selected = all.find((player) => player.id === parseInt(id));
    setSelectedPlayer(selected);
    setEditingStatisticId(null);
    setEditedStatistics({});
  }, [all, id]);

  const handleEditClick = (statisticId) => {
    setEditingStatisticId(statisticId);
  };

  const handlePlayerEditClick = () => {
    setIsEditingPlayer(true);
    setEditedPlayer(selectedPlayer);
  };

  const handleInputChange = (e, statisticId, field) => {
    const value = e.target.value;
    setEditedStatistics((prevState) => ({
      ...prevState,
      [statisticId]: {
        ...prevState[statisticId],
        [field]: value,
      },
    }));
  };

  const handlePlayerInputChange = (e, field) => {
    const value = e.target.value;
    setEditedPlayer((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleUpdateClick = async (statisticId) => {
    if (!selectedPlayer) {
      console.error('No player selected.'); // Handle the error appropriately
      return;
    }

    const updatedStatistic = editedStatistics[statisticId];
    const playerId = selectedPlayer.id; // Get the selected player ID here

    try {
      const response = await axios.put(
        `https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${playerId}/statistics/${statisticId}`,
        updatedStatistic
      );
      console.log(response.data); // Check the response from the backend
      // Perform any necessary handling after successful update

      // Fetch the updated player data
      const updatedPlayerResponse = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${playerId}`);
      const updatedPlayer = updatedPlayerResponse.data; // Store the updated player data

      // Update the selected player with the new data
      setSelectedPlayer((prevState) => ({
        ...prevState,
        statistics: prevState.statistics.map((stat) =>
          stat.id === statisticId ? { ...stat, ...updatedStatistic } : stat
        ),
      }));
    } catch (error) {
      console.error('Failed to update statistic:', error);
      // Perform error handling if needed
    }

    // Clear the editing state
    setEditingStatisticId(null);
    setEditedStatistics((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[statisticId];
      return updatedState;
    });
  };

  const handlePlayerUpdateClick = async () => {
    if (!selectedPlayer) {
      console.error('No player selected.'); // Handle the error appropriately
      return;
    }

    try {
      const playerId = selectedPlayer.id;
      const response = await axios.put(
        `https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${playerId}`,
        editedPlayer
      );
      console.log(response.data); // Check the response from the backend
      // Perform any necessary handling after successful update

      // Fetch the updated player data
      const updatedPlayerResponse = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${playerId}`);
      const updatedPlayer = updatedPlayerResponse.data; // Store the updated player data

      // Update the selected player with the new data
      setSelectedPlayer(updatedPlayer);
    } catch (error) {
      console.error('Failed to update player:', error);
      // Perform error handling if needed
    }

    // Clear the editing state
    setIsEditingPlayer(false);
    setEditedPlayer({});
  };

  return (
    <div>
      <div className="statsInput">
        <label className="newStatsLabel" htmlFor="id">
          Player ID
        </label>
        <select className="newStatsInput1" value={id} onChange={(e) => handlePlayerChange(e, setId)}>
          <option value="">Select a player</option>
          {all.map((player) => (
            <option key={player.id} value={player.id}>
              {player.first_name} {player.last_name}
            </option>
          ))}
        </select>
      </div>

      {selectedPlayer && (
        <div>
          <h2>Selected Player:</h2>
          {isEditingPlayer ? (
            <div>
              <p>First Name:
                <input
                  type="text"
                  defaultValue={editedPlayer.first_name || selectedPlayer.first_name}
                  onChange={(e) => handlePlayerInputChange(e, 'first_name')}
                />
              </p>
              <p>Last Name:
                <input
                  type="text"
                  defaultValue={editedPlayer.last_name || selectedPlayer.last_name}
                  onChange={(e) => handlePlayerInputChange(e, 'last_name')}
                />
              </p>
              <p>Sport:
                <input
                  type="text"
                  defaultValue={editedPlayer.sport || selectedPlayer.sport}
                  onChange={(e) => handlePlayerInputChange(e, 'sport')}
                />
              </p>
              <button onClick={handlePlayerUpdateClick}>Update Player</button>
            </div>
          ) : (
            <div>
              <p>First Name: {selectedPlayer.first_name}</p>
              <p>Last Name: {selectedPlayer.last_name}</p>
              <p>Sport: {selectedPlayer.sport}</p>
              <button onClick={handlePlayerEditClick}>Edit Player</button>
            </div>
          )}

          <h3>Statistics:</h3>
          {selectedPlayer.statistics.length > 0 ? (
            <ul className="playerStats">
              {selectedPlayer.statistics.map((statistic) => {
                const isEditing = editingStatisticId === statistic.id;
                const editedStatistic = editedStatistics[statistic.id] || {};

                return (
                  <li key={statistic.id} className="playerStatsLi">
                    <div>
                      {isEditing ? (
                        <div>
                          Game Date:
                          <input
                            type="text"
                            defaultValue={editedStatistic.game_date || statistic.game_date}
                            onChange={(e) => handleInputChange(e, statistic.id, 'game_date')}
                          />
                          <br />
                          Matchup:
                          <input
                            type="text"
                            defaultValue={editedStatistic.matchup || statistic.matchup}
                            onChange={(e) => handleInputChange(e, statistic.id, 'matchup')}
                          />
                          <br />
                          W/L:
                          <input
                            type="text"
                            defaultValue={editedStatistic.w_l || statistic.w_l}
                            onChange={(e) => handleInputChange(e, statistic.id, 'w_l')}
                          />
                          <br />
                          PPG:
                          <input
                            type="text"
                            defaultValue={editedStatistic.pts || statistic.pts}
                            onChange={(e) => handleInputChange(e, statistic.id, 'pts')}
                          />
                          <br />
                          RBG:
                          <input
                            type="text"
                            defaultValue={editedStatistic.reb || statistic.reb}
                            onChange={(e) => handleInputChange(e, statistic.id, 'reb')}
                          />
                          <br />
                          APG:
                          <input
                            type="text"
                            defaultValue={editedStatistic.ast || statistic.ast}
                            onChange={(e) => handleInputChange(e, statistic.id, 'ast')}
                          />
                          <br />
                        </div>
                      ) : (
                        <div>
                          Id: {statistic.id}
                          <br />
                          Game Date: {statistic.game_date}
                          <br />
                          Matchup: {statistic.matchup}
                          <br />
                          W/L: {statistic.w_l}
                          <br />
                          PPG: {statistic.pts}
                          <br />
                          RBG: {statistic.reb}
                          <br />
                          APG: {statistic.ast}
                          <br />
                        </div>
                      )}
                    </div>
                    {isEditing ? (
                      <button onClick={() => handleUpdateClick(statistic.id)}>Update</button>
                    ) : (
                      <button onClick={() => handleEditClick(statistic.id)}>Edit</button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No statistics available for this player.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default All;
