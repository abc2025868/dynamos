
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h1>About SmartUzhavan</h1>
            <p>
              This web app empowers Tamil Nadu farmers by providing agriculture insights, 
              weather forecasts, government schemes, and expert help in their own language. 
              Built with care, it brings tradition and technology together for a better future.
            </p>
            <p>
              SmartUzhavan is designed specifically for Tamil Nadu's agricultural community, 
              offering modern technological solutions while respecting traditional farming wisdom.
            </p>
          </div>
          <div className="about-image">
            <img src="/about-image.jpg" alt="Tamil Nadu Farmers" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
