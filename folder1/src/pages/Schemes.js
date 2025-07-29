
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Schemes.css';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await axios.get('/api/schemes');
      setSchemes(response.data);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'subsidy', 'loan', 'insurance', 'training', 'technology'];

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading government schemes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="schemes-container">
        <div className="container">
          <div className="page-header">
            <h1>Government Schemes</h1>
            <p>Explore various government schemes and subsidies available for farmers</p>
          </div>

          <div className="filters-section">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search schemes..."
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

          <div className="schemes-grid">
            {filteredSchemes.length > 0 ? (
              filteredSchemes.map((scheme, index) => (
                <div key={index} className="scheme-card">
                  <div className="card-header">
                    <h3>{scheme.title}</h3>
                    <span className={`category-tag ${scheme.category}`}>
                      {scheme.category}
                    </span>
                  </div>
                  
                  <div className="card-content">
                    <p className="description">{scheme.description}</p>
                    
                    <div className="scheme-details">
                      <div className="detail-item">
                        <i className="fas fa-money-bill-wave"></i>
                        <span>Benefit: {scheme.benefit}</span>
                      </div>
                      
                      <div className="detail-item">
                        <i className="fas fa-users"></i>
                        <span>Eligibility: {scheme.eligibility}</span>
                      </div>
                      
                      <div className="detail-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>Duration: {scheme.duration}</span>
                      </div>
                    </div>

                    <div className="application-info">
                      <h4>How to Apply:</h4>
                      <ol>
                        {scheme.applicationProcess.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="required-documents">
                      <h4>Required Documents:</h4>
                      <ul>
                        {scheme.documents.map((doc, docIndex) => (
                          <li key={docIndex}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="card-footer">
                    <a href={scheme.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Apply Now
                    </a>
                    <a href={scheme.detailsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>No schemes found for your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemes;
