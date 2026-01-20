
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Play, MoreHorizontal } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';

const Liked: React.FC = () => {
  const [liked, setLiked] = useState<Video[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    setLiked(data);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col xl:flex-row">
      {/* Left Spotlight Panel */}
      <div className="w-full xl:w-[480px] xl:fixed xl:left-72 xl:top-16 xl:bottom-0 p-8 xl:border-r border-white/5 bg-gradient-to-b from-indigo-900/20 to-transparent">
        <div className="glass-deep rounded-[48px] p-10 h-full flex flex-col border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] pointer-events-none" />
          
          <div className="relative aspect-video rounded-[32px] overflow-hidden mb-8 shadow-2xl ring-1 ring-white/10">
            {liked.length > 0 ? (
              <img src={liked[0].thumbnail} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-white/5">
                <ThumbsUp size={64} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Play fill="white" size={48} className="text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Liked Synthesis</h1>
          <div className="flex items-center gap-4 mb-8">
            <p className="text-sm font-bold text-white/40">{liked.length} Items</p>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Saved for Resonance</p>
          </div>

          <div className="flex gap-4 mt-auto">
            <button className="flex-1 h-14 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              <Play size={18} fill="currentColor" /> Play All
            </button>
            <button className="w-14 h-14 bg-white/[0.05] border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-all">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Right List Panel */}
      <div className="flex-1 xl:ml-[480px] p-12">
        <div className="max-w-[800px] mx-auto space-y-6">
          {liked.length > 0 ? (
            liked.map((video, idx) => (
              <motion.div 
                key={`${video.id}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <VideoCard video={video} layout="list" />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-40">
              <p className="text-white/20 font-black uppercase tracking-widest text-xs">No resonances established yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Liked;
