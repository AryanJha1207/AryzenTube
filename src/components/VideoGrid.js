import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VideoGrid.css';
import { videos, categories } from '../data/mockData';

function VideoGrid() {
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = videos;
    
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(video =>
        video.category === selectedCategory ||
        video.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    setFilteredVideos(filtered);
  }, [selectedCategory, searchQuery]);

  const handleVideoClick = (videoId) => {
    navigate(`/watch/${videoId}`);
  };

  return (
    <div className="videoGrid">
      {/* Categories */}
      <div className="categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Search Bar for Mobile */}
      <div className="mobile-search">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mobile-search-input"
        />
      </div>
      
      {/* Videos Grid */}
      <div className="videos">
        {filteredVideos.map(video => (
          <div key={video.id} className="videoCard" onClick={() => handleVideoClick(video.id)}>
            <div className="videoCard__thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <span className="videoCard__duration">{video.duration}</span>
            </div>
            
            <div className="videoCard__info">
              <img 
                className="videoCard__avatar" 
                src={video.channelImage} 
                alt={video.channel} 
              />
              
              <div className="videoCard__text">
                <h4>{video.title}</h4>
                <p>{video.channel}</p>
                <p>
                  {video.views} • {video.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredVideos.length === 0 && (
        <div className="no-videos">
          <h3>No videos found</h3>
          <p>Try different search terms or categories</p>
        </div>
      )}
    </div>
  );
}

export default VideoGrid;