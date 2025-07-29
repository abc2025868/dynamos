
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Chennai');

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/weather?location=${location}`);
      setWeatherData(response.data.current);
      setForecast(response.data.forecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const cities = [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
    'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul'
  ];

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="weather-container">
        <div className="container">
          <div className="page-header">
            <h1>Weather Forecast</h1>
            <p>Agricultural weather information for Tamil Nadu</p>
          </div>

          <div className="location-selector">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="location-select"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {weatherData && (
            <div className="current-weather">
              <div className="weather-card main-weather">
                <div className="weather-header">
                  <h2>{location}</h2>
                  <span className="date">{new Date().toLocaleDateString()}</span>
                </div>
                
                <div className="weather-main">
                  <div className="temperature">
                    <span className="temp">{weatherData.temperature}°C</span>
                    <div className="weather-icon">
                      <i className={`fas ${getWeatherIcon(weatherData.condition)}`}></i>
                    </div>
                  </div>
                  
                  <div className="weather-details">
                    <p className="condition">{weatherData.condition}</p>
                    <p className="feels-like">Feels like {weatherData.feelsLike}°C</p>
                  </div>
                </div>

                <div className="weather-stats">
                  <div className="stat">
                    <i className="fas fa-eye"></i>
                    <span>Humidity</span>
                    <strong>{weatherData.humidity}%</strong>
                  </div>
                  <div className="stat">
                    <i className="fas fa-wind"></i>
                    <span>Wind Speed</span>
                    <strong>{weatherData.windSpeed} km/h</strong>
                  </div>
                  <div className="stat">
                    <i className="fas fa-tint"></i>
                    <span>Rainfall</span>
                    <strong>{weatherData.rainfall} mm</strong>
                  </div>
                  <div className="stat">
                    <i className="fas fa-thermometer-half"></i>
                    <span>Pressure</span>
                    <strong>{weatherData.pressure} hPa</strong>
                  </div>
                </div>
              </div>

              <div className="agricultural-advice">
                <h3>Agricultural Recommendations</h3>
                <div className="advice-content">
                  {getAgriculturalAdvice(weatherData)}
                </div>
              </div>
            </div>
          )}

          {forecast.length > 0 && (
            <div className="forecast-section">
              <h3>7-Day Forecast</h3>
              <div className="forecast-grid">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <div className="forecast-day">{day.day}</div>
                    <div className="forecast-icon">
                      <i className={`fas ${getWeatherIcon(day.condition)}`}></i>
                    </div>
                    <div className="forecast-temps">
                      <span className="high">{day.high}°</span>
                      <span className="low">{day.low}°</span>
                    </div>
                    <div className="forecast-condition">{day.condition}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getWeatherIcon = (condition) => {
  const iconMap = {
    'sunny': 'fa-sun',
    'cloudy': 'fa-cloud',
    'rainy': 'fa-cloud-rain',
    'stormy': 'fa-bolt',
    'foggy': 'fa-smog',
    'windy': 'fa-wind'
  };
  return iconMap[condition.toLowerCase()] || 'fa-sun';
};

const getAgriculturalAdvice = (weather) => {
  const advice = [];
  
  if (weather.rainfall > 10) {
    advice.push("Heavy rainfall expected. Ensure proper drainage in fields.");
  }
  
  if (weather.temperature > 35) {
    advice.push("High temperature. Increase irrigation frequency and provide shade for livestock.");
  }
  
  if (weather.humidity > 80) {
    advice.push("High humidity may promote fungal diseases. Monitor crops closely.");
  }
  
  if (weather.windSpeed > 25) {
    advice.push("Strong winds expected. Secure loose structures and check plant supports.");
  }

  if (advice.length === 0) {
    advice.push("Good weather conditions for farming activities.");
  }

  return advice.map((item, index) => (
    <div key={index} className="advice-item">
      <i className="fas fa-leaf"></i>
      <span>{item}</span>
    </div>
  ));
};

export default Weather;
