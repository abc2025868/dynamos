
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-heading">உழவர் ஒளி</h1>
          <p className="hero-subheading">
            Empowering Tamil Nadu Farmers with Modern Technology and Traditional Wisdom
          </p>
          <Link to="/crop-disease" className="btn-get-started">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Our Services</h2>
        <div className="features-container">
          <Link to="/crop-disease" className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3 className="feature-title">Crop Disease Detection</h3>
            <p>Upload photos of your crops and get instant AI-powered disease identification with treatment recommendations.</p>
          </Link>

          <Link to="/market-prices" className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="feature-title">Market Prices</h3>
            <p>Get real-time market prices for all major crops across Tamil Nadu mandis and make informed selling decisions.</p>
          </Link>

          <Link to="/weather" className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-cloud-sun"></i>
            </div>
            <h3 className="feature-title">Weather Forecast</h3>
            <p>Access detailed weather forecasts and agricultural recommendations based on upcoming weather conditions.</p>
          </Link>

          <Link to="/schemes" className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h3 className="feature-title">Government Schemes</h3>
            <p>Discover and apply for various government schemes and subsidies available for Tamil Nadu farmers.</p>
          </Link>

          <Link to="/youtube-refs" className="feature-card">
            <div className="feature-icon">
              <i className="fab fa-youtube"></i>
            </div>
            <h3 className="feature-title">Educational Videos</h3>
            <p>Watch curated educational videos on modern farming techniques, pest management, and crop cultivation.</p>
          </Link>

          <Link to="/chatbot" className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3 className="feature-title">AI Assistant</h3>
            <p>Chat with our AI-powered agricultural assistant for instant answers to your farming questions.</p>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About உழவர் ஒளி</h2>
            <p>
              உழவர் ஒளி (Farmer's Light) is a comprehensive digital platform designed specifically for Tamil Nadu farmers. 
              We combine cutting-edge technology with deep understanding of local agricultural practices to provide 
              farmers with the tools they need to succeed in modern agriculture.
            </p>
            <p>
              Our platform offers real-time market prices, weather forecasts, crop disease detection, government scheme 
              information, and educational resources - all in one place. We believe in empowering farmers with knowledge 
              and technology to improve their yield, reduce losses, and increase profitability.
            </p>
          </div>
          <div className="about-image">
            <img src="/about-image.jpg" alt="Tamil Nadu Farmers" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-quote">
          <p>
            "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, 
            good morals, and happiness." - <span className="highlight">Thomas Jefferson</span>
          </p>
        </div>
        
        <div className="social-icons">
          <a href="#" className="social-icon" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="social-icon" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <span className="divider">|</span>
          <Link to="/contact">Contact</Link>
          <span className="divider">|</span>
          <a href="#">Privacy Policy</a>
          <span className="divider">|</span>
          <a href="#">Terms of Service</a>
        </div>
        
        <div className="copyright">
          <p>&copy; 2024 உழவர் ஒளி (Farmer's Light). All rights reserved. Built with ❤️ for Tamil Nadu farmers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
