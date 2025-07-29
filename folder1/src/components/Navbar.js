import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'ta' : 'en');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    { path: '/crop-disease', label: 'Crop Disease', icon: 'fas fa-leaf' },
    { path: '/market-prices', label: 'Market Prices', icon: 'fas fa-chart-line' },
    { path: '/weather', label: 'Weather', icon: 'fas fa-cloud-sun' },
    { path: '/schemes', label: 'Schemes', icon: 'fas fa-file-alt' },
    { path: '/youtube-refs', label: 'Videos', icon: 'fab fa-youtube' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">
          <img src="/assets/agri-icon.png" alt="SmartUzhavan" className="logo" />
          <span>SmartUzhavan</span>
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          ))}
          {/* Adding the chatbot link here */}
          <Link
              to="/chatbot"
              className={`nav-link ${location.pathname === '/chatbot' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-robot"></i>
              <span>AI Assistant</span>
            </Link>
        </div>

        <div className="navbar-actions">
          <button className="language-toggle" onClick={toggleLanguage}>
            {currentLanguage === 'en' ? 'தமிழ்' : 'English'}
          </button>

          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;