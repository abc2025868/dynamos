import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import '../App.css';

function Home() {
  return (
    <div className="home-page">
      {/* Cultural Icon */}
      <div className="cultural-icon">
        <div className="icon-container">
          <img src="/agri-icon.png" alt="Tamil Nadu Cultural Symbol" />
          <span className="icon-text">TN</span>
        </div>
      </div>

      {/* News Ticker */}
      <div className="news-ticker">
        <div className="ticker-wrap">
          <div className="ticker-content">
            <span>Tamil Nadu announces new subsidies for organic farming</span>
            <span>Weather forecast: Moderate rainfall expected in delta regions next week</span>
            <span>New pest-resistant rice variety developed at Tamil Nadu Agricultural University</span>
            <span>Government increases minimum support price for paddy by 5%</span>
            <span>Solar-powered irrigation systems now available with 50% subsidy</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-overlay">
          <h1 className="hero-heading">Empowering Tamil Nadu Farmers with Smart Agriculture</h1>
          <p className="hero-subheading">Get real-time weather, crop advice, and government scheme help.</p>
          <Link to="/login" className="btn-get-started">Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2 className="section-title">Our Features</h2>
        <div className="features-container">
          <Link to="/weather" className="feature-card" data-feature="weatherDetails">
            <div className="feature-icon">
              <i className="fas fa-cloud-sun"></i>
            </div>
            <h3 className="feature-title">Weather Details</h3>
            <p>Get accurate weather forecasts specific to your location and plan your farming activities accordingly.</p>
          </Link>

          <Link to="/crop-disease" className="feature-card" data-feature="cropDisease">
            <div className="feature-icon">
              <i className="fas fa-seedling"></i>
            </div>
            <h3 className="feature-title">Detect Crop Disease</h3>
            <p>Use your smartphone to scan plants and identify diseases with our AI-powered detection system.</p>
          </Link>

          <Link to="/market-prices" className="feature-card" data-feature="marketPrices">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="feature-title">Latest Market Prices</h3>
            <p>Stay informed about current market prices for your crops and find the best places to sell.</p>
          </Link>

          <Link to="/schemes" className="feature-card" data-feature="govtSchemes">
            <div className="feature-icon">
              <i className="fas fa-landmark"></i>
            </div>
            <h3 className="feature-title">Government Schemes</h3>
            <p>Learn about all available government schemes and subsidies that can help your farming business.</p>
          </Link>

          <Link to="/youtube-refs" className="feature-card" data-feature="youtubeRefs">
            <div className="feature-icon">
              <i className="fab fa-youtube"></i>
            </div>
            <h3 className="feature-title">YouTube References</h3>
            <p>Watch educational videos about modern farming techniques and best practices in agriculture.</p>
          </Link>

          <Link to="/chatbot" className="feature-card" data-feature="expertSuggestions">
            <div className="feature-icon">
              <i className="fas fa-hands-helping"></i>
            </div>
            <h3 className="feature-title">Expert Suggestions</h3>
            <p>Connect with agricultural experts who can provide personalized advice for your specific needs.</p>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-content">
          <div className="about-text">
            <p>This web app empowers Tamil Nadu farmers by providing agriculture insights, weather forecasts, government schemes, and expert help in their own language. Built with care, it brings tradition and technology together for a better future.</p>
          </div>
          <div className="about-image">
            <img src="/about-image.jpg" alt="Tamil Nadu Farmers" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-quote">
          <p>Ready to <span className="highlight">elevate</span> your farming? Join our <span className="highlight">community</span> of Tamil Nadu farmers using <span className="highlight">technology</span> to boost yields and income.</p>
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
          <a href="#" className="social-icon" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <div className="footer-links">
          <Link to="/login">Login</Link>
          <span className="divider">|</span>
          <Link to="/about">About</Link>
          <span className="divider">|</span>
          <Link to="/contact">Contact Us</Link>
          <span className="divider">|</span>
          <a href="#" >Privacy Policy</a>
        </div>
        <div className="copyright">
          &copy; <span id="current-year">2024</span> SmartUzhavan. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;