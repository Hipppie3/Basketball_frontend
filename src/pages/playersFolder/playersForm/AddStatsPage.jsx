import React, { useState } from 'react'
import './AddStatsPage.css'

function AddStatsPage() {

const [id, setId] = useState('');
const [game_date, setGame_Date] = useState('');
const [matchup, setMatchup] = useState('');
const [ppg, setPpg] = useState('');
const [rbg, setRbg] = useState('');
const [apg, setApg] = useState('');
const [spg, setSpg] = useState('');
const [bpg, setBpg] = useState('');
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
const [stl, setStl] = useState('');
const [blk, setBlk] = useState('');
const [to, setTo] = useState('');
const [pts, setPts] = useState('');

  const handleStatisticsSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`api/players/${id}/statistics`, {
        game_date,
        matchup,
        ppg,
        rbg,
        apg,
        spg,
        bpg,
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
        stl,
        blk,
        to,
        pts,
      });
      console.log(response.data);
      // Reset form values
         setGame_Date('');
    setMatchup('');
    setPpg('');
    setRbg('');
    setApg('');
    setSpg('');
    setBpg('');
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
    setStl('');
    setBlk('');
    setTo('');
    setPts('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="addNewStatsContainer">
     <h1 className="addStatsTitle">Add New Stats</h1>
    <div>
      <form onSubmit={handleStatisticsSubmit} className="newStats">
       <label className="newStatsLabel" htmlFor="id">Player ID:
          <input
            className="newStatsInput"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
    </label>
    <label className="newStatsLabel" htmlFor="game_date">Game Date:
    <input
      className="newStatsInput"
      type="text"
      id="game_date"
      value={game_date}
      onChange={(e) => setGame_Date(e.target.value)}
    />
    </label> 
    <label className="newStatsLabel" htmlFor="matchup">Matchup:
    <input
      className="newStatsInput"
      type="text"
      id="matchup"
      value={matchup}
      onChange={(e) => setMatchup(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="ppg">PPG:
    <input
      className="newStatsInput"
      type="text"
      id="ppg"
      value={ppg}
      onChange={(e) => setPpg(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="rbg">RBG:
    <input
      className="newStatsInput"
      type="text"
      id="rbg"
      value={rbg}
      onChange={(e) => setRbg(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="apg">APG:
    <input
      className="newStatsInput"
      type="text"
      id="apg"
      value={apg}
      onChange={(e) => setApg(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="spg">SPG:
    <input
      className="newStatsInput"
      type="text"
      id="spg"
      value={spg}
      onChange={(e) => setSpg(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="bpg">BPG:
    <input
      className="newStatsInput"
      type="text"
      id="bpg"
      value={bpg}
      onChange={(e) => setBpg(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="fgm">FGM:
    <input
      className="newStatsInput"
      type="text"
      id="fgm"
      value={fgm}
      onChange={(e) => setFgm(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="fga">FGA:
    <input
      className="newStatsInput"
      type="text"
      id="fga"
      value={fga}
      onChange={(e) => setFga(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="fg_percentage">FG Percentage:
    <input
      className="newStatsInput"
      type="text"
      id="fg_percentage"
      value={fg_percentage}
      onChange={(e) => setFg_Percentage(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="two_pm">Two-Point Made:
    <input
      className="newStatsInput"
      type="text"
      id="two_pm"
      value={two_pm}
      onChange={(e) => setTwo_Pm(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="two_pa">Two-Point Attempted:
    <input
      type="text"
      id="two_pa"
      value={two_pa}
      onChange={(e) => setTwo_Pa(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="three_pm">Three-Point Made:
    <input
      className="newStatsInput"
      type="text"
      id="three_pm"
      value={three_pm}
      onChange={(e) => setThree_Pm(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="three_pa">Three-Point Attempted:
    <input
      className="newStatsInput"
      type="text"
      id="three_pa"
      value={three_pa}
      onChange={(e) => setThree_Pa(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="oreb">Offensive Rebounds:
    <input
      className="newStatsInput"
      type="text"
      id="oreb"
      value={oreb}
      onChange={(e) => setOreb(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="dreb">Defensive Rebounds:
    <input
      className="newStatsInput"
      type="text"
      id="dreb"
      value={dreb}
      onChange={(e) => setDreb(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="reb">Total Rebounds:
    <input
      className="newStatsInput"
      type="text"
      id="reb"
      value={reb}
      onChange={(e) => setReb(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="stl">Steals:
    <input
      className="newStatsInput"
      type="text"
      id="stl"
      value={stl}
      onChange={(e) => setStl(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="blk">Blocks:
    <input
      className="newStatsInput"
      type="text"
      id="blk"
      value={blk}
      onChange={(e) => setBlk(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="to">Turnovers:
    <input
      className="newStatsInput"
      type="text"
      id="to"
      value={to}
      onChange={(e) => setTo(e.target.value)}
    />
    </label>
    <label className="newStatsLabel" htmlFor="pts">Points:
    <input
      className="newStatsInput"
      type="text"
      id="pts"
      value={pts}
      onChange={(e) => setPts(e.target.value)}
    />
    </label>
    <button type="submit"
    className="addStatsBtn">Submit</button>

</form>
 </div>
  </div>)
}

export default AddStatsPage
