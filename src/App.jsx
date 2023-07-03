import './App.css'
import { Routes, Route } from 'react-router-dom' 
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Media from './pages/Media'
import Players from './pages/Players'
// import PlayersPage from './pages/players/PlayersPage'
// import PlayersForm from './pages/players/playersForm/PlayersForm'


function App() {


  return (
    <div>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path="/playersform" element={<PlayersForm/>} /> */}
      <Route path="/about" element={<About/>} />
      <Route path="/media" element={<Media/>} />
      <Route path="/players" element={<Players />} />
      {/* <Route path='/players/:id' element={<PlayersPage />} /> */}
    </Routes>
    </div>
  )
}

export default App
