
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Trash2, Search } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';

const History: React.FC = () => {
  const [history, setHistory] = useState<Video[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    setHistory(data);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('watchHistory');
    setHistory([]);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 bg-black min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400">
            <HistoryIcon size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Watch History</h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">Chronological Feed</p>
          </div>
        </div>
        
        <button 
          onClick={clearHistory}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 text-white/40 hover:text-rose-400 hover:border-rose-400/50 hover:bg-rose-400/5 transition-all font-black text-[10px] uppercase tracking-widest"
        >
          <Trash2 size={16} />
          Clear Log
        </button>
      </div>

      {history.length > 0 ? (
        <div className="flex flex-col gap-8">
          {history.map((video, idx) => (
            <motion.div 
              key={`${video.id}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <VideoCard video={video} layout="list" />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-[48px]">
          <Search size={48} className="text-white/10 mb-6" />
          <p className="text-white/20 font-black uppercase tracking-widest text-xs">No entries found in your timeline</p>
        </div>
      )}
    </div>
  );
};

export default History;
