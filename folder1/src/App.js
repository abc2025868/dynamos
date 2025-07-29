
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CropDisease from './pages/CropDisease';
import MarketPrices from './pages/MarketPrices';
import Weather from './pages/Weather';
import Schemes from './pages/Schemes';
import YoutubeRefs from './pages/YoutubeRefs';
import AgriChatbot from './components/AgriChatbot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/crop-disease" element={<CropDisease />} />
          <Route path="/crop-disease.html" element={<CropDisease />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/market-prices.html" element={<MarketPrices />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/weather.html" element={<Weather />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/schemes.html" element={<Schemes />} />
          <Route path="/youtube-refs" element={<YoutubeRefs />} />
          <Route path="/youtube-refs.html" element={<YoutubeRefs />} />
          <Route path="/chatbot" element={<AgriChatbot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
