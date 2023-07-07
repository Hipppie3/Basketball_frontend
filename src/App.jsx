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
      <Route path='/players/:id' element={<PlayersPage />} />
    </Routes>
    </div>
  )
}

export default App
