
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: 'fas fa-leaf',
      title: 'Crop Disease Detection',
      description: 'AI-powered disease detection for your crops with instant treatment recommendations',
      link: '/crop-disease'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Market Prices',
      description: 'Real-time market prices for agricultural products across Tamil Nadu',
      link: '/market-prices'
    },
    {
      icon: 'fas fa-cloud-sun',
      title: 'Weather Forecast',
      description: 'Accurate weather forecasts tailored for agricultural planning',
      link: '/weather'
    },
    {
      icon: 'fas fa-file-alt',
      title: 'Government Schemes',
      description: 'Information about government schemes and subsidies for farmers',
      link: '/schemes'
    },
    {
      icon: 'fab fa-youtube',
      title: 'Video References',
      description: 'Educational videos and tutorials for modern farming techniques',
      link: '/youtube-refs'
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>SmartUzhavan</h1>
            <p>Empowering Tamil Nadu Farmers with Modern Agricultural Technology</p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/crop-disease" className="btn btn-primary" style={{ marginRight: '1rem' }}>
                Get Started
              </Link>
              <Link to="/schemes" className="btn btn-secondary">
                View Schemes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
              Our Services
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
              Comprehensive agricultural solutions for modern farming
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="feature-card" style={{ textDecoration: 'none' }}>
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ backgroundColor: 'var(--background-light)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '2rem' }}>
              About SmartUzhavan
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              SmartUzhavan is a comprehensive digital platform designed specifically for Tamil Nadu farmers. 
              We provide cutting-edge agricultural technology, real-time market information, weather forecasts, 
              and government scheme details to help farmers make informed decisions and improve their agricultural productivity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
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
          <a href="#" >Privacy Policy</a>
          <span className="divider">|</span>
          <a href="#" >Terms of Service</a>
          <span className="divider">|</span>
          <a href="#" >Contact Us</a>
        </div>
        <div className="copyright">
          &copy; <span id="current-year">2023</span> SmartUzhavan. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
