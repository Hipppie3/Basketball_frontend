import './App.css'
import { Routes, Route } from 'react-router-dom' 
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Media from './pages/Media'
import Players from './pages/playersFolder/Players'
import PlayersPage from './pages/playersFolder/PlayersPage'
import AddNewPlayers from './pages/playersFolder/playersForm/AddNewPlayers'
import AddStatsPage from './pages/playersFolder/playersForm/AddStatsPage'
import AddVideoPage from './pages/playersFolder/playersForm/AddVideoPage'
import PlayerStatsPage from './pages/playersFolder/PlayersStatsPage'
import PlayerBioPage from './pages/playersFolder/PlayersBioPage'
import PlayersMediaPage from './pages/playersFolder/PlayersMediaPage'
import Login from './pages/Login'


function App() {


  return (
    <div>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/editPlayers" element={<AddNewPlayers/>} />
      <Route path="/editStats" element={<AddStatsPage/>} />
      <Route path="/editVideos" element={<AddVideoPage/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/media" element={<Media/>} />
      <Route path="/players" element={<Players />} />
      <Route path="/players/:id/stats" element={<PlayerStatsPage/>} />
      <Route path="/players/:id/bio" element= {<PlayerBioPage/>} />
      <Route path="/players/:id/media" element={<PlayersMediaPage/>} />
      <Route path='/players/:id' element={<PlayersPage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </div>
  )
}

export default App
