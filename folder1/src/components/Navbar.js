
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const location = useLocation();

  useEffect(() => {
    // Get saved language from localStorage
    const savedLang = localStorage.getItem('agri-lang') || 'en';
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('agri-lang', lang);
    setActiveDropdown(false);
    // Here you would implement the actual language switching logic
  };

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src="/logo.jpg" alt="SmartUzhavan Logo" width="70" height="70" />
          </Link>
        </div>
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <a href="#features" className="menu-item">Services</a>
          <a href="#about" className="menu-item">About</a>
          
          <div className={`language-dropdown ${activeDropdown ? 'active' : ''}`}>
            <button 
              className="menu-item dropdown-btn" 
              onClick={toggleDropdown}
              type="button"
            >
              Languages <i className="fas fa-chevron-down"></i>
            </button>
            <div className="dropdown-content">
              <button 
                className="lang-option" 
                onClick={() => handleLanguageChange('en')}
                type="button"
              >
                English
              </button>
              <button 
                className="lang-option" 
                onClick={() => handleLanguageChange('ta')}
                type="button"
              >
                தமிழ்
              </button>
            </div>
          </div>
          
          <div className="account-icon">
            <Link to="/login" title="Login" aria-label="Login or manage account">
              <i className="fas fa-user-circle"></i>
            </Link>
            <div className="tooltip">Login</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
