
import React from 'react';
import { SidebarState } from '../types';
import { SIDEBAR_ITEMS, SIDEBAR_SECONDARY } from '../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { Brain, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  state: SidebarState;
}

const Sidebar: React.FC<SidebarProps> = ({ state }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isVideoPage = location.pathname.startsWith('/video');

  if (state === SidebarState.Hidden) return null;

  const isActive = (label: string) => {
    const path = location.pathname;
    if (label === 'Home' && path === '/') return true;
    if (label === 'History' && path === '/history') return true;
    if (label === 'Liked videos' && path === '/liked') return true;
    if (label === 'Learning Lab' && path === '/learning-path') return true;
    return false;
  };

  const handleNav = (label: string) => {
    if (label === 'Home') navigate('/');
    else if (label === 'History') navigate('/history');
    else if (label === 'Liked videos') navigate('/liked');
    else if (label === 'Learning Path' || label === 'Learning Lab') navigate('/learning-path');
  };

  const handleLearningClick = () => {
    navigate('/learning-path');
  };

  // On video page, standard YouTube collapses the sidebar to mini or hides it
  // Here we'll force mini for better AMOLED aesthetic consistency
  const effectiveState = isVideoPage ? SidebarState.Mini : state;

  if (effectiveState === SidebarState.Mini) {
    return (
      <aside className="fixed left-0 top-16 bottom-0 w-[88px] bg-black border-r border-white/5 flex flex-col items-center py-6 z-40 transition-all overflow-y-auto no-scrollbar">
        <button 
          onClick={handleLearningClick}
          className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/20 hover:scale-110 transition-transform relative group shrink-0"
        >
          <Brain size={24} />
          <div className="absolute -right-1 -top-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-black animate-pulse" />
        </button>
        <div className="flex flex-col items-center gap-4 w-full">
          {[...SIDEBAR_ITEMS, ...SIDEBAR_SECONDARY].map((item, idx) => {
            const active = isActive(item.label);
            return (
              <button 
                key={idx}
                onClick={() => handleNav(item.label)}
                className={`w-16 h-16 flex flex-col items-center justify-center gap-1 rounded-[20px] transition-all group shrink-0 ${
                  active ? 'bg-indigo-600/10 text-indigo-400' : 'text-white/30 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <div className={active ? 'scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'group-hover:scale-110 transition-transform'}>
                  {item.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter truncate w-full text-center px-1">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-72 bg-black border-r border-white/5 overflow-y-auto px-5 py-8 z-40 transition-all no-scrollbar">
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLearningClick}
        className="w-full mb-10 p-5 rounded-[32px] bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent border border-indigo-500/30 group relative overflow-hidden text-left"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
          <Brain size={64} className="text-white" />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-indigo-500 rounded-2xl text-white shadow-xl shadow-indigo-500/40">
            <Brain size={18} />
          </div>
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Neural Mode</span>
        </div>
        <h4 className="text-lg font-black text-white italic leading-tight mb-1">Learning Lab</h4>
        <p className="text-[11px] text-white/40 font-bold mb-4 uppercase tracking-wider">Custom AI Curations</p>
        <div className="flex items-center justify-between text-indigo-400">
          <span className="text-[10px] font-black uppercase tracking-widest">Construct Path</span>
          <ChevronRight size={14} />
        </div>
      </motion.button>

      <div className="space-y-2">
        {SIDEBAR_ITEMS.map((item, idx) => {
          const active = isActive(item.label);
          return (
            <button 
              key={idx}
              onClick={() => handleNav(item.label)}
              className={`w-full flex items-center gap-5 px-5 py-3.5 rounded-[22px] transition-all group ${
                active 
                  ? 'bg-gradient-to-r from-indigo-600/20 to-transparent border-l-4 border-indigo-500 text-white font-black' 
                  : 'text-white/40 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <span className={active ? 'text-indigo-400' : 'group-hover:text-white transition-colors'}>
                {item.icon}
              </span>
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="my-8 px-4 opacity-10">
        <div className="h-[1px] bg-white"></div>
      </div>

      <div className="space-y-2">
        <h3 className="px-5 py-2 text-[10px] font-black text-white/20 uppercase tracking-[3px]">The Archive</h3>
        {SIDEBAR_SECONDARY.map((item, idx) => {
          const active = isActive(item.label);
          return (
            <button 
              key={idx}
              onClick={() => handleNav(item.label)}
              className={`w-full flex items-center gap-5 px-5 py-3 rounded-[22px] transition-all group ${
                active 
                  ? 'bg-white/[0.08] text-white font-black' 
                  : 'text-white/40 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <span className={active ? 'text-indigo-400' : 'group-hover:text-indigo-400 transition-colors'}>{item.icon}</span>
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-16 p-8 bg-white/[0.02] rounded-[32px] border border-white/[0.05] shadow-inner">
        <p className="text-[10px] text-white/20 leading-relaxed font-black uppercase tracking-widest text-center">
          Aryzen Pro v4.0<br/>
          Quantum Stream Engine
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
