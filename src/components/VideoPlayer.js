import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/VideoPlayer.css';
import { videos } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LearningModeIcon from '@mui/icons-material/School';
import SmartSkipIcon from '@mui/icons-material/FastForward';

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [learningMode, setLearningMode] = useState(false);
  const [smartSkip, setSmartSkip] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const foundVideo = videos.find(v => v.id === parseInt(id));
    setVideo(foundVideo);
    
    // Get related videos (exclude current video)
    const related = videos.filter(v => v.id !== parseInt(id)).slice(0, 5);
    setRelatedVideos(related);
  }, [id]);

  if (!video) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="videoPlayer">
      <div className="videoPlayer__container">
        {/* Back Button */}
        <button className="backButton" onClick={() => navigate('/')}>
          <ArrowBackIcon /> Back to Home
        </button>
        
        {/* Video Player & Smart Features */}
        <div className="videoPlayer__main">
          <div className="videoWrapper">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* INNOVATIVE FEATURES - Add these buttons */}
          <div className="smart-features">
            <button 
              className={`smart-btn ${learningMode ? 'active' : ''}`}
              onClick={() => setLearningMode(!learningMode)}
            >
              <LearningModeIcon />
              <span>Learning Mode</span>
            </button>
            
            <button 
              className={`smart-btn ${smartSkip ? 'active' : ''}`}
              onClick={() => setSmartSkip(!smartSkip)}
            >
              <SmartSkipIcon />
              <span>Smart Skip</span>
            </button>
          </div>
          
          {learningMode && (
            <div className="learning-panel">
              <h3>🎯 Interactive Learning Mode</h3>
              <div className="quiz">
                <h4>Quick Quiz</h4>
                <p>According to this tutorial, what's the main benefit of React?</p>
                <div className="options">
                  <button className="option-btn">Virtual DOM</button>
                  <button className="option-btn">Two-way Data Binding</button>
                  <button className="option-btn">Built-in CSS</button>
                </div>
              </div>
              <div className="chapters">
                <h4>📚 Smart Chapters</h4>
                <ul>
                  <li>0:00 - Introduction</li>
                  <li>2:30 - Core Concepts</li>
                  <li>5:45 - Live Example</li>
                  <li>8:20 - Best Practices</li>
                </ul>
              </div>
            </div>
          )}
          
          {smartSkip && (
            <div className="skip-indicator">
              <p>⏭️ AI detected 2 skippable sections in this video</p>
              <div className="skip-timeline">
                <div className="skip-section" style={{ left: '30%', width: '10%' }}>
                  Repetitive Content
                </div>
                <div className="skip-section" style={{ left: '70%', width: '15%' }}>
                  Sponsor Segment
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Video Info */}
        <div className="videoPlayer__info">
          <h1>{video.title}</h1>
          
          <div className="videoPlayer__stats">
            <div className="views">
              <span>{video.views} • {video.timestamp}</span>
            </div>
            
            <div className="videoPlayer__actions">
              <button className="actionBtn">
                <ThumbUpIcon />
                <span>Like</span>
                <span className="count">125K</span>
              </button>
              
              <button className="actionBtn">
                <ThumbDownIcon />
                <span>Dislike</span>
              </button>
              
              <button className="actionBtn">
                <ShareIcon />
                <span>Share</span>
              </button>
              
              <button className="actionBtn">
                <PlaylistAddIcon />
                <span>Save</span>
              </button>
              
              <button className="actionBtn">
                <MoreVertIcon />
              </button>
            </div>
          </div>
          
          {/* Channel Info */}
          <div className="videoPlayer__channel">
            <div className="channel-info">
              <img src={video.channelImage} alt={video.channel} />
              <div>
                <h3>{video.channel}</h3>
                <p>10M subscribers</p>
              </div>
            </div>
            <button className="subscribeBtn">SUBSCRIBE</button>
          </div>
          
          {/* Description */}
          <div className="videoPlayer__description">
            <h4>Description</h4>
            <p>This is a demonstration of our YouTube clone with innovative features. In a real application, this would show the actual video description fetched from the YouTube API.</p>
            <p>Category: {video.category}</p>
            <p>Learn how to build amazing web applications with modern technologies!</p>
          </div>
        </div>
      </div>
      
      {/* Recommendations Sidebar */}
      <div className="videoPlayer__recommendations">
        <h3>Recommended Videos</h3>
        {relatedVideos.map(v => (
          <div key={v.id} className="recommendationCard" onClick={() => navigate(`/watch/${v.id}`)}>
            <img src={v.thumbnail} alt={v.title} />
            <div className="rec-info">
              <h4>{v.title}</h4>
              <p>{v.channel}</p>
              <p>{v.views} • {v.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPlayer;