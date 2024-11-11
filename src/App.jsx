import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Player from './pages/Player.jsx';
import PlayerForm from './forms/PlayerForm.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Player />} />
          <Route path="/playersForm" element={<PlayerForm />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
