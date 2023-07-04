import React from 'react'
import './PlayersForm.css'
import AddNewPlayers from './AddNewPlayers';
import AddStatsPage from './AddStatsPage';


function PlayersForm() {
  
  return (
    <div className="playersform-page">
      <div>
      <AddNewPlayers/>
      </div>
      <AddStatsPage/>
    </div>
  )
}

export default PlayersForm
