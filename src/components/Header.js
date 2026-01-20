import React, { useState } from 'react';
import '../styles/Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Header({ onMenuClick, darkMode, toggleDarkMode }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="header">
      <div className="header__left">
        <button className="menu-btn" onClick={onMenuClick}>
          <MenuIcon />
        </button>
        
        <div className="header__logo">
          <YouTubeIcon className="logo-icon" />
          <span className="logo-text">YouTube</span>
        </div>
      </div>

      <div className="header__center">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <SearchIcon />
            </button>
          </div>
        </form>
        
        <button className="mic-btn">
          <MicIcon />
        </button>
      </div>

      <div className="header__right">
        <button className="icon-btn" title="Dark Mode" onClick={toggleDarkMode}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </button>
        
        <button className="icon-btn" title="Create">
          <VideoCallIcon />
        </button>
        
        <button className="icon-btn" title="Notifications">
          <NotificationsIcon />
        </button>
        
        <button className="avatar-btn">
          <AccountCircleIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;