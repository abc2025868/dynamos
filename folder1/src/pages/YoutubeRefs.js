
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './YoutubeRefs.css';

const YoutubeRefs = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Videos', icon: 'fas fa-video' },
    { id: 'farming-techniques', name: 'Farming Techniques', icon: 'fas fa-seedling' },
    { id: 'crop-management', name: 'Crop Management', icon: 'fas fa-leaf' },
    { id: 'pest-control', name: 'Pest Control', icon: 'fas fa-bug' },
    { id: 'irrigation', name: 'Irrigation', icon: 'fas fa-tint' },
    { id: 'soil-health', name: 'Soil Health', icon: 'fas fa-mountain' }
  ];

  // Mock video data
  const mockVideos = [
    {
      id: 1,
      title: 'Modern Rice Farming Techniques in Tamil Nadu',
      description: 'Learn advanced rice cultivation methods for better yield and quality',
      category: 'farming-techniques',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '15:30',
      channelName: 'Tamil Agriculture Today',
      views: '125K',
      likes: '2.3K',
      tags: ['rice', 'farming', 'techniques', 'tamil-nadu'],
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      language: 'Tamil'
    },
    {
      id: 2,
      title: 'Organic Pest Control Methods for Vegetables',
      description: 'Natural and eco-friendly pest control solutions for vegetable crops',
      category: 'pest-control',
      thumbnail: 'https://img.youtube.com/vi/abc123xyz/maxresdefault.jpg',
      duration: '12:45',
      channelName: 'Organic Farming Guide',
      views: '89K',
      likes: '1.8K',
      tags: ['organic', 'pest-control', 'vegetables'],
      url: 'https://youtube.com/watch?v=abc123xyz',
      language: 'Tamil'
    },
    {
      id: 3,
      title: 'Drip Irrigation System Setup and Maintenance',
      description: 'Complete guide to installing and maintaining drip irrigation systems',
      category: 'irrigation',
      thumbnail: 'https://img.youtube.com/vi/def456uvw/maxresdefault.jpg',
      duration: '18:20',
      channelName: 'Smart Irrigation Solutions',
      views: '67K',
      likes: '1.5K',
      tags: ['irrigation', 'drip-system', 'water-management'],
      url: 'https://youtube.com/watch?v=def456uvw',
      language: 'Tamil'
    }
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from your backend API
      // const response = await axios.get('/api/youtube-videos');
      // setVideos(response.data);
      
      // Using mock data for now
      setTimeout(() => {
        setVideos(mockVideos);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos(mockVideos);
      setLoading(false);
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openVideo = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="youtube-page">
        <div className="container">
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading videos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="youtube-page">
      <div className="container">
        <div className="page-header">
          <h1><i className="fab fa-youtube"></i> Agricultural Video References</h1>
          <p>Learn from expert farmers and agricultural specialists</p>
        </div>

        {/* Search and Filter */}
        <div className="filters-section">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <i className={category.icon}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="videos-grid">
          {filteredVideos.length === 0 ? (
            <div className="no-videos">
              <i className="fas fa-video-slash"></i>
              <h3>No videos found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredVideos.map(video => (
              <div key={video.id} className="video-card" onClick={() => openVideo(video.url)}>
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-duration">{video.duration}</div>
                  <div className="play-overlay">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  
                  <div className="video-meta">
                    <span className="channel-name">
                      <i className="fas fa-user"></i>
                      {video.channelName}
                    </span>
                    <span className="video-stats">
                      <i className="fas fa-eye"></i>
                      {video.views}
                    </span>
                    <span className="video-likes">
                      <i className="fas fa-thumbs-up"></i>
                      {video.likes}
                    </span>
                  </div>
                  
                  <div className="video-tags">
                    {video.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div>
                  
                  <div className="video-language">
                    <i className="fas fa-language"></i>
                    Available in {video.language}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default YoutubeRefs;
