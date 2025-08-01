import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ta' : 'en');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setShowUserDropdown(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAccountClick = () => {
    if (currentUser) {
      setShowUserDropdown(!showUserDropdown);
    } else {
      navigate('/login');
    }
  };

  const getUserDisplayName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    } else if (currentUser?.email) {
      return currentUser.email.split('@')[0];
    } else if (currentUser?.phoneNumber) {
      return currentUser.phoneNumber;
    }
    return 'User';
  };

  const getUserAvatar = () => {
    return currentUser?.photoURL || '/agri-icon.png';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.account-section')) {
        setShowUserDropdown(false);
      }
      if (isMenuOpen && !event.target.closest('.navbar-menu') && !event.target.closest('.mobile-menu-icon')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserDropdown, isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src="/logo.jpg" alt="SmartUzhavan Logo" />
          </Link>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              {lang === 'en' ? 'Home' : 'முகப்பு'}
            </Link>
          </li>
          <li>
            <Link to="/market-prices" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              {lang === 'en' ? 'Market Prices' : 'சந்தை விலைகள்'}
            </Link>
          </li>
          <li>
            <Link to="/crop-disease" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              {lang === 'en' ? 'Crop Disease' : 'பயிர் நோய்கள்'}
            </Link>
          </li>
          <li>
            <Link to="/schemes" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              {lang === 'en' ? 'Schemes' : 'திட்டங்கள்'}
            </Link>
          </li>
          <li>
            <Link to="/weather" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              {lang === 'en' ? 'Weather' : 'வானிலை'}
            </Link>
          </li>
          <li>
            <Link to="/youtube-refs" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              {lang === 'en' ? 'Videos' : 'வீடியோ'}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              {lang === 'en' ? 'Contact' : 'தொடர்பு'}
            </Link>
          </li>
          <li>
            <Link to="/chatbot" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              {lang === 'en' ? 'AI Assistant' : 'AI உதவியாளர்'}
            </Link>
          </li>

          {/* Language Switch Button */}
          <li>
            <button
              className="menu-item language-switch-btn"
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              aria-label="Toggle language"
              type="button"
            >
              <i className="fas fa-globe"></i>
              <span className="lang-text">{lang === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>
          </li>
        </ul>

        <div className="account-section">
          <div
            className="account-icon"
            onClick={handleAccountClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleAccountClick();
              }
            }}
          >
            {currentUser ? (
              <div className="user-profile-link">
                <img
                  src={getUserAvatar()}
                  alt="Profile"
                  className="user-avatar"
                  onError={(e) => {
                    e.target.src = '/agri-icon.png';
                  }}
                />
                <span className="user-name">{getUserDisplayName()}</span>
                <i className="fas fa-chevron-down"></i>
              </div>
            ) : (
              <div className="login-link">
                <i className="fas fa-user-circle"></i>
                <span className="login-text">{lang === 'en' ? 'Login' : 'உள்நுழைய'}</span>
              </div>
            )}
          </div>

          {currentUser && showUserDropdown && (
            <div className="user-dropdown">
              <div className="user-info">
                <img
                  src={getUserAvatar()}
                  alt="Profile"
                  className="dropdown-avatar"
                  onError={(e) => {
                    e.target.src = '/agri-icon.png';
                  }}
                />
                <div>
                  <div className="dropdown-name">{getUserDisplayName()}</div>
                  <div className="dropdown-email">{currentUser?.email || currentUser?.phoneNumber || ''}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate('/profile');
                  setShowUserDropdown(false);
                }}
              >
                <i className="fas fa-user-cog"></i>
                {lang === 'en' ? 'Profile' : 'சுயவிவரம்'}
              </button>
              <button className="dropdown-item logout-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                {lang === 'en' ? 'Logout' : 'வெளியேறு'}
              </button>
            </div>
          )}
        </div>

        <div
          className="mobile-menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMenuOpen(!isMenuOpen);
            }
          }}
        >
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
