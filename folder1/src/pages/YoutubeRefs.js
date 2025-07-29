
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './YoutubeRefs.css';

const YoutubeRefs = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/youtube-videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'farming-techniques', 'crop-management', 'livestock', 'technology', 'marketing'];

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading educational videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="youtube-container">
        <div className="container">
          <div className="page-header">
            <h1>Educational Videos</h1>
            <p>Learn modern farming techniques through curated educational content</p>
          </div>

          <div className="filters-section">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search videos..."
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
                  {category.replace('-', ' ').charAt(0).toUpperCase() + category.replace('-', ' ').slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="videos-grid">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <div key={index} className="video-card">
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="play-overlay">
                      <i className="fab fa-youtube"></i>
                    </div>
                    <div className="video-duration">{video.duration}</div>
                  </div>
                  
                  <div className="video-content">
                    <h3>{video.title}</h3>
                    <p className="video-description">{video.description}</p>
                    
                    <div className="video-meta">
                      <div className="channel-info">
                        <i className="fas fa-user-circle"></i>
                        <span>{video.channelName}</span>
                      </div>
                      
                      <div className="video-stats">
                        <span className="views">
                          <i className="fas fa-eye"></i>
                          {video.views}
                        </span>
                        <span className="likes">
                          <i className="fas fa-thumbs-up"></i>
                          {video.likes}
                        </span>
                      </div>
                    </div>

                    <div className="video-tags">
                      {video.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="video-footer">
                    <a 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary watch-btn"
                    >
                      <i className="fab fa-youtube"></i>
                      Watch Video
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="fab fa-youtube"></i>
                <p>No videos found for your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeRefs;
