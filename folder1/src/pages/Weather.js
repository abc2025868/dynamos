import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('Chennai');

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async (searchLocation = location) => {
    try {
      setLoading(true);
      setError('');
      
      // Mock weather data for demonstration
      const mockWeatherData = {
        location: searchLocation,
        temperature: 32,
        description: 'Partly cloudy',
        icon: '02d',
        feelsLike: 35,
        humidity: 68,
        windSpeed: 12,
        windDirection: 'NE',
        sunrise: '6:15 AM',
        sunset: '6:45 PM',
        pressure: 1013,
        visibility: 10
      };

      const mockForecast = [
        { day: 'Today', temp: 32, condition: 'Partly cloudy', icon: '02d' },
        { day: 'Tomorrow', temp: 30, condition: 'Sunny', icon: '01d' },
        { day: 'Wednesday', temp: 28, condition: 'Light rain', icon: '10d' },
        { day: 'Thursday', temp: 29, condition: 'Cloudy', icon: '03d' },
        { day: 'Friday', temp: 31, condition: 'Sunny', icon: '01d' },
      ];

      setWeatherData(mockWeatherData);
      setForecast(mockForecast);
      generateRecommendations(mockWeatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Unable to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = (data) => {
    const recommendations = [];
    
    if (data.temperature > 35) {
      recommendations.push("High temperature alert! Ensure adequate irrigation for crops.");
      recommendations.push("Consider providing shade for sensitive plants.");
    }
    
    if (data.humidity > 80) {
      recommendations.push("High humidity may promote fungal diseases. Monitor crops closely.");
    }
    
    if (data.windSpeed > 20) {
      recommendations.push("Strong winds expected. Secure loose structures and check plant supports.");
    }
    
    if (data.description.toLowerCase().includes('rain')) {
      recommendations.push("Rainfall expected. Good time to plant new crops if soil conditions are suitable.");
      recommendations.push("Ensure proper drainage to prevent waterlogging.");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Weather conditions are favorable for regular farming activities.");
    }
    
    setRecommendations(recommendations);
  };

  const [recommendations, setRecommendations] = useState([]);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    const searchLocation = e.target.location.value.trim();
    if (searchLocation) {
      setLocation(searchLocation);
      fetchWeatherData(searchLocation);
    }
  };

  const handleRefresh = () => {
    fetchWeatherData(location);
  };

  if (loading) {
    return (
      <div className="weather-page">
        <div className="page-header">
          <h1>Weather Details</h1>
          <p>Get accurate weather forecasts for your location</p>
        </div>
        <div className="loading">
          <i className="fas fa-spinner"></i>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-page">
      <div className="page-header">
        <h1>Weather Details</h1>
        <p>Get accurate weather forecasts for your location to plan your farming activities</p>
      </div>

      <div className="weather-container">
        <div className="search-section">
          <form onSubmit={handleLocationSubmit} className="search-form">
            <input
              type="text"
              name="location"
              placeholder="Enter city name (e.g., Chennai, Coimbatore)"
              defaultValue={location}
            />
            <button type="submit">
              <i className="fas fa-search"></i> Search
            </button>
          </form>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
            <button onClick={handleRefresh} style={{ marginLeft: '1rem' }}>
              Try Again
            </button>
          </div>
        )}

        {weatherData && (
          <>
            <div className="weather-card">
              <div className="weather-header">
                <div>
                  <h2>{weatherData.location}</h2>
                  <p>{new Date().toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <button className="refresh-btn" onClick={handleRefresh}>
                  <i className="fas fa-sync-alt"></i>
                </button>
              </div>

              <div className="weather-main">
                <div className="weather-temp">{weatherData.temperature}°C</div>
                <div>
                  <img 
                    className="weather-icon" 
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                    alt={weatherData.description}
                  />
                  <div className="weather-description">{weatherData.description}</div>
                </div>
              </div>

              <div className="weather-details">
                <div className="weather-item">
                  <i className="fas fa-thermometer-half"></i>
                  <span>Feels Like</span>
                  <strong>{weatherData.feelsLike}°C</strong>
                </div>
                <div className="weather-item">
                  <i className="fas fa-tint"></i>
                  <span>Humidity</span>
                  <strong>{weatherData.humidity}%</strong>
                </div>
                <div className="weather-item">
                  <i className="fas fa-wind"></i>
                  <span>Wind Speed</span>
                  <strong>{weatherData.windSpeed} km/h</strong>
                </div>
                <div className="weather-item">
                  <i className="fas fa-compass"></i>
                  <span>Wind Direction</span>
                  <strong>{weatherData.windDirection}</strong>
                </div>
                <div className="weather-item">
                  <i className="fas fa-sun"></i>
                  <span>Sunrise</span>
                  <strong>{weatherData.sunrise}</strong>
                </div>
                <div className="weather-item">
                  <i className="fas fa-moon"></i>
                  <span>Sunset</span>
                  <strong>{weatherData.sunset}</strong>
                </div>
              </div>
            </div>

            <div className="recommendations-section">
              <h3>
                <i className="fas fa-leaf"></i>
                Farming Recommendations
              </h3>
              <ul className="recommendation-list">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
