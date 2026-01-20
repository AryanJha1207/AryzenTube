
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Video, Bell, X, Sparkles, LogOut, Clock, ThumbsUp, Upload, Settings, ShieldCheck, UserCircle, ChevronRight, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass border-b border-white/[0.05] flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-5">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onMenuClick}
          className="p-2 hover:bg-white/[0.08] rounded-xl text-white transition-all"
        >
          <Menu size={22} />
        </motion.button>
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl p-1.5 shadow-lg shadow-indigo-500/30 group-hover:rotate-[15deg] transition-transform duration-500">
            <Sparkles size={18} className="text-white" fill="white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tight text-white italic text-nowrap">ARYZEN</span>
            <span className="text-[9px] font-bold text-indigo-400 tracking-[0.2em] uppercase text-nowrap">Amoled Pro</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[720px] flex items-center justify-center gap-4 px-4">
        <form onSubmit={handleSearch} className="flex flex-1 items-center">
          <div className="flex-1 flex items-center bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-2.5 focus-within:border-indigo-500/50 focus-within:bg-white/[0.08] transition-all focus-within:ring-4 ring-indigo-500/5 group">
            <Search size={18} className="text-white/20 group-focus-within:text-indigo-400 transition-colors mr-3" />
            <input 
              type="text" 
              placeholder="Explore the universe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white outline-none w-full text-sm font-medium placeholder:text-white/10"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="text-white/20 hover:text-white transition-colors">
                <X size={18} />
              </button>
            )}
          </div>
        </form>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/learning-path')}
          className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 rounded-2xl text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-purple-500/20"
        >
          <Target size={16} />
          <span>Learning Path</span>
        </motion.button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <motion.button whileTap={{ scale: 0.9 }} className="hidden md:flex p-2.5 hover:bg-white/[0.08] rounded-2xl text-white transition-all">
          <Video size={20} />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} className="hidden md:flex p-2.5 hover:bg-white/[0.08] rounded-2xl text-white relative transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-black"></span>
        </motion.button>
        
        <div className="relative" ref={menuRef}>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            className="flex items-center gap-2 p-1 pl-3 pr-1 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-2xl transition-all"
          >
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest hidden sm:block">Gold Member</span>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-xl">
              A
            </div>
          </motion.button>

          <AnimatePresence>
            {isAccountMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
                className="absolute right-0 mt-4 w-80 glass border border-white/10 rounded-[32px] p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] z-[60]"
              >
                <div className="p-5 flex items-center gap-4 border-b border-white/[0.05] mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg">A</div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-black text-white">Aryzen Admin</p>
                    <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">Amoled Pro Tier</p>
                    <p className="text-[10px] text-white/30 font-bold">Joined Jan 12, 2024</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <MenuButton icon={<UserCircle size={18} />} label="Channel Profile" onClick={() => setIsAccountMenuOpen(false)} />
                  <MenuButton icon={<Clock size={18} />} label="Watch History" onClick={() => { navigate('/history'); setIsAccountMenuOpen(false); }} />
                  <MenuButton icon={<ThumbsUp size={18} />} label="Liked Content" onClick={() => { navigate('/liked'); setIsAccountMenuOpen(false); }} />
                  <MenuButton icon={<Upload size={18} />} label="Broadcast Video" onClick={() => setIsAccountMenuOpen(false)} />
                  <div className="h-[1px] bg-white/[0.05] my-3 mx-4" />
                  <MenuButton icon={<ShieldCheck size={18} />} label="Aryzen Premium" onClick={() => setIsAccountMenuOpen(false)} />
                  <MenuButton icon={<Settings size={18} />} label="System Settings" onClick={() => setIsAccountMenuOpen(false)} />
                  <MenuButton icon={<LogOut size={18} />} label="Disconnect" color="text-rose-400" onClick={() => setIsAccountMenuOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  color?: string;
  onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, color = "text-white/60", onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-white/[0.06] transition-all group ${color}`}
  >
    <div className="flex items-center gap-3">
      <span className="group-hover:scale-110 group-hover:text-white transition-all duration-300">{icon}</span>
      <span className="text-sm font-bold group-hover:text-white transition-colors">{label}</span>
    </div>
    <ChevronRight size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
  </button>
);

export default Header;
