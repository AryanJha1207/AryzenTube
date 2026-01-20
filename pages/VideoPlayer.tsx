
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, CheckCircle2, MessageCircle, Sparkles, Check, Target, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecommendedVideos } from '../services/geminiService';
import { Video as VideoType, LearningPath } from '../types';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../constants';

const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoType | null>(null);
  const [recommended, setRecommended] = useState<VideoType[]>([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const [activePath, setActivePath] = useState<LearningPath | null>(null);
  const [isLearningVideo, setIsLearningVideo] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!id) return;

    const found = MOCK_VIDEOS.find(v => v.id === id);
    const videoData: VideoType = found || {
      id: id,
      title: "Aryzen Pro: Engineering the Future of Interaction",
      channelName: "Aryzen Creative Labs",
      thumbnail: `https://picsum.photos/seed/${id}/1280/720`,
      channelAvatar: `https://picsum.photos/seed/chan${id}/48/48`,
      views: "15M views",
      postedAt: "Just now",
      duration: "10:00",
      subscriberCount: "10M subscribers",
      description: "An advanced overview of how the Aryzen platform utilizes Gemini AI to transform video content into actionable learning modules."
    };
    setVideo(videoData);

    try {
      const historyJson = localStorage.getItem('watchHistory');
      const history = historyJson ? JSON.parse(historyJson) : [];
      const newHistory = [videoData, ...history.filter((v: any) => v.id !== id)].slice(0, 50);
      localStorage.setItem('watchHistory', JSON.stringify(newHistory));

      const likedJson = localStorage.getItem('likedVideos');
      const liked = likedJson ? JSON.parse(likedJson) : [];
      setIsLiked(liked.some((v: any) => v.id === id));

      const savedPath = localStorage.getItem('activePath');
      if (savedPath) {
        const path: LearningPath = JSON.parse(savedPath);
        setActivePath(path);
        const isPart = path.curriculum.some(day => day.lessons.some(l => l.videoId === id));
        setIsLearningVideo(isPart);
        
        const completedIds = JSON.parse(localStorage.getItem('completedVideos') || '[]');
        setIsCompleted(completedIds.includes(id));
      }
    } catch (e) {
      console.error("Storage Access Error:", e);
    }

    const fetchRecs = async () => {
      try {
        const data = await getRecommendedVideos(id);
        setRecommended(data);
      } catch (e) {
        setRecommended(MOCK_VIDEOS.filter(v => v.id !== id));
      }
    };
    fetchRecs();
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    if (!video || !id) return;
    try {
      const liked = JSON.parse(localStorage.getItem('likedVideos') || '[]');
      let newLiked;
      if (isLiked) {
        newLiked = liked.filter((v: any) => v.id !== id);
      } else {
        newLiked = [video, ...liked];
      }
      localStorage.setItem('likedVideos', JSON.stringify(newLiked));
      setIsLiked(!isLiked);
    } catch (e) {
      console.error("Like Action Failed", e);
    }
  };

  const handleDownload = () => {
    if (downloadStatus !== 'idle') return;
    setDownloadStatus('loading');
    setTimeout(() => {
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    }, 2500);
  };

  const toggleComplete = () => {
    if (!id) return;
    try {
      const completedIds = JSON.parse(localStorage.getItem('completedVideos') || '[]');
      let newIds;
      if (isCompleted) {
        newIds = completedIds.filter((cid: string) => cid !== id);
      } else {
        newIds = [...completedIds, id];
      }
      localStorage.setItem('completedVideos', JSON.stringify(newIds));
      setIsCompleted(!isCompleted);
    } catch (e) {
      console.error("Progress Save Error", e);
    }
  };

  if (!video) return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-[1800px] mx-auto px-6 py-8 flex flex-col xl:flex-row gap-10 bg-black min-h-screen overflow-x-hidden">
      <div className="flex-1 min-w-0">
        
        {isLearningVideo && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 p-6 bg-gradient-to-r from-indigo-900/40 to-transparent border border-indigo-500/30 rounded-[32px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                <Target size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Active Learning Path</p>
                <h4 className="text-white font-black italic truncate">{activePath?.goal}</h4>
              </div>
            </div>
            <button 
              onClick={toggleComplete}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shrink-0 ${
                isCompleted 
                ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isCompleted ? <Trophy size={16} /> : <CheckCircle2 size={16} />}
              <span>{isCompleted ? 'Module Perfected' : 'Mark Lesson Complete'}</span>
            </button>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative group"
        >
          <div className="aspect-video bg-black rounded-[48px] overflow-hidden shadow-[0_0_120px_rgba(99,102,241,0.1)] border border-white/5 ring-1 ring-white/10 group-hover:ring-indigo-500/30 transition-all duration-700">
            <video 
              className="w-full h-full object-contain" 
              controls 
              autoPlay 
              poster={video.thumbnail}
              src="https://joy1.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_08_A_Bologna_02_preview.mp4"
            />
          </div>
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-black text-white mt-10 tracking-tight leading-tight">
          {video.title}
        </h1>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mt-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 p-0.5 shadow-2xl shrink-0">
              <div className="w-full h-full rounded-[14px] overflow-hidden border border-white/20">
                <img src={video.channelAvatar} className="w-full h-full object-cover" alt={video.channelName} />
              </div>
            </div>
            <div className="flex flex-col mr-6 min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-white font-black text-xl truncate">{video.channelName}</span>
                <CheckCircle2 size={18} className="text-indigo-400 shrink-0" />
              </div>
              <span className="text-white/30 text-[11px] font-black uppercase tracking-[0.2em]">{video.subscriberCount || '5M subscribers'}</span>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 shrink-0 ${
                isSubscribed 
                ? 'bg-white/10 text-white/60 border border-white/10' 
                : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)]'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </motion.button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center bg-white/[0.05] border border-white/10 rounded-2xl p-1 shrink-0">
              <motion.button 
                whileTap={{ scale: 1.4, rotate: -15 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl transition-all ${isLiked ? 'text-indigo-400 bg-indigo-500/10' : 'text-white hover:bg-white/5'}`}
              >
                <ThumbsUp size={18} fill={isLiked ? "currentColor" : "none"} />
                <span className="text-sm font-black">128K</span>
              </motion.button>
              <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
              <motion.button whileTap={{ scale: 1.4, rotate: 15 }} className="px-5 py-2.5 hover:bg-white/5 rounded-2xl text-white transition-colors">
                <ThumbsDown size={18} />
              </motion.button>
            </div>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              disabled={downloadStatus !== 'idle'}
              className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 rounded-2xl text-white transition-all text-sm font-black shadow-[0_15px_35px_rgba(99,102,241,0.3)] relative overflow-hidden min-w-[160px] justify-center shrink-0"
            >
              <AnimatePresence mode="wait">
                {downloadStatus === 'loading' ? (
                  <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </motion.div>
                ) : downloadStatus === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                    <Check size={18} />
                    <span>Complete</span>
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                    <Download size={18} />
                    <span>Get Video</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <button className="p-3.5 bg-white/[0.05] border border-white/10 rounded-2xl hover:bg-white/10 text-white transition-all shrink-0">
              <Share2 size={18} />
            </button>
            <button className="p-3.5 bg-white/[0.05] border border-white/10 rounded-2xl hover:bg-white/10 text-white transition-all shrink-0">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <motion.div 
          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          className="bg-white/[0.03] border border-white/[0.05] rounded-[48px] p-8 mt-10 cursor-pointer hover:bg-white/[0.06] transition-all group relative"
        >
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
            <span className="flex items-center gap-1.5"><Sparkles size={14} className="animate-pulse" /> Neural Summary</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>{video.views}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>{video.postedAt}</span>
          </div>
          <p className={`text-[17px] text-white/70 leading-relaxed font-medium ${isDescriptionExpanded ? '' : 'line-clamp-2'}`}>
            {video.description}
          </p>
          <button className="text-xs font-black text-white mt-5 uppercase tracking-wider group-hover:text-indigo-400 transition-colors flex items-center gap-2">
            {isDescriptionExpanded ? 'Collapse Neural Data' : 'Expose Technical Metadata'}
          </button>
        </motion.div>

        <div className="mt-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-indigo-500/10 rounded-2xl">
              <MessageCircle size={28} className="text-indigo-400" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight italic uppercase">User Resonance <span className="text-white/10 ml-4 not-italic">12K</span></h2>
          </div>

          <div className="flex gap-6 mb-16 group">
            <div className="w-16 h-16 rounded-[24px] bg-white/[0.04] flex items-center justify-center text-indigo-400 font-black text-xl shadow-lg flex-none border border-white/10 group-focus-within:border-indigo-500/50 group-focus-within:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-500 shrink-0">
              A
            </div>
            <div className="flex-1 pt-3 min-w-0">
              <input 
                placeholder="Share your resonance with the lab..."
                className="w-full bg-transparent border-b-2 border-white/5 pb-4 text-xl text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/5 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-[480px] flex flex-col gap-8">
        <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] mb-2 px-4">Neural Projections</h3>
        <div className="space-y-5">
          {recommended.length > 0 ? (
            recommended.map(v => (
              <VideoCard key={v.id} video={v} layout="list" />
            ))
          ) : (
            MOCK_VIDEOS.map(v => (
              <VideoCard key={v.id} video={v} layout="list" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
