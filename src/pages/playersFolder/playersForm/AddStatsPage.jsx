import React, { useState } from 'react'
import './AddStatsPage.css'
import axios from 'axios';

function AddStatsPage() {

const [id, setId] = useState('');
const [deleteStatisticsId, setDeleteStatisticsId] = useState('');
const [game_date, setGame_Date] = useState('');
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



  const handleStatisticsSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}/statistics`, {
        game_date,
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
    setGame_Date('');
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

    const handleDeleteStatistics = async () => {
    try {
      await axios.delete(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}/statistics/${deleteStatisticsId}`);
      // Reset form values
      setId('');
      setDeleteStatisticsId('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="addNewStatsContainer">
     <h1 className="addStatsTitle">Add New Stats</h1>


    <form onSubmit={handleStatisticsSubmit} className="newStats">
    <div className='statsContainer'>
    <div className="stats">
      <label className="newStatsLabel" htmlFor="id">Player ID
      <input
            className="newStatsInput"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
      />
      </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="game_date">GDate
    <input
      className="newStatsInput"
      type="text"
      id="game_date"
      value={game_date}
      onChange={(e) => setGame_Date(e.target.value)}
    />
    </label>
    </div>
    
    <div className="stats">
    <label className="newStatsLabel" htmlFor="fgm">FGM
    <input
      className="newStatsInput"
      type="text"
      id="fgm"
      value={fgm}
      onChange={(e) => setFgm(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="fga">FGA
    <input
      className="newStatsInput"
      type="text"
      id="fga"
      value={fga}
      onChange={(e) => setFga(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="fg_percentage">FG%
    <input
      className="newStatsInput"
      type="text"
      id="fg_percentage"
      value={fg_percentage}
      onChange={(e) => setFg_Percentage(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="two_pm">2PM
    <input
      className="newStatsInput"
      type="text"
      id="two_pm"
      value={two_pm}
      onChange={(e) => setTwo_Pm(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="two_pa">2PA
    <input
      className="newStatsInput"
      type="text"
      id="two_pa"
      value={two_pa}
      onChange={(e) => setTwo_Pa(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="three_pm">3PM
    <input
      className="newStatsInput"
      type="text"
      id="three_pm"
      value={three_pm}
      onChange={(e) => setThree_Pm(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="three_pa">3PA
    <input
      className="newStatsInput"
      type="text"
      id="three_pa"
      value={three_pa}
      onChange={(e) => setThree_Pa(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="oreb">OReb
    <input
      className="newStatsInput"
      type="text"
      id="oreb"
      value={oreb}
      onChange={(e) => setOreb(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="dreb">DReb
    <input
      className="newStatsInput"
      type="text"
      id="dreb"
      value={dreb}
      onChange={(e) => setDreb(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="reb">Reb
    <input
      className="newStatsInput"
      type="text"
      id="reb"
      value={reb}
      onChange={(e) => setReb(e.target.value)}
    />
    </label>
    </div>
      <div className="stats">
    <label className="newStatsLabel" htmlFor="reb">Ast
    <input
      className="newStatsInput"
      type="text"
      id="ast"
      value={ast}
      onChange={(e) => setAst(e.target.value)}
    />
    </label>
    </div>


    <div className="stats"></div>
    <label className="newStatsLabel" htmlFor="stl">Stl
    <input
      className="newStatsInput"
      type="text"
      id="stl"
      value={stl}
      onChange={(e) => setStl(e.target.value)}
    />
    </label>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="blk">Blk
    <input
      className="newStatsInput"
      type="text"
      id="blk"
      value={blk}
      onChange={(e) => setBlk(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="to">TO
    <input
      className="newStatsInput"
      type="text"
      id="to"
      value={to}
      onChange={(e) => setTo(e.target.value)}
    />
    </label>
    </div>

    <div className="stats">
    <label className="newStatsLabel" htmlFor="pts">Pts
    <input
      className="newStatsInput"
      type="text"
      id="pts"
      value={pts}
      onChange={(e) => setPts(e.target.value)}
    />
    </label>
    </div>

    </div>
    <div>
    <button type="submit"
    className="addStatsBtn">Submit</button>
    </div>
</form>

<div className="deleteStats">
<h1>Delete Player Stats</h1>
  <form onSubmit={handleDeleteStatistics}>
    <div className='statsInput'>
        <label>
          Player ID:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <label>
          Statistic ID:
          <input
            type="number"
            value={deleteStatisticsId}
            onChange={(e) => setDeleteStatisticsId(e.target.value)}
          />
        </label>
        <button type="submit">Delete Player Stats</button>
        </div>
      </form>
      </div>
 </div>
)
}

export default AddStatsPage
