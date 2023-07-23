import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './All.css';

function All() {
  const [all, setAll] = useState([]);
  const [sports, setSports] = useState([]);
  const [id, setId] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isAddingStats, setIsAddingStats] = useState(false);
  const [editingStatisticId, setEditingStatisticId] = useState(null);
  const [editedStatistics, setEditedStatistics] = useState({});
  const [isEditingPlayer, setIsEditingPlayer] = useState(false); // State to track player edit mode
  const [editedPlayer, setEditedPlayer] = useState({}); // State to store edited player data

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players');
        setAll(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };
    fetchPlayerData();
  }, []);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/sports');
        setSports(response.data);
        console.log(response.data)
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
    console.error('No player selected.');
    return;
  }

  try {
    const playerId = selectedPlayer.id;

    // Make the API call to update the data on the server
    await axios.put(
      `https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${playerId}`,
      editedPlayer
    );

    // Fetch the updated player data from the server, including the expanded sport data
    const updatedPlayerResponse = await axios.get(
      `https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${playerId}?_expand=sport`
    );
    const updatedPlayer = updatedPlayerResponse.data;

    // Update the state with the new data from the server
    setAll((prevState) =>
      prevState.map((player) => (player.id === playerId ? { ...player, ...updatedPlayer } : player))
    );

    // Update the sports state to include the updated sport data directly
    setSports((prevSports) =>
      prevSports.map((sport) => (sport.id === updatedPlayer.sport_id ? { ...sport, ...updatedPlayer.sport } : sport))
    );

    // Update the selected player with the new data, including the expanded sport data
    setSelectedPlayer(updatedPlayer);
  } catch (error) {
    console.error('Failed to update player:', error.response?.data || error.message);
    // Perform error handling, display error messages, etc.
  }

  // Clear the editing state
  setIsEditingPlayer(false);
  setEditedPlayer({});
};


 const handleAddStatsClick = () => {
    setIsAddingStats(!isAddingStats);
  };

  const handlePostStatsClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}/statistics`, {
        w_l,
        fgm,
        fga,
        fg_percentage,
        two_pm,
        two_pa,
        three_pm,
        three_pa,
        oreb,
        dreb,
        reb,
        ast,
        stl,
        blk,
        to,
        pts,
      });
      console.log(response.data);
      // Reset form values
      setW_l('');
      setFgm('');
      setFga('');
      setFg_Percentage('');
      setTwo_Pm('');
      setTwo_Pa('');
      setThree_Pm('');
      setThree_Pa('');
      setOreb('');
      setDreb('');
      setReb('');
      setAst('');
      setStl('');
      setBlk('');
      setTo('');
      setPts('');
    } catch (error) {
      console.error(error);
    }
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
               <select
                  value={editedPlayer.sport_id || selectedPlayer.sport_id}
                  onChange={(e) => handlePlayerInputChange(e, 'sport_id')}
                >
                  <option value="">Select a sport</option>
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </select>
              </p>
              <button onClick={handlePlayerUpdateClick}>Update Player</button>
            </div>
          ) : (
            <div>
              <p>First Name: {selectedPlayer.first_name}</p>
              <p>Last Name: {selectedPlayer.last_name}</p>
       <p>Sport: {selectedPlayer.sport_id && sports.find((sport) => sport.id === selectedPlayer.sport_id)?.name}</p>
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
            <div>
            <p>No statistics available for this player.</p>
             <button onClick={handleAddStatsClick}>
          {isAddingStats ? 'Cancel Adding Stats' : 'Add Stats'}
          </button>
            </div>     
          )}

{isAddingStats && (
            <div>
              {/* Input fields for the new statistics */}
              <input
                type="text"
                placeholder="Game Date"
                /* Add necessary event handlers and state variables to capture the data */
              />
              <input
                type="text"
                placeholder="Matchup"
                /* Add necessary event handlers and state variables to capture the data */
              />
              <input
                type="text"
                placeholder="W/L"
                /* Add necessary event handlers and state variables to capture the data */
              />
              <input
                type="text"
                placeholder="PPG"
                /* Add necessary event handlers and state variables to capture the data */
              />
              <input
                type="text"
                placeholder="RBG"
                /* Add necessary event handlers and state variables to capture the data */
              />
              <input
                type="text"
                placeholder="APG"
                /* Add necessary event handlers and state variables to capture the data */
              />

              {/* Button to submit the new statistics */}
              <button onClick={handlePostStatsClick}>Post Stats</button>
            </div>
          )}

        </div>
      )}
      
    </div>
  );
}

export default All;
