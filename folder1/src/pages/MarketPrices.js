
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarketPrices.css';

const MarketPrices = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  const fetchMarketPrices = async () => {
    try {
      const response = await axios.get('/api/market-prices');
      setMarketData(response.data);
    } catch (error) {
      console.error('Error fetching market prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = marketData.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.market.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'grains', 'vegetables', 'fruits', 'pulses'];

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading market prices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="market-prices-container">
        <div className="container">
          <div className="page-header">
            <h1>Market Prices</h1>
            <p>Real-time agricultural commodity prices across Tamil Nadu</p>
          </div>

          <div className="filters-section">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search commodities or markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="market-grid">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div key={index} className="market-card">
                  <div className="card-header">
                    <h3>{item.commodity}</h3>
                    <span className="category-tag">{item.category}</span>
                  </div>
                  <div className="market-info">
                    <p className="market-name">
                      <i className="fas fa-map-marker-alt"></i>
                      {item.market}
                    </p>
                    <div className="price-info">
                      <div className="price">
                        <span className="amount">₹{item.price}</span>
                        <span className="unit">per {item.unit}</span>
                      </div>
                      <div className={`price-change ${item.change > 0 ? 'positive' : 'negative'}`}>
                        <i className={`fas fa-arrow-${item.change > 0 ? 'up' : 'down'}`}></i>
                        {Math.abs(item.change)}%
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <span className="last-updated">Updated: {item.lastUpdated}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>No market data found for your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
