
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import VideoPlayer from './pages/VideoPlayer';
import LearningDashboard from './pages/LearningDashboard';
import Login from './pages/Login';
import History from './pages/History';
import Liked from './pages/Liked';
import { SidebarState, User } from './types';

const App: React.FC = () => {
  const [sidebarState, setSidebarState] = useState<SidebarState>(SidebarState.Full);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Auth Load Error", e);
        localStorage.removeItem('user');
      } finally {
        setIsAuthLoading(false);
      }
    };
    initAuth();
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setSidebarState(SidebarState.Mini);
      } else {
        setSidebarState(SidebarState.Full);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarState(prev => {
      if (prev === SidebarState.Full) return SidebarState.Mini;
      if (prev === SidebarState.Mini) return SidebarState.Full;
      return SidebarState.Full;
    });
  };

  const isVideoPage = location.pathname.startsWith('/video');
  const isDashboard = location.pathname.startsWith('/learning-path');
  const isLoginPage = location.pathname === '/login';

  if (isAuthLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );

  if (isLoginPage) return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Calculate dynamic classes to prevent overlapping
  // 1. Sidebar is always present unless on login.
  // 2. Full = 18rem (288px), Mini = 88px.
  // 3. On mobile (< 1024px), sidebar might overlap or hide, but for this design we keep it fixed.
  
  const getMarginClass = () => {
    if (isVideoPage) return "ml-0 lg:ml-[88px]"; // Video page usually prefers mini sidebar space
    if (sidebarState === SidebarState.Full) return "ml-0 lg:ml-72";
    if (sidebarState === SidebarState.Mini) return "ml-0 lg:ml-[88px]";
    return "ml-0";
  };

  const mainContentClasses = `mt-16 w-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden ${getMarginClass()}`;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden relative">
      <Header onMenuClick={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar state={sidebarState} />
        
        <main className={mainContentClasses}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/learning-path" element={<LearningDashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {sidebarState === SidebarState.Full && window.innerWidth < 1280 && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-30 lg:hidden transition-all duration-500"
          onClick={() => setSidebarState(SidebarState.Mini)}
        />
      )}
    </div>
  );
};

export default App;
