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
  const [w_l, setW_l] = useState('');
  const [fgm, setFgm] = useState('');
  const [fga, setFga] = useState('');
  const [fg_percentage, setFg_Percentage] = useState('');
  const [two_pm, setTwo_Pm] = useState('');
  const [two_pa, setTwo_Pa] = useState('');
  const [three_pm, setThree_Pm] = useState('');
  const [three_pa, setThree_Pa] = useState('');
  const [oreb, setOreb] = useState('');
  const [dreb, setDreb] = useState('');
  const [reb, setReb] = useState('');
  const [ast, setAst] = useState('');
  const [stl, setStl] = useState('');
  const [blk, setBlk] = useState('');
  const [to, setTo] = useState('');
  const [pts, setPts] = useState('');
  const [deleteStatisticsId, setDeleteStatisticsId] = useState('');
  const [games, setGames] = useState([]);
  const [gameDate, setGameDate] = useState('');

useEffect(() => {
  const fetchPlayerData = async () => {
    try {
      const playersResponse = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players');
      const gamesResponse = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/games');

      // Combine the games data into a dictionary for easy lookup
      const gamesData = gamesResponse.data.reduce((acc, game) => {
        acc[game.id] = game.date;
        return acc;
      }, {});

      // Add the game date to each statistic object of each player
      const playersWithStatsAndGames = playersResponse.data.map((player) => ({
        ...player,
        statistics: player.statistics.map((statistic) => ({
          ...statistic,
          game_date: gamesData[statistic.id],
        })),
      }));

      setAll(playersWithStatsAndGames);
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
      { statistic: updatedStatistic } // Include the statistic object in the request payload
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
          if (!selectedPlayer || !editingStatisticId) {
      console.error('No player or statistic selected.');
      return;
    }

    // Get the corresponding game_date from the games array
    const gameDate = selectedPlayer.games.find((game) => game.id === editingStatisticId)?.date;

    if (!gameDate) {
      console.error('No game date found for the selected statistic.');
      return;
    }

      const response = await axios.post(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}/statistics`, {
        game_date: gameDate,
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
      setGameDate('');
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

// ... (previous code)

const handleDeleteClick = (statisticId) => {
  if (window.confirm('Are you sure you want to delete this statistic?')) {
    setDeleteStatisticsId(statisticId);
  }
};

// Move the API call to useEffect
useEffect(() => {
  const handleDeleteStatistics = async () => {
    try {
      if (!deleteStatisticsId || !id) {
        console.error('No player or statistics selected.');
        return;
      }

      await axios.delete(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}/statistics/${deleteStatisticsId}`);

      // After deletion, fetch the updated player data to refresh the statistics
      const updatedPlayerResponse = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}`);
      setSelectedPlayer(updatedPlayerResponse.data);

      // Clear the deleteStatisticsId state
      setDeleteStatisticsId('');

    } catch (error) {
      console.error('Failed to delete statistics:', error);
      // Perform error handling if needed
    }
  };

  if (deleteStatisticsId) {
    handleDeleteStatistics();
  }
}, [deleteStatisticsId, id]);

// ... (rest of the code)



  return (
    <div>
      <div className="statsInput">
        <label className="newStatsLabel" htmlFor="id">
          <h3>Player</h3>
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

          <h3>Statistics:<button 
          onClick={handleAddStatsClick}>
          {isAddingStats ? 'Cancel Adding Stats' : 'Add Stats'}
          </button>
          </h3>
          {selectedPlayer.statistics.length > 0 ? (
            <ul className="playerStats">
              {selectedPlayer.statistics.map((statistic) => {
                const isEditing = editingStatisticId === statistic.id;
                const editedStatistic = editedStatistics[statistic.id] || {};

                return (
                  <li key={statistic.id} className="playerStatsLi">
                    <div>
                      {isEditing ? (
                        <div className-="playerStats">
                          Game Date:
                          <input
                            type="text"
                            defaultValue={editedStatistic.game_date || gameDate}
                            onChange={(e) => handleInputChange(e, statistic.id, 'game_date')}
                          />
                          <br />
                          W/L:
                          <input
                            type="text"
                            defaultValue={editedStatistic.w_l || statistic.w_l}
                            onChange={(e) => handleInputChange(e, statistic.id, 'w_l')}
                          />
                          <br />
                          FGM:
                          <input
                            type="text"
                            defaultValue={editedStatistic.fgm || statistic.fgm}
                            onChange={(e) => handleInputChange(e, statistic.id, 'fgm')}
                          />
                          <br />
                          FGA:
                          <input
                            type="text"
                            defaultValue={editedStatistic.fga || statistic.fga}
                            onChange={(e) => handleInputChange(e, statistic.id, 'fga')}
                          />
                          <br />
                          FG%:
                          <input
                            type="text"
                            defaultValue={editedStatistic.fg_percentage || statistic.fg_percentage}
                            onChange={(e) => handleInputChange(e, statistic.id, 'fg_percentage')}
                          />
                          <br />
                          2PA:
                          <input
                            type="text"
                            defaultValue={editedStatistic.two_pa || statistic.two_pa}
                            onChange={(e) => handleInputChange(e, statistic.id, 'two_pa')}
                          />
                          <br />
                          2PM:
                          <input
                            type="text"
                            defaultValue={editedStatistic.two_pm || statistic.two_pm}
                            onChange={(e) => handleInputChange(e, statistic.id, 'two_pm')}
                          />
                          <br />
                          3PA:
                          <input
                            type="text"
                            defaultValue={editedStatistic.three_pa || statistic.three_pa}
                            onChange={(e) => handleInputChange(e, statistic.id, 'three_pa')}
                          />
                          <br />
                          3PM:
                          <input
                            type="text"
                            defaultValue={editedStatistic.three_pm || statistic.three_pm}
                            onChange={(e) => handleInputChange(e, statistic.id, 'three_pm')}
                          />
                          <br />
                          OREB:
                          <input
                            type="text"
                            defaultValue={editedStatistic.oreb || statistic.oreb}
                            onChange={(e) => handleInputChange(e, statistic.id, 'oreb')}
                          />
                          <br />
                          DREB:
                          <input
                            type="text"
                            defaultValue={editedStatistic.dreb || statistic.dreb}
                            onChange={(e) => handleInputChange(e, statistic.id, 'dreb')}
                          />
                          <br />
                          REB:
                          <input
                            type="text"
                            defaultValue={editedStatistic.reb || statistic.reb}
                            onChange={(e) => handleInputChange(e, statistic.id, 'reb')}
                          />
                          <br />
                          AST:
                          <input
                            type="text"
                            defaultValue={editedStatistic.ast || statistic.ast}
                            onChange={(e) => handleInputChange(e, statistic.id, 'ast')}
                          />
                          <br />
                          STL:
                          <input
                            type="text"
                            defaultValue={editedStatistic.stl || statistic.stl}
                            onChange={(e) => handleInputChange(e, statistic.id, 'stl')}
                          />
                          <br />
                          BLK:
                          <input
                            type="text"
                            defaultValue={editedStatistic.blk || statistic.blk}
                            onChange={(e) => handleInputChange(e, statistic.id, 'blk')}
                          />
                          <br />
                          TO:
                          <input
                            type="text"
                            defaultValue={editedStatistic.to || statistic.to}
                            onChange={(e) => handleInputChange(e, statistic.id, 'to')}
                          />
                          <br />
                          PTS:
                          <input
                            type="text"
                            defaultValue={editedStatistic.pts || statistic.pts}
                            onChange={(e) => handleInputChange(e, statistic.id, 'pts')}
                          />
                          <br />
                        </div>
                      ) : (
                        <div className="stats-results">
                          Id: {statistic.id}
                          <br />
                          Game Date: {statistic.game_date}
                          <br />
                          W/L: {statistic.w_l}
                          <br />
                          FGM: {statistic.fgm}
                          <br />
                          FGA: {statistic.fga}
                          <br />
                          FG%: {statistic.fg_percentage}
                          <br />
                          2PA: {statistic.two_pa}
                          <br />
                          2PM: {statistic.two_pm}
                          <br />
                          3PA: {statistic.three_pa}
                          <br />
                          3PM: {statistic.three_pm}
                          <br />
                          OREB: {statistic.oreb}
                          <br />
                          DREB: {statistic.dreb}
                          <br />
                          REB: {statistic.reb}
                          <br />
                          AST: {statistic.ast}
                          <br />
                          STL: {statistic.stl}
                          <br />
                          BLK: {statistic.blk}
                          <br />
                          TO: {statistic.to}
                          <br />
                          PTS: {statistic.pts}
                        </div>
                      )}
                    </div>
                    {isEditing ? (
                      <button onClick={() => handleUpdateClick(statistic.id)}>Update</button>
                    ) : (
                      <div>
                      <button onClick={() => handleEditClick(statistic.id)}>Edit</button>
                      <button onClick={() => handleDeleteClick(statistic.id)}>Delete Stats</button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
            <p>No statistics available for this player.</p>
            </div>     
          )}

{isAddingStats && (
            <div className="playerStats">
              {/* Input fields for the new statistics */}
               <input
                type="text"
                placeholder="Game_date"
                id="game_date"
                value={gameDate}
                onChange={(e) => setGameDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="W/L"
                id="w_l"
                value={w_l}
                onChange={(e) => setW_l(e.target.value)}
              />
              <input
                type="text"
                placeholder="FGM"
                id="fgm"
                value={fgm}
                onChange={(e) => setFgm(e.target.value)}
              />
              <input
                type="text"
                placeholder="FGA"
                id="fga"
                value={fga}
                onChange={(e) => setFga(e.target.value)}
              />
              <input
                type="text"
                placeholder="FG%"
                value={fg_percentage}
                onChange={(e) => setFg_Percentage(e.target.value)}
              />
              <input
                type="text"
                placeholder="2PM"
                id="two_pm"
                value={two_pm}
                onChange={(e) => setTwo_Pm(e.target.value)}
              />
              <input
                type="text"
                placeholder="2AM"
                value={two_pa}
                onChange={(e) => setTwo_Pa(e.target.value)}
              />
              <input
                type="text"
                placeholder="3PM"
                id="three_pm"
                value={three_pm}
                onChange={(e) => setThree_Pm(e.target.value)}
              />
              <input
                type="text"
                placeholder="3PA"
                id="three_pa"
                value={three_pa}
                onChange={(e) => setThree_Pa(e.target.value)}
              />
              <input
                type="text"
                placeholder="OREB"
                id="oreb"
                value={oreb}
                onChange={(e) => setOreb(e.target.value)}
              />
              <input
                type="text"
                placeholder="DREB"
                id="dreb"
                value={dreb}
                onChange={(e) => setDreb(e.target.value)}
              />
              <input
                type="text"
                placeholder="REB"
                id="reb"
                value={reb}
                onChange={(e) => setReb(e.target.value)}
              />
              <input
                type="text"
                placeholder="AST"
                id="ast"
                value={ast}
                onChange={(e) => setAst(e.target.value)}
              />
              <input
                type="text"
                placeholder="STL"
                id="stl"
                value={stl}
                onChange={(e) => setStl(e.target.value)}
              />
              <input
                type="text"
                placeholder="BLK"
                id="blk"
                value={blk}
                onChange={(e) => setBlk(e.target.value)}
              />
              <input
                type="text"
                placeholder="TO"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <input
                type="text"
                placeholder="PTS"
                id="pts"
                value={pts}
                onChange={(e) => setPts(e.target.value)}
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
