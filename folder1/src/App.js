
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CropDisease from './pages/CropDisease';
import MarketPrices from './pages/MarketPrices';
import Weather from './pages/Weather';
import Schemes from './pages/Schemes';
import YoutubeRefs from './pages/YoutubeRefs';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop-disease" element={<CropDisease />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/youtube-refs" element={<YoutubeRefs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
