import React from 'react';
import '../styles/Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';

function Sidebar({ isOpen }) {
  const mainItems = [
    { icon: <HomeIcon />, text: 'Home' },
    { icon: <ExploreIcon />, text: 'Explore' },
    { icon: <SubscriptionsIcon />, text: 'Subscriptions' },
    { icon: <VideoLibraryIcon />, text: 'Library' },
    { icon: <HistoryIcon />, text: 'History' },
  ];

  const exploreItems = [
    { icon: <MusicNoteIcon />, text: 'Music' },
    { icon: <SportsEsportsIcon />, text: 'Gaming' },
    { icon: <LiveTvIcon />, text: 'Live' },
  ];

  const moreItems = [
    { icon: <SettingsIcon />, text: 'Settings' },
    { icon: <HelpIcon />, text: 'Help' },
    { icon: <FeedbackIcon />, text: 'Send feedback' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar__section">
        {mainItems.map((item, index) => (
          <button key={index} className="sidebar-item">
            {item.icon}
            {isOpen && <span>{item.text}</span>}
          </button>
        ))}
      </div>

      {isOpen && (
        <>
          <div className="sidebar__section">
            <h3 className="sidebar-title">Explore</h3>
            {exploreItems.map((item, index) => (
              <button key={index} className="sidebar-item">
                {item.icon}
                <span>{item.text}</span>
              </button>
            ))}
          </div>

          <div className="sidebar__section">
            <h3 className="sidebar-title">More from YouTube</h3>
            {moreItems.map((item, index) => (
              <button key={index} className="sidebar-item">
                {item.icon}
                <span>{item.text}</span>
              </button>
            ))}
          </div>

          <div className="sidebar__footer">
            <p>About • Press • Copyright</p>
            <p>Contact • Creators • Advertise</p>
            <p>Developers • Terms • Privacy</p>
            <p>Policy & Safety • How YouTube works</p>
            <p>© 2024 Google LLC</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;