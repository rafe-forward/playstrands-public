import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateStrandsPage from './pages/CreateStrandsPage';
import PlayStrands from './components/PlayStrands';
import HomePage from './pages/HomePage';
import PlayLinkedStrands from './components/PlayLinkedStrands';
import AboutPage from './components/About';
import MobileDenier from './pages/MobileDenier'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/create-strands" element={<CreateStrandsPage />} />
          <Route path="/play-strands" element={<PlayStrands />} />
          <Route path="/play-linked-strands/:game_id" element={<PlayLinkedStrands />} />
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/mobile" element={<MobileDenier></MobileDenier>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;