import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            <img src="/logo.jpg" alt="AgriAssist Logo" width="50" height="50" />
          </Link>
          <div className="navbar-menu">
            <Link 
              to="/" 
              className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              <i className="fas fa-home"></i> Home
            </Link>
            <Link 
              to="/crop-disease" 
              className={`menu-item ${location.pathname === '/crop-disease' ? 'active' : ''}`}
            >
              <i className="fas fa-leaf"></i> Crop Disease
            </Link>
            <Link 
              to="/market-prices" 
              className={`menu-item ${location.pathname === '/market-prices' ? 'active' : ''}`}
            >
              <i className="fas fa-chart-line"></i> Market Prices
            </Link>
            <Link 
              to="/weather" 
              className={`menu-item ${location.pathname === '/weather' ? 'active' : ''}`}
            >
              <i className="fas fa-cloud-sun"></i> Weather
            </Link>
            <Link 
              to="/schemes" 
              className={`menu-item ${location.pathname === '/schemes' ? 'active' : ''}`}
            >
              <i className="fas fa-handshake"></i> Schemes
            </Link>
            <Link 
              to="/youtube-refs" 
              className={`menu-item ${location.pathname === '/youtube-refs' ? 'active' : ''}`}
            >
              <i className="fab fa-youtube"></i> Videos
            </Link>
            <div className="language-dropdown">
              <span className="menu-item">
                <i className="fas fa-globe"></i> Language
              </span>
              <div className="dropdown-content">
                <a href="#" className="lang-option">English</a>
                <a href="#" className="lang-option">தமிழ்</a>
              </div>
            </div>
            <div className="account-icon">
              <Link to="/login">
                <i className="fas fa-user-circle"></i>
              </Link>
              <div className="tooltip">Login</div>
            </div>
          </div>
        </div>
      </nav>

      {/* News Ticker */}
      <div className="news-ticker">
        <div className="ticker-wrap">
          <div className="ticker-content">
            <span>🌾 New drought-resistant varieties available</span>
            <span>💰 MSP for paddy increased by 5%</span>
            <span>☀️ Solar irrigation systems now available with 50% subsidy</span>
            <span>📱 Download our mobile app for real-time updates</span>
            <span>🎯 Join our farmer community forum</span>
          </div>
        </div>
      </div>

      {/* Cultural Icon */}
      <div className="cultural-icon">
        <div className="icon-container">
          <img src="/agri-icon.png" alt="Tamil Nadu Agriculture" />
          <div className="icon-text">TN</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;