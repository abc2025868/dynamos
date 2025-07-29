
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
