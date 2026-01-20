
import React, { useState } from 'react';
import { CATEGORIES, MOCK_VIDEOS } from '../constants';
import VideoCard from '../components/VideoCard';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="pb-20 bg-black w-full overflow-x-hidden">
      {/* Category Chips - Strictly contained width */}
      <div className="sticky top-0 glass z-30 w-full border-b border-white/5">
        <div className="px-6 py-5 flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
                activeCategory === cat 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_10px_20px_rgba(99,102,241,0.3)]' 
                  : 'bg-white/[0.05] border-white/5 text-white/40 hover:bg-white/[0.1] hover:text-white hover:border-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Responsive Grid - Centered and width-bound */}
      <div className="px-6 py-10 max-w-[2400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12">
          {MOCK_VIDEOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 5) * 0.05 }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
          {/* Duplicating for demo content filling */}
          {MOCK_VIDEOS.map((video, idx) => (
            <motion.div
              key={`${video.id}-dup`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 5) * 0.05 }}
            >
              <VideoCard video={{...video, id: `${video.id}-dup`}} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
