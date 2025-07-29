
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
